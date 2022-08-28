import anime  from 'animejs'
import {ellipsis, lighten} from 'polished'
import React, { HtmlHTMLAttributes, ReactNode, useEffect, useRef, useState } from 'react'
import styled, { css } from 'styled-components'
import { animated, useSpring } from 'react-spring'
import {ANIME} from "./utils/config"
import {shadow} from "./utils/createDefaultStyle"

const color = lighten(0.2, '#000')

// TODO: fixed Icon和Label对齐的问题
const StyledLabel = styled.label<{ active?: boolean, underline?: boolean }>`
  height: 4rem;
  display: inline-flex;
  color: ${props => props.active ? props.theme.colors.primary : color};
  flex-direction: column;
  justify-content: center;
  align-items: center;
  ${props => props.underline && css`
    font-weight: ${props.active ? 500 : 400};
  `}
  svg {
    width: 2.1rem;
    ${({ theme, active }) => active && css`
      fill: ${theme.colors.primary};
    `}
  }
`

const Tab = (props: TabProps) => {
  const { className, active, icon, activeIcon = icon, onClick, underline, label } = props

  return (
    <StyledLabel className={className} underline={underline} active={active}
      onClick={onClick} >
      {active ? activeIcon : icon}
      <span>{label}</span>
    </StyledLabel>
  )
}

const TabsWrap = styled.div`
  position: relative;
  overflow: hidden;
`

const StyledTabs = styled.div`
  position: relative;
  display: flex;
  justify-content: space-around;
  align-items: center;
`

const BottomLine = styled.div`
  bottom: 1px;
  position: absolute;
  height: 2px;
  background: ${props => props.theme.colors.primary};
  //box-shadow: ${shadow};
`

const Translator = styled(animated.div)`
  position: relative;
`

const Children = (props: { children?: ReactNode, left: boolean, style?: object }) => {
  const { left, children } = props
  const ref = useRef(null)
  const animation = useSpring({
    from: { left: left ? -window.innerWidth : window.innerWidth },
    to: { left: 0 }
  })

  return (
    <Translator ref={ref} style={animation}>{children}</Translator>
  )
}

const StyledTags = styled.div`
  width: 100%;
  white-space: nowrap;
  overflow-x: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`

const Tag = styled.div<TagProps & { children: string }>`
  display: inline-block;
  width: 10.5rem;
  height: 3.3rem;
  line-height: calc(3.3rem - 4px);
  background: ${props => props.theme.colors.background};
  color: ${lighten(0.4, '#000')};
  border-radius: 10px;
  text-align: center;
  border: 2px solid ${props => props.theme.colors.background};
  cursor: pointer;

  ${props => props.active && css`
    background: transparent;
    color: ${props.theme.colors.primary};
    border: 2px solid ${props.theme.colors.primary};
  `}
  ${props => props.children.length > 6 && css`
    text-align: left;
    padding: 0 0.2em;
    ${ellipsis()}
  `}

  border:2px solid transparent;
  ${props => props.active && `border: 2px solid ${props.theme.colors.primary};`}
  :active {
    color: ${props => props.theme.colors.primary};
  }
`

const StyledTag = styled(Tag) <{ active: boolean, disabled: boolean }>`
  border-radius: 3.3rem;
  margin-right: 1.5rem;
  color: ${lighten(0.6, '#000')};
  border: 1px solid ${lighten(0.8, '#000')};
  width: auto;
  font-size: 1.4rem;
  padding: 0 1.2em;
  ${props => props.active && css`
    background: ${props.theme.colors.primary};
    color: #fff;
    border: none;
  `}
  ${props => props.disabled && css`
    background: #EEEEEE;
    color: #ccc;
    border: none;
  `}
`

export const TagTabs = (props: TagTabsProps) => {
  const { className, tabs, children, onChange } = props
  const ref = useRef<HTMLDivElement>(null)

  const initIndex = tabs.findIndex(tab => tab.active)
  const [index, setIndex] = useState(initIndex > -1 ? initIndex : 0)
  const [fromLeft, setFromLeft] = useState(true)
  // const [childrenTop, setChildrenTop] = useState(0)

  useEffect(() => {
    // setChildrenTop(ref.current?.clientHeight)
    const activeIndex = tabs.findIndex(tab => tab.active)
    setIndex(activeIndex > -1 ? activeIndex : 0)
  }, [tabs])

  const handleClick = (i: number) => {
    if (i === index) return

    // 判断tanslate方向
    i < index ? setFromLeft(true) : setFromLeft(false)
    setIndex(i)
    onChange && onChange(i)
  }

  return (
    <>
      <StyledTags ref={ref} className={className}>
        {tabs.map((item, i) => (
          <StyledTag key={i.toString()} active={index === i} disabled={item.disabled === true}
            onClick={() => !item.disabled && handleClick(i)}>
            {item.label}
          </StyledTag>
        ))}
      </StyledTags>
      {children && (
        <Children key={index} left={fromLeft} children={children} />
      )}
    </>
  )
}

