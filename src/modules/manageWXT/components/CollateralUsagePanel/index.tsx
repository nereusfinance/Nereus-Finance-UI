import React from 'react';
import messages from './messages';
import { useIntl } from 'react-intl';
import staticStyles from './style';
import { useThemeContext } from '@aave/aave-ui-kit';
import { useWXTPriceDataContext } from '../../../../libs/wxt-price-data-provider';
import { bigFloatToFixed, divideIntegerWithComa } from '../../../../libs/utils/bigFloatToFixed';

export default function CollateralUsagePanel() {
  const { WXTToUSD, userBalance, WXTWithDecimals } = useWXTPriceDataContext();
  const intl = useIntl();
  const { currentTheme } = useThemeContext();

  return (
    <>
      <div className="CollateralUsagePanel">
        <p className="CollateralUsagePanelTitle">{intl.formatMessage(messages.walletBalance)}</p>
        <div className="CollateralUsagePanelValues">
          <p className="CollateralUsagePanelValuesMain">{`${divideIntegerWithComa(
            bigFloatToFixed(WXTWithDecimals(userBalance), 4)
          )} WXT`}</p>
          <p className="CollateralUsagePanelValuesSecondary">{`$ ${divideIntegerWithComa(
            bigFloatToFixed(WXTToUSD(userBalance), 3)
          )}`}</p>
        </div>
      </div>
      <style jsx={true} global={true}>{`
        .CollateralUsagePanel {
          .CollateralUsagePanelTitle,
          .CollateralUsagePanelValuesMain {
            color: ${currentTheme.maxWhite.hex};
          }

          .CollateralUsagePanelValuesSecondary {
            color: ${currentTheme.lightGray.hex};
          }
        }
      `}</style>
      <style jsx={true} global={true}>
        {staticStyles}
      </style>
    </>
  );
}
