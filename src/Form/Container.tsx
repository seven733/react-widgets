import React, { ChangeEventHandler, useState, useEffect, useMemo } from 'react'
import * as R from 'ramda'
import { InputNumber, Select, Option, Input, Cascader, DatePicker } from '../index'
import useDebounce from '../hooks/useDebounce'
import { getValueByPath } from './common'

// 替换路径中最后一个值 eg： ('a.b', 'c') => 'a.c'
const replacePath = (path: string, field: string): string => {
  if (R.isEmpty(path)) {
    return field
  }

  const replaceArrLast = (p: string): string => {
    const pathArr: string[] = R.split('.')(p)
    const index = R.length(pathArr) - 1
    return R.pipe(
      R.adjust<string>(index, () => field),
      R.join('.')
    )(pathArr)
  }
  return replaceArrLast(path)
}

export default (CustomComponent: React.ReactType) => (props: ContainerProps) => {
  const {
    type,
    width,
    options=[],
    dataIndex,
    formData,
    placeholder = '',
    onValueChange,
    defaultValue,
    path='',
    suffix=null,
    disabled=false
  } = props
  const curPath = path === '' ? dataIndex : `${path}.${dataIndex}`
  const [value, setValue] = useState<ValueType>(defaultValue)

  useEffect(() => {
     const newVal = getValueByPath(formData, curPath)
     setValue(newVal)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData, path])

  const debounceValue = useDebounce(value, 500)
  useEffect(() => {
    if (!R.isNil(debounceValue)) {
      onValueChange && debounceValue !== defaultValue && onValueChange(debounceValue, curPath)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceValue])

  const handleChange: ChangeEventHandler<HTMLInputElement|HTMLTextAreaElement> = e => {
    const newValue = e.currentTarget.value
    setValue(newValue)
  }

  const handleValueChange= (val: ValueType, path=curPath) => {
    setValue(val)
    onValueChange && onValueChange(val, path)
  }

  const getAddon = (suffix: AddonProps | null): string | null | React.ReactNode => {
    if (!suffix) {
      return null
    }

    if (suffix.type === 'text') {
      return suffix?.value
    }

    if (suffix.type === 'select') {
      const path = replacePath(curPath, suffix.dataIndex!)
      // @ts-ignore
      return <Select onChange={(data: any)=> handleValueChange(data.value, path)}
        defaultValue={R.path(R.split('.', path), formData) || ''} style={{ width: suffix.width ? suffix.width : '50px' }}
        bordered={false}
        >
        {
          suffix && suffix.options && suffix.options.map((item) => {
            return <Option value={item.value} key={item.value} label={item.label} />
          })
        }
      </Select>
    }

    return null
  }

  const disabledStatus = useMemo(()=> {
    return typeof disabled === 'function'
      ? disabled(R.path(R.init(R.split('.', curPath)), formData), formData)
      : disabled
  }, [disabled, formData, curPath])

  if (CustomComponent) {
    return <CustomComponent onChange={(val: any) => handleValueChange(val)} />
  }

  switch (type) {
    case 'input':
      return <Input
        value={(value as string) || ''}
        type="text"
        placeholder={placeholder}
        onChange={handleChange}
        disabled={disabledStatus}
        style={{ width: width }}
        suffix={getAddon(suffix)}
      />
    case 'number':
      return <InputNumber
        placeholder={placeholder}
        defaultValue={(value as number) || 0}
        disabled={disabledStatus}
        onChange={val => handleValueChange(val)}
        style={{ width: width ? width : '100%' }}
        suffix={suffix ? suffix.value : null}
      />
    // case 'textarea':
    //   return <TextArea value={value} onChange={handleChange} />;
    case 'select':
      return <Select
        defaultValue={value || ''}
        placeholder={placeholder}
        disabled={disabledStatus}
        onChange={(data: any)=> handleValueChange(data.value)}
        style={{ width: width }}
        suffix={suffix ? suffix.value : null}
      >
        {
          options.map((item, index)=> {
            return <Option value={item.value} key={index} label={item.label} />
          })
        }
      </Select>
    case 'cascader':
      return <Cascader
        options={options}
        placeholder={placeholder}
        defaultValue={value as string}
        onChange={(data: any)=> handleValueChange(data)}
        disabled={disabledStatus}
        style={{ width: width }}
      />
    case 'datePicker':
      return <DatePicker
        value={(value as number)}
        placeholder={placeholder}
        onChange={(data: number)=> handleValueChange(data)}
        disabled={disabledStatus}
        style={{ width: width }}
      />
    default: return null
  }
}

type ValueType = string | number | string[] | number[]