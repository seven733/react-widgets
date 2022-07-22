import * as styled_components from 'styled-components';
import { HtmlHTMLAttributes } from 'react';

declare const Card: styled_components.StyledComponent<"section", any, {}, never>;

interface CurrencyProps extends HtmlHTMLAttributes<HTMLSpanElement> {
    children: number;
}
declare function Currency(props: CurrencyProps): JSX.Element;

export { Card, Currency };
