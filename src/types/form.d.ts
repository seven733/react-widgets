interface ValidationProps {
  hasError: boolean
  message: string | null
}

interface FormProps {
  schemas: Schema
  onSubmit?: Function
  submitText?: string
  dropDefaultSubmitButton?: boolean  //默认为false
  onChange?: (formData: any) => void
  defaultFormData?: any
}

interface ValidationMap {
  [key: string]: ValidationProps
}

interface RulesMap {
  [key: string]: Function[]
}


interface StringMap {
  [key: string]: any;
};

interface ContainerProps extends FieldProps {
  path?: string
  formData: any
  onValueChange?: Function
}

interface FieldProps {
  type: 'input' | 'textarea' | 'number' | 'select' | 'multiSelect' | 'operation' | 'cascader' | 'custom' | 'datePicker'
  label: string
  dataIndex: string
  placeholder?: string
  width?: string
  options?: OptionItem[]
  required?: boolean
  hidden?: Function
  defaultValue?: string | number
  rules?: Function[]
  disabled?: boolean | Function
  computed?: [Function, string[]]
  suffix?: AddonProps
  component?: any
}

interface AddonProps {
  type: 'text' | 'select'
  dataIndex?: string
  value: string
  options?: OptionItem[]
  rules?: Function[]
  width?: number
}

interface Schema {
  columns?: number
  dataIndex?: string
  els: FieldProps[]
  additional?: Schema[]
  limit?: number
  least?: number
}

interface UISchema {
  columns?: number
  els: FieldProps[]
  [key: string]: Schema[] | number | FieldProps[] | undefined
}

interface OptionItem {
  label: string
  value: React.ReactText
}
