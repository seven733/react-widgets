import React, { HtmlHTMLAttributes, ReactNode, ReactNodeArray, SVGAttributes, HTMLAttributes, InputHTMLAttributes, BaseHTMLAttributes, ReactElement, FunctionComponent } from 'react';
import * as styled_components from 'styled-components';
import { StyledComponent, DefaultTheme } from 'styled-components';
import { FormatLocaleDefinition } from 'd3-format';

declare function BreadCrumbs(props: BreadCrumbsProps): JSX.Element;

interface BreadCrumbsProps extends Omit<HtmlHTMLAttributes<HTMLDivElement>, 'onChange'> {
    data: {
        label: string;
        path: string;
    }[];
    onChange: (path: string) => void;
}

declare const Card: styled_components.StyledComponent<"section", styled_components.DefaultTheme, {}, never>;

interface CalendarProps extends HtmlHTMLAttributes<HTMLDivElement> {
    month?: number;
    today?: number;
    activeDates?: number[];
    range?: [number, number];
    onHoverDate?: (date: number) => void;
    onClickDate?: (date: number) => void;
    header?: ReactNode;
    enabledDates?: {
        start: number;
        end: number;
    }[];
    disabledDates?: {
        start: number;
        end: number;
    }[];
}
declare function Calendar(props: CalendarProps): JSX.Element;

interface CarouselProps extends Omit<HtmlHTMLAttributes<HTMLDivElement>, 'onChange'> {
    children: ReactNodeArray;
    autoplay?: boolean;
    interval?: number;
    showButton?: boolean;
    onChange?: (index: number) => void;
    dots?: boolean;
}
declare function Carousel(props: CarouselProps): JSX.Element;

declare const Cascader: (props: CascaderProps) => JSX.Element;
interface CascaderProps extends Omit<HtmlHTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange'> {
    options: OptionItem[];
    defaultValue?: CascaderValue[] | CascaderValue;
    onChange: Function;
    disabled?: boolean;
    single?: boolean;
}
declare type CascaderValue = number | string;
interface OptionItem {
    label: string;
    value: CascaderValue;
    children?: OptionItem[];
    disabled?: boolean;
}

declare function Canvas(props: CanvasProps): JSX.Element;
interface Datum {
    [key: string]: string | number | Date;
}
declare type CanvasProps = SVGAttributes<SVGSVGElement> & {
    height?: number;
    data: Datum[];
    schema: Record<keyof Datum, string>;
    colors?: string[];
    scaleColor?: (value: string) => string;
    locale?: FormatLocaleDefinition;
};

declare function Axis(props: AxisElementProps): JSX.Element;
declare type AxisElementProps = SVGAttributes<SVGGElement> & {
    series: (keyof Datum)[];
    tickCount?: number;
    showTicks?: boolean;
    showDashs?: boolean;
    form?: string;
    position?: 'left' | 'right' | 'bottom';
    unit?: string;
    visible?: boolean;
    stacked?: boolean;
    barPadding?: number;
    outerPadding?: number;
    min?: number;
    max?: number;
};

declare function Coordinate(props: CoordinateProps): JSX.Element;
declare type CoordinateProps = SVGAttributes<SVGGElement> & {
    type?: 'cartesian';
    horizontal?: boolean;
};

declare function Legend(props: ChartLegendProps): JSX.Element;
declare type ChartLegendProps = SVGAttributes<SVGForeignObjectElement> & {
    type?: 'stroke' | 'block' | 'spot';
    series?: (number | Date | string)[];
    formatter?: (value: number | Date | string) => string;
};

declare function Tooltip$1(props: TooltipProps): JSX.Element;
declare type TooltipProps = SVGAttributes<SVGGElement> & {
    title?: string;
    series: (keyof Datum)[];
    formatX?: (value: number) => string;
    formY?: string[];
    colored?: boolean;
};

declare function LineChart(props: LineChartProps): JSX.Element;
declare type LineChartProps = SVGAttributes<SVGGElement> & {
    series: (keyof Datum)[];
    straight?: boolean;
};

declare function Bars(props: BarsProps): JSX.Element;
declare type BarsProps = SVGAttributes<SVGGElement> & {
    series: (keyof Datum)[];
    stacked?: boolean;
    padding?: number;
};

declare function Points(props: PointProps): JSX.Element;
declare type PointProps = SVGAttributes<SVGGElement> & {
    series: (keyof Datum)[];
};

declare function Area(props: AreaProps): JSX.Element;
declare type AreaProps = SVGAttributes<SVGGElement> & {
    y0: keyof Datum;
    y1: keyof Datum;
};

