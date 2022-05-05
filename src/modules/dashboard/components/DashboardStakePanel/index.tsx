import React from 'react';
import { useThemeContext } from '@aave/aave-ui-kit';

import messages from './messages';
import staticStyles from './style';
import DashboardCustomTableCol from '../DashboardCustomTableCol';
import WXTIcon from '../../../../images/WXT.svg';
import AVAXIcon from '../../../../images/AVAX.svg';
import Value from '../../../../components/basic/Value';
import { useIntl } from 'react-intl';

export default function DashboardStakePanel() {
  const { currentTheme, sm } = useThemeContext();
  const intl = useIntl();

  const colValHeight = 70;
  const flexes = [0.15, 0.15, 0.18, 0.2, 0.4];
  const justifyContent = ['flex-start', 'flex-end', 'flex-end', 'flex-end', 'center'];

  // TODO: replace mocked items with data
  const currencyName = 'WXT';
  const currencyName2 = 'AVAX';
  const earnedValue = 0.0001;
  const earnedSubValue = 0.001;
  const stakedBalance = 100;
  const stakedSubBalance = 100;
  const APR = 200.382;

  return (
    <div className="DashboardStakePanel">
      <DashboardCustomTableCol
        title={intl.formatMessage(messages.stakeTokens)}
        flex={flexes[0]}
        justifyContent={justifyContent[0]}
      >
        <div className="CurrencyLogo">
          <img src={WXTIcon} alt="logo" className="PrimaryLogo" />
          <img src={AVAXIcon} alt="logo" className="SecondaryLogo" />
          <p>{`${currencyName}${currencyName2}`}</p>
        </div>
      </DashboardCustomTableCol>

      <DashboardCustomTableCol
        title={intl.formatMessage(messages.earned)}
        flex={flexes[1]}
        justifyContent={justifyContent[1]}
      >
        <Value
          value={earnedValue}
          subValue={earnedSubValue}
          subSymbol="USD"
          maximumValueDecimals={3}
          minimumValueDecimals={3}
          minimumSubValueDecimals={1}
          maximumSubValueDecimals={10}
          tooltipId="1"
          className="TableValueCol__value"
        />
      </DashboardCustomTableCol>

      <DashboardCustomTableCol
        title={intl.formatMessage(messages.APR)}
        flex={flexes[2]}
        justifyContent={justifyContent[2]}
      >
        <p className="APRString">{`${APR} %`}</p>
      </DashboardCustomTableCol>

      <DashboardCustomTableCol
        title={intl.formatMessage(messages.yourStakedBalance)}
        flex={flexes[3]}
        justifyContent={justifyContent[3]}
      >
        <Value
          value={stakedBalance}
          subValue={stakedSubBalance}
          subSymbol="USD"
          maximumValueDecimals={3}
          minimumValueDecimals={3}
          minimumSubValueDecimals={1}
          maximumSubValueDecimals={10}
          tooltipId="1"
          className="TableValueCol__value"
        />
      </DashboardCustomTableCol>

      {!sm ? (
        <DashboardCustomTableCol title="" flex={flexes[4]} justifyContent={justifyContent[4]} />
      ) : null}

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .DashboardStakePanel {
          background: ${currentTheme.whiteElement.hex};
          .CurrencyLogo p {
            color: ${currentTheme.maxWhite.hex};
          }

          .TableValueCol__value .SubValue {
            color: ${currentTheme.lightGray.hex};
          }
          .westBtn {
            background: ${currentTheme.nereusYellow.hex};
            color: ${currentTheme.maxBlack.hex};
          }

          .DashboardCustomTableColChildrenWrapper {
            height: ${colValHeight}px;
          }

          .APRString {
            color: ${currentTheme.maxWhite.hex};
          }
        }
      `}</style>
    </div>
  );
}
