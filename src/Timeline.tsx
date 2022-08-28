import React from "react";
import styled from "styled-components";

const ContentWrapper = styled.div<{ color: string }>`
      position: relative;
      max-width: 85.714em;
      margin: 0 auto;
      >div::before{
      background-color: ${props => props.color || 'white'};
      }
      >div:last-child::before{
          background-color: transparent;
  } 
`
const Content = styled.div<{ position: string }>`
      text-align: ${props => props.position};
      padding: 1.071em;
      p{
      margin: 0;
      }
`

interface containerProps {
    positions: {
        wrapperPosition: string,
        dotPosition: string,
        dotColor: string,
        linePosition: string
    }
}

const Container = styled.div<containerProps>`
      left: ${props => props.positions.wrapperPosition};
      padding: 0 5px;
      position: relative;
      background-color: inherit;
      width: 50%;
      &::after{
          box-sizing: border-box;
          content: '';
          position: absolute;
          width: 0.714em;
          height: 0.714em;
          right: ${props => props.positions.dotPosition};
          background-color: white;
          border: 2px solid ${props => props.positions.dotColor};
          top: 1.286em;
          border-radius: 50%;
          z-index: 1;
      }
      &::before{
          content: '';
          position: absolute;
          width: 2px;
          top: 1.286em;
          bottom: -1.286em;
          right:${props => props.positions.linePosition};
      }
`

interface TimelineItemProps {
    className?: string,
    color?: string,
    dotColor?: React.ReactNode;
    position?: 'left'|'right';
    style?: React.CSSProperties;
    label?: React.ReactNode;
    children?: React.ReactNode
}

const TimelineWrapper = (props: TimelineItemProps) => {
    const childrenWithProps = React.Children.map(props.children, child => {
        // checking isValidElement is the safe way and avoids a typescript error too
        const {position} = props;
        if (React.isValidElement(child)) {
            return React.cloneElement(child, {mode: position});
        }
        return child;
    });

    return (
        <ContentWrapper color={props.color} {...props}>
            {childrenWithProps}
        </ContentWrapper>
    )
}
const Timeline = (props: TimelineProps) => {
    const {mode, style, dotColor, className, children} = props

    const positions = {
        wrapperPosition: mode === 'right' ? '50%' : '0',
        linePosition: mode === 'right' ? '100%' : '0',
        dotPosition: mode === 'right' ? 'calc(100% - 4px)' : '-4px',
        contentPosition: mode === "right" ? 'start' : 'end',
        dotColor: dotColor ? dotColor : 'black',
    }


    return (
        <Container positions={positions} style={style} className={className}>
            <Content position={positions.contentPosition}>
                {children}
            </Content>
        </Container>

    )
}

interface TimelineProps {
    className?: string;
    style?: React.CSSProperties;
    dotColor?: string,
    mode?: 'left' | 'right';
    children?: React.ReactNode
}

export {TimelineWrapper}
export default Timeline