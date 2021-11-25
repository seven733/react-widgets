import React from 'react'
import styled from 'styled-components'
import { Button } from '../src'
import { Meta, Story } from '@storybook/react/types-6-0'

const Page = styled.div`
  padding: 2rem;
  background: white;
  >button {
    margin: 1rem;
  }
`

export default {
  title: 'Button',
  component: Button,
} as Meta

export const Doc: Story<{}> = () => {
  return <Page>
    <Button>Primary</Button>
    <Button types='danger'>PrimaryDanger</Button>
    <Button types='default'>PrimaryDefault</Button>
    <Button disabled>PrimaryDisabled</Button>
    <br />
    <Button types='ghost'>GhostPrimary</Button>
    <Button types='ghostDanger'>GhostDanger</Button>
    <Button types='ghostDefault'>GhostDefault</Button>
    <Button types='ghost' disabled>GhostPrimaryDisabled</Button>
    <br />
    <Button types='ghost' dashed>GhostDashedPrimary</Button>
    <Button types='ghostDanger' dashed>GhostDashedDanger</Button>
    <Button types='ghostDefault' dashed>GhostDashedDefault</Button>
    <br />
    <Button types='ghost' noBorder>noBorderGhostPrimary</Button>
    <Button types='ghostDanger' noBorder>noBorderGhostDanger</Button>
    <Button types='ghostDefault' noBorder>noBorderGhostDefault</Button>
    <br />
    <Button semicircle>PrimarySemicircle</Button>
    <Button height='3rem'>PrimaryHeight</Button>
    <Button height='3rem' semicircle>PrimaryHeightSemicircle</Button>
    <br />
    <div style={{ width: '90vw', height: '4rem', border: '1px solid red', padding: '.7rem' }}>
      <Button height='2.6rem' semicircle block >适应父元素宽度的半圆形可调节高度按钮</Button>
    </div>
  </Page>
}
