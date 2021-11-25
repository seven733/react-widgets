
type TableDefaultValueType = Record<string, any>;

interface TableProps<T> {
  data: T[]
  columns: ColumnType<T>[]
  lineHeight?: number
  selectable?: boolean
  onSelectedChange?: Function
  rowKey?: (row: T) => string
  scroll?: Scroll
  onRowClick?: (row: T, index: number) => void
  activeIndex?: number
}

interface ColumnType<ValueType = TableDefaultValueType> {
  title: string
  dataIndex?: string
  key?: keyof ValueType
  align?: "right" | "left" | "center" | "justify" | "char"
  format?: (val: any) => React.Element
  render?: (row: ValueType, idx: number) => React.Element
  columns?: ColumnType<ValueType>[]
  rowSpan?: number
  colSpan?: number
  width?: number
  filter?: () => React.Element
  fixed?: 'left' | 'right'
}

interface Scroll {
  x?: number
  y?: number
}
