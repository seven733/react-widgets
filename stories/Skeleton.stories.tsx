import React from 'react'
import { Skeleton } from '../src'
// import styled from 'styled-components'

export const SkeletonDemo = () => {
  return <Skeleton />
}

// const Placeholder = styled.div<{ width: number }>`
//   width: ${props => props.width}%;
//   margin: 8px;
//   height: 16px;
//   background: #999;
// `

// export const SkeletonWithChildren = () => {
//   return (
//     <Skeleton>
//       <Placeholder className="skeleton" width={Math.random() * 100} />
//       <Placeholder className="skeleton" width={Math.random() * 100} />
//       <Placeholder className="skeleton" width={Math.random() * 100} />
//       <Placeholder className="skeleton" width={Math.random() * 100} />
//       <Placeholder className="skeleton" width={Math.random() * 100} />
//       <Placeholder className="skeleton" width={Math.random() * 100} />
//       <Placeholder className="skeleton" width={Math.random() * 100} />
//       <Placeholder className="skeleton" width={Math.random() * 100} />
//     </Skeleton>)
// }

// SkeletonWithChildren.storyName = 'Skeleton with children'

export default { title: 'Skeleton', component: Skeleton }