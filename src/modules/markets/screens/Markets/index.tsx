import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { valueToBigNumber } from '@aave/protocol-js';
import { useThemeContext } from '@aave/aave-ui-kit';
import { ethers, BigNumber } from 'ethers';
import {
  useDynamicPoolDataContext,
  useStaticPoolDataContext,
} from '../../../../libs/pool-data-provider';
import { useProtocolDataContext } from '../../../../libs/protocol-data-provider';
import TopPanelWrapper from '../../../../components/wrappers/TopPanelWrapper';
import ScreenWrapper from '../../../../components/wrappers/ScreenWrapper';
import MarketTable from '../../components/MarketTable';
import MarketTableItem from '../../components/MarketTableItem';
import TotalMarketsSize from '../../components/TotalMarketsSize';
import BorrowRatesHelpModal from '../../../../components/HelpModal/BorrowRatesHelpModal';
import MarketMobileCard from '../../components/MarketMobileCard';
// import SwitchButton from '../../components/SwitchButton';
import messages from './messages';
import staticStyles from './style';
import { useWeb3React } from '@web3-react/core';
import {
  useHeaderTitle,
  useWithDesktopTitle,
} from '../../../../components/wrappers/ScreensWrapper';
import { useWXTPriceDataContext } from '../../../../libs/wxt-price-data-provider';
import { CompactNumber } from '../../../../components/basic/CompactNumber';
import { useStakeLockDataContext } from '../../../manageWXT/back/StakeLockDataContext';
import { useNereusIncentiveDataContext } from '../../../../libs/nereus-incentive-data-provider';
import { bigFloatToFixed, divideIntegerWithComa } from '../../../../libs/utils/bigFloatToFixed';
import { useUserWalletDataContext } from '../../../../libs/web3-data-provider';
import { isAllowedChain } from '../../../../helpers/is-allowed-chain';
import TotalPlatformFees from '../../components/TotalPlatformFees';
import { useRewardsContext } from '../../../../libs/rewards-provider';

export const switchAPRContext = React.createContext(false);