const BottomTabs = styled(StyledTabs)`
  position: fixed;
  width: 100%;
  bottom: 0;
  background: #fff;
  height: 5rem;
  font-size: 1.2rem;
  border-top: 1px solid #EEEEEE;
  padding-top: 0.5rem;
  svg {
    font-size: 2.2rem;
  }
`

/**
 * tab的active属性无效，通过activeTab设置活跃tab
 * */
export const BottomTabBar = (props: BottomTabBarProps) => {
  const { className, activeTab, tabs, onChange } = props
  const [index, setIndex] = useState(0)

  // 刷新页面，tab高亮需根据location的值变化
  useEffect(() => {
    setIndex(activeTab)
  }, [activeTab])

  const handleClick = (i: number) => {
    if (i === index) return
    setIndex(i)
    onChange(i, tabs[i].path)
  }

  return (
    <BottomTabs className={className}>
      {tabs.map((item, i) => (
        <Tab
          key={i}
          label={item.label}
          icon={item.icon}
          activeIcon={item.activeIcon}
          path={item.path}
          active={i === index}
          onClick={() => handleClick(i)} />
      ))}
    </BottomTabs>
  )
}

/**
 * <h4>Tabs组件分三种：普通Tabs、BottomTabBar、TagTabs</h4>
 * 普通Tabs：tab位于顶部 <br>
 * BottomTabBar：页面底部菜单 <br>
 * TagTabs：类似于Button Group的效果展示
 * */
export const Tabs = ({
  className,
  activeTab=0,
  underline=false,
  tabs,
  children,
  onChange
}: TabsProps) => {
  const ref = useRef<HTMLDivElement>(null)

  const [index, setIndex] = useState(activeTab)
  const [fromLeft, setFromLeft] = useState(true) // 判断切换方向，用于可用于children组件动画
  const [tabsHeight, setTabsHeight] = useState(0)

  useEffect(() => {
    setTabsHeight(ref.current?.clientHeight)
  }, [])

  // 刷新页面，tab高亮需根据location的值变化
  useEffect(() => {
    setIndex(activeTab)
  }, [activeTab])

  useEffect(() => {
    // 过滤掉index与activeTab一致的change
    if (index === activeTab) return

    tabs.length > index && onChange(index)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, tabs.length])

  useEffect(() => {
    // 交互动画
    const tab = ref.current?.querySelectorAll('label')[index]
    const target = ref.current?.querySelector('div:last-of-type')
    const translateX = tab?.offsetLeft || 0
    const width = tab?.clientWidth || 0
    anime({
      targets: target,
      easing: ANIME.spring.noWobble,
      left: translateX,
      width,
      // scaleX: [0.3, 0.7],
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, tabs.length])

  const handleClick = (i: number) => {
    if (i === index) return

    // 判断translate方向
    i < index ? setFromLeft(true) : setFromLeft(false)
    setIndex(i)
  }

  /**
   * 页面内容展示即Children组件 是absolute定位，使用时注意父元素的定位属性。父元素推荐使用Page组件。
   * */

  return (
    <TabsWrap>
      <StyledTabs ref={ref} className={className}>
        {tabs.map((item, i) => (
          <Tab key={i} label={item.label} active={i === index} underline={underline}
            onClick={() => handleClick(i)} />
        ))}
        {underline && <BottomLine />}
      </StyledTabs>
      {children && (
        <Children key={index} left={fromLeft} children={children} style={{ top: tabsHeight }} />
      )}
    </TabsWrap>
  )
}

export interface TabProps extends HtmlHTMLAttributes<HTMLLabelElement> {
  activeIcon?: ReactNode
  icon?: ReactNode
  label: string
  active?: boolean
  path?: string
  underline?: boolean // 是否显示底部指示条
  disabled?: boolean
}

export interface TabsProps {
  /**
   * data
   * */
  tabs: TabProps[]
  /**
   * 默认的tab index
   * */
  activeTab?: number
  className?: string
  /**
   * 是否为tab加下划线
   * */
  underline?: boolean
  children?: ReactNode
  /**
   * 选中tab的回调
   * */
  onChange(index: number, path?: string): void
}

interface TagTabsProps extends Omit<HtmlHTMLAttributes<HTMLDivElement>, 'onChange'> {
  tabs: TabProps[]
  className?: string
  children?: ReactNode
  activeTab?: number
  onChange?: (index: number) => void
}

interface BottomTabBarProps {
  tabs: TabProps[]
  activeTab: number
  className?: string
  onChange(index: number, path?: string): void
}

interface TagProps extends HtmlHTMLAttributes<HTMLDivElement> {
  active?: boolean
  borderSize?: number
}