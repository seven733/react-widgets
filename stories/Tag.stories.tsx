import React from 'react'
import { Tag } from '../src'
import Book from '../src/Page'

export const Basic = () => {
  return <Book>
    <div style={{ background: 'white', height: '500px', padding: '30px' }}>
      <Tag>default</Tag>
      <Tag type="warning">warning</Tag>
      <Tag type="success">success</Tag>
      <Tag type="info">info</Tag>
      <Tag type="danger">danger</Tag>

      <br />
      <Tag effect="plain">default</Tag>
      <Tag type="warning" effect="plain">warning</Tag>
      <Tag type="success" effect="plain">success</Tag>
      <Tag type="info" effect="plain">info</Tag>
      <Tag type="danger" effect="plain">danger</Tag>
    </div>
  </Book>
}

export const Closeable = () => {
  return <Book>
    <div style={{ background: 'white', height: '500px', padding: '30px' }}>
      <Tag effect="plain" closeable>default</Tag>
      <Tag type="warning" effect="plain" closeable>warning</Tag>
      <Tag type="success" effect="plain" closeable>success</Tag>
      <Tag type="info" effect="plain" closeable>info</Tag>
      <Tag type="danger" effect="plain" closeable>danger</Tag>
    </div>
  </Book>
}


export default { title: 'Tag', component:  Tag }