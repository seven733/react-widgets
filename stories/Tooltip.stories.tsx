import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import { Tooltip } from '../src'

const Base = styled.div `
  height: 30px;
  text-align: center;
`

const Container = styled.div`
  height: 100px;
  text-align: center;
  overflow-y: scroll;
  position: relative;
`

const Item = styled.div`
  display: inline-block;
  min-width: 50px;
  height: 30px;
  line-height: 30px;
  margin-left: 15px;
  text-align: center;
  background-color: #eee;

  &:first-child {
    margin-left: 0
  }
`

const CustomTooltip = styled(Tooltip)`
  .tooltip-content {
    box-shadow: 0 1px 5px #aaa;
    background-color: #999;
  }
  .tooltip-arrow {
    border-top-color: #aaa;
  }
`

const Button = styled.button`
  border-radius: 5px;
  min-width: 50px;
  height: 30px;
  line-height: 30px;
  margin-left: 15px;
  text-align: center;
`

const Title = styled.div`
  width: 200px;
  text-align: right;
`
const Input = styled.input`
  border: 1px solid #eee;
  width: 100%;
  border-radius: 5px;
  font-size: 12px;
  line-height: 1.5px;
  margin-bottom: 10px;
  text-align: left;
`
const CustomTooltip1 = styled(Tooltip)`
  .tooltip-content {
    background-color: #fff;
    border: 1px solid #eee;
    box-shadow: 0 1px 5px rgba(0,0,0,.2);
  }
  .tooltip-arrow {
    border-top-color: rgba(0,0,0,.2);
  }
`

export const Example = () => {
  const testRef = useRef(null)
  const [title, setTitle] = useState('动态title')
  const [visible, setVisible] = useState(false)
  const [inputVal, setInputVal] = useState('')

  return (
    <>
      <h1>基础案例</h1>
      <Base>
        <Tooltip title="默认">
          <Item>上</Item>
        </Tooltip>
        <Tooltip title="右" placement="right">
          <Item>右</Item>
        </Tooltip>
        <Tooltip title="click" placement="bottom" trigger="click">
          <Item onClick={() => console.log('click')}>下</Item>
        </Tooltip>
        <Tooltip title={<div>左</div>} placement="left">
          <Item>左</Item>
        </Tooltip>
      </Base>

      <h1>指定容器</h1>
      <Container ref={testRef}>
        <div style={{ height: 100 }}></div>
        <Tooltip getContainer={() => testRef.current} title="指定容器" placement="bottom">
          <Item>下</Item>
        </Tooltip>
        <Tooltip getContainer={() => testRef.current} title="取消自动调整位置" placement="top" trigger="click" autoAdjustOverflow={false}>
          <Item>上</Item>
        </Tooltip>
        <div style={{ height: 100 }}></div>
      </Container>

      <h1>动态title</h1>
      <Base>
        <Tooltip title={title} trigger="click">
          <Item>上</Item>
        </Tooltip>
        <Button onClick={() => setTitle('动态title！！！！！')}>改变title</Button>
      </Base>

      <h1>手动控制</h1>
      <Base>
        <Tooltip title="手动控制" trigger="click" visible={visible} onVisibleChange={visible => setVisible(visible)}>
          <Item>上</Item>
        </Tooltip>
      </Base>

      <h1>自定义样式</h1>
      <Base>
        <CustomTooltip title="自定义样式" trigger="click">
          <Item>上</Item>
        </CustomTooltip>
      </Base>

      <h1>复杂title</h1>
      <Base>
        <CustomTooltip1
          title={(
            <Title>
              <Input value={inputVal} onChange={e => setInputVal(e.target.value)} />
              <Button onClick={() => console.log(inputVal)}>确认</Button>
            </Title>
          )}
          trigger="click"
          placement="top"
        >
          <Item>上</Item>
        </CustomTooltip1>
      </Base>
    </>
  )
}

export default {
  title: 'Tooltip',
  component: Tooltip,
  argTypes: {
    title: {
      description: '提示信息'
    },
    placement: {
      description: '方向'
    },
    trigger: {
      description: '触发方式'
    },
    getContainer: {
      description: '指定容器'
    },
    visible: {
      description: '手动控制显示隐藏'
    },
    onVisibleChange: {
      description: 'visible change事件'
    },
    autoAdjustOverflow: {
      description: '自动适应方向'
    }
  }
}
