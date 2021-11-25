import { useEffect } from 'react'

export default (ref: any, handler: Function) => {
  useEffect(
    () => {
      const listener = (e: any) => {
        if (!ref.current || ref.current.contains(e.target)) {
          return
        }
        handler(e)
      }

      document.addEventListener('mousedown', listener)
      return () => {
        document.removeEventListener('mousedown', listener)
      }
    },
    [ref, handler]
  )
}