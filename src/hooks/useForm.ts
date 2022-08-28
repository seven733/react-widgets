import { useState } from 'react'
import { validateAll, validateField } from '../utils/validation'
import * as R from 'ramda'

export default ({ fields }: UseFormProps) => {
  const initValidations = fields.reduce((a: { [key: string]: ValidationProps }, c: string) => {
    a[c] = { hasError: false, message: null }
    return a
  }, {})
  const [validations, setValidations] = useState(initValidations)

  const validate: <T>(rules: RulesMap, data: T) => Promise<void> = async (rules, data) => {
    try {
      const res = await validateAll(rules, data)
      setValidations(res.validations)
    } catch (err) {
      setValidations(err.validations)
      throw err
    }
  }

  const validateOne: <T>(field: string, rules: RulesMap, data: T) => Promise<void> = async (field, rules, data) => {
    try {
      const res = await validateField(field, rules, data)
      setValidations(R.mergeDeepRight(validations, res.validations))
    } catch (err) {
      setValidations(R.mergeDeepRight(validations, err.validations))
      throw err
    }
  }

  return { validations, validate, validateField: validateOne }
}

interface UseFormProps {
  fields: string[]
}
