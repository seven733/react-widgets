import React, { useState, useEffect } from 'react'
import styled from "styled-components";
import { Select, Option } from './index'

const Ul = styled.ul`
   text-align: center;
    margin-top: 1em;
    box-sizing: border-box;
    padding: 0;
    list-style: none;
`
const Li = styled.li`
    display: inline-block;
    min-width: 2.4em;
    height: 2.4em;
    margin-right: 8px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
    line-height: 2.4em;
    text-align: center;
    vertical-align: middle;
    list-style: none;
    background-color: #fff;
    border: 1px solid #d9d9d9;
    border-radius: 2px;
    outline: 0;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    transition:all .3s;
    &.active,:hover{
        color: #12CD9F;
        border-color: #12CD9F;
    } 

`
const LiText = styled.li`
  display: inline-block;
    height: 2.4em;
    margin-right: 8px;
    :first-child{
       margin-left: 8px; 
    }
    line-height: 2.4em;
    vertical-align: middle;
`
const LiSwitch = styled.li`
    display: inline-block;
    min-width: 2.4em;
    height: 2.4em;
    background-color: #fff;
    border: 1px solid #d9d9d9;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
    line-height: 2.4em;
    text-align: center;
    vertical-align: middle;
    list-style: none;
    border-radius: 2px;
    cursor: pointer;
    transition: all 0.3s;
    margin-right: 8px;
    &.active,:hover{
        color: #12CD9F;
        border-color: #12CD9F;
    } 
    &.noMore{
      cursor: not-allowed;
      color: #d9d9d9;
      border-color: #d9d9d9;
    }
    
`

const QuickJumper = styled.div`
    display: inline-block;
    height: 2.4em;
    line-height: 2.4em;
    vertical-align: top;
    margin:0 8px;
`
const Input = styled.input`
    position: relative;
    display: inline-block;
    min-width: 0;
    padding: 4px 11px;
    color: rgba(0,0,0,.85);
    line-height: 1.5715;
    background-color: #fff;
    background-image: none;
    border: 1px solid #d9d9d9;
    border-radius: 2px;
    -webkit-transition: all .3s;
    transition: all .3s;
    width: 3em;
    margin: 0 8px;
`
const LiJumpPage = styled.li`
    display: inline-block;
    width: 2.4em;
    height: 2.4em;
    color: rgba(0,0,0,.85);
    font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;
    line-height: 2.4em;
    text-align: center;
    vertical-align: middle;
    list-style: none;
    cursor: pointer;
    -webkit-transition: all .2s;
    transition: all .2s;
    margin-right: 8px;
    overflow:hidden;
    border: none;
    >span{
    display:block;
    margin-top:-2.4em;
    }
    :hover{
    padding-top: 2.4em;
    }
`
const FormWrapper = styled(Li)`
   display: inline-flex;
   background: #fff;
   border: none;
`

interface PaginationProps {
    style?: React.CSSProperties;
    className?: string;
    onShowSizeChange?: (current: number, size: number) => void; //pageSize ???????????????
    current?: number,
    defaultCurrent?: number,
    defaultPageSize?: number,
    pageSize?: number, // ????????????????????? ????????? 10 20 50 100
    pageSizeOptions?: number[], // ?????????????????????????????????
    showSizeChanger?: boolean, //???????????? pageSize ??????????????? total ?????? 50 ???????????? true
    showQuickJumper?: boolean,
    showTotal?: (total: number) => string,
    onChange?: (page: number, pageSize?: number) => void; //??????????????????????????????????????????????????????????????????
    total: number,
    groupCount?: number //?????????????????????n???????????????????????????????????? ??????????????? ??????=5
    showAllPages?: boolean // ?????????????????????,????????????10???????????????
    optionsPosition?: 'top' | 'bottom' // select??????????????????????????????select???????????????????????????
}

const defaultOptions: PageOptionItem[] = [
    { label: '10???/???', value: 10 },
    { label: '20???/???', value: 20 },
    { label: '50???/???', value: 50 },
    { label: '100???/???', value: 100 },
]

interface PageOptionItem {
    label: string
    value: number
}