declare function Pie(props: PieProps): JSX.Element;
declare type PieProps = SVGAttributes<SVGGElement> & {
    x: keyof Datum;
    y: keyof Datum;
    title?: string;
};

declare const _default$5: {
    Canvas: typeof Canvas;
    Axis: typeof Axis;
    Coordinate: typeof Coordinate;
    Legend: typeof Legend;
    Tooltip: typeof Tooltip$1;
    Lines: typeof LineChart;
    Bars: typeof Bars;
    Area: typeof Area;
    Points: typeof Points;
    Pie: typeof Pie;
};

declare const Row: styled_components.StyledComponent<"div", styled_components.DefaultTheme, RowProps, never>;
declare const Col: styled_components.StyledComponent<"div", styled_components.DefaultTheme, ColProps, never>;
interface ColProps extends HTMLAttributes<HTMLDivElement> {
    gutter?: number;
    span: number;
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
}
interface RowProps {
    justify?: 'end' | 'center' | 'space-between' | 'space-around';
    margin?: string;
}

interface CurrencyProps extends HtmlHTMLAttributes<HTMLSpanElement> {
    num: number;
}
declare function Currency(props: CurrencyProps): JSX.Element;

declare function RangePicker(props: RangePickerProps): JSX.Element;
interface RangePickerProps extends Omit<HtmlHTMLAttributes<HTMLDivElement>, 'onChange'> {
    value?: [number, number];
    onChange?: (value: [number, number]) => void;
    disabled?: boolean;
    now?: number;
    enabledDates?: string[] | [number, number][];
    disabledDates?: string[] | [number, number][];
}

declare function DatePicker(props: DatePickerProps): JSX.Element;
interface DatePickerProps extends Omit<HtmlHTMLAttributes<HTMLDivElement>, 'onChange'> {
    value?: number;
    onChange?: (value: number) => void;
    disabled?: boolean;
    now?: number;
    enabledDates?: string[] | [number, number][];
    disabledDates?: string[] | [number, number][];
}

interface DrawerProps extends HtmlHTMLAttributes<HTMLDivElement> {
    visible: boolean;
    size?: number;
    title?: string;
    closable?: boolean;
    position?: 'top' | 'bottom' | 'left' | 'right';
    onClose?: () => void;
    onOutsideClick?: () => void;
}
declare const Drawer: (props: DrawerProps) => JSX.Element;

declare const ErrorPage: (props: ErrorPageProps) => JSX.Element;
declare type ErrorPageProps = HtmlHTMLAttributes<HTMLDivElement> & {
    type: '404' | '403' | '500';
    desc?: string;
};

declare const _default$4: ({ fields }: UseFormProps) => {
    validations: {
        [key: string]: ValidationProps;
    };
    validate: <T>(rules: RulesMap, data: T) => Promise<void>;
    validateField: <T_1>(field: string, rules: RulesMap, data: T_1) => Promise<void>;
};

interface UseFormProps {
    fields: string[];
}

declare const _default$3: React.ForwardRefExoticComponent<FormProps & React.RefAttributes<unknown>>;

declare const Image: (props: ImageProps) => JSX.Element;
interface ImageProps extends Omit<HTMLAttributes<HTMLImageElement>, 'alt' | 'src'> {
    src: string;
    failedPlaceholder?: () => React.ReactNode;
    alt?: string;
}

interface ImagePickerProps extends Omit<HTMLAttributes<HTMLImageElement>, 'onChange'> {
    multiple?: boolean;
    accept?: string;
    cover?: () => React.ReactNode;
    onChange: (data: File[]) => void;
}
declare const _default$2: React.ForwardRefExoticComponent<ImagePickerProps & React.RefAttributes<unknown>>;

declare const Input: (props: InputProps) => JSX.Element;
interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'prefix' | 'pattern'> {
    type?: 'text' | 'tel' | 'email' | 'url' | 'password' | 'search' | 'number';
    value?: string;
    prefix?: ReactNode;
    suffix?: ReactNode;
    pattern?: RegExp;
    example?: string;
}

declare const InputNumber: (props: InputNumberProps) => JSX.Element;
interface InputNumberProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'prefix'> {
    min?: number;
    max?: number;
    step?: number;
    disabled?: boolean;
    onChange: (val: number) => void;
    defaultValue?: number;
    prefix?: React.ReactNode;
    suffix?: React.ReactNode;
}

declare const LoadMore: (props: LoadMoreProps) => JSX.Element;
interface LoadMoreProps {
    total: number;
    count: number;
    haveMore?: boolean;
    noMoreText?: string;
    onFetchMore(): Promise<void>;
}

interface MaskProps {
    minmal?: boolean;
}
declare const Mask: styled_components.StyledComponent<"div", styled_components.DefaultTheme, MaskProps, never>;

