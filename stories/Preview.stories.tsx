import React, { useRef, useEffect } from 'react'
import { Preview } from '../src'
import image1 from '../src/assets/test.jpg'
import image2 from '../src/assets/海豚.jpg'
import image3 from '../src/assets/海岸.jpg'
import image4 from '../src/assets/向日葵.jpg'
import image5 from '../src/assets/fireworks.jpg'
import { boolean, withKnobs, number } from '@storybook/addon-knobs'

export function Demo() {
  return <Preview images={['https://test-api-wecare-corp.medtreehealth.com/booking/image?code=H4sIAAAAAAAAAMvPy8nMS43PL0pJLaoJKEotTi7KLCjJzM-rycxNTE_VzypITa8xrMkqSK_RNawxNDOwMDU2NjE2MzQyrzEBANBejiQ9AAAA&token=UEFTU1dPUkRfTE9HSU5fcGhhcm1hY3k=.reiwzyIIYf9q2wkRLgP-ajCDpgkHn5wGpW4Mk2EigCfgmxj2_cDIr8CPCbun-h0BfNoqLz9Vo095z30qbm4cKg==.YWRjcg==']} />
}

export function KnobsDemo() {
  return (
    <Preview
      images={[image1, image2, image3, image4, image5]}
      visible={boolean('visible', true)}
      index={number('index', 0)} />)
}

function MethodsInRef() {
  const ref = useRef<Viewer>()

  useEffect(() => {
    if (ref.current) ref.current.view(3)
  }, [])

  return <Preview ref={ref} images={[image1, image2, image3, image4, image5]} />
}

export function MethodsDemo() {
  return <MethodsInRef />
}

export default { title: 'Image Preview', decorators: [withKnobs] }