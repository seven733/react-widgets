import React, { useState } from 'react'
import { Modal } from '../src'
import { ModalProps } from '../src/Modal'

export const ContentModal = (args: ModalProps) => (
  <Modal {...args} >
    Content
  </Modal>
)

export const NoFooter = (args: ModalProps) => (
  <Modal {...args} hasFooter={false}>
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

export default {
  title: 'Modal',
  component: Modal,
  argTypes: {
    onClose: { action: true },
    onConfirm: { action: true },
    onCancel: { action: true },
  },
  args: {
    visible: false,
    closable: true,
    padding: '24px',
    okText: 'confirm ',
    cancelText: 'cancel',
    submitting: false,
    hasFooter: true,
  }
}