declare const Modal: (props: ModalProps) => JSX.Element;
interface ModalProps extends HtmlHTMLAttributes<HTMLDivElement> {
    closable?: boolean;
    padding?: string;
    animeRange?: AnimeRange;
    visible: boolean;
    onClose?: () => void;
    onConfirm?: () => void;
    onCancel?: () => void;
    okText?: string;
    cancelText?: string;
    submitting?: boolean;
    hasFooter?: boolean;
}
interface AnimeRange {
    start: string;
    end: string;
}

declare const Notice: (props: NoticeProps) => JSX.Element;
declare const notification: (props: NoticeProps & {
    duration?: number;
    content?: () => JSX.Element;
}) => void;
declare const customNotice: (props: NoticeProps & {
    StyledNotice: StyledComponent<(props: NoticeProps) => JSX.Element, DefaultTheme, {}, never>;
    content?: () => JSX.Element;
    duration?: number;
}) => void;

interface NoticeProps extends HtmlHTMLAttributes<HTMLDivElement> {
    title?: string;
    type: 'error' | 'success' | 'warning';
    noIcon?: boolean;
    CustomerIcon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
    closeable?: boolean;
    CloseIcon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
    onClose?: () => void;
}

declare const Option: <T>(props: OptionProps<T>) => JSX.Element;

interface OptionProps<T> extends Omit<HTMLAttributes<HTMLLIElement>, 'value'> {
    label: string;
    handleSelect?: Function;
    disabled?: boolean;
    children?: React.ReactElement[];
    value: T;
    index?: number;
    defaultIndexes?: number[];
}

declare const Page: (props: HtmlHTMLAttributes<HTMLDivElement>) => JSX.Element;

interface PaginationProps {
    style?: React.CSSProperties;
    className?: string;
    onShowSizeChange?: (current: number, size: number) => void;
    current?: number;
    defaultCurrent?: number;
    defaultPageSize?: number;
    pageSize?: number;
    pageSizeOptions?: number[];
    showSizeChanger?: boolean;
    showQuickJumper?: boolean;
    showTotal?: (total: number) => string;
    onChange?: (page: number, pageSize?: number) => void;
    total: number;
    groupCount?: number;
    showAllPages?: boolean;
    optionsPosition?: 'top' | 'bottom';
}
declare const Pagination: (props: PaginationProps) => JSX.Element;

declare function Picker<T>(props: PickerProps<T>): JSX.Element;
interface PickerProps<T = string> extends HTMLAttributes<HTMLDivElement> {
    visible: boolean;
    title: string;
    data: T[];
    contentKey?: keyof T;
    childrenKey?: keyof T;
    columns?: 2 | 3;
    initialIndices?: number[];
    onConfirm(ids: number[]): void;
    onClose?: () => void;
    onCancel?: () => void;
}

declare function Popup(props: PopUpProps): JSX.Element;
interface PopUpProps extends BaseHTMLAttributes<HTMLDivElement> {
    visible?: boolean;
    confirmed?: boolean;
    title?: string;
    onClose(): void;
}

declare const _default$1: (props: HtmlHTMLAttributes<HTMLDivElement>) => JSX.Element;

declare const Select: <T>(props: SelectProps<T>) => React.ReactElement;

interface SelectProps<T> extends Omit<HtmlHTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange' | 'prefix'> {
    defaultValue?: T | T[];
    children: React.ReactElement[];
    onChange: (data: SelectValue<T> | SelectValue<T>[]) => void;
    onClear?: () => void;
    placeholder?: string;
    allowClear?: boolean;
    multiple?: boolean;
    bordered?: boolean;
    filterOption?: boolean | Function;
    disabled?: boolean;
    prefix?: React.ReactNode;
    suffix?: React.ReactNode;
    addible?: React.ReactNode;
    optionsPosition?: 'top' | 'bottom';
}
interface SelectValue<T> {
    label: string;
    value: T;
}

declare const Steps: (props: StepsProps) => JSX.Element;
declare const Step: (props: StepProps) => JSX.Element;

interface StepsProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
    current?: number;
    children: React.ReactNode[];
    onChange?: (index: number) => void;
    vertical?: boolean;
}
interface StepProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
    current?: number;
    index?: number;
    total?: number;
    title: string;
    description?: string;
    onChange?: (index: number) => void;
    vertical?: boolean;
    icon?: ReactElement;
}

declare const Table: <T>(props: TableProps<T>) => React.ReactElement;

