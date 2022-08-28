import React, { useEffect, useState, useMemo, useImperativeHandle, forwardRef } from 'react'
import * as R from 'ramda'
import useForm from '../hooks/useForm'
import { getValueByPath, setValueByPath, getPath, commonFields, getExtraField, FormContext } from './common'
import { LevelItem } from './Level'

/**
 * 获取有效的数据，过滤已经隐藏的选项对应的值
 *
 * @param {*} sourceData
 * @param {UISchema} schema
 * @returns
 */
const getValidField = (sourceData: any, schema: UISchema) =>  {
  const invalidFields = schema.els.reduce((acc, cur) => {
    const existValue = R.path([cur.dataIndex], sourceData)
    // 当sourceData中有值或选项被隐藏就不赋值， 反之赋值
    if (!existValue || (cur.hidden && cur.hidden(sourceData))) {
      acc.push(cur.dataIndex)
    }
    return acc
  }, [])
  return R.omit(invalidFields, R.mergeDeepRight({}, sourceData))
}

/**
 * 根据单个项的schema初始化表单数据
 *
 * @param {StringMap} obj 对象的引用
 * @param {FieldProps} schema
 */
const initSchemaData = (obj: StringMap, schema: FieldProps) => {
  if (schema.defaultValue) {
    obj[schema.dataIndex!] = schema.defaultValue
  }
  if (schema.suffix && !R.isEmpty(schema.suffix.value) && schema.suffix.dataIndex) {
    obj[schema.suffix.dataIndex] = schema.suffix.value
  }
  if (schema.type === 'datePicker') {
    obj[schema.dataIndex!] = schema.defaultValue || Date.now()
  }
}

/**
 * 生成初始化的formData数据
 *
 * @param {Schema} schema
 * @returns
 */
const getFormData = (schema: Schema) => {
  let data: StringMap = {}

  schema.els.forEach(item => {
    initSchemaData(data, item)
  })

  if (schema.additional && schema.additional.length > 0) {
    schema.additional.forEach(item => {
      data[item.dataIndex!] = R.range(0, 1).map(() => {
        if (item.additional && item.additional.length > 0 ) {
          return getFormData(item)
        } else {
          let childrenData: StringMap = {}
          item.els.forEach(item => {
            initSchemaData(childrenData, item)
          })
          return childrenData
        }
      })
    })
  }

  return data
}

/**
 *  根据生成的ui结构，进行遍历，得到需要验证和计算的字段
 *
 * @param {UISchema} schema
 * @param {string} [path='']
 * @param {*} [ruleMap={}] 保存路径对应验证规则的对象
 * @param {*} [computedMap={}] 保存路径对应计算属性的对象
 * @returns
 */
const getOtherInfo = (schema: UISchema, data: any, path='', ruleMap: StringMap={}, computedMap: StringMap={}) => {
  schema.els.forEach(item => {
    const index = getPath(path, [item.dataIndex])
    // 如果存在规则并且选项未被隐藏，添加规则
    if (item.rules && !(item.hidden && item.hidden(data))) {
      ruleMap[index] = item.rules
    }

    if (item.suffix && item.suffix.type === 'select' && !R.isEmpty(item.suffix.rules)) {
      const index = getPath(path, [item.suffix.dataIndex])
      ruleMap[index] = item.suffix.rules
    }

    if (item.computed) {
      item.computed[1].forEach((dep) => {
        computedMap[dep] = {
          action: item.computed![0],
          index
        }
      })
    }
  })

  const extraFields = getExtraField(schema)
  if (extraFields.length > 0) {
    extraFields.forEach(extraField => {
      (schema[extraField]! as Schema[]).forEach((row, idx) => {
        if (row.additional && row.additional.length > 0 ) {
          const curPath = getPath(path, [extraField, idx])
          // @ts-ignore
          getOtherInfo(row, data, curPath, ruleMap, computedMap)
        } else {
          row.els.forEach(el => {
            const curPath = getPath(path, [extraField, idx, el.dataIndex])
            if (el.rules) {
              ruleMap[curPath] = el.rules
            }

            if (el.suffix && el.suffix.type === 'select' && !R.isEmpty(el.suffix.rules)) {
              const index = getPath(path, [extraField, idx, el.suffix.dataIndex])
              ruleMap[index] = el.suffix.rules
            }

            if (el.computed) {
              el.computed[1].forEach((dep) => {
                const index = getPath(path, [extraField, idx, dep])
                computedMap[index] = {
                  action: el.computed![0],
                  index: curPath
                }
              })
            }
          })
        }
      })
    })
  }

  return { ruleMap, computedMap }
}

/**
 * 遍历传入的json数据，生成一颗dom结构的树
 *
 * @param {Schema} schema
 * @returns {UISchema}
 */
const getUISchema = (schema: Schema, data: any | null): UISchema => {
  let newSchema = R.pick(commonFields)(schema)
  let extra: StringMap = {}
  if (schema.additional && schema.additional.length > 0) {
    schema.additional.forEach(item => {
      // 暂时初始化一个，预留
      const len = data && data[item.dataIndex] ? R.length(data[item.dataIndex]) : 1
      extra[item.dataIndex!] = R.range(0, len).map(() => {
        if (item.additional && item.additional.length > 0 ) {
          return getUISchema(item, data)
        } else {
          return R.pick(commonFields)(item)
        }
      })
    })
  }

  // @ts-ignore
  return Object.assign(newSchema, extra)
}

