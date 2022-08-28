import * as React from 'react'
import styled from 'styled-components'
import {Carousel} from '../src'
import {CarouselProps} from '../src/Carousel'

const StyledCarousel = styled(Carousel)`
  background: #595959;
  height: 60vh;
`

export default {
  title: 'Carousel',
  component: Carousel,
  argTypes:{
    interval:{description:'时间间隔（ms）'}
  }
}

export const Doc = (args: CarouselProps) => {
  return <Carousel {...args} >
    <div>1</div>
    <div>2</div>
    <div>3</div>
    <div>4</div>
  </Carousel>
}

export const CarouselSample = () => (
  <StyledCarousel>
    <div>1</div>
    <div>2</div>
    <div>3</div>
    <div>4</div>
  </StyledCarousel>
)

export const CarouselForTwoChildren = () => (
  <StyledCarousel>
    <div>1</div>
    <div>2</div>
  </StyledCarousel>
)

export const Images = () => (
  <StyledCarousel>
    <img src="https://img01.sogoucdn.com/app/a/201025/43b96bcd675bf8f633d3e258c386026a" alt="."/>
    <img src="https://static.veer.com/veer/static/resources/keyword/2020-03-02/3c98681cb34946efae3ef77310d8219f.jpg"
         alt="."/>
    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRGnKNY7zg3-r-Mm_apPLrT4ajkfF0Ht348Bw&usqp=CAU"
         alt="."/>
  </StyledCarousel>
)

export const ActionButton = () => (
  <StyledCarousel autoplay={false} showButton onChange={(index: number) => console.log('index', index)}>
    <div>1</div>
    <div>2</div>
    <div>3</div>
    <div>4</div>
  </StyledCarousel>
)


