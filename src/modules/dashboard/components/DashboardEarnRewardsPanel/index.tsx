import React from 'react';
import { useThemeContext } from '@aave/aave-ui-kit';
import messages from './messages';
import staticStyles from './style';
import DashboardCustomTableCol from '../DashboardCustomTableCol';
import WXTIcon from '../../../../images/WXT.svg';
import Value from '../../../../components/basic/Value';
import { useIntl } from 'react-intl';
import { useNereusIncentiveDataContext } from '../../../../libs/nereus-incentive-data-provider';
import { useStakeLockDataContext } from '../../../manageWXT/back/StakeLockDataContext';
import { bigFloatToFixed, divideIntegerWithComa } from '../../../../libs/utils/bigFloatToFixed';
import { useWXTPriceDataContext } from '../../../../libs/wxt-price-data-provider';
import useLockAPR from '../../../../helpers/useLockAPR';
import useStakeAPR from '../../../../helpers/useStakeAPR';

export default function DashboardEarnRewardsPanel() {
  const { currentTheme, md, sm } = useThemeContext();
  const { totalClaimableTokens, claimAll } = useNereusIncentiveDataContext();
  const { WXTToUSD, WXTWithDecimals } = useWXTPriceDataContext();
  const { balanceData } = useStakeLockDataContext();
  const intl = useIntl();

  const flexes = md ? [0.2, 0.08, 0.1, 0.15, 0.15] : [0.2, 0.08, 0.3, 0.15, 0.15];
  const justifyContent = ['flex-start', 'flex-end', 'flex-end', 'flex-end', 'center'];

  // TODO: replace mocked items with data
  const currencyName = 'WXT';
  const totalBalance = balanceData.totalBalance;
  const locked = balanceData.lockedWXT.add(balanceData.lockExpired);
  const stakedBalance = totalBalance.sub(locked);
  const { stakeAPR } = useStakeAPR();
  const { lockAPR } = useLockAPR();

  return (
    <div className="DashboardEarnRewardsPanel logo">
      <DashboardCustomTableCol
        title={!sm ? intl.formatMessage(messages.lendOrBorrow) : ''}
        flex={flexes[0]}
        className="CurrencyLogo-mobile"
        justifyContent={justifyContent[0]}
      >
        <div className="CurrencyLogo">
          <img src={WXTIcon} alt="logo" />
          <p>{currencyName}</p>
        </div>
      </DashboardCustomTableCol>

      <DashboardCustomTableCol
        title={intl.formatMessage(messages.earned)}
        flex={flexes[1]}
        justifyContent={justifyContent[1]}
      >
        <Value
          value={bigFloatToFixed(WXTWithDecimals(totalClaimableTokens), 3)}
          subValue={bigFloatToFixed(WXTToUSD(totalClaimableTokens), 2)}
          subSymbol="USD"
          maximumValueDecimals={6}
          minimumValueDecimals={2}
          minimumSubValueDecimals={2}
          maximumSubValueDecimals={6}
          className="TableValueCol__value"
          tooltipId="earnedBalance"
          id="earnedBalance"
        />
      </DashboardCustomTableCol>

      <DashboardCustomTableCol
        title={intl.formatMessage(messages.yourStakeBalance)}
        flex={flexes[2]}
        justifyContent={justifyContent[2]}
      >
        <div className="APYWrapper">
          <Value
            value={WXTWithDecimals(stakedBalance)}
            subValue={WXTToUSD(stakedBalance)}
            subSymbol="USD"
            maximumValueDecimals={2}
            minimumValueDecimals={2}
            minimumSubValueDecimals={1}
            maximumSubValueDecimals={10}
            className="TableValueCol__value"
            id="dashboardYourStakeBalance"
            tooltipId="dashboardYourStakeBalance"
          />
          <div className="APYWrapper__inner">
            <img src={WXTIcon} alt="logo" />
            <p className="APYText">{`${divideIntegerWithComa(stakeAPR, 2)}% `}</p>
            <p className="APYTextGrey">{'APR'}</p>
          </div>
        </div>
      </DashboardCustomTableCol>

      <DashboardCustomTableCol
        title={intl.formatMessage(messages.yourLockedBalance)}
        flex={flexes[3]}
        justifyContent={justifyContent[3]}
      >
        <div className="APYWrapper">
          <Value
            value={WXTWithDecimals(locked)}
            subValue={WXTToUSD(locked)}
            subSymbol="USD"
            maximumValueDecimals={2}
            minimumValueDecimals={2}
            minimumSubValueDecimals={1}
            maximumSubValueDecimals={10}
            className="TableValueCol__value"
            tooltipId="dashboardYourLockedBalance"
            id="dashboardYourLockedBalance"
          />
          <div className="APYWrapper__inner">
            <img src={WXTIcon} alt="logo" />
            <p className="APYText">{`${divideIntegerWithComa(lockAPR, 2)}% `}</p>
            <p className="APYTextGrey">{'APR'}</p>
          </div>
        </div>
      </DashboardCustomTableCol>

      <DashboardCustomTableCol
        title={''}
        flex={flexes[4]}
        className="West-button-mobile"
        justifyContent={justifyContent[4]}
      >
        <button className="westBtn" onClick={claimAll}>{`Vest ${divideIntegerWithComa(
          bigFloatToFixed(WXTWithDecimals(totalClaimableTokens), 6)
        )} WXT`}</button>
      </DashboardCustomTableCol>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .DashboardEarnRewardsPanel {
          background: ${currentTheme.whiteElement.hex};
          .CurrencyLogo p {
            color: ${currentTheme.maxWhite.hex};
          }

          .APYWrapper__inner {
            border: 1px solid ${currentTheme.nereusYellow.hex};
          }

          .APYText {
            color: ${currentTheme.nereusYellow.hex};
          }
          .APYTextGrey {
            color: ${currentTheme.lightGray.hex};
          }
          .TableValueCol__value .SubValue {
            color: ${currentTheme.lightGray.hex};
          }
          .westBtn {
            background: ${currentTheme.nereusYellow.hex};
            color: ${currentTheme.maxBlack.hex};
          }
        }
      `}</style>
    </div>
  );
}
