import { scaleOrdinal } from 'd3-scale'
import React from 'react'
import styled from 'styled-components'
import { Chart } from '../src'
import { CanvasProps, schemeCategory10 } from '../src/chart/Canvas'
import Pie from '../src/chart/Pie'

const { Canvas, Coordinate, Axis, Legend, Lines, Area, Points, Tooltip, Bars } = Chart

export default {
  title: 'Charts',
  component: Canvas,
  subcomponents: { Coordinate, Axis, Legend, Lines, Area, Points, Tooltip, Bars },
  parameters: {
    docs: {
      description: {
        component: `
+ \`schema\`: 定义每个key对应显示的label,
+ \`Datum\`: { [key: string]: string | number | Date }
`
      }
    },
  }
}

const mockData = {
  "data": [{ "x": 1577836800000, "y0": 2680445.00000000, "y1": 3981754.29000000 },
  { "x": 1580515200000, "y0": 3697113.36000000, "y1": 5489622.68000000 },
  { "x": 1583020800000, "y0": 3941375.36000000, "y1": 5887105.99000000 },
  { "x": 1585699200000, "y0": 3864079.12000000, "y1": 5785256.69000000 },
  { "x": 1588291200000, "y0": 3969007.99000000, "y1": 5986196.92000000 },
  { "x": 1590969600000, "y0": 3956766.14000000, "y1": 5882453.07000000 },
  { "x": 1593561600000, "y0": 976148.87000000, "y1": 1460959.23000000 }],
  "schema": { "x": "日期", "y0": "报销金额", "y1": "总金额" }, "unit": "元"
}
const data = mockData.data.map(d => ({ ...d, x: new Date(d.x) }))
const unit = mockData.unit

export const Doc = (args: CanvasProps) => {
  return (
    <Canvas {...args} >
      <Coordinate>
        <Axis series={['x']} />
        <Axis position='left' series={['y0', 'y1']} unit={unit} />
        <Legend />
        <Lines series={['y0', 'y1']} />
        <Points series={['y0', 'y1']} />
        <Tooltip series={['y0', 'y1']} />
      </Coordinate>
    </Canvas>)
}

Doc.args = {
  data: data,
  schema: mockData.schema,
}

export const LineChartDemo = () => {
  return (
    <Canvas data={data} schema={mockData.schema} >
      <Coordinate>
        <Axis series={['x']} />
        <Axis position='left' series={['y0', 'y1']} unit={unit} />
        <Legend />
        <Lines series={['y0', 'y1']} />
        <Points series={['y0', 'y1']} />
        <Tooltip series={['y0', 'y1']} />
      </Coordinate>
    </Canvas>)
}

export const AreaChartDemo = () => {
  return (
    <Canvas data={data} schema={mockData.schema} >
      <Coordinate>
        <Axis series={['x']} form='%y年%m月' />
        <Axis position='left' series={['y0', 'y1']} unit={unit} />
        <Legend />
        <Area y0='y0' y1='y1' />
        <Lines series={['y0', 'y1']} />
        <Points series={['y0', 'y1']} />
        <Tooltip series={['y0', 'y1']} />
      </Coordinate>
    </Canvas>)
}

const pieData = [
  { "id": 17, "name": "四川汇宇制药有限公司", "brandName": "汇昕", "amount": 753013.82000000, "ratio": 0.5429 },
  { "id": 18, "name": "Baxter Oncology GmbH", "brandName": "维达莎", "amount": 633944.32000000, "ratio": 0.4571 },
  { "id": 19, "name": "正大天晴药业集团股份有限公司", "brandName": "维首", "amount": 0, "ratio": 0 },
]

const scaleColor = scaleOrdinal<string>()
  .domain(pieData.map(d => d.name as string))
  .range(schemeCategory10)

export function DonutState() {
  const data = pieData
  return (
    <Canvas data={data} schema={{ name: '公司名称', brandName: '品牌名', amount: '金额', ratio: '占比' }} scaleColor={scaleColor}>
      <Coordinate>
        <Pie x='name' y='ratio' title='生产厂家' />
        <Legend type='block' series={data.map(d => d.name)} />
        <Tooltip series={['amount', 'ratio']} colored={false} formY={['($.2f', '.2%']} />
      </Coordinate>
    </Canvas >)
}

