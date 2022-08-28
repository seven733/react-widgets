import styled, { css } from 'styled-components'
import * as R from 'ramda'
import { createContext } from 'react'

export const FormContext = createContext<any>(null)

export const MinColumnWidth = 150
export const FixedWidth = 80
export const ScrollWeight = 4

/**
 *  根据路径取值
 *
 * @param {*} obj
 * @param {string} paths 'a.b.6'
 * @returns
 */
export const getValueByPath = function (obj: any, paths: string) {
  const fn = function (path: string) {
    let res = obj;
    path.split('.').forEach(p => {
      res = (res || {})[p];
    });
    return res;
  };

  if (!paths || !paths.length) {
    throw new Error("paths can not be empty.")
  }

  return fn(paths);
};

/**
 * 根据路径设值
 *
 * @param {*} obj
 * @param {*} val
 * @param {string} path eg: 'a.b.6'
 * @returns {*}
 */
export const setValueByPath = function (obj: any, val: any, path: string): any {
  const paths = path.split('.')
  if (paths && paths.length > 0) {
    if (paths.length === 1) {
      obj[path] = val
    } else {
      const lastKey = paths.pop()
      const last = getValueByPath(obj, paths.join('.')) || {}
      last[lastKey!] = val
    }
  }

  return obj
}

/**
 * 获取路径，当前路径为空时直接返回后续路径，否则拼接为完整路径
 *
 * @param {string} cur 当前路径
 * @param {any[]} suffix 后续路径
 * @returns string
 */
export const getPath = (cur: string, suffix: any[]) => {
  if (R.isEmpty(cur)) {
    return suffix.join('.')
  } else {
    return [cur].concat(suffix).join('.')
  }
}

export const commonFields = ['columns', 'els', 'additional']
export const getExtraField = (schema: UISchema) => {
  return R.pipe(R.omit(commonFields), R.keys)(schema)
}

export const Th = styled.th<{ width: number }>`
  ${ props => props.width && css`
    width: ${props.width}px;
  `}

  text-align: center;
  background-color: ${props => props.theme.colors.background};
  border-right: ${ props => `1px solid ${props.theme.colors.border}` };
  color: ${ props => props.theme.colors.strong};
  height: 3.8em;
`

export const Td = styled.td<{width: number}>`
  ${ props => props.width && css`
    width: ${props.width}px;
  `}

  border-right: ${ props => `1px solid ${props.theme.colors.border}` };
  padding: 1.7em 1em 0 1em;
  padding-bottom: 0;
  height: 4.7em;
  overflow: visible;
`

export const DeleteBtn = styled.button`
  border: none;
  background: transparent;
  color: ${ props => props.theme.colors.primary };
  :hover {
    opacity: 0.8;
    border: none;
  }
  :active {
    background: transparent;
  }
  :disabled {
    border: none;
    background: transparent;
  }
`

export const Delete = styled.td`
  display: grid;
  justify-content: center;
  align-items: center;
  height: 6.4em;
`
