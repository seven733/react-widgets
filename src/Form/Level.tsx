import React, { useState, useEffect, useRef, useContext, useMemo, useCallback } from 'react'
import styled, { css } from 'styled-components'
import * as R from 'ramda'
import { Field } from '../Field'
import { ReactComponent as Add } from '../assets/add.svg'
import ContainWrapper from './Container'
import { getPath, getExtraField } from './common'
import { FormContext, MinColumnWidth, FixedWidth, ScrollWeight, Th, Td, DeleteBtn, Delete } from './common'
import FixedTable from './FixedTable'

const Wrapper = styled.div<{len: number}>`
  display: grid;
  margin-bottom: 1.21em;
  grid-column-gap: 20px;
  ${props => props.len && css`
    grid-template-columns: repeat(${props.len}, 1fr);
  `}
`

const Additional = styled.table`
  width: 100%;
  overflow: hidden;
`

export const Content = styled.div`
  overflow-x: scroll;
  overflow-y: visible;

  /* 滚动槽 */
  ::-webkit-scrollbar {
    width: ${ScrollWeight}px;
    height: ${ScrollWeight}px;
  }
  ::-webkit-scrollbar-track {
    border-radius: 0.3em;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 0.3em;
    background: #ddd;
  }
  ::-webkit-scrollbar-corner {
    background-color: transparent;
  }
`

const Operation = styled.div`
  border: ${ props => `1px solid ${props.theme.colors.border}` };
  padding: 1.21em 1em;
`

const AddButton = styled.button`
  border: ${ props => `2px dashed ${props.theme.colors.border}` };
  width: 100%;
  background-color: transparent;
  background-image: none;
  color: #000000A5;
  :active {
    background: none;
  }
`

interface ComponentWrapProps {
  field: FieldProps
  path: string
  onValueChange: Function
  formData: any
  children?: any
}

const ComponentWrap = (props: ComponentWrapProps) => {
  const { field, formData, onValueChange, path } = props
  const Container = useMemo(() => {
    return ContainWrapper(field.component)
  }, [field.component])

  return <Container {...field} formData={formData} onValueChange={onValueChange} path={path}/>
}

// 获取当前的字段的验证的结果
const getValidation = (validations: any, field: FieldProps) => {
  if (field.suffix && validations[field.suffix.dataIndex!]) {
    if (validations[field.dataIndex]) {
      return [validations[field.dataIndex]].concat(validations[field.suffix.dataIndex!])
    } else {
      return validations[field.suffix.dataIndex!]
    }
  } else {
    return validations[field.dataIndex]
  }
}

const getDeepValidation = (validations: any, field: FieldProps, path: string) => {
  const fieldIndex = `${path}.${field.dataIndex}`
  if (field.suffix && validations[`${path}.${field.suffix!.dataIndex!}`]) {
    if (validations[fieldIndex]) {
      return [validations[fieldIndex]].concat(validations[`${path}.${field.suffix!.dataIndex!}`])
    } else {
      return validations[`${path}.${field.suffix!.dataIndex!}`]
    }
  } else {
    return validations[fieldIndex]
  }
}

/**
 * 判断子表单的增加是否不受限制，如果子表单的当前行数超过设置的limit值，则需要隐藏添加按钮
 *
 * @param {UISchema} schema
 * @param {string} field
 * @returns {boolean}
 */
function notLimit (schema: UISchema, field: string): boolean {
  if (!schema[field]) {
    return true
  }
  const existLen = schema[field] ? (schema[field] as Schema[]).length : 0
  const curAdditional = (schema.additional as Schema[]).find(o => o.dataIndex === field)
  if (!curAdditional || !curAdditional.limit) {
    return true
  }

  return curAdditional.limit !== existLen
}

function canDelete (schema: UISchema, field: string): boolean {
  if (!schema[field]) {
    return true
  }
  const existLen = schema[field] ? (schema[field] as Schema[]).length : 0
  const curAdditional = (schema.additional as Schema[]).find(o => o.dataIndex === field)
  if (!curAdditional || !curAdditional.least) {
    return true
  }

  return curAdditional.least < existLen
}

const getColumnWidth = (els: FieldProps[], clientWidth: number): number => {
  if (!clientWidth) {
    return 0
  }
  const avgWidth = (clientWidth - FixedWidth) /  R.length(els)
  return R.max(MinColumnWidth, avgWidth)
}

