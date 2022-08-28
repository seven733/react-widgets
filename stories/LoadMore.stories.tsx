import { cover } from 'polished'
import React, { useState } from 'react'
import styled from 'styled-components'
import { LoadMore, Page } from "../src"

export default { title: 'Load More', component: LoadMore }

const StyledUl = styled.ul`
  li {
    text-align: center;
    margin: 3em 0;
  }
`

const Wrapper = styled.div`
  ${cover()};
  position: fixed;
  overflow: scroll;
`

const list = new Array(20)
list.fill('load more test')

const LoadMoreTest = () => {
  const [items, setItems] = useState<string[]>([])

  const handleLoadMore = async () => {
    try {
      await new Promise<void>((resolve) => {
        setTimeout(() => {
          setItems(items.concat([...list]))
          resolve()
        }, 3000)
      })
    } catch (err) {
      // handle error
    }
  }

  return (
    <Page>
      <Wrapper>
        <StyledUl>
          {items.map((l, i) => <li key={i.toString()}>{l}</li>)}
        </StyledUl>
        <LoadMore count={items.length} total={40} onFetchMore={handleLoadMore} />
        {items.length < 40 && <button onClick={handleLoadMore}>load more</button>}
      </Wrapper>
    </Page>
  )
}

export const LoadMoreDemo = () => (<LoadMoreTest />)

