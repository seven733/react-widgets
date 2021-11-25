namespace Preview {
  type TFun<T> = (...args: T[]) => void

  type TTouchEvent = { start: string, move: string, end: string }

  type TToolbar<T> = T

  interface IContext<T> {
    loop?: boolean
    images: string[]
    current: number
    target: number
    doing: boolean
    setDoing: React.Dispatch<React.SetStateAction<boolean>>
    handleByToolbar: (type: TToolbar<T>, e?: Event) => void
  }

  interface IToolbarItemProps<T> {
    toolbar: TToolbar<T>
    style?: React.CSSProperties
    isPrevNextBtn?: boolean
  }

  interface IPosition {
    offsetX: number
    offsetY: number
  }

  interface IMovePosition {
    id?: number
    x: number
    y: number
  }

  interface IMovePositions {
    [k: number | string]: IMovePosition
  }

  interface IScale {
    zoomRatio?: number // 缩放比例
    minScale?: number // 最小缩放比例
    maxScale?: number // 最大缩放比例
  }

  interface IImageInfo extends IPosition, Required<IScale> {
    width: number
    height: number
    rotate: number
    turnX: number
    turnY: number
    isTransition: boolean
    pWidth: number
    pHeight: number
    naturalWidth: number
    naturalHeight: number
    initScale: number
  }

  interface IImageProps {
    src: string
    imageInfo?: IImageInfo
    onLoadImage?: (naturalWidth: number, naturalHeight: number) => void
  }

  interface ICarouselImageProps {
    getImageInfo: (prev: IImageInfo, nw: number, nh: number) => IImageInfo
  }

  interface IPreviewImageViewProps extends IScale {
    offsetY: number
    carouselAble?: boolean
    style?: React.CSSProperties
    onClose?: () => void // 关闭回调
  }

  interface IPreviewProps<T> extends IScale, Pick<IContext, 'images'>, Pick<
    IPreviewImageViewProps,
    'onClose' | 'carouselAble'
  > {
    index?: number // 显示索引
    toolbars?: TToolbar<T>[] // 操作
    visible?: boolean // 是否可见
    closable?: boolean // 是否显示关闭按钮
    maskClosable?: boolean // 蒙版是否可关闭
    showPrevNextBtn?: boolean // 左右切换
    showName?: boolean // 文件名称
    showThumbnail?: boolean // 缩略图
  }

  interface IPreviewMobileProps extends IScale, Pick<IContext, 'images'>, Pick<
    IPreviewImageViewProps,
    'onClose' | 'carouselAble'
  > {
    index?: number
    visible?: boolean
    loop?: boolean
  }
}