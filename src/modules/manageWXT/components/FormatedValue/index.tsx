import React from 'react';
import { useThemeContext } from '@aave/aave-ui-kit';
import staticStyles from './style';
import WXTimg from '../../../../images/WXT.svg';
import { bigFloatToFixed, divideIntegerWithComa } from '../../../../libs/utils/bigFloatToFixed';
export default function FormatedValue({
  value,
  symbol,
  imgSrc,
}: {
  value: string;
  symbol: string;
  imgSrc?: string;
}) {
  const { currentTheme } = useThemeContext();

  const isTooSmall = value.startsWith('0.0000') && value !== '0';
  const formated = isTooSmall ? '0.0001' : bigFloatToFixed(value, 4);

  return (
    <>
      <div className="FormattedValue">
        {imgSrc ? <img src={WXTimg} alt="" /> : null}
        <span>{isTooSmall ? '<' : ''}</span>
        <span className="ValueBold">{` ${divideIntegerWithComa(formated, 4)} `}</span>
        <span>{symbol}</span>
      </div>
      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .FormattedValue {
          color: ${currentTheme.maxWhite.hex};
        }
      `}</style>
    </>
  );
}