declare type TableDefaultValueType = Record<string, any>;
interface TableProps<T> extends HtmlHTMLAttributes<HTMLDivElement> {
    data: T[];
    columns: ColumnType<T>[];
    lineHeight?: number;
    selectable?: boolean;
    onSelectedChange?: Function;
    rowKey?: (row: T) => string;
    scroll?: Scroll;
    onRowClick?: (row: T, index: number) => void;
    activeIndex?: number;
    Empty?: React.ReactNode;
}
interface ColumnType<ValueType = TableDefaultValueType> {
    title: string;
    dataIndex?: string;
    key?: keyof ValueType;
    align?: "right" | "left" | "center" | "justify" | "char";
    format?: (val: any) => any;
    render?: (row: ValueType, idx: number) => any;
    columns?: ColumnType<ValueType>[];
    rowSpan?: number;
    colSpan?: number;
    width?: number;
    filter?: () => ReactNode;
    fixed?: 'left' | 'right';
}
interface Scroll {
    x?: number;
    y?: number;
}

declare const TagTabs: (props: TagTabsProps) => JSX.Element;
declare const BottomTabBar: (props: BottomTabBarProps) => JSX.Element;
declare const Tabs: ({ className, activeTab, underline, tabs, children, onChange }: TabsProps) => JSX.Element;
interface TabProps extends HtmlHTMLAttributes<HTMLLabelElement> {
    activeIcon?: ReactNode;
    icon?: ReactNode;
    label: string;
    active?: boolean;
    path?: string;
    underline?: boolean;
    disabled?: boolean;
}
interface TabsProps {
    tabs: TabProps[];
    activeTab?: number;
    className?: string;
    underline?: boolean;
    children?: ReactNode;
    onChange(index: number, path?: string): void;
}
interface TagTabsProps extends Omit<HtmlHTMLAttributes<HTMLDivElement>, 'onChange'> {
    tabs: TabProps[];
    className?: string;
    children?: ReactNode;
    activeTab?: number;
    onChange?: (index: number) => void;
}
interface BottomTabBarProps {
    tabs: TabProps[];
    activeTab: number;
    className?: string;
    onChange(index: number, path?: string): void;
}

declare const _default: (props: TagProps) => JSX.Element;

declare type Types = 'warning' | 'info' | 'danger' | 'success';
declare type Effects = 'dark' | 'plain';
interface TagProps extends HtmlHTMLAttributes<HTMLSpanElement> {
    type?: Types;
    closeable?: boolean;
    children: React.ReactText;
    effect?: Effects;
}

declare const Toast: FunctionComponent<ToastProps>;
interface ToastProps {
    type?: 'loading' | 'success' | 'error';
    duration?: number;
    onClose?: () => void;
    icon?: string;
    children?: React.ReactNode;
}

declare const Tooltip: React.FunctionComponent<ITooltipProps>;

declare type TPlacement = 'top' | 'right' | 'bottom' | 'left';
declare type TTrigger = 'hover' | 'click';
interface IOverlayProp {
    children: React.ReactElement;
    placement?: TPlacement;
    getContainer?: () => HTMLElement;
    setDirection?: (isIntersecting: boolean) => void;
}
interface IOverlayTriggerProps extends IOverlayProp {
    visible?: boolean;
    trigger?: TTrigger;
    overlayChildren: React.ReactElement;
    onVisibleChange?: (visible: boolean) => void;
}
interface ITooltipProps extends Omit<IOverlayTriggerProps, 'setDirection' | 'overlayChildren'> {
    title: React.ReactNode;
    autoAdjustOverflow?: boolean;
}

declare enum E_TOOLBAR {
    PREV = "prev",
    NEXT = "next",
    LARGE = "large",
    SMALL = "small",
    TURN_X = "turnX",
    TURN_Y = "turnY",
    FULL_SCREEN = "fullscreen",
    ROTATE_LEFT = "rotateLeft",
    ROTATE_RIGHT = "rotateRight"
}

declare const PreviewImage$1: React.FunctionComponent<Preview.IPreviewProps<E_TOOLBAR>>;

declare const PreviewImage: React.FunctionComponent<Preview.IPreviewMobileProps>;

export { BottomTabBar, BreadCrumbs, Calendar, Card, Carousel, Cascader, _default$5 as Chart, Col, Currency, DatePicker, Drawer, E_TOOLBAR, ErrorPage, _default$3 as Form, Image, _default$2 as ImagePicker, Input, InputNumber, LoadMore, Mask, Modal, Notice, Option, Page, Pagination, Picker, Popup, PreviewImage$1 as Preview, PreviewImage as PreviewMobile, RangePicker, Row, Select, _default$1 as Skeleton, Step, Steps, TabProps, Table, Tabs, TabsProps, _default as Tag, TagTabs, Toast, Tooltip, customNotice, notification, _default$4 as useForm };
