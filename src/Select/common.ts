import * as R from 'ramda'
const isArray = (arr: any) => arr instanceof Array

export function isActive <T>(value: T, defaultValue: T | T [] | undefined): boolean {
  if (R.isNil(defaultValue)) {
    return false
  }

  if (isArray(defaultValue)) {
    return R.includes(value, defaultValue as T[])
  } else {
    return R.equals(value, defaultValue)
  }
}