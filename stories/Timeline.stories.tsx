import React from "react";
import Timeline, {TimelineWrapper} from "../src/Timeline";

export default {title: 'Timeline', component: Timeline}

export const TimelineSample = () => {
    return (
        <>
            <TimelineWrapper color={'grey'} position={'left'} dotColor={'green'}>
                <Timeline>1234</Timeline>
                <Timeline>5678</Timeline>
                <Timeline>
                    <p>Solve initial network problems 1</p>
                    <p>Solve initial network problems 2</p>
                    <p>Solve initial network problems 3 </p>
                    <p>2015-09-01</p>
                </Timeline>
                <Timeline>hi</Timeline>
                <Timeline>
                    <p>Solve initial network problems 1</p>
                    <p>Solve initial network problems 2</p>
                    <p>Solve initial network problems 3 </p>
                    <p>2015-09-01</p>
                </Timeline>
            </TimelineWrapper>
            <hr/>
            <TimelineWrapper color={'grey'} position={'right'}>
                <Timeline>1234</Timeline>
                <Timeline>5678</Timeline>
                <Timeline>
                    <p>Solve initial network problems 1</p>
                    <p>Solve initial network problems 2</p>
                    <p>Solve initial network problems 3 </p>
                    <p>2015-09-01</p>
                </Timeline>
                <Timeline>hi</Timeline>
                <Timeline>
                    <p>Solve initial network problems 1</p>
                    <p>Solve initial network problems 2</p>
                    <p>Solve initial network problems 3 </p>
                    <p>2015-09-01</p>
                </Timeline>
            </TimelineWrapper>
            <hr/>
            <TimelineWrapper color={'red'}>
                <Timeline>1234</Timeline>
                <Timeline dotColor={'red'}>5678</Timeline>
                <Timeline >
                    <p>Solve initial network problems 1</p>
                    <p>Solve initial network problems 2</p>
                    <p>Solve initial network problems 3 </p>
                    <p>2015-09-01</p>
                </Timeline>
                <Timeline>hi</Timeline>
                <Timeline dotColor={'green'}>
                    <p>Solve initial network problems 1</p>
                    <p>Solve initial network problems 2</p>
                    <p>Solve initial network problems 3 </p>
                    <p>2015-09-01</p>
                </Timeline>
            </TimelineWrapper>

        </>
    )
}
