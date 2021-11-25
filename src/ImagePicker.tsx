import React, { ChangeEventHandler, useRef, useImperativeHandle, forwardRef, HTMLAttributes } from 'react'
import styled from  'styled-components'
import { transparentize } from 'polished'
import { ReactComponent as Add } from './assets/add.svg'

const Container = styled.span`
  position: relative;
  display: grid;
  justify-content: center;
  align-items: center;
  background: ${transparentize(0.98, '#000')};
  border: 1px dashed ${({ theme }) => theme.colors.border};
  border-radius: 2px;
  overflow: hidden;
  width: 7.5em;
  height: 7.5em;
  input {
    cursor: pointer;
    position: absolute;
    color: transparent;
    height: 100%;
    width: 100%;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    opacity: 0;
  }
`

const AddIcon = styled(Add)`
  fill: ${transparentize(0.55, '#000')};
  display: block;
  width: 1.714em;
  height: 1.714em;
  justify-self: center;
`

const Text = styled.div`
  margin-top: 1em;
  color: ${transparentize(0.55, '#000')};
`


const Picker = (props: ImagePickerProps, ref: any) => {
  const { onChange, multiple=false, cover, accept="image/*", ...others } = props
  const handleImageChange: ChangeEventHandler<HTMLInputElement> = async (e) => {
    const { target: { files } } = e
    const newArrFiles = Array.prototype.slice.call(files, 0)
    inputRef.current.value = ''

    onChange(newArrFiles)
  }

  const inputRef = useRef<HTMLInputElement>(null)
  useImperativeHandle(ref, () => ({
    click: () => {
      if (inputRef) {
        inputRef.current.click()
      }
    },
  }))

  return <Container { ...others }>
    {
      cover ? cover() : <div style={{ display: 'grid', pointerEvents: 'none' }}>
        <AddIcon />
        <Text>上传图片</Text>
      </div>
    }
    <input
      ref={inputRef}
      type="file"
      accept={accept}
      multiple={multiple}
      onChange={handleImageChange}
    />
  </Container>
}
interface ImagePickerProps extends Omit<HTMLAttributes<HTMLImageElement>, 'onChange' | 'onError'> {
  multiple?: boolean
  accept?: string
  cover?: () => React.ReactNode
  onChange: (data: File[]) => void
}

export default forwardRef(Picker)