/**
 *  遍历整个结构，生成对应的映射关系
 *
 * @param {Schema} schema
 * @param {*} [domMap={}] 保存路径对应的dom结构的对象
 * @param {*} [dataMap={}] 保存路径对应data结构的对象
 * @param {string} [path='']
 * @returns {*}
 */
const getMap = (schema: Schema, domMap: StringMap={}, dataMap: StringMap={}, path: string=''): any => {
  if (schema.additional && schema.additional.length > 0) {
    schema.additional.forEach((item)=> {
      const curPath = getPath(path, [item.dataIndex])
      domMap[curPath] = getUISchema(item, null)
      dataMap[curPath] = getFormData(item)
      if (item.additional && item.additional.length > 0 ) {
        getMap(item, domMap, dataMap, curPath)
      }
    })
  }

  return { domMap, dataMap }
}

const Form = (props: FormProps, ref: any) => {
  const { schemas, onSubmit, onChange, submitText, dropDefaultSubmitButton=false, defaultFormData={} } = props
  const [ formData, setFormData ] = useState({})
  const [ rules, setRules ] = useState({})
  const [ uiSchema, setUISchema ] = useState<UISchema>()
  const [ domMap, setDomMap ] = useState({})
  const [ dataMap, setDataMap ] = useState({})
  const [ computedMap, setComputedMap ] = useState({})

  const recent: Schema = useMemo(() => Object.assign({}, schemas), [schemas])

  useEffect(() => {
    if (!recent) {
      return
    }

    const mapRes = getMap(recent)
    setDomMap(mapRes.domMap)
    setDataMap(mapRes.dataMap)
    const newFormData = R.mergeDeepRight(getFormData(recent), defaultFormData)
    setFormData(newFormData)
    setUISchema(getUISchema(recent, newFormData))
  }, [recent])

  useEffect(() => {
    if (uiSchema) {
      const { ruleMap, computedMap } = getOtherInfo(uiSchema, formData)
      setRules(ruleMap)
      setComputedMap(computedMap)
    }
  }, [uiSchema, formData])

  const { validations, validate, validateField } = useForm({ fields: Object.keys(rules) })

  // 设置计算属性的值
  const setComputedValue = (path: string, data: any) => {
    const pathArr: string[] = R.split('.', path)
    const curObj = R.path(R.init(pathArr))(data)
    // @ts-ignore
    const computedValue = computedMap[path].action(curObj)
    // @ts-ignore
    const newData = setValueByPath(R.clone(data), computedValue, computedMap[path].index)
    onChange && onChange(newData)
    setFormData(newData)
  }

  // 当有值更新时，更新formData，验证属性，计算其他计算属性
  const handleValueChange = async (val: any, path: string) => {
    if (!R.isNil(val)) {
      const newData = setValueByPath(R.clone(formData), val, path)
      setFormData(newData)
      if (R.has(path, computedMap)) {
        setComputedValue(path, newData)
      } else {
        onChange && onChange(newData)
      }
      if (R.has(path, rules)) {
        try {
          //@ts-ignore
          await validateField(path, rules, newData)
        } catch (err) {
          // handle error
        }
      }
    }
  }

  // 增加子表单， 根据路径找到可插入的模版；更新uiSchema的值和formData的值
  const handleAddDom = (path: string, tPath: string) => {
    const curPathUISchema = getValueByPath(uiSchema, path)
    const curPathFormData = getValueByPath(formData, path)
    // @ts-ignore
    const newUiSchema = setValueByPath(R.clone(uiSchema), curPathUISchema.concat(domMap[tPath]), path)
    // @ts-ignore
    const newFormData = setValueByPath(R.clone(formData), curPathFormData.concat(R.clone([dataMap[tPath]])), path)
    setUISchema(newUiSchema)
    setFormData(newFormData)
  }

  // 删除子表单， 根据路径删除uiSchema结构里对应的值和formData里对应的值
  const handleRemoveDom = (path: string, idx: number) => {
    const curPathUISchema = getValueByPath(uiSchema, path)
    const curPathFormData = getValueByPath(formData, path)
    curPathUISchema.splice(idx, 1)
    curPathFormData.splice(idx, 1)
    const newUiSchema = setValueByPath(R.clone(uiSchema), curPathUISchema.slice(), path)
    const newFormData = setValueByPath(R.clone(formData), curPathFormData.slice(), path)
    setUISchema(newUiSchema)
    setFormData(newFormData)
  }

  // 提交事件； 验证素有表单项， 成功则抛出formData
  const handleSubmit = async () => {
    const data = getValidField(formData, uiSchema!)
    try {
      await validate(rules, data)
      onSubmit && onSubmit(data)
      return data
    } catch (error) {
      throw error
    }
  }

  useImperativeHandle(ref, () => ({
    submit: handleSubmit,
  }))

  if (!uiSchema) return null
  return <div>
    <FormContext.Provider value={{ formData, handleValueChange, handleAddDom, handleRemoveDom, validations, domMap }}>
      <LevelItem schema={uiSchema} />
    </FormContext.Provider>

    {/* <Button type="primary" onClick={handleSubmit}>提交</Button> */}
    {
      !dropDefaultSubmitButton && <button onClick={handleSubmit} style={{ paddingLeft: '1.5em', paddingRight: '1.5em' }}>
        { submitText ? submitText : '确认' }
      </button>
    }
    {/* <br />
    <div style={{ border: '1px solid #CCC' }}>
      {JSON.stringify(formData, null, '\t')}
    </div> */}
  </div>
}

export default forwardRef(Form)