export const LevelItem = (props: LevelItemProps) => {
  const { schema, path='', level=0, textPath='' } = props
  const { formData, handleValueChange, handleAddDom, handleRemoveDom, validations, domMap } = useContext(FormContext)
  const tableHeadEl = useRef<HTMLDivElement>(null)
  const tableBodyEl = useRef<HTMLDivElement>(null)
  const [clientWidth, setClientWidth] = useState<number>(0)

  const addDom = (extraField: string) => {
    const p = getPath(path, [extraField])
    const tPath = getPath(textPath, [extraField])
    handleAddDom && handleAddDom(p, tPath)
  }

  const onRemove = (idx: number, extraField: string)=> {
    const p = getPath(path, [extraField])
    handleRemoveDom && handleRemoveDom(p, idx)
  }

  const NoCustomContainer = useMemo(() => {
    return ContainWrapper(null)
  }, [])

  useEffect(() => {
    if (!tableHeadEl || !tableHeadEl.current) {
      return
    }
    const width = (tableHeadEl.current as HTMLDivElement).clientWidth
    setClientWidth(width)
  }, [tableHeadEl, domMap])

  const handleScrollChange = useCallback(
    (e: any) => {
      // @ts-ignore
      tableHeadEl.current!.scrollLeft = e.target.scrollLeft
    },
    []
  )

  useEffect(() => {
    if (tableBodyEl && tableBodyEl.current) {
      (tableBodyEl.current as HTMLDivElement).addEventListener('scroll', handleScrollChange)
    }

    return () => {
      if (tableBodyEl && tableBodyEl.current) {
        (tableBodyEl.current as HTMLDivElement).removeEventListener('scroll', handleScrollChange)
      }
    }
  }, [handleScrollChange, tableBodyEl])


  if (!schema || schema.length === 0) return null
  return <div style={{ marginLeft: `${level * 5}rem` }}>
    {
      schema instanceof Object && !R.isEmpty(schema.els) && <Wrapper len={schema.columns || 1}>
        {
          schema.els.map((field: FieldProps, index: any) => {
            field.width = field.width || 200
            if (field.hidden && field.hidden(formData)) {
              return null
            }
            else {
              return <Field key={index} label={field.label}
                  required={field.required}
                  validation={getValidation(validations, field)}
                >
                <ComponentWrap field={field} formData={formData} onValueChange={handleValueChange} path={path}>
                </ComponentWrap>
              </Field>
            }
          })
        }
      </Wrapper>
    }
    {
      schema && getExtraField(schema).length > 0 && getExtraField(schema).map((extraField)=> {
        const columnWidth = getColumnWidth(domMap[extraField].els, clientWidth)
        return schema[extraField] && <div key={extraField} style={{ position: 'relative', width: '100%' }}>
          <div style={{ overflowX: 'hidden' }} ref={tableHeadEl}>
            <Additional>
              <colgroup>
                {
                  domMap[extraField].els.map((_: any, i: number) => <col width={`${columnWidth}px`} key={i}></col>)
                }
                <col width={`${FixedWidth}px`}></col>
              </colgroup>
              <thead>
                {
                  <tr>
                    {
                      domMap[extraField].els.map((field: FieldProps, i: number) =>
                        <Th key={i} width={columnWidth}>
                          <span>
                            { field.required ? <span style={{ color: 'red' }}>*</span> : null } {field.label}
                          </span>
                        </Th>)
                    }
                    <Th width={FixedWidth}>操作</Th>
                  </tr>
                }
              </thead>
            </Additional>
          </div>
          <Content ref={tableBodyEl}>
            <table>
              <colgroup>
                {
                  domMap[extraField].els.map((_: any, i: number) => <col width={`${columnWidth}px`} key={i}></col>)
                }
                <col width={`${FixedWidth}px`} key="operation"></col>
              </colgroup>
              <tbody>
                {
                  schema[extraField] && (schema[extraField] as UISchema[]).map((row, idx: number) => {
                    return <tr key={idx}>
                      {
                        row.els && row.els.map((field: FieldProps, index: number) => {
                          const Container = NoCustomContainer
                          return <Td key={`${idx}-${index}`} width={columnWidth}>
                            <Field label='' required={field.required}
                              validation={getDeepValidation(validations, field, `${extraField}.${idx}`)}
                            >
                              <Container {...field} formData={formData} onValueChange={handleValueChange}
                                path={path === '' ? `${extraField}.${idx}` :  `${path}.${extraField}.${idx}` }
                              />
                            </Field>
                          </Td>
                        })
                      }
                      <Delete>
                        <DeleteBtn onClick={() => onRemove(idx, extraField)} disabled={!canDelete(schema, extraField)} >
                          删除
                        </DeleteBtn>
                      </Delete>
                    </tr>
                  })
                }
              </tbody>
            </table>
          </Content>
          {
            columnWidth <= MinColumnWidth && <FixedTable
              data={schema[extraField] as UISchema[]}
              onRemove={(idx: number) => onRemove(idx, extraField)}
              disabled={!canDelete(schema, extraField)}
            />
          }
          {
            notLimit(schema, extraField) && <Operation>
              <AddButton onClick={() => addDom(extraField)}>
                <Add style={{ marginRight: '5px'}}  />
                添加
              </AddButton>
            </Operation>
          }
        </div>
      })
    }
  </div>
}

interface LevelItemProps {
  schema: UISchema
  path?: string
  textPath?: string
  level?: number
}