import React, { useState, useRef, useEffect, useMemo } from 'react'

import { ReactComponent as CloseIcon } from '../assets/close_no_circle.svg'
import { E_TOOLBAR, Context } from './config'
import Thumbnail from './Thumbnail'
import Toolbar, { PrevNextToolbar } from './Toolbar'
import PreviewImageView, { ImageName } from './Image'
import { getZoomInfo, getImageCenterOffset, fullscreen, getImageNameFromURL, getCurrent } from './util'
import { PreviewCSS, PreviewCloseCSS, PreviewFooterCSS, config } from './style'

const PreviewImage: React.FunctionComponent<Preview.IPreviewProps<E_TOOLBAR>> = (props) => {
  const {
    images, index, visible, toolbars, onClose, closable, maskClosable, showPrevNextBtn, showName, showThumbnail, ...rest
  } = props
  const [current, setCurrent] = useState(index || 0)
  const [target, setTarget] = useState(current)
  const [doing, setDoing] = useState(false)
  const [status, setStatus] = useState(visible ?? true)

  const title = useMemo(() => getImageNameFromURL(images[current]), [images, current])
  const offsetY = useMemo(
    () => {
      let y = 0

      const { toolHeight, imgHeight, smallGap } = config
      showName && title && (y += toolHeight + smallGap * 2)
      toolbars?.length && (y += toolHeight + smallGap * 2)
      showThumbnail && (y += imgHeight + smallGap * 2)

      return y
    },
    [showName, toolbars, showThumbnail, title]
  )
  const context = useMemo<Preview.IContext<E_TOOLBAR>>(
    () => ({
      images,
      current,
      target,
      doing,
      setDoing,
      handleByToolbar: (type: E_TOOLBAR, e?: Event) => {
        switch (type) {
          case E_TOOLBAR.PREV:
          case E_TOOLBAR.NEXT:
            return onJumpImage(current + (type === E_TOOLBAR.PREV ? -1 : 1))
          case E_TOOLBAR.FULL_SCREEN:
            return fullscreen.isFull() ? fullscreen.exit() : fullscreen.request()
          case E_TOOLBAR.SMALL:
          case E_TOOLBAR.LARGE:
            return imageViewRef.current?.setImageInfo(
              prev => ({ ...getZoomInfo((type === E_TOOLBAR.SMALL ? -1 : 1), prev, e), isTransition: true })
            )
          case E_TOOLBAR.TURN_X:
          case E_TOOLBAR.TURN_Y:
            return imageViewRef.current?.setImageInfo(prev => {
              const state = { ...prev, [type]: prev[type] ? 0 : -1 }
              return { ...state, ...getImageCenterOffset(state), isTransition: true }
            })
          case E_TOOLBAR.ROTATE_LEFT:
          case E_TOOLBAR.ROTATE_RIGHT:
            return imageViewRef.current?.setImageInfo(prev => {
              const state = { ...prev, rotate: prev.rotate + (type === E_TOOLBAR.ROTATE_LEFT ? -90 : 90) }
              return { ...state, ...getImageCenterOffset(state), isTransition: true }
            })
        }
      }
    }),
    [images, current, target, doing]
  )

  const imageViewRef = useRef<{ setImageInfo: React.Dispatch<React.SetStateAction<Preview.IImageInfo>> }>(null)

  const onJumpImage = (index: number) => {
    const target = getCurrent(index, images)

    if (!rest.carouselAble) {
      setCurrent(target)
    } else {
      !doing && target !== current && (setDoing(true), setTarget(target))
    }
  }

  const onClosePreview = () => {
    setStatus(false)
    onClose && onClose()
    fullscreen.isFull() && fullscreen.exit()
  }

  useEffect(() => { setStatus(visible) }, [visible])
  useEffect(() => { onJumpImage(index) }, [index])
  useEffect(() => { !doing && setCurrent(target) }, [doing])

  return !status ? null : (
    <PreviewCSS>
      {/* 关闭按钮 */}
      {
        !closable ? null : (<PreviewCloseCSS onClick={onClosePreview}><CloseIcon /></PreviewCloseCSS>)
      }
      <Context.Provider value={context}>
        {/* content */}
        <PreviewImageView
          ref={imageViewRef}
          {...rest}
          offsetY={offsetY}
          onClose={maskClosable ? onClosePreview : undefined}
        />
        {/* 左右切换 */}
        {
          !showPrevNextBtn ? null : (<PrevNextToolbar />)
        }
        {/* footer */}
        {
          !((showName && title) || showThumbnail || toolbars?.length) ? null : (
            <PreviewFooterCSS>
              {/* 名称 */}
              {!(showName && title) ? null : (<ImageName title={title} />)}
              {/* toolbar */}
              {!toolbars?.length ? null : (<Toolbar toolbars={toolbars} />)}
              {/* 缩略图 */}
              {!showThumbnail ? null : (<Thumbnail onClickImage={onJumpImage} />)}
            </PreviewFooterCSS>
          )
        }
      </Context.Provider>
    </PreviewCSS>
  )
}

PreviewImage.defaultProps = {
  index: 0,
  visible: true,
  toolbars: [],
  closable: true,
  maskClosable: false,
  showPrevNextBtn: true,
  showName: true,
  showThumbnail: true,
  zoomRatio: 0.1,
  minScale: 0.01,
  maxScale: 100,
  carouselAble: false
}

PreviewImage.displayName = 'PreviewImage'

export default PreviewImage

export { E_TOOLBAR }
