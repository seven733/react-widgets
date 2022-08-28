import React, {useState} from 'react'
import Pagination from '../src/Pagination'


const Controlled = () => {
    const [current, setCurrent] = useState(1)
    const total = 14
    const [pageSize, setPageSize] = useState(20)
    const onChange = (current: number) => {
        setCurrent(current)
    }
    const handlePageSizeChange = (current: number, size: number) => {
        setPageSize(size)
        console.log(current, size)
    }
    return <>
        <Pagination
            current={current}
            total={total}
            defaultCurrent={1}
            groupCount={5}
            onChange={onChange}
            showTotal={total => `共 ${total} 条`}
            showQuickJumper
            onShowSizeChange={handlePageSizeChange}
            pageSize={pageSize}
            pageSizeOptions={[5, 10, 20, 50]}
            showSizeChanger
        />
    </>
}

const NoProps = () => {
    return <Pagination total={50}/>
}

export const Top = () => {
    const [current, setCurrent] = useState(1)
    const total = 14
    const [pageSize, setPageSize] = useState(20)
    const onChange = (current: number) => {
        setCurrent(current)
    }
    const handlePageSizeChange = (current: number, size: number) => {
        setPageSize(size)
        console.log(current, size)
    }
    return <div style={{ marginTop: '200px' }}>
        <Pagination
            current={current}
            total={total}
            defaultCurrent={1}
            groupCount={5}
            onChange={onChange}
            showTotal={total => `共 ${total} 条`}
            showQuickJumper
            onShowSizeChange={handlePageSizeChange}
            optionsPosition="top"
            pageSize={pageSize}
            showSizeChanger
        />
    </div>
}


export const ControlledPagination = () => <Controlled/>
export const NoPropsPagination = () => <NoProps/>


export default {title: 'Pagination', component: Pagination}