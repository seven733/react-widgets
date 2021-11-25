import React from 'react'

import { ReactComponent as PrevIcon } from '../assets/prev_icon.svg'
import { ReactComponent as FullscreenIcon } from '../assets/fullscreen_icon.svg'
import { ReactComponent as LargeIcon } from '../assets/large_icon.svg'
import { ReactComponent as NextIcon } from '../assets/next_icon.svg'
import { ReactComponent as RotateLeftIcon } from '../assets/rotate_left_icon.svg'
import { ReactComponent as RotateRightIcon } from '../assets/rotate_right_icon.svg'
import { ReactComponent as SmallIcon } from '../assets/small_icon.svg'
import { ReactComponent as TurnXIcon } from '../assets/turn_x_icon.svg'
import { ReactComponent as TurnYIcon } from '../assets/turn_y_icon.svg'

export enum E_TOOLBAR {
  PREV = 'prev', // 上一张
  NEXT = 'next', // 下一张
  LARGE = 'large', // 放大
  SMALL = 'small', // 缩小
  TURN_X = 'turnX', // x反转
  TURN_Y = 'turnY', // y反转
  FULL_SCREEN = 'fullscreen', // 全屏
  ROTATE_LEFT = 'rotateLeft', // 左旋
  ROTATE_RIGHT = 'rotateRight' // 右旋
}

export enum E_LOADING {
  PENDING = 0,
  RESOLVED = 1,
  REJECTED = -1
}

export const Icons: { [k in E_TOOLBAR]: React.ReactElement } = {
  [E_TOOLBAR.PREV]: <PrevIcon />,
  [E_TOOLBAR.NEXT]: <NextIcon />,
  [E_TOOLBAR.LARGE]: <LargeIcon />,
  [E_TOOLBAR.SMALL]: <SmallIcon />,
  [E_TOOLBAR.TURN_X]: <TurnXIcon />,
  [E_TOOLBAR.TURN_Y]: <TurnYIcon />,
  [E_TOOLBAR.FULL_SCREEN]: <FullscreenIcon />,
  [E_TOOLBAR.ROTATE_LEFT]: <RotateLeftIcon />,
  [E_TOOLBAR.ROTATE_RIGHT]: <RotateRightIcon />
}

export const Context = React.createContext<Preview.IContext<E_TOOLBAR>>(null)