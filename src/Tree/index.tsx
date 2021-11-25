import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import FoldIcon from './FoldIcon'

const TreeBody = styled.div<{ level: number; indent: string }>`
  /* 当层级数非第一层，判读是否使用自定义缩进参数 */
  padding-left: ${props => (props.level ? props.indent ? props.indent : '30px' : 0)};
`

const TreeItem = (CustomFoldIcon: React.ReactType) => function<T> ({ data, dataTypes, level, indent, unfold = false }: TreeItemProps<T>) {
  const current = dataTypes[0]
  const next = dataTypes.length > 1 ? dataTypes[1] : null
  const [showChildren, setShowChildren] = useState<boolean>(unfold)
  const hasChildren = next && data && (data[next.dataIndex]) && data[next.dataIndex].length > 0
  const fixedStyle = { display: 'flex', verticalAlign: 'top', flexWrap: 'wrap' }

  useEffect(() => { setShowChildren(unfold) }, [unfold])

  return (
    <div>
      <div style={current.style ? Object.assign(fixedStyle, current.style) : fixedStyle}>
        <div style={{ visibility: hasChildren ? 'visible' : 'hidden' }}>
          {
            CustomFoldIcon
              ? <CustomFoldIcon show={showChildren} onToggle={(val: boolean) => setShowChildren(val)} />
              : <FoldIcon show={showChildren} onToggle={(val: boolean) => setShowChildren(val)} />
          }
        </div>
        <div style={{ flexGrow: 1 }}>{ current.render(data) }</div>
      </div>
      {next && data[next.dataIndex] && showChildren && (
        <Tree
          data={data[next.dataIndex]}
          dataTypes={dataTypes.slice(1)}
          level={level + 1}
          indent={indent}
          unfold={unfold}
          foldIcon={CustomFoldIcon}
        />
      )}
    </div>
  )
}

function Tree<T>({ data, dataTypes, indent = '30px', level = 0, foldIcon, unfold }: TreeProps<T>) {
  const TreeItemWithFoldIcon = TreeItem(foldIcon)
  return (
    <TreeBody level={level} style={{ flexShrink: 0, width: '100%' }} indent={indent}>
      { data.map((item: T, index: number) => (
        <TreeItemWithFoldIcon key={index} data={item} dataTypes={dataTypes} level={level} indent={indent} unfold={unfold} />
      )) }
    </TreeBody>
  )
}

interface TreeProps<T> {
  foldIcon?: any; // 是否使用自定义折叠按钮
  indent?: string; // 树每层前面的缩进长度，默认30px
  level?: number; // 层级（内部参数，调用时不需传入）
  data: T[];
  unfold?: boolean // 展开
  dataTypes: DataTypeItem<T>[]; // 树每层的索引以及render（传入的data是数组形式，所以第一层不需要索引）
}

interface DataTypeItem<T> {
  dataIndex: string;
  render: (props: T) => React.ReactNode;
  style?: any;
}

interface TreeItemProps<T> {
  unfold?: boolean
  indent: string;
  data: any;
  dataTypes: DataTypeItem<T>[];
  level: number;
}

export default Tree