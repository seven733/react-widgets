import React, { useRef } from 'react'
import styled from 'styled-components'
import { ImagePicker } from '../src'
import { ReactComponent as View } from '../src/assets/eye.svg'
import { ImagePickerProps } from '../src/ImagePicker'

const Wrapper = styled.div`
  background: #fff;
  padding: 1em;
  height: 100vh;
`

const AddIcon = styled(View)`
  fill: #000;
  display: block;
  width: 1.714em;
  height: 1.714em;
  justify-self: center;
  margin-bottom: 1em;
`

export const Demo = (args: ImagePickerProps) => {
  return <ImagePicker {...args} />
}

const Cover = () => {
  return <div style={{ display: 'grid', pointerEvents: 'none' }}>
    <AddIcon />
    <div>
      自定义
    </div>
  </div>
}

export const CustomCover = () => (
  <Wrapper>
    <label>长300px, 高150px</label>
    <ImagePicker
      onChange={data => console.log('data', data)}
      cover={Cover}
      style={{ width: '300px', height: '150px' }}
    />
    <label>长200px, 高200px, 单选</label>
    <ImagePicker
      onChange={data => console.log('data', data)}
      style={{ width: '200px', height: '200px' }}
      cover={Cover} />
    <label>长200px, 高200px, 多选</label>
    <ImagePicker
      onChange={data => console.log('data', data)}
      cover={Cover}
      multiple
      style={{ width: '200px', height: '200px' }}
    />
  </Wrapper>
)


export const CustomStyle = () => (
  <Wrapper>
    <label>单选</label>
    <ImagePicker
      data-testid="single"
      onChange={(data: File[])=> console.log('data', data)}
      style={{ width: '200px', height: '200px' }}
      multiple={false}
    />
    <label>多选</label>
    <ImagePicker
      data-testid="multiple"
      onChange={(data: File[])=> console.log('data', data)}
      style={{ width: '300px', height: '300px' }}
      multiple
    />
  </Wrapper>
)


const TriggerClick = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  const handleClick = () => {
    if (inputRef) {
      inputRef.current.click()
    }
  }

  return <Wrapper>
    <ImagePicker
      ref={inputRef}
      onChange={(data: File[])=> console.log('data', data)}
    />
    <br />
    <br />
    <br />
    <button onClick={handleClick}>点击触发上传组件事件</button>
  </Wrapper>
}

export const TriggerEvent = () => <TriggerClick />


export default {
  title: 'ImagePicker',
  component: ImagePicker,
  argTypes: {
    onChange: { action: true, control: false },
    cover: { control: false },
  },
  args: {
    multiple: false,
    accept: 'image/*',
  }
}