import React, { useEffect, useState } from 'react'
import { Preview, E_TOOLBAR, PreviewMobile } from '../src'
import image1 from '../src/assets/test.jpg'
import image2 from '../src/assets/海豚.jpg'
import image3 from '../src/assets/海岸.jpg'
import image4 from '../src/assets/向日葵.jpg'
import image5 from '../src/assets/fireworks.jpg'

// 错误图片
export const Demo1 = () => {
  return <Preview images={['https://test-api-wecare-corp.medtreehealth.com/booking/image?code=H4sIAAAAAAAAAMvPy8nMS43PL0pJLaoJKEotTi7KLCjJzM-rycxNTE_VzypITa8xrMkqSK_RNawxNDOwMDU2NjE2MzQyrzEBANBejiQ9AAAA&token=UEFTU1dPUkRfTE9HSU5fcGhhcm1hY3k=.reiwzyIIYf9q2wkRLgP-ajCDpgkHn5wGpW4Mk2EigCfgmxj2_cDIr8CPCbun-h0BfNoqLz9Vo095z30qbm4cKg==.YWRjcg==']} />
}

export const Demo2 = () => {
  const [visible, setVisible] = useState(true)
  const [index, setIndex] = useState(0)

  useEffect(
    () => {
      const timer1 = setTimeout(() => setVisible(true), 2000)
      const timer2 = setTimeout(() => setIndex(3), 4000)

      return () => {
        clearTimeout(timer1)
        clearTimeout(timer2)
      }
    },
    []
  )

  return (
    <Preview
      visible={visible}
      closable={true}
      maskClosable={false}
      index={index}
      zoomRatio={0.1}
      minScale={0.01}
      maxScale={100}
      showPrevNextBtn={true}
      showThumbnail={true}
      showName={true}
      carouselAble={false}
      toolbars={[
        E_TOOLBAR.PREV,
        E_TOOLBAR.NEXT,
        E_TOOLBAR.SMALL,
        E_TOOLBAR.LARGE,
        E_TOOLBAR.ROTATE_LEFT,
        E_TOOLBAR.ROTATE_RIGHT,
        E_TOOLBAR.TURN_X,
        E_TOOLBAR.TURN_Y,
        E_TOOLBAR.FULL_SCREEN
      ]}
      onClose={() => console.log('关闭')}
      images={[image1, image2, image3, image4, image5]}
    />
  )
}

export const Mobile = () => {

  return (
    <PreviewMobile images={[image2, image3, image4]} />
  )
}

export default {
  title: 'Image Preview',
  component: Preview,
  argTypes: {
    images: {
      description: '图片列表'
    },
    closable: {
      description: '是否显示关闭按钮'
    },
    maskClosable: {
      description: '蒙版是否可以关闭'
    },
    index: {
      description: '显示图片的索引'
    },
    visible: {
      description: '手动控制显示隐藏'
    },
    onClose: {
      description: '关闭回调'
    },
    zoomRatio: {
      description: '缩放步长'
    },
    minScale: {
      description: '最小缩放比例'
    },
    maxScale: {
      description: '最大缩放比例'
    },
    showPrevNextBtn: {
      description: '是否显示左右切换按钮'
    },
    showThumbnail: {
      description: '是否显示缩略图'
    },
    showName: {
      description: '是否显示文件名'
    },
    toolbars: {
      description: '可操作项'
    },
    carouselAble: {
      description: '是否轮播切换'
    }
  }
}