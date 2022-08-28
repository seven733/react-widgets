import React, { useState, useRef, useEffect, useContext } from 'react'

import { Context } from './config'
import { Image } from './Image'
import { PreviewNavbarCSS, PreviewNavbarsCSS, PreviewNavbarItemCSS, config } from './style'

const Thumbnail: React.FunctionComponent<{  onClickImage: (index: number) => void }> = (props) => {
  const { onClickImage } = props
  const wrapperRef = useRef(null)
  const { images, current } = useContext(Context)
  const [offsetX, setOffsetX] = useState(0)

  useEffect(
    () => {
      const wrapper = wrapperRef.current
      if (!wrapper) { return }

      const wstyle = window.getComputedStyle(wrapper)
      const wWidth = parseInt(wstyle.width) - config.largeGap * 2
      const iWidth = config.imgWidth + config.smallGap * 2

      const offsetX = wWidth / 2 - iWidth * (current + 0.5)
      !isNaN(offsetX) && setOffsetX(offsetX)
    },
    [current]
  )

  return (
    <PreviewNavbarCSS ref={wrapperRef}>
      <PreviewNavbarsCSS style={{ marginLeft: offsetX }}>
        {
          images.map((img, idx) => {
            const isActive = current === idx

            return (
              <PreviewNavbarItemCSS
                key={idx}
                active={isActive}
                onClick={() => !isActive && onClickImage(idx)}
              >
                <Image src={img} />
              </PreviewNavbarItemCSS>
            )
          })
        }
      </PreviewNavbarsCSS>
    </PreviewNavbarCSS>
  )
}

export default Thumbnail