import React from 'react'
import styled from 'styled-components'
import { Image } from '../src'
import { ReactComponent as EmptyImage } from '../src/assets/emptyImage.svg'

const Wrapper = styled.div`
  background: snow;
  padding: 1em;
  height: 100vh;
`

const EmptyIcon = styled(EmptyImage)`
  width: 100%;
  height: 100%;
`


export const Demo = () => (
  <Wrapper>
    <Image
      data-testid="demo"
      src="https://static-wecare-test.medtreehealth.com/pharmaceutical/clinical/mt/ae44b93d167472f1600ddf87439ad839.tencent.mm.jpg?Expires=1612598877&OSSAccessKeyId=LTAI4FhJdwE6URE1TGvnLqqF&Signature=28lkKZrDqodRQXf8QDmBkc0Phzw%3D&x-oss-process=image%2Fauto-orient%2C1"
    />
  </Wrapper>
)

const ErrorImage = () => {
  return <EmptyIcon />
}

export const HasError = () => {
  return <Wrapper>
    <label>默认错误展示内容</label>
    <Image
      src="error"
    />
    <label>自定义错误展示内容</label>
    <Image
      src="error"
      failedPlaceholder={ErrorImage}
    />
  </Wrapper>
}

// export const LoadingDemo = () => {
//   return <Wrapper>
//     <Image
//       src="https://static-wecare-test.medtreehealth.com/followup/following/1/e3c7be8731b14ead59fdba053892fb8f.jpg?Expires=1609226511&OSSAccessKeyId=LTAI4FhJdwE6URE1TGvnLqqF&Signature=6jyzf4xVsqVQ7%2Fmow80FNroZ2Oc%3D&x-oss-process=image%2Fauto-orient%2C1"
//     />
//   </Wrapper>
// }

export default {
  title: 'Image',
  component: Image,
}