export const DonutChartDemo = () => {
  return (
    <DonutState />)
}

const bar = {
  "data": [
    { "x": "淋巴瘤", "y0": 2696529.01000000, "y1": 1328950.17000000 },
    { "x": "白血病", "y0": 2061216.24000000, "y1": 1015719.01000000 },
    { "x": "神经内分泌肿瘤", "y0": 1847604.95000000, "y1": 938884.58000000 },
    { "x": "血友病", "y0": 1493768.61000000, "y1": 725492.03000000 },
    { "x": "血小板减少症", "y0": 1198765.60000000, "y1": 609711.36000000 },
    { "x": "肺癌", "y0": 1144829.41000000, "y1": 539360.66000000 },
    { "x": "骨髓纤维化", "y0": 712017.14000000, "y1": 344591.24000000 },
    { "x": "类风湿关节炎", "y0": 699149.10000000, "y1": 350042.54000000 }],
  "schema": { "x": "病种", "y0": "报销", "y1": "自费" },
  "unit": "元"
}

export const BarChartDemo = () => {
  return (
    <Canvas data={bar.data} schema={bar.schema}>
      <Coordinate>
        <Axis series={['x']} />
        <Axis position='left' series={['y0', 'y1']} min={0} />
        <Bars series={['y0', 'y1']} />
        <Legend type='block' />
        <Tooltip series={['y0', 'y1']} formY={['$.2f', '$.2f']} />
      </Coordinate>
    </Canvas >)
}

export const StackBarChartDemo = () => {
  return (
    <Canvas data={bar.data} schema={bar.schema}>
      <Coordinate>
        <Axis series={['x']} />
        <Axis position='right' series={['y0', 'y1']} min={0} stacked />
        <Bars series={['y0', 'y1']} stacked />
        <Legend type='block' />
        <Tooltip series={['y0', 'y1']} formY={['$.2f', '$.2f']} />
      </Coordinate>
    </Canvas>)
}

const TransparentAxis = styled(Axis)`
  path {
    stroke: transparent;
  }
`

export const ChartForCustomizeAxis = () => {
  return (
    <Canvas data={data} schema={mockData.schema} >
      <Coordinate>
        <Axis series={['x']} />
        <TransparentAxis
          position='right'
          series={['y0', 'y1']}
          form='.0'
          unit={unit} showDashs />
        <Legend />
        <Lines series={['y0', 'y1']} />
        <Points series={['y0', 'y1']} />
        <Tooltip series={['y0', 'y1']} />
      </Coordinate>
    </Canvas>)
}

export const LineChartWithDash = () => {
  return (
    <Canvas data={data} schema={mockData.schema} >
      <Coordinate>
        <Axis series={['x']} />
        <TransparentAxis position='left' series={['y0', 'y1']} unit={unit} showDashs />
        <Legend />
        <Lines series={['y0', 'y1']} />
        <Points series={['y0', 'y1']} />
        <Tooltip series={['y0', 'y1']} />
      </Coordinate>
    </Canvas>)
}

const HtmlWrapper = styled.div`
  svg {
    width: 70%;
    float: right;
  }
`

export const LineChartInHtml = () => {
  return (
    <HtmlWrapper>
      <Canvas data={data} schema={mockData.schema} >
        <Coordinate>
          <Axis series={['x']} />
          <Axis position='left' series={['y0', 'y1']} unit={unit} />
          <Legend />
          <Lines series={['y0', 'y1']} />
          <Points series={['y0', 'y1']} />
          <Tooltip series={['y0', 'y1']} />
        </Coordinate>
      </Canvas>
    </HtmlWrapper>
  )
}

const StyledCanvas = styled(Canvas)`
  font-size: 12px;
`

const StyleAxis = styled(Axis)`
  path {
    stroke: #eee;
  }
  text {
    fill: #666;
  }
`

export const ChartStyleOverride = () => {
  return (
    <StyledCanvas data={data} schema={mockData.schema} >
      <Coordinate>
        <StyleAxis series={['x']} />
        <StyleAxis position='left' series={['y0', 'y1']} unit={unit} />
        <Legend />
        <Lines series={['y0', 'y1']} />
        <Points series={['y0', 'y1']} />
        <Tooltip series={['y0', 'y1']} />
      </Coordinate>
    </StyledCanvas>
  )
}