export default function Markets() {
  const intl = useIntl();
  const { currentTheme } = useThemeContext();
  const { marketRefPriceInUsd } = useStaticPoolDataContext();
  const { marketCap, totalSupply, priceUSD } = useWXTPriceDataContext();
  const { reserves } = useDynamicPoolDataContext();
  const { currentMarketData } = useProtocolDataContext();
  // const { reserveIncentives } = useIncentivesDataContext();
  const { lockedSupply, stakedSupply } = useStakeLockDataContext();
  const { chainId } = useWeb3React();
  const [sortName, setSortName] = useState('');
  const [sortDesc, setSortDesc] = useState(false);
  const { setTopPanelSmall } = useWithDesktopTitle();
  const { marketsAPR } = useNereusIncentiveDataContext();
  const { totalClaimableTokens, claimAll } = useNereusIncentiveDataContext();
  const { WXTWithDecimals } = useWXTPriceDataContext();
  const { currentAccount } = useUserWalletDataContext();
  const { setTitle } = useHeaderTitle();
  const { platformFees } = useRewardsContext();
  useEffect(() => setTitle(intl.formatMessage(messages.pageTitle)), []);

  useEffect(() => {
    localStorage.setItem('isTopPanelSmall', 'false');
    setTopPanelSmall(false);
  }, []);

  let totalLockedInUsd = valueToBigNumber('0');
  let sortedData = reserves
    .filter((res) => res.isActive)
    .map((reserve) => {
      const totalLiquidity = Number(reserve.totalLiquidity);
      const totalLiquidityInUSD = valueToBigNumber(reserve.totalLiquidity)
        .multipliedBy(reserve.priceInMarketReferenceCurrency)
        .multipliedBy(marketRefPriceInUsd)
        .toNumber();
      totalLockedInUsd = totalLockedInUsd.plus(valueToBigNumber(totalLiquidityInUSD));

      const totalBorrows = Number(reserve.totalDebt);
      const totalBorrowsInUSD = valueToBigNumber(reserve.totalDebt)
        .multipliedBy(reserve.priceInMarketReferenceCurrency)
        .multipliedBy(marketRefPriceInUsd)
        .toNumber();
      // const reserveIncentiveData = reserveIncentives[reserve.underlyingAsset.toLowerCase()];
      return {
        totalLiquidity,
        totalLiquidityInUSD,
        totalBorrows: reserve.borrowingEnabled ? totalBorrows : -1,
        totalBorrowsInUSD: reserve.borrowingEnabled ? totalBorrowsInUSD : -1,
        id: reserve.id,
        underlyingAsset: reserve.underlyingAsset,
        currencySymbol: reserve.symbol,
        depositAPY: reserve.borrowingEnabled ? Number(reserve.supplyAPY) : -1,
        avg30DaysLiquidityRate: Number(reserve.avg30DaysLiquidityRate),
        stableBorrowRate:
          reserve.stableBorrowRateEnabled && reserve.borrowingEnabled
            ? Number(reserve.stableBorrowAPY)
            : -1,
        variableBorrowRate: reserve.borrowingEnabled ? Number(reserve.variableBorrowAPY) : -1,
        avg30DaysVariableRate: Number(reserve.avg30DaysVariableBorrowRate),
        borrowingEnabled: reserve.borrowingEnabled,
        stableBorrowRateEnabled: reserve.stableBorrowRateEnabled,
        isFreezed: reserve.isFrozen,
        aincentivesAPR: marketsAPR[reserve.id]?.deposit || '0',
        vincentivesAPR: marketsAPR[reserve.id]?.borrow || '0',
        sincentivesAPR: '0',
      };
    });

  if (sortDesc) {
    if (sortName === 'currencySymbol') {
      sortedData.sort((a, b) =>
        b.currencySymbol.toUpperCase() < a.currencySymbol.toUpperCase() ? -1 : 0
      );
    } else {
      // @ts-ignore
      sortedData.sort((a, b) => a[sortName] - b[sortName]);
    }
  } else {
    if (sortName === 'currencySymbol') {
      sortedData.sort((a, b) =>
        a.currencySymbol.toUpperCase() < b.currencySymbol.toUpperCase() ? -1 : 0
      );
    } else {
      // @ts-ignore
      sortedData.sort((a, b) => b[sortName] - a[sortName]);
    }
  }
  const [switchAPR] = useState(false);

  // const triggerSwitchAPR = () => {
  //   setSwitchAPR(!switchAPR);
  // };

  return (
    <ScreenWrapper
      pageTitle={intl.formatMessage(messages.pageTitle)}
      isTitleOnDesktop={true}
      className="Markets"
      withMobileGrayBg={true}
    >
      <div className="marketInfo">
        <TopPanelWrapper isCollapse={true} withoutCollapseButton={true} width="44%">
          <div className="WXTInfo">
            <div className="info-block">
              <p className="info-block__title">WXT Locked</p>
              <p className="info-block__number">
                <CompactNumber
                  value={lockedSupply}
                  maximumFractionDigits={2}
                  minimumFractionDigits={1}
                />
              </p>
              <p style={{ color: currentTheme.lightGray.hex }}>
                ${' '}
                <CompactNumber
                  value={+lockedSupply * priceUSD}
                  maximumFractionDigits={2}
                  minimumFractionDigits={1}
                />{' '}
                USD
              </p>
            </div>
            <div className="info-block">
              <p className="info-block__title">WXT Staked</p>
              <p className="info-block__number">
                <CompactNumber
                  value={stakedSupply}
                  maximumFractionDigits={2}
                  minimumFractionDigits={1}
                />
              </p>
              <p style={{ color: currentTheme.lightGray.hex }}>
                ${' '}
                <CompactNumber
                  value={+stakedSupply * priceUSD}
                  maximumFractionDigits={2}
                  minimumFractionDigits={1}
                />{' '}
                USD
              </p>
            </div>
          </div>
        </TopPanelWrapper>
        <TopPanelWrapper isCollapse={true} withoutCollapseButton={true} width="56%">
          <div className="WXTInfo">
            <div className="info-block">
              <p className="info-block__title">WXT Price</p>
              <p className="info-block__number">${priceUSD.toFixed(4)}</p>
            </div>
            <div className="info-block">
              <p className="info-block__title">Circulating Supply</p>
              <p className="info-block__number">
                <CompactNumber
                  value={totalSupply}
                  maximumFractionDigits={2}
                  minimumFractionDigits={1}
                />
              </p>
            </div>
            <div className="info-block">
              <p className="info-block__title">Market Cap</p>
              <p className="info-block__number">
                $
                <CompactNumber
                  value={marketCap}
                  maximumFractionDigits={2}
                  minimumFractionDigits={1}
                />
              </p>
            </div>
          </div>
        </TopPanelWrapper>
      </div>
      <TopPanelWrapper isCollapse={true} withoutCollapseButton={true}>
        <div className="Markets__state">
          <div className="Markets__devide">
            <div className="Markets__top-content">
              <TotalMarketsSize value={totalLockedInUsd.toNumber()} />
            </div>
            <div className="Markets__top-content">
              <TotalPlatformFees
                value={Number(
                  ethers.utils.formatUnits(BigNumber.from(platformFees?.total).mul(2), 6).toString()
                )}
              />
            </div>
          </div>
          <div className="Markets__devide">
            <a
              href="https://traderjoexyz.com/trade?inputCurrency=AVAX&outputCurrency=0xfcDe4A87b8b6FA58326BB462882f1778158B02F1#/"
              target={'_blank'}
              rel="noreferrer"
              className="link-button"
              style={{
                backgroundColor: currentTheme.switchOnColor.hex,
                color: currentTheme.maxWhite.hex,
                textAlign: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              View WXT on Trader Joe
            </a>
            {currentAccount && isAllowedChain(chainId) && (
              <button
                className="link-button"
                onClick={() => claimAll()}
                style={{
                  backgroundColor: currentTheme.nereusYellow.hex,
                  color: currentTheme.whiteElement.hex,
                }}
              >
                {`Vest ${divideIntegerWithComa(
                  bigFloatToFixed(WXTWithDecimals(totalClaimableTokens), 6)
                )} WXT`}
              </button>
            )}
          </div>
        </div>
      </TopPanelWrapper>
      {/* <div className="SwitchButtonWrapper">
        <div className="SwitchButtonText">Show Full APR Details</div>
        <SwitchButton onChange={triggerSwitchAPR} label="changeToTotal" />
      </div> */}

      <switchAPRContext.Provider value={switchAPR}>
        {/* TODO: not hide table by css, instead it should be used useMediaQuery hook*/}
        <MarketTable
          sortName={sortName}
          setSortName={setSortName}
          sortDesc={sortDesc}
          setSortDesc={setSortDesc}
        >
          {sortedData.map((item, index) => (
            <MarketTableItem {...item} isPriceInUSD={true} key={index} />
          ))}
        </MarketTable>
      </switchAPRContext.Provider>

      <div className="Markets__mobile--cards">
        {currentMarketData.enabledFeatures?.incentives && (
          <div className="Markets__help--modalInner">
            <BorrowRatesHelpModal // TO-DO: Pass rewardTokenSymbol to this component
              className="Markets__help--modal"
              text={intl.formatMessage(messages.rewardsInformation)}
              iconSize={14}
            />
          </div>
        )}

        {sortedData.map((item, index) => (
          <MarketMobileCard {...item} key={index} />
        ))}
      </div>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>

      <style jsx={true} global={true}>{`
        @import 'src/_mixins/screen-size';
        .Markets {
          &__top-content {
            color: ${currentTheme.white.hex};
          }

          &__marketSwitcher--title {
            color: ${currentTheme.textDarkBlue.hex};
          }

          &__size {
            @include respond-to(sm) {
              background: ${currentTheme.whiteElement.hex};
            }
          }
        }

        .marketInfo {
          color: ${currentTheme.white.hex};
        }
      `}</style>
    </ScreenWrapper>
  );
}
