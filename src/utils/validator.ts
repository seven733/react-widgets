import * as R from 'ramda'
const regTest = (reg: any) => (str: string) => reg.test(str)

export const assert = (fn: Function, msg: Function | string) => ([val, obj, curRowData]: any[]) => {
  // 空字段不需要验证
  if (R.isNil(val) || val === '') {
    return [val, obj, curRowData]
  }
  if (fn(val)) {
    return [val, obj, curRowData]
  } else {
    throw new Error(typeof msg ==='function' ? msg(val, obj, curRowData) : msg)
  }
}

export const assertObj = (fn: Function, msg: string | Function) => ([val, obj, curRowData]: any[]) => {
  if (fn(val, obj, curRowData)) {
    return [val, obj, curRowData]
  } else {
    throw new Error(typeof msg ==='function' ? msg(val, obj, curRowData) : msg)
  }
}

export const required = (msg='必填项') => ([val, obj, curRowData]: any[]) => {
  if (!R.isNil(val) && val !== '' && !R.isEmpty(val)) {
    return [val, obj, curRowData]
  } else {
    throw new Error(msg)
  }
}

export const test = (reg: any, msg: Function | string) => assert(regTest(reg), msg)
// 是否是电话号码
export const isTelephone = (msg: Function | string = '不是电话号码') =>
  test(/^((1\d{10})|(([0-9]{3,4}-)?[0-9]{7,8}))$/, msg)
// 是否是纯数字
export const isInteger = (msg: Function | string = '必须是数字') => test(/^\d+$/, msg)
// 不允许包含中文
export const noChinese = (msg: Function | string = '不允许包含中文') => test(/^[\x01-\x7f]*$/, msg)
// 不允许包含空格
export const noSpace = (msg: Function | string = '不允许包含空格') => test(/^[\S]*$/,msg)
// 最大长度
export const maxLength = (len: number, msg: Function | string = `最大长度为${len}`) =>
  assert((val: any) => val.length <= len, msg)
// 最小长度
export const minLength = (len: number, msg: Function | string = `最小长度为${len}`) =>
  assert((val: any) => val.length >= len, msg)
// 是否介于两者之间
export const between = (min: number, max: number, msg: Function | string = `between__${min}__${max}`) =>
  assert((val: any) => val >= min && val <= max, msg)
// 最小值
export const min = (min: number, msg: Function | string = `最小值为${min}`) => assert((val: any) => val >= min, msg)
// 最大值
export const max = (max: number, msg: Function | string = ` 最大值为${max}`) => assert((val: any) => val <= max, msg)