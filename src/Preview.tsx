import React, { forwardRef, HtmlHTMLAttributes, MutableRefObject, useEffect, useRef } from 'react'
import styled from 'styled-components'
import Viewer from 'viewerjs'
// @ts-ignore
import * as viewerCSS from 'viewerjs/dist/viewer.css'

const Wrapper = styled.div`
  display: none;
`

const Container = styled.div`
  ${viewerCSS}
`

const Preview = forwardRef((props: PreviewProps, propsRef: MutableRefObject<Viewer>) => {
  const { images, visible = true, index, onClose, ...others } = props
  const ref = useRef<HTMLDivElement>()
  const container = useRef<HTMLDivElement & { viewer: Viewer }>()

  useEffect(() => {
    if (ref.current) {
      const viewer = new Viewer(ref.current!, { container: container.current, hide: onClose })
      container.current.viewer = viewer
      if (propsRef) propsRef.current = viewer
    }
    return () => container.current && container.current.viewer?.destroy()
  }, [])

  useEffect(() => {
    if (container.current) {
      visible ? container.current.viewer.show() : container.current.viewer.hide()
    }
  }, [visible])

  useEffect(() => {
    if (container.current && index !== undefined) container.current.viewer.view(index)
  }, [index])

  return (
    <>
      <Container ref={container} {...others}>
      </Container>
      <Wrapper ref={ref} >
        {images.map((url, i) => <img key={url + i} src={url} />)}
      </Wrapper>
    </>
  )
})

export default Preview

interface PreviewProps extends HtmlHTMLAttributes<HTMLDivElement> {
  visible?: boolean
  images: string[]
  index?: number // 外部控制的index
  onClose?: () => void
}