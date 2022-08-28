import React, { useState, useRef, useEffect, useCallback, useImperativeHandle, useContext, useMemo } from 'react'
import anime from 'animejs'

import { ANIME } from '../utils/config'
import imgError from '../assets/img_error.png'
import { E_LOADING, E_TOOLBAR, Context } from './config'
import { PreviewContentCSS, PreviewFooterContentCSS, PreviewTitleCSS, PreviewWrapperImageCSS, config } from './style'
import {
  getImageSize,
  getImageCenterOffset,
  getImageStyle,
  addEventListener,
  throttle,
  withClick,
  debounce,
  getScaleInfo,
  getImageScale,
  getZoomInfo
} from './util'
import useTouch from './useTouch'



export const ImageName: React.FunctionComponent<{ title: string }> = (props) => (
  <PreviewFooterContentCSS>
    <PreviewTitleCSS>{props.title}</PreviewTitleCSS>
  </PreviewFooterContentCSS>
)

export const Image: React.ForwardRefExoticComponent<
  Preview.IImageProps & React.RefAttributes<HTMLImageElement>
> = React.forwardRef(
  (props, ref) => {
    const { src, imageInfo, onLoadImage } = props
    const [status, setStatus] = useState<E_LOADING>(E_LOADING.PENDING)
    const [style, setStyle] = useState<React.CSSProperties>({})
  
    const onLoad: React.ReactEventHandler<HTMLImageElement> = (e) => {
      setStatus(prev => prev === E_LOADING.PENDING ? E_LOADING.RESOLVED : prev)

      const { naturalWidth, naturalHeight } = (e.target || {}) as HTMLImageElement
      onLoadImage && onLoadImage(naturalWidth, naturalHeight)
    }

    useEffect(() => { setStatus(E_LOADING.PENDING) }, [src])
    useEffect(() => { imageInfo && setStyle(getImageStyle(imageInfo)) }, [imageInfo])
  
    return (
      <img
        ref={ref}
        style={style}
        onLoad={onLoad}
        onError={() => setStatus(E_LOADING.REJECTED)}
        src={status === E_LOADING.REJECTED ? imgError : src}
      />
    )
  }
)

export const CarouselImage: React.FunctionComponent<Preview.ICarouselImageProps> = (props) => {
  const wrapperRef = useRef(null)
  const [isNext, setIsNext] = useState(false)
  const [imageInfo, setImageInfo] = useState<Preview.IImageInfo>(initImageInfo)
  const { children, getImageInfo } = props
  const { target, current, images, setDoing } = useContext(Context)

  const Child = useMemo(
    () => {
      const c = children as React.ReactElement

      if (!c) { return null }

      return React.cloneElement(c, {
        onLoadImage: (nw: number, nh: number) => { c.props.onLoadImage(nw, nh); setTimeout(initStyle) }
      })
    },
    [children]
  )

  const animation = (params: anime.AnimeParams) => {
    const wrapper = wrapperRef.current
    if (!wrapper) { return null }

    return anime({ targets: wrapper, ...params })
  }

  const initStyle = () => {
    const ani = animation({ translateX: `-${config.carouselItemWidth}%` })
    ani && ani.seek(ani.duration)
  }

  const onLoadImage = (nw: number, nh: number) => setImageInfo(getImageInfo(initImageInfo(), nw, nh))

  useEffect(
    () => {
      if (target === current) { return }

      const isNext = target > current
      const offsetX = isNext ? config.carouselItemWidth * 2 : 0
      setIsNext(isNext)

      animation({
        translateX: `-${offsetX}%`,
        easing: ANIME.spring.noWobble,
        complete: () => setDoing(false)
      })
    },
    [target, current]
  )

  const targetSrc = images[target]

  return (
    <PreviewWrapperImageCSS ref={wrapperRef}>
      <div>{!isNext && (
        <Image src={targetSrc} imageInfo={imageInfo} onLoadImage={onLoadImage} />
      )}</div>
      <div>{Child}</div>
      <div>{isNext && (
        <Image src={targetSrc} imageInfo={imageInfo} onLoadImage={onLoadImage} />
      )}</div>
    </PreviewWrapperImageCSS>
  )
}

const PreviewImageView: React.ForwardRefExoticComponent<
  Preview.IPreviewImageViewProps & React.RefAttributes<any>
