import Big from 'big.js'

export const calcFraction = (step: number) => {
  const s = step.toString();
  const dotIndex = s.lastIndexOf('.');
  if (dotIndex < 0) return 0;
  return s.length - dotIndex - 1;
}

export const calcPosition = (v: number, min: number, max: number) => {
  const value = Big(v)
  const range = Big(max).minus(min)
  return value.minus(min).div(range).round(6).toNumber()
}

export const calcValue = (p: number, min: number, max: number, scale: number) => {
  const position = Big(p)
  const range = Big(max).minus(min)
  return position.mul(range).plus(min).round(scale).toNumber()
}

/*
min |--|--------| max
      v
min + n*step < v < min + (n+1)*step
-> n < (v - min)/step < n + 1
n 为自然数, step 为步长
*/
export const fixToStepValue = (v: number, min: number, step: number) => {
  const _v = Big(v)
  const _min = Big(min)
  const _step = Big(step)
  const n = _v.minus(_min).div(_step).round(0, 0)

  const prePos = _min.plus(n.mul(_step)).toNumber()
  const postPos = _min.plus(n.plus(1).mul(_step)).toNumber()
  return v - prePos > postPos - v ? postPos : prePos;
}

export const bindUpdateListener = (moveHandler: (e: MouseEvent) => void) => {
  const handleEnd = () => {
    document.body.removeEventListener('mousemove', moveHandler)
    document.body.removeEventListener('mouseup', handleEnd)
    document.body.removeEventListener('mouseleave', handleEnd)
  }

  document.body.addEventListener('mousemove', moveHandler)
  document.body.addEventListener('mouseup', handleEnd)
  document.body.addEventListener('mouseleave', handleEnd)
}