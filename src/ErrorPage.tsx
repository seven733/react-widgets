import { cover } from 'polished'
import React, { HtmlHTMLAttributes } from 'react'
import styled from 'styled-components'
import { ReactComponent as Icon404 } from './assets/404.svg'
import { ReactComponent as Icon500 } from './assets/blocked.svg'
import { ReactComponent as Icon403 } from './assets/locked.svg'
import { Row, Col } from './Grid'

const Wrapper = styled.div`
  ${cover()}
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  h1 {
    font-size: 6rem;
    margin: 0;
  }
  p {
    font-size: 1.25rem;
    color: #000;
    opacity: 0.45;
    margin: 0;
    margin-bottom: 1em;
  }
  button {
    font-size: 0.875rem;
    a {
      color: currentColor;
    }
  }
`

const StyledCol = styled(Col)`
  display: flex;
  align-items: center;
`

const Icon = styled.div`
  svg {
    width: 100%;
    height: auto;
  }
`

const ErrorPage = (props: ErrorPageProps) => {
  const { type, desc, ...others } = props

  let des = '', IconComponent

  switch (type) {
    case '500': {
      des = '抱歉，服务器出错了'
      IconComponent = Icon500
      break
    }
    case '403': {
      des = '抱歉，你无权访问该页面'
      IconComponent = Icon403
      break
    }
    default: {
      des = '抱歉，你访问的页面不存在'
      IconComponent = Icon404
    }
  }

  return (
    <Wrapper {...others}>
      <Row justify='center'>
        <Col span={5}>
          <Icon><IconComponent /></Icon>
        </Col>
        <StyledCol span={3}>
          <div>
            <h1>{type}</h1>
            <p>{desc || des}</p>
            <button><a href='/'>返回首页</a></button>
          </div>
        </StyledCol>
      </Row>
    </Wrapper>
  )
}

export type ErrorPageProps = HtmlHTMLAttributes<HTMLDivElement> & {
  /** 错误类型 */
  type: '404' | '403' | '500'
  /** 描述 */
  desc?: string
}


export default ErrorPage