> = React.forwardRef(
  (props, ref) => {  
    const wrapperRef = useRef(null)
    const imageRef = useRef(null)
    const { images, current, handleByToolbar } = useContext(Context)
    const [imageInfo, setImageInfo] = useState<Preview.IImageInfo>(initImageInfo)
    const {  onClose, offsetY, minScale, maxScale, zoomRatio, carouselAble, style } = props

    useImperativeHandle(ref, () => ({ setImageInfo }))

    const getImageInfo = (prev: Preview.IImageInfo, nw: number, nh: number) => {
      const wrapper = wrapperRef.current
      if (!wrapper || !nw || !nh) { return }
  
      const { width, height, naturalWidth, naturalHeight, pWidth, pHeight } = getImageSize(wrapper, nw, nh, 0, offsetY)
      let state = { ...prev, width, height, minScale, maxScale, zoomRatio, naturalWidth, naturalHeight, pWidth, pHeight }
      state = getZoomInfo(-1, { ...state, ...getImageCenterOffset(state) })
      return { ...state, initScale: getImageScale(state) }
    }
  
    const onLoadImage = (nw: number, nh: number) => setImageInfo(
      { ...getImageInfo(initImageInfo(), nw, nh), isTransition: !carouselAble }
    )
  
    const onWheel = useCallback(
      throttle(
        (e: WheelEvent) => {    
          const delta = e.deltaY
          ? (e.deltaY > 0 ? -1 : 1)
          : e.detail ? (e.detail > 0 ? -1 : 1)
          : 1

          handleByToolbar(delta < 0 ? E_TOOLBAR.SMALL : E_TOOLBAR.LARGE, e)
        },
        50
      ),
      []
    )
  
    const onToggle = useCallback(
      withClick(() => setImageInfo(
        prev => getScaleInfo(getImageScale(prev) === prev.initScale ? 1 : prev.initScale, prev))
      ),
      []
    )
  
    const onKeydown = (e: KeyboardEvent) => {
      switch (e.keyCode || e.which || e.charCode) {
        case 37: // ArrowLeft
          return handleByToolbar(E_TOOLBAR.PREV)
        case 39: // ArrowRight
          return handleByToolbar(E_TOOLBAR.NEXT)
        case 38: // ArrowUp
          return handleByToolbar(E_TOOLBAR.LARGE)
        case 40: // ArrowDown
          return handleByToolbar(E_TOOLBAR.SMALL)
      }
    }

    const onResize = useCallback(
      debounce(() => { onLoadImage(imageInfo.naturalWidth, imageInfo.naturalHeight) }, 50),
      [imageInfo]
    )

    const isTouch = useTouch(wrapperRef, setImageInfo)
  
    useEffect(
      () => {
        const wrapper = wrapperRef.current
        const image = imageRef.current

        if (!wrapper || !image || isTouch) { return }

        // onWheel
        const wheelCancel = addEventListener(wrapper, 'wheel', e => (e.preventDefault(), onWheel(e as WheelEvent)))
        // toggle
        const toggleCancel = addEventListener(image, 'click', e => (e.stopPropagation(), onToggle()))
        // keydown
        const keydownCancel = addEventListener(document, 'keydown', onKeydown)
        // resize
        const resizeCancel = addEventListener(window, 'resize', onResize)
        // onClose
        const closeCancel = onClose ? addEventListener(wrapper, 'click', onClose) : null
  
        return () => {
          wheelCancel()
          toggleCancel()
          keydownCancel()
          resizeCancel()
          closeCancel && closeCancel()
        }
      },
      [imageInfo, imageRef.current]
    )
  
    return (
      <PreviewContentCSS ref={wrapperRef} style={style}>
        {
          !carouselAble
          ? (<Image ref={imageRef} src={images[current]} imageInfo={imageInfo} onLoadImage={onLoadImage} />)
          : (
            <CarouselImage getImageInfo={getImageInfo}>
              <Image ref={imageRef} src={images[current]} imageInfo={imageInfo} onLoadImage={onLoadImage} />
            </CarouselImage>
          )
        }
      </PreviewContentCSS>
    )
  }
)

export default PreviewImageView

const initImageInfo = (): Preview.IImageInfo => ({
  width: 1,
  height: 1,
  pWidth: 1,
  pHeight: 1,
  naturalWidth: 1,
  naturalHeight: 1,
  rotate: 0,
  offsetX: 0,
  offsetY: 0,
  turnX: 0,
  turnY: 0,
  zoomRatio: 0.1,
  minScale: 0.01,
  maxScale: 100,
  initScale: 1,
  isTransition: false
})
