import React, { useState, HTMLAttributes, forwardRef, ChangeEventHandler, useImperativeHandle, useRef, useEffect, MouseEvent } from 'react'
import * as R from 'ramda'
import styled from 'styled-components'
import { ReactComponent as Delete } from './assets/delete.svg'
import { ReactComponent as DeleteImg } from './assets/close_circel_active.svg'
import { ReactComponent as View } from './assets/eye.svg'
import Preview from './Preview'
import ImagePicker from './ImagePicker'
import Image from './Image'

const Content = styled.div<{ columnWidth: string }>`
  display: grid;
  grid-gap: 1.714em 1.714em;
  grid-template-columns: repeat(auto-fill, ${props => props.columnWidth});
`

const IconGroup = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
`

const ViewIcon = styled(View)`
  fill: ${ ({ theme }) => theme.colors.white};
  height: 1em;
  width: 1em;
  margin-right: 1em;
`
const DeleteIcon = styled(Delete)`
  fill: ${ ({ theme }) => theme.colors.white};
  height: 1em;
  width: 1em;
`
const DeleteButton = styled(DeleteImg)`
  fill: rgba(0,0,0,0.4);
  height: 1.3em;
  width: 1.3em;
  position: absolute;
  top: 2px;
  right: 2px;
  z-index: 10;
`

const UploadContent = styled.span`
  position: relative;
  overflow: hidden;
  width: 7.5em;
  height: 7.5em;
  input {
    cursor: pointer;
    position: absolute;
    color: transparent;
    height: 100%;
    left: 0;
    right: 0;
    top: 0;
    opacity: 0;
    z-index: 0;
  }
`

const Thumbnail = styled.div`
  position: relative;
  width: 7.5em;
  height: 7.5em;
  cursor: pointer;
  overflow: hidden;
`

const ImgHover = styled.div`
  position: absolute;
  top: 8px;
  left: 8px;
  bottom: 8px;
  right: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.colors.strong};
  z-index: 100;
  opacity: 0;
  &:hover {
    opacity: 0.6;
  }
