import React from 'react';
import classNames from 'classnames';
import { useThemeContext } from '@aave/aave-ui-kit';

import { useProtocolDataContext } from '../../../../libs/protocol-data-provider';
import MarketSwitcher from '../../../../components/market/MarketSwitcher';

import staticStyles from './style';
import { availableMarkets } from '../../../../helpers/config/markets-and-network-config';

interface SelectMarketPanelProps {
  isCollapse?: boolean;
}

export default function SelectMarketPanel({ isCollapse }: SelectMarketPanelProps) {
  const { currentTheme } = useThemeContext();
  const { setCurrentMarket } = useProtocolDataContext();
  availableMarkets.forEach((market) => {
    setCurrentMarket(market);
  });

  return (
    <div className={classNames('SelectMarketPanel', { SelectMarketPanel__collapse: isCollapse })}>
      <div className="SelectMarketPanel__switcher">
        <MarketSwitcher />
      </div>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        @import 'src/_mixins/screen-size';
        .SelectMarketPanel {
          &__title {
            @include respond-to(sm) {
              color: ${currentTheme.textDarkBlue.hex};
            }
          }
        }
      `}</style>
    </div>
  );
}
