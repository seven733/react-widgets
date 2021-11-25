import React, {useState} from 'react'
import styled from 'styled-components'
import {ReactComponent as Calender} from '../src/assets/calendar.svg'
import {Steps, Step} from '../src'

const Wrapper = styled.div`
  background: #fff;
  padding: 1em;
  height: 100vh;
`

export const Simple = () => {

    return <Wrapper>
        <Steps current={0}>
            <Step title="第一步"/>
            <Step title="第二步"/>
            <Step title="第三步"/>
        </Steps>

        <br/>
        <Steps current={2}>
            <Step title="第一步" description="This is a description. max length"/>
            <Step title="第二步" description="This is a description."/>
            <Step title="第三步" description="This is a description."/>
            <Step title="第四步" description="This is a description."/>
        </Steps>

        <br/>
        <div style={{width: '500px'}}>
            <Steps current={3}>
                <Step title="第一步"/>
                <Step title="第二步"/>
                <Step title="第三步"/>
                <Step title="第四步"/>
            </Steps>
        </div>

    </Wrapper>
}
export const Vertical = () => {
    return <Wrapper>
        <Steps current={0} vertical>
            <Step title="第一步"/>
            <Step title="第二步"/>
            <Step title="第三步"/>
        </Steps>
        <br/>
        <Steps current={2} vertical>
            <Step title="第一步" description="This is a description."/>
            <Step title="第二步" description="This is a description."/>
            <Step title="第三步" description="This is a description."/>
            <Step title="第四步" description="This is a description."/>
        </Steps>
    </Wrapper>
}
export const CustomIcon = () => {
    return (
        <Wrapper>
            <Steps current={0} vertical>
                <Step title="第一步" icon={<Calender/>}/>
                <Step title="第二步" icon={<Calender/>}/>
                <Step title="第三步" icon={<Calender/>}/>
            </Steps>
            <br/>
            <Steps current={0} >
                <Step title="第一步" icon={<Calender/>}/>
                <Step title="第二步" icon={<Calender/>}/>
                <Step title="第三步" icon={<Calender/>}/>
            </Steps>
        </Wrapper>

    )
}

const ClickStep = () => {
    const [index, setIndex] = useState<number>(0)
    const handleChange = (idx: number) => {
        setIndex(idx)
    }
    return <Steps current={index} onChange={handleChange}>
        <Step title="第一步"/>
        <Step title="第二步"/>
        <Step title="第三步"/>
        <Step title="第四步"/>
    </Steps>
}

export const CanClick = () => <ClickStep/>

export default {title: 'Steps', component: Steps}