const Pagination = (props: PaginationProps) => {
    const [currentPage, setCurrentPage] = useState(props.current || 1)
    const {
        showAllPages, pageSizeOptions = [], showSizeChanger, defaultPageSize,
        groupCount = 10, onChange, total, showTotal, showQuickJumper, onShowSizeChange,
        className, style, pageSize, optionsPosition = 'bottom'
    } = props;
    const [ options, setOptions ] = useState<PageOptionItem[]>(defaultOptions)
    const pageCount = pageSize ? Math.ceil(total / pageSize) : Math.ceil(total / 10)

    useEffect(() => {
        if (pageSizeOptions.length === 0) {
            setOptions(defaultOptions)
        } else {
            const newOptions = pageSizeOptions.map(size => ({
                label: `${size}???/???`, value: size
            }))
            setOptions(newOptions)
        }
    }, [pageSizeOptions])

    const addToPages = (i: number, pages: JSX.Element[]) => pages.push(
        <Li className={currentPage === i && "active"}
            key={i}
            onClick={() => i !== currentPage && pageClick(i)}>{i}</Li>)

    const createPage = () => {
        let pages = []
        //?????????
        pages.push(<LiSwitch className={currentPage === 1 && "noMore"} onClick={() => {
            prePageHandler()
        }} key={0}>
            &lt;</LiSwitch>)
        if (showAllPages || pageCount <= 10) {
            // ??????????????????
            for (let i = 1; i <= pageCount; i++) {
                addToPages(i, pages)
            }
        } else {
            /*???????????????10??????????????????*/
            //?????????
            addToPages(1, pages)
            //???????????????(??????????????????????????????????????????????????????)
            if (currentPage >= groupCount) {
                pages.push(<LiJumpPage className="" key={-1}
                                       onClick={() => jumpPage(currentPage - groupCount)}><span>&lt;&lt;</span>??????</LiJumpPage>)
            }
            //?????????????????????????????????
            if (groupCount < 4 && currentPage < 3 || currentPage < groupCount - 1) {
                // ???groupCount???
                for (let i = 2; i <= groupCount; i++) {
                    addToPages(i, pages)
                }
            } else if (currentPage < pageCount - 3) {
                // ????????????
                for (let i = currentPage - Math.floor(groupCount / 2); i < currentPage + Math.floor(groupCount / 2) + 1; i++) {
                    addToPages(i, pages)
                }
            } else {
                for (let i = pageCount - groupCount + 1; i < pageCount; i++) {
                    addToPages(i, pages)
                }
            }
            //???????????????
            if (currentPage + Math.floor(groupCount / 2) < pageCount - 1) {
                pages.push(<LiJumpPage className="" key={-2}
                                       onClick={() => jumpPage(currentPage + groupCount)}><span>&gt;&gt;</span>??????</LiJumpPage>)
            }
            //????????????
            addToPages(pageCount, pages)
        }
        //?????????
        pages.push(<LiSwitch className={(currentPage === pageCount || !pageCount) && "noMore"}
                           onClick={() => nextPageHandler()}

                           key={pageCount + 1}>&gt;</LiSwitch>)
        return pages;
    }
    const pageClick = (current: number) => {
        setCurrentPage(current)
        onChange && onChange(current)
    }
    const jumpPage = (pageNumber: number) => {
        setCurrentPage(
            pageNumber < pageCount ?
                pageNumber < 1 ?
                    1 :
                    pageNumber :
                pageCount
        )
    }
    //???????????????
    const prePageHandler = () => {
        if (currentPage === 1) return false
        pageClick(currentPage - 1)
    }
    //???????????????
    const nextPageHandler = () => {
        if (currentPage === pageCount || !pageCount) return false
        pageClick(currentPage + 1)
    }
    const handleKeyDown: React.KeyboardEventHandler = (event) => {
        if (event.key === 'Enter') {
            // @ts-ignore
            const value = parseInt(event.currentTarget.value)
            if (value > 0 && value <= pageCount) {
                pageClick(value)
            }
            // @ts-ignore
            event.currentTarget.value = ''
        }
    }
    const handlePageSizeChange = (page: number) => {
        const largePageCount = Math.ceil(total/page)
        if (currentPage > largePageCount) {
            setCurrentPage(largePageCount)
            onShowSizeChange(largePageCount, page)
        } else {
            onShowSizeChange(currentPage, page)
        }
    }

    return (
        <Ul className={className} style={style}>
            {showTotal && <LiText>{showTotal(total)}</LiText>}
            {createPage().map(page => page)}
            {(showSizeChanger || pageCount >= 50) &&
            <FormWrapper>
                <Select
                    style={{ width: 100, textAlign: 'center' }}
                    defaultValue={pageSize || defaultPageSize}
                    optionsPosition={optionsPosition}
                    onChange={(data: any) => handlePageSizeChange(data.value)}
                >
                {
                    options.map(item => {
                        return <Option value={item.value} key={item.label} label={item.label} />
                    })
                }
                </Select>
            </FormWrapper>
            }
            {showQuickJumper &&
            <QuickJumper>??????<Input type={'number'} onKeyDown={handleKeyDown}/> ???</QuickJumper>}
        </Ul>
    )
}
export default Pagination

