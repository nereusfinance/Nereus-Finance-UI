import React from 'react';
import { useIntl } from 'react-intl';
import classNames from 'classnames';
import { useThemeContext } from '@aave/aave-ui-kit';

import staticStyles from './style';
import { getAssetInfo } from '../../../../helpers/config/assets-config';

interface SubValueProps {
  symbol?: string;
  value: number;
  maximumDecimals?: number;
  minimumDecimals?: number;
  color?: 'dark' | 'white' | 'primary' | 'gray';
}

export default function SubValue({
  value,
  symbol,
  maximumDecimals,
  minimumDecimals,
  color = 'dark',
}: SubValueProps) {
  const intl = useIntl();
  const { currentTheme } = useThemeContext();
  const textColor = {
    gray: currentTheme.gray.hex,
    dark: currentTheme.lightGray.hex,
    white: currentTheme.white.hex,
    primary: currentTheme.primary.hex,
  };
  const asset = symbol && getAssetInfo(symbol);
  return (
    <p className={classNames('SubValue')} style={{ color: textColor[color] }}>
      {symbol === 'USD' && <span className="SubValue__symbol SubValue__usdSymbol">$</span>}

      {intl.formatNumber(value, {
        maximumFractionDigits: maximumDecimals || 5,
        minimumFractionDigits: minimumDecimals ? minimumDecimals : undefined,
      })}

      <span className={classNames('SubValue__symbol', { SubValue__symbolUSD: symbol === 'USD' })}>
        {asset && asset.formattedSymbol ? asset.formattedSymbol : asset && asset.symbol}
      </span>

      <style jsx={true}>{staticStyles}</style>
    </p>
  );
}
