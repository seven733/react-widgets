import React, { useEffect, useState, useMemo, useContext, useRef } from 'react'

import { ReactComponent as CloseIcon } from '../../assets/close_no_circle.svg'
import { getCurrent } from '../util'
import PreviewImageView from '../Image'
import { E_TOOLBAR, Icons, Context } from '../config'
import { PreviewCSS, PreviewHeaderCSS, PreviewPrevNextCSS } from './style'

const PrevNextToolbar = (): React.ReactElement => {
  const { handleByToolbar, loop, target, images } = useContext(Context)

  const cfg = useMemo(
    () => {
      const cfg = [E_TOOLBAR.PREV, E_TOOLBAR.NEXT]

      if (!loop) {
        target === 0 && cfg.shift()
        target === images.length - 1 && cfg.pop()
      }

      return cfg
    },
    [loop, target, images]
  )

  return (
    <>{
      cfg.map(toolbar => (
        <PreviewPrevNextCSS
          key={toolbar}
          isPrev={toolbar === E_TOOLBAR.PREV}
          onClick={() => handleByToolbar(toolbar)}
        >
          {Icons[toolbar]}
        </PreviewPrevNextCSS>
      ))
    }</>
  )
}

const PreviewImage: React.FunctionComponent<Preview.IPreviewMobileProps> = (props) => {
  const headerRef = useRef(null)
  const { index, visible, images, onClose, loop, ...rest } = props
  const [current, setCurrent] = useState(index)
  const [target, setTarget] = useState(current)
  const [doing, setDoing] = useState(false)
  const [status, setStatus] = useState(visible)

  const context = useMemo<Preview.IContext<E_TOOLBAR>>(
    () => ({ images, current, target, doing, setDoing, loop, handleByToolbar: (type: E_TOOLBAR) => {
        switch (type) {
          case E_TOOLBAR.PREV:
          case E_TOOLBAR.NEXT:
            return onJumpImage(current + (type === E_TOOLBAR.PREV ? -1 : 1))
        }
      }
    }),
    [images, current, target, doing, loop]
  )

  const onJumpImage = (index: number) => {
    const target = getCurrent(index, images)

    if (!rest.carouselAble) {
      setCurrent(target)
    } else {
      !doing && target !== current && (setDoing(true), setTarget(target))
    }
  }

  const onClosePreview = () => onClose ? onClose() : setStatus(false)
  
  useEffect(() => { setStatus(visible) }, [visible])
  useEffect(() => { onJumpImage(index) }, [index])
  useEffect(() => { !doing && setCurrent(target) }, [doing])

  return !status ? null : (
    <PreviewCSS>
      {/* header */}
      <PreviewHeaderCSS ref={headerRef}>
        {current + 1}/{images.length}<CloseIcon onClick={onClosePreview} />
      </PreviewHeaderCSS>

      <Context.Provider value={context}>
        {/* 图片预览区域 */}
        <PreviewImageView {...rest} offsetY={0} />

        {/* 左右切换按钮 */}
        <PrevNextToolbar />
      </Context.Provider>
    </PreviewCSS>
  )
}

PreviewImage.defaultProps = {
  index: 0,
  visible: true,
  carouselAble: true,
  images: [],
  zoomRatio: 0.1,
  minScale: 0.01,
  maxScale: 100,
  loop: false
}

PreviewImage.displayName = 'PreviewImage'

export default PreviewImage