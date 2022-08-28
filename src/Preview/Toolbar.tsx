import React, { useContext } from 'react'

import { E_TOOLBAR, Icons, Context } from './config'
import { PreviewFooterContentCSS, PreviewToolbarItemCSS } from './style'

const ToolbarItem: React.FunctionComponent<Preview.IToolbarItemProps<E_TOOLBAR>> = (props) => {
  const { handleByToolbar } = useContext(Context)
  const { toolbar, ...rest } = props
  const Icon = Icons[toolbar]

  if (!Icon) { return null }

  return (
    <PreviewToolbarItemCSS {...rest} onClick={() => handleByToolbar(toolbar)}>{Icon}</PreviewToolbarItemCSS>
  )
}

export const PrevNextToolbar = (): React.ReactElement => (
  <>
    <ToolbarItem style={{ left: 0 }} isPrevNextBtn toolbar={E_TOOLBAR.PREV} />
    <ToolbarItem style={{ right: 0 }} isPrevNextBtn toolbar={E_TOOLBAR.NEXT} />
  </>
)

const Toolbar: React.FunctionComponent<{ toolbars: Preview.TToolbar<E_TOOLBAR>[] }> = (props) => {
  const { toolbars } = props

  return (
    <PreviewFooterContentCSS>
      {toolbars.map(t => (<ToolbarItem key={t} toolbar={t} />))}
    </PreviewFooterContentCSS>
  )
}

export default Toolbar