export const TooltipCustomizedFormat = () => {
  return (
    <Canvas data={data} schema={mockData.schema}>
      <Coordinate>
        <Axis series={['x']} />
        <Axis position='left' series={['y0', 'y1']} unit={unit} />
        <Legend />
        <Lines series={['y0', 'y1']} />
        <Points series={['y0', 'y1']} />
        <Tooltip series={['y0', 'y1']} formY={['($.2f']} />
      </Coordinate>
    </Canvas>)
}

const color = scaleOrdinal<string>()
  .domain(Object.values({ ...mockData.schema, x: undefined })).range(['blue', 'red'])

export const CustomizedColor = () => {
  return (
    <Canvas data={data} schema={mockData.schema} scaleColor={color} >
      <Coordinate>
        <Axis series={['x']} />
        <Axis position='left' series={['y0', 'y1']} unit={unit} />
        <Legend />
        <Lines series={['y0', 'y1']} />
        <Points series={['y0', 'y1']} />
        <Tooltip series={['y0', 'y1']} />
      </Coordinate>
    </Canvas>)
}

const hospitalData = {
  "data": [
    { "x": 1577836800000, "y0": 0.0043, "y1": 0.0034, "y2": 0.0020, "y3": 0.0022, "y4": 0.0046 },
    { "x": 1580515200000, "y0": 0.0055, "y1": 0.0038, "y2": 0.0050, "y3": 0.0034, "y4": 0.0047 },
    { "x": 1583020800000, "y0": 0.0063, "y1": 0.0041, "y2": 0.0034, "y3": 0.0042, "y4": 0.0034 },
    { "x": 1585699200000, "y0": 0.0070, "y1": 0.0048, "y2": 0.0029, "y3": 0.0050, "y4": 0.0045 },
    { "x": 1588291200000, "y0": 0.0081, "y1": 0.0066, "y2": 0.0052, "y3": 0.0032, "y4": 0.0026 },
    { "x": 1590969600000, "y0": 0.0082, "y1": 0.0059, "y2": 0.0057, "y3": 0.0053, "y4": 0.0031 },
    { "x": 1593561600000, "y0": 0.0016, "y1": 0.0007, "y2": 0.0014, "y3": 0.0020, "y4": 0.0039 }
  ],
  "schema": {
    "y0": "四川大学华西医院",
    "y1": "西部战区空军医院（原中国人民解放军第452医院）",
    "y2": "都江堰市人民医院",
    "y3": "自贡市中医医院",
    "y4": "自贡市第一人民医院",
    "x": "日期"
  },
  "unit": "%"
}

export const ChartWithManyLegends = () => {
  const data = hospitalData.data.map(d => ({ ...d, x: new Date(d.x) }))
  const schema = hospitalData.schema
  const series = Object.keys(schema).filter(key => key !== 'x')

  return (
    <Canvas data={data} schema={schema}>
      <Coordinate>
        <Axis series={['x']} form='%m月' />
        <Axis
          position='left'
          series={series}
          unit='人'
          showDashs />
        <Legend />
        <Lines series={series} />
        <Points series={series} />
        <Tooltip series={series} />
      </Coordinate>
    </Canvas>)
}

export const HorizontalLineChartDemo = () => {
  return (
    <Canvas data={data} schema={mockData.schema} >
      <Coordinate horizontal>
        <Axis series={['x']} position='left' />
        <Axis series={['y0', 'y1']} unit={unit} />
        <Legend />
        <Lines series={['y0', 'y1']} />
        <Points series={['y0', 'y1']} />
        <Tooltip series={['y0', 'y1']} />
      </Coordinate>
    </Canvas>)
}

export const HorizontalBarChartDemo = () => {
  return (
    <Canvas data={bar.data} schema={bar.schema}>
      <Coordinate horizontal>
        <Axis series={['x']} position='left' barPadding={0.2} />
        <Axis series={['y0', 'y1']} min={0} stacked />
        <Bars series={['y0', 'y1']} stacked />
        <Legend type='block' />
        <Tooltip series={['y0', 'y1']} formY={['$.2f', '$.2f']} />
      </Coordinate>
    </Canvas >)
}
