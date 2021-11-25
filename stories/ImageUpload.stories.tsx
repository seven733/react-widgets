import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import { ImageUpload } from '../src'
import { ReactComponent as View } from '../src/assets/eye.svg'

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

export const Simple = () => (
  <Wrapper>
    <ImageUpload onChange={data => console.log('data', data)} />
  </Wrapper>
)

const handleBeforeUpload = (files: File[]) => {
  if(files.length > 3) {
    alert('最多上传3张图片')
    return false
  }
  return true
}

export const Multiple = () => (
  <Wrapper>
    <ImageUpload onChange={data => console.log('data', data)} multiple accept="image/png" />

    <br/><br/><br/><br/>
    <h3>显示删除按钮</h3>
    <ImageUpload onChange={data => console.log('data', data)} showDelete />

    <br/><br/><br/><br/>
    <h3>显示删除按钮</h3>
    <ImageUpload onChange={data => console.log('data', data)} multiple showDelete  limit={4} />

    <br/><br/><br/><br/>
    <h3>上限为3</h3>
    <ImageUpload onChange={data => console.log('data', data)} multiple showDelete onBeforeUpload={handleBeforeUpload} />
  </Wrapper>
)

const Action = () => {
  // const [val, setVal] = useState<string>('2020-10-09/5cb51a0b-f96a-41a4-81bb-59bd92c9b84d.jpg')
  // const handleChange = (images: string[]) => {
  //   setVal(images[0])
  // }
  return <Wrapper>
    <ImageUpload
      onChange={data => console.log('data', data)}
      multiple
      action="https://wecare-medicine.medtreehealth.com/drug/product/b89f62c6fb7a588a064533d7fcc776d8.jpg?Expires=1605303426&OSSAccessKeyId=LTAI4FhJdwE6URE1TGvnLqqF&Signature=LvokRzGNIFUHmEWMRPHu0n7cDKE="
    />
    <br />
    <br />
    <br />

    {/* <ImageUpload
      onChange={handleChange}
      action="http://192.168.8.94:8090/upload/"
      previewUrl="http://192.168.8.94:8090/get/"
      values={[val]}
    /> */}
  </Wrapper>
}

export const HasAction = () => <Action />

// const SetValueDemo = () => {
//   const [url, setUrl] = useState<string>('https://static.veer.com/veer/static/resources/keyword/2020-02-19/533ed30de651499da1c463bca44b6d60.jpg')
//   return <Wrapper>
//     {/* <ImageUpload
//       onChange={(data, newData) => console.log('data', data, 'newData', newData)}
//       values={[url]}
//       multiple
//     /> */}
//     < br />
//     <ImageUpload
//       onChange={(data) => setUrl(data[0] as string)}
//       action="http://192.168.8.94:8090/upload/"
//       values={[url]}
//     />
//   </Wrapper>
// }

// export const SetValues = () => <SetValueDemo />

const token = 'U01TX0xPR0lOX2RlZmF1bHQ=.r20fqIalpM5_iHnzh0Dmu4zUWbPdYheF7J0ZXoCIFsmB8KjOAhTZQ8Rm1y7ujdf_.YWRjcg=='
const getUrl = async (code: string): Promise<string> => {
  const res = await fetch(`http://192.168.8.141:8080/media?code=${code}`, {
    method: 'get',
    headers: {
      token
    }
  })
  .then(res => res.json())
  .catch (err => console.log('err', err))
  // @ts-ignore
  return res.data
}

const uploadOne = async (file: File): Promise<string> => {
  if (typeof file === 'string') {
    return file
  }
  const postData = {
    classifier: "drug/product",
    mime: "image/jpeg",
    name: file.name
  }

  try {
    const mediaInfo = await fetch('http://192.168.8.141:8080/media', {
      method: 'POST',
      body: JSON.stringify(postData),
      headers: {
        token: token,
        'Access-Control-Allow-Origin': '*',
        'content-type': 'application/json'
      }
    })
    .then(res => res.json())
    .catch (err => console.log('err', err))

    const { url, code } = mediaInfo.data

    var httpRequest = new XMLHttpRequest()
    httpRequest.open('PUT', url, false)
    httpRequest.setRequestHeader("Content-type", file.type)
    httpRequest.send(file)
    return `http://192.168.8.141:8080/media?code=${code}&token=${token}`
  } catch (err) {
    throw err
  }
  return ''
}

const upload = async (fileList: File[]): Promise<string[]> => {
  try {
    const res = await Promise.all(fileList.map(o => uploadOne(o)))
    return res
  } catch (error) {
    throw error
  }
  return []
}

export const CustomUpload = () => (
  <Wrapper>
    <ImageUpload onChange={data => console.log('data', data)} multiple uploadFunction={upload} />
  </Wrapper>
)

export const NoPreview = () => (
  <Wrapper>
    <ImageUpload onChange={data => console.log('data', data)} preview={false} />
    <br />
    <ImageUpload onChange={data => console.log('data', data)} multiple preview={false} />
  </Wrapper>
)

const Cover = () => {
  return <div style={{ display: 'grid', pointerEvents: 'none' }}>
    <AddIcon />
    <div>
      上传图片
    </div>
  </div>
}

export const CustomCover = () => (
  <Wrapper>
    <ImageUpload onChange={data => console.log('data', data)} cover={Cover} />
    <br />
    <ImageUpload onChange={data => console.log('data', data)} cover={Cover} multiple />
  </Wrapper>
)

export const CustomStyle = () => (
  <Wrapper>
    <ImageUpload onChange={data => console.log('data', data)} style={{ width: '200px', height: '200px' }} multiple />
  </Wrapper>
)

const TriggerClick = () => {
  const multiRef = useRef<HTMLInputElement>(null)
  const singleRef = useRef<HTMLInputElement>(null)

  const handleClick = () => {
    if (multiRef) {
      multiRef.current.click()
    }
  }

  const handleClickSingle = () => {
    if (singleRef) {
      singleRef.current.click()
    }
  }

  return <Wrapper>
    <ImageUpload onChange={data => console.log('data', data)} ref={multiRef} multiple />
    <button onClick={handleClick}>点击触发多选上传组件事件</button>
    <br />
    <ImageUpload onChange={data => console.log('data', data)} ref={singleRef} />
    <button onClick={handleClickSingle}>点击触发单选上传组件事件</button>
  </Wrapper>
}


export const TriggerEvent = () => <TriggerClick />


export const HasValues = () => {
  const [url, setUrl] = useState<string[]>([])

  useEffect(() => {
    setUrl(['https://goss2.veer.com/creative/vcg/veer/612/veer-312002591.jpg'])
  }, [])


  return <Wrapper>
    <ImageUpload onChange={data => console.log('data', data)} values={url} />
    <br />
    <ImageUpload onChange={(data, newData)=> console.log('data', data, newData)} multiple values={url} />
  </Wrapper>
}

export default { title: 'ImageUpload', component: ImageUpload }
