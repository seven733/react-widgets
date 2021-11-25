import React, { useRef } from 'react'
import styled, { css, ThemeProvider } from 'styled-components'
import { createDefaultStyle, Page } from '../src'
import { theme } from '../src/utils/config'

const ruleSet = css`
  button {
    color: gray;
    background: ${props => props.theme.colors.danger};
  }
`

const RedButtonStyle = createDefaultStyle`
  ${ruleSet}
`

export const CustomizedStyle = () => (
  <Page>
    <ThemeProvider theme={theme}>
      <>
        <RedButtonStyle />
        <button>背景红色字体灰色</button>
      </>
    </ThemeProvider>
  </Page>
)

const CustomButton = styled.button`
  background: #fff;
  color: currentColor;
  border: 1px solid #fff;
  :hover {
    color: ${props => props.theme.colors.primary};
  }
`

export const Buttons = () => (
  <>
    <button>默认按钮</button>
    <CustomButton>自定义样式按钮</CustomButton>
    <button disabled>禁用按钮</button>
  </>
)

export const li = () => (
  <ul>
    <li>列表描述1</li>
    <li>列表描述2</li>
  </ul>
)

const Wrapper = styled.div`
  background: #fff;
  padding: 1em;
`

export const Inputs = () => (
  <Wrapper>
    <label>
      手机号：<input type='text' placeholder='请输入文本' required />
    </label>
    <label>
      手机号：<input type='tel' placeholder='请输入手机号' />
    </label>
    <label >
      按钮：<input type='button' value='按钮' />
    </label>
    <label>
      选项框：<input type='checkbox' value='选项框' />
    </label>
    <label>
      单选框：<input type='radio' value='单选框' />
    </label>
    <label>
      颜色选择器：<input type='color' value={theme.colors.warning} />
    </label>
    <label>
      日期：
      <input type="date" id="start" name="trip-start" value="2018-07-22"
        min="2018-01-01" max="2018-12-31" onChange={() => { }} />
    </label>
    <label>
      时间选择器：
      <input type="datetime-local" id="meeting-time"
        name="meeting-time" value="2018-06-12T19:30"
        min="2018-06-07T00:00" max="2018-06-14T00:00" />
    </label>
    <label>
      邮箱：<input type="email" id="email" pattern=".+@globex.com" size={30} required />
    </label>
    <label>
      文件：<input type="file" id="avatar" name="avatar" accept="image/png, image/jpeg" />
    </label>
    <label>
      图片：<input type="image" id="image" alt="Login"
        src="https://interactive-examples.mdn.mozilla.net/media/examples/login-button.png" />
    </label>
    <label>
      年月：<input type="month" id="start" name="start" min="2018-03" value="2018-05" />
    </label>
    <label>数字：<input type="number" min="10" max="100" list='num-options' /></label>
    <datalist id='num-options'>
      <option>20</option>
      <option>30</option>
      <option>40</option>
    </datalist>
    <label>
      密码：<input type="password" id="pass" name="password" minLength={8} required />
    </label>
    <label>
      滑动选择：<input type="range" id="cowbell" name="cowbell" min="0" max="100" />
    </label>
    <label>
      搜索：<input type="search" id="site-search" name="q" aria-label="Search through site content" />
    </label>
    <input type="submit" value="Send Request" />
    <label>
      电话：<input type="tel" id="phone" name="phone" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" required />
    </label>
    <label>
      时间：<input type="time" id="appt" name="appt" min="09:00" max="18:00" required />
    </label>
    <label>
      URL：
      <input type="url" name="url" id="url" placeholder="https://example.com"
        pattern="https://.*" size={30} required />
    </label>
    <label>
      工作周：<input type="week" name="week" id="camp-week" min="2018-W18" max="2018-W26" required />
    </label>
  </Wrapper>
)

const InputValid = () => {
  const ref = useRef<HTMLInputElement>()

  const handleChange = () => {
    ref.current.reportValidity()
  }

  return (
    <label>
      手机号：<input ref={ref} type='text' placeholder='请输入文本' required onChange={handleChange} />
    </label>
  )
}

export const InputValidity = () => (
  <InputValid />
)

export function TextArea() {
  return <label>编辑文本：<textarea /></label>
}

export default { title: 'DefaultStyle' }
