import * as R from 'ramda'
const isArray = (arr: any) => arr instanceof Array

export function isActive <T>(value: T, defaultValue: T | T [] | undefined): boolean {
  if (R.isNil(defaultValue)) {
    return false
  }

  if (isArray(defaultValue)) {
    // @ts-ignore
    return R.contains(value, defaultValue)
  } else {
    return R.equals(value, defaultValue)
  }
}
