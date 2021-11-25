import { boolean, withKnobs, text } from '@storybook/addon-knobs'
import React, { useState } from 'react'
import { Modal } from '../src'

export const ContentModal = () => (
  <Modal visible={boolean('show up', true)} closable={boolean('closable', false)}>
    Content
  </Modal>
)

export const NoFooter = () => (
  <Modal visible={boolean('show up', true)} closable={boolean('closable', false)} hasFooter={false}>
    Content
  </Modal>
)

export const ConfirmableModal = () => (
  <Modal visible={boolean('show up', true)} onConfirm={() => { }}
    okText={text('ok text', '确定')} cancelText={text('cancel text', '取消')}>
    Content
  </Modal>
)


const Form = ({ onChange, init }: { init: string, onChange: (val: string) => void }) => {
  const [val, setVal] = useState<string>(init)
  const handleChange = (v: string) => {
    setVal(v)
    onChange(v)
  }
  return <input value={val} onChange={e => handleChange(e.currentTarget.value)} />
}

function sleep(time: number) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

const Control = () => {
  const [show, setShow] = useState<boolean>(false)
  const [showSecond, setShowSecond] = useState<boolean>(false)
  const [msg, setMsg] = useState<string>('default message')
  const [submitting, setSubmitting] = useState<boolean>(false)

  const handleClick = () => {
    setShow(true)
  }

  const handleChange = (val: string) => {
    setMsg(val)
  }

  const handleConfirm = async () => {
    setSubmitting(true)
    try {
      await sleep(3000)
    } catch (err) {
      // handle error
    } finally {
      setSubmitting(false)
      setShowSecond(false)
    }
  }

  return <div>
    <h1>{msg}</h1>
    <button onClick={handleClick}>show Modal</button>
    <button onClick={() => setShowSecond(true)}>show second</button>
    <Modal visible={show} closable onClose={() => setShow(false)} key={1}>
      <Form onChange={handleChange} init={msg} />
    </Modal>

    <Modal
      key={2}
      visible={showSecond}
      submitting={submitting}
      closable
      onClose={() => setShowSecond(false)}
      onConfirm={handleConfirm}
      onCancel={() => setShowSecond(false)}
    >
      second
    </Modal>
  </div>
}

export const ControlDemo = () => <Control />

export default { title: 'Modal', decorators: [withKnobs], component: Modal }