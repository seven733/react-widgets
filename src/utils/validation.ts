import * as R from 'ramda'

const getInitValidation = (): ValidationProps => ({
  hasError: false,
  message: null
})
const getInit = (str: string) => R.init(R.split('.', str))

// 验证规则， 将field对应的值和整个formData传入规则中方便使用
const execute: <T>(validators:Function[], fieldValue: any, formData: T, curRowData: any) => Promise<any[]>
  = (validators, fieldValue, formData, curRowData) => {
    let p = Promise.resolve([fieldValue, formData, curRowData])
    if (validators) {
      validators.forEach((v: any) => p = p.then(v))
    }
    return p
}

 // 验证字段是否满足规则
const validateFieldWithError:
  <T>(field: keyof T, formData: T, rules: Function[], validations: ValidationMap) => Promise<void>
  = (field, formData, rules, validations): Promise<void> => {
    const val = R.path(R.split('.', (field as string)))(formData)
    const curRow = R.path(getInit(field as string), formData)

    let p = execute(rules, val, formData, curRow).then(() => {
      validations[field as string] = getInitValidation()
    }).catch((e: Error) => {
      validations[field as string] = {
        hasError: true,
        message: e.message
      }
      throw e
    })
  return p
}

/**
 * 遍历所有的需要验证的表单的规则
 *
 * @param {*} rules
 * @param {*} formData
 * @returns
 */
export const validateAll: <T>(rules: RulesMap, formData: T) => Promise<{ validations: ValidationMap }> = (rules, formData) => {
  let promises = []
  let validations: ValidationMap = {}
  for(const field in rules) {
    validations[field] = getInitValidation()
    // @ts-ignore
    const p = validateFieldWithError(field, formData, rules[field], validations)
    promises.push(p)
  }

  return Promise
    .all(promises)
    .then(() => ({validations}))
    .catch(() => {
      throw { validations }
    })
}

export const validateField: <T>(field: string, rules: RulesMap, formData: T) =>
  Promise< { validations: ValidationMap }> = (field, rules, formData) => {

  let validations: ValidationMap = {}
  // @ts-ignore
  return validateFieldWithError(field, formData, rules[field], validations)
    .then(() => ({validations}))
    .catch(() => {
      throw { validations }
    })
}