`

interface UploadProps extends Omit<HTMLAttributes<HTMLImageElement>, 'onChange' | 'onError' | 'accept'> {
  onChange: (fileList: string[], newFileList: File[]) => void;
  /**
  * 是否多选，默认false
  */
  multiple?: boolean
  /**
  * 上传地址，针对以后台的上传服务
  */
  action?: string
  /**
  * 自定义上传方法， 将提供选择的图片，需要返回一个图片上传后的信息
  */
  uploadFunction?: (fileList: File[]) => Promise<string[]>
  /**
  * 是否可预览，默认true
  */
  preview?: boolean
  /**
  * 图片预览前缀，针对以后台的上传服务
  */
  previewUrl?: (code: string) => string
  /**
  * 自定义上传组件封面
  */
  cover?: () => React.ReactNode
  onError?: (err: Error) => void
  /**
  * 初始值
  */
  values?: string[]
  /**
  * 是否显示删除按钮，默认false
  */
  showDelete?: boolean
  /**
  * 对文件进行预校验，返回false则终止上传，返回true则继续上传功能。
  */
  onBeforeUpload?: (files: File[]) => boolean
  accept?: string
  /**
   * 限制多图上传的最大图片数
   */
  limit?: number
}

const upload = async (fileList: File[], url: string): Promise<string[]> => {
  let res: string[] = []
  try {
    const urls = await Promise.all(
      fileList.map(f => {
        const formData = new FormData()
        formData.append('file', f)
        return fetch(url, {
          method: 'POST',
          body: formData,
          headers: {
            'X-Requested-With': 'XMLHttpRequest'
          },
        }).then(async (res) => res.json())
      }),
    )
    res = R.pluck('data', urls)
  } catch (error) {
    throw error
  }
  return res
}

const Upload = (props: UploadProps, ref: any) => {
  const {
    onChange, multiple = false, action, uploadFunction, values, accept="image/*", limit,
    preview = true, cover, onError, previewUrl, showDelete, onBeforeUpload, ...others } = props
  const [images, setImages] = useState<string[]>([])
  // const [fileList, setFileList] = useState<File[]>([])
  const [showPreview, setShowPreview] = useState<boolean>(false)
  const [activeIndex, setActiveIndex] = useState<number>(0)

  useEffect(() => {
    !R.isNil(values) && R.type(values) === 'Array' && setImages(values)
  }, [values])

  const handleImageChange = async (files: File[]) => {
    if(onBeforeUpload && !onBeforeUpload(files)) return

    const newArrFiles: File[] = Array.prototype.slice.call(files, 0)

    if (action || uploadFunction) {
      try {
        const urls = uploadFunction ? await uploadFunction(newArrFiles) : await upload(newArrFiles, action)
        setImages(multiple ? [...images, ...urls] : urls)
        onChange(multiple ? [...images, ...urls] : urls, newArrFiles)
      } catch (err) {
        onError && onError(err)
      }
    } else {
      const newImages = newArrFiles.map(item => URL.createObjectURL(item))
      const newImagesData = multiple ? [...images, ...newImages] : newImages
      setImages(newImagesData)
      onChange(newImagesData, newArrFiles)
    }
  }

  const handleDelete = (index: number) => {
    const newImages: string[] = R.clone(images)
    newImages.splice(index, 1)
    setImages(newImages)
    onChange(newImages, [])
  }

  const handleSingleDelete = (e: MouseEvent<HTMLOrSVGElement>) => {
    e.preventDefault()
    setImages([])
    onChange([], [])
  }

  const handleImageClick = (index: number) => {
    setActiveIndex(index)
    setShowPreview(true)
  }

  const handleSingleImagePickerChange: ChangeEventHandler<HTMLInputElement> = async (e) => {
    const { target: { files } } = e
    const newArrFiles = Array.prototype.slice.call(files, 0)

    handleImageChange(newArrFiles)
  }

  const inputRef = useRef<HTMLInputElement>(null)
  useImperativeHandle(ref, () => ({
    click: () => {
      if (inputRef) {
        inputRef.current.click()
      }
    },
  }))

  return (
    <Content columnWidth={!R.isNil(others) && !R.isNil(others.style) && others.style.width ? (others.style.width as string) : '7.5em'}>
      {
        preview && multiple && (previewUrl ? images.map(o => previewUrl(o)) : images).map((src, index) => {
          return <Thumbnail key={index} {...others}>
            <Image src={src} key={index} {...others} />
            {showDelete && <DeleteButton onClick={() => handleDelete(index)} />}
            {
              !showDelete && <ImgHover>
                <IconGroup>
                  <ViewIcon onClick={() => handleImageClick(index)} />
                  <DeleteIcon onClick={() => handleDelete(index)} />
                </IconGroup>
              </ImgHover>
            }
          </Thumbnail>
        })
      }
      {
        /* 单选，需要预览， 并且有图片数据时， 展示当前图片，并且可点击图片进行再次选择 */
        preview && !multiple && !R.isEmpty(images)
          &&
          <UploadContent {...others}>
            <Image src={previewUrl ? previewUrl(images[0]) : images[0]} alt="..." />
            {showDelete && <DeleteButton onMouseDown={handleSingleDelete} />}
            <input
              ref={inputRef}
              type="file"
              accept={accept}
              multiple={false}
              onChange={handleSingleImagePickerChange}
            />
        </UploadContent>

      }
      {
        /* 当是单选或者并且已有图片数据或者多图超过最大限制时， 不展示 */
        !((!multiple && !R.isEmpty(images) && preview) || (multiple && limit && images.length >= limit)) && <ImagePicker
          ref={inputRef}
          onChange={handleImageChange}
          accept={accept}
          cover={cover}
          multiple={multiple}
          { ...others }
        />
      }
      {
        showPreview && <Preview
          images={ previewUrl ? images.map(o => previewUrl(o)) : images}
          visible={showPreview}
          index={activeIndex}
          onClose={() => setActiveIndex(-0)}
        />
      }
    </Content>
  )
}

export default forwardRef(Upload)
