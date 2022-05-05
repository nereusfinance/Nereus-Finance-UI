import { useIntl } from 'react-intl';
import { ethers } from 'ethers';
import staticStyles from './style';
import messages from './messages';
import { useThemeContext } from '@aave/aave-ui-kit';
import ManageWXTTopPanelItem from './ManageWXTTopPanelItem';
import TitleWithHelper from '../TitleWithHelper';
import { useStakeLockDataContext } from '../../back/StakeLockDataContext';
import { divideIntegerWithComa } from '../../../../libs/utils/bigFloatToFixed';
import { useWXTPriceDataContext } from '../../../../libs/wxt-price-data-provider';
import { useRewardsContext } from '../../../../libs/rewards-provider';
import useStakeAPR from '../../../../helpers/useStakeAPR';
import useLockAPR from '../../../../helpers/useLockAPR';

export default function ManageWXTTopPanel() {
  const intl = useIntl();
  const { currentTheme } = useThemeContext();
  const { balanceData, lockedSupply, totalSupply } = useStakeLockDataContext();
  const { WXTWithDecimals, WXTToUSD, priceUSD } = useWXTPriceDataContext();
  const { platformFees, platformPenalties } = useRewardsContext();
  const { stakeAPR } = useStakeAPR();
  const { lockAPR } = useLockAPR();

  const totalBalance = balanceData.totalBalance;
  const locked = balanceData.lockedWXT.add(balanceData.lockExpired);
  const staked = totalBalance.sub(locked);

  const stakeProfitYear = ((Number(ethers.utils.formatEther(staked)) * stakeAPR) / 100) * priceUSD;
  const lockProfitYear = ((Number(ethers.utils.formatEther(locked)) * lockAPR) / 100) * priceUSD;
  const yearlyRevenue = stakeProfitYear + lockProfitYear;
  const monthlyRevenue = yearlyRevenue / 12;
  const weeklyRevenue = monthlyRevenue / 4;
  const dailyRevenue = weeklyRevenue / 7;

  // TODO
  // function formatNumber(n: string) {
  //   if (n === '0') return n;
  //   return bigFloatToFixed(n, 2);
  // }

  const weeklyPlatformFees = Number(
    ethers.utils.formatUnits(ethers.BigNumber.from(platformFees.weekly).div(7), 6)
  );
  const weeklyPlatformPenalties = Number(
    ethers.utils.formatUnits(ethers.BigNumber.from(platformPenalties.weekly).div(7), 6)
  );
  const normalizedUserBalance = Number(ethers.utils.formatUnits(totalBalance.toString(), 18));
  const normalizedUserLocked = Number(ethers.utils.formatUnits(locked.toString(), 18));
  const normalizedTotalStakedAndLocked = Number(
    ethers.utils.formatUnits(totalSupply.toString(), 18)
  );
  // console.log('weeklyPlatformPenalties',weeklyPlatformPenalties);
  // console.log('weeklyPlatformFees', ethers.utils.formatUnits(ethers.BigNumber.from(platformFees.weekly), 6));
  // console.log('weeklyPlatformFees/7', weeklyPlatformFees);
  // console.log('normalizedUserBalance', normalizedUserBalance);
  // console.log('normalizedUserLocked', normalizedUserLocked);
  // console.log('totalStakedAndLocked', normalizedTotalStakedAndLocked);
  // console.log('lockedSupply', lockedSupply);
  // console.log('priceUSD', priceUSD);
  const dailyPlatformFees =
    (weeklyPlatformFees * normalizedUserBalance) / normalizedTotalStakedAndLocked || 0;
  const dailyPenaltyFees =
    (weeklyPlatformPenalties * normalizedUserLocked) / Number(lockedSupply) || 0;
  console.log('Full daily platform fees in USD', dailyPlatformFees);
  console.log('Full daily penalty fees in USD', dailyPenaltyFees);

  return (
    <>
      <div className="ManageWXTTopPanel">
        <div className="ManageWXTTopPanelBlock ManageWXTTopPanelBlock__left">
          <ManageWXTTopPanelItem>
            <TitleWithHelper
              text={intl.formatMessage(messages.lockedPlusStaked)}
              helperTitle={intl.formatMessage(messages.lockedPlusStaked)}
              helperDescr={intl.formatMessage(messages.lockedPlusStakedHelperDescr)}
              className="BottomMargin"
            />
            <p className="MainNumber">{`$${divideIntegerWithComa(WXTToUSD(totalBalance))}`}</p>
            <p className="SmallerNumber">{`${intl.formatMessage(
              messages.locked
            )} ${divideIntegerWithComa(WXTWithDecimals(locked), 0)} WXT`}</p>
            <p className="SmallerNumber">{`${intl.formatMessage(
              messages.staked
            )} ${divideIntegerWithComa(WXTWithDecimals(staked), 0)} WXT`}</p>
          </ManageWXTTopPanelItem>
          <ManageWXTTopPanelItem>
            <TitleWithHelper
              text={intl.formatMessage(messages.dailyRevenue)}
              helperTitle={intl.formatMessage(messages.dailyRevenue)}
              helperDescr={intl.formatMessage(messages.dailyRevenueHelperDescr)}
              className="BottomMargin"
            />
            <p className="MainNumber">{`$${divideIntegerWithComa(dailyRevenue)}`}</p>
          </ManageWXTTopPanelItem>
          <ManageWXTTopPanelItem>
            <TitleWithHelper
              text={intl.formatMessage(messages.weeklyRevenue)}
              helperTitle={intl.formatMessage(messages.weeklyRevenue)}
              helperDescr={intl.formatMessage(messages.weeklyRevenueHelperDescr)}
              className="BottomMargin"
            />
            <p className="MainNumber">{`$${divideIntegerWithComa(weeklyRevenue)}`}</p>
            <p className="SmallerNumber">{`$ ${divideIntegerWithComa(
              monthlyRevenue
            )}/${intl.formatMessage(messages.month)}`}</p>
            <p className="SmallerNumber">{`$ ${divideIntegerWithComa(
              yearlyRevenue
            )}/${intl.formatMessage(messages.year)}`}</p>
          </ManageWXTTopPanelItem>
        </div>
        <div className="ManageWXTTopPanelBlock ManageWXTTopPanelBlock__right">
          <ManageWXTTopPanelItem>
            <TitleWithHelper
              text={intl.formatMessage(messages.dailyPlatformFees)}
              helperTitle={intl.formatMessage(messages.dailyPlatformFees)}
              helperDescr={intl.formatMessage(messages.dailyPlatformFeesHelperDescr)}
              className="BottomMargin"
            />
            <p className="MainNumber">{`$${divideIntegerWithComa(dailyPlatformFees)}`}</p>
          </ManageWXTTopPanelItem>
          <ManageWXTTopPanelItem>
            <TitleWithHelper
              text={intl.formatMessage(messages.dailyPenaltyFees)}
              helperTitle={intl.formatMessage(messages.dailyPenaltyFees)}
              helperDescr={intl.formatMessage(messages.dailyPenaltyHelperDescr)}
              className="BottomMargin"
            />
            <p className="MainNumber">{`$${divideIntegerWithComa(dailyPenaltyFees)}`}</p>
          </ManageWXTTopPanelItem>
        </div>
      </div>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .ManageWXTTopPanelBlock {
          background: ${currentTheme.whiteElement.hex};
        }

        .MainNumber {
          color: ${currentTheme.maxWhite.hex};
        }

        .SmallerNumber {
          color: ${currentTheme.lightGray.hex};
        }
      `}</style>
    </>
  );
}
