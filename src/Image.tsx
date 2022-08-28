import React, { HTMLAttributes, useState } from 'react'
import * as R from 'ramda'
import styled from 'styled-components'
import ErrorPng from './assets/img_error.png'
// import LoadingImg from './assets/img_loading.png'

const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 7.5em;
  height: 7.5em;
  padding: 0.57em;
  cursor: pointer;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background-color: ${props => props.theme.colors.white};
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: 50% 50%;
  }
`

const Error = styled.div`
  width: 100%;
  height: 100%;
`

const Image = (props: ImageProps) => {
  const { src, alt, failedPlaceholder, ...others } = props
  const [ hasError, setHasError ] = useState<boolean>(false)

  const handleOnload = () => {
    if (R.includes('blob', src)) {
      URL.revokeObjectURL(src)
    }
  }

  return <Container {...others }>
    {
      hasError && <Error>
        {
        failedPlaceholder ? failedPlaceholder() : <img src={ErrorPng} alt="..." />
        }
      </Error>
    }
    {
      !hasError && <img
        src={src}
        alt={ alt && alt !== '' ? alt : '图片加载中' }
        onError={() => setHasError(true)}
        onLoad={handleOnload}
      />
    }
  </Container>
}

interface ImageProps extends Omit<HTMLAttributes<HTMLImageElement>, 'alt' | 'src'> {
  /** 图片源链接 */
  src: string
  /** 加载错误事件 */
  failedPlaceholder?: () => React.ReactNode
  /** 占位描述 */
  alt?: string
}

export default Image