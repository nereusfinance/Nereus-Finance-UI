import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useThemeContext } from '@aave/aave-ui-kit';
import { ethers } from 'ethers';

import staticStyles from './style';
import { useProtocolDataContext } from '../../libs/protocol-data-provider';
import whiteCloseIcon from '../../images/whiteCloseIcon.svg';
import logo from '../../images/NoNameLogo.svg';
import { useHistory } from 'react-router-dom';
import { useDynamicPoolDataContext, useStaticPoolDataContext } from '../../libs/pool-data-provider';
import { BigNumber, valueToBigNumber } from '@aave/protocol-js';
import { useWXTPriceDataContext } from '../../libs/wxt-price-data-provider';
import { bigFloatToFixed } from '../../libs/utils/bigFloatToFixed';
import { CompactNumber } from '../basic/CompactNumber';
import { useStakeLockDataContext } from '../../modules/manageWXT/back/StakeLockDataContext';
import { useRewardsContext } from '../../libs/rewards-provider';
interface FooterProps {
  inside?: boolean;
}

export default function Footer({ inside }: FooterProps) {
  const [visible, setVisible] = useState(true);
  const history = useHistory();
  const { currentTheme } = useThemeContext();
  const { reserves } = useDynamicPoolDataContext();
  const { marketRefPriceInUsd } = useStaticPoolDataContext();
  const { userBalance, WXTWithDecimals, priceUSD } = useWXTPriceDataContext();
  const [healthFactor, setHealthFactor] = useState('-');
  const { blockNumber } = useProtocolDataContext();
  const { lockedSupply, totalSupply } = useStakeLockDataContext();
  const { platformFees, platformPenalties } = useRewardsContext();
  const { user } = useDynamicPoolDataContext();
  const [dailyRevenue, setDailyRevenue] = useState(0);

  useEffect(() => {
    const totalDailyPlatformFees = Number(
      ethers.utils.formatUnits(ethers.BigNumber.from(platformFees.weekly).div(7), 6)
    );
    const totalDailyPlatformPenalties = Number(
      ethers.utils.formatUnits(ethers.BigNumber.from(platformPenalties.weekly).div(7), 6)
    );
    const normalizedUserBalance = Number(ethers.utils.formatUnits(userBalance.toString(), 18));
    const normalizedTotalStakedAndLocked = Number(
      ethers.utils.formatUnits(totalSupply.toString(), 18)
    );
    const dailyPlatformFees =
      (totalDailyPlatformFees * normalizedUserBalance) / normalizedTotalStakedAndLocked || 0;
    const dailyPenaltyFees =
      (totalDailyPlatformPenalties * normalizedUserBalance) / Number(lockedSupply) || 0;

    setDailyRevenue(dailyPenaltyFees + Number(dailyPlatformFees));
    // console.group('Debug data:');
    // console.log('platformFees.weekly', platformFees.weekly);
    // console.log('platformPenalties.weekly', platformPenalties.weekly.toString());
    // console.log('totalDailyPlatformFees', totalDailyPlatformFees.toString());
    // console.log('totalDailyPlatformPenalties', totalDailyPlatformPenalties.toString());
    // console.log('user Balance', normalizedUserBalance);
    // console.log('total Staked and Locked', normalizedTotalStakedAndLocked);
    // console.log('lockedSupply', lockedSupply);
    // console.log('dailyPlatformFees', dailyPlatformFees);
    // console.log('dailyPenaltyFees', dailyPenaltyFees);
    // console.log('dailyRevenue', dailyPenaltyFees + Number(dailyPlatformFees));
    // console.groupEnd();
  }, [platformFees, userBalance, totalSupply]);

  let totalSizeInUsd = valueToBigNumber('0');
  reserves
    .filter((res) => res.isActive)
    .forEach((reserve) => {
      const totalLiquidityInUSD = valueToBigNumber(reserve.totalLiquidity)
        .multipliedBy(reserve.priceInMarketReferenceCurrency)
        .multipliedBy(marketRefPriceInUsd)
        .toNumber();
      totalSizeInUsd = totalSizeInUsd.plus(valueToBigNumber(totalLiquidityInUSD));
    });
  useEffect(() => {
    if (window.location.hash === '#/manageWXT') {
      setVisible(false);
    }
  }, [window.location.hash]);
  useEffect(() => {
    if (user?.healthFactor) {
      const formattedHealthFactor = valueToBigNumber(user.healthFactor)
        .toFixed(2, BigNumber.ROUND_DOWN)
        .toString();
      setHealthFactor(formattedHealthFactor);
    } else {
      setHealthFactor('-');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
  // async function a(){
  //   let qs = `?start=1&limit=5000&convert=USD`
  //   try {
  //     let res = await axios.get('http://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest' + qs, {
  //       headers: { 'X-CMC_PRO_API_KEY': '35d3d124-a7bd-4951-83c6-cdab3c250423' }
  //     });
  //     console.log(res)
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  // a()
  return (
    <footer style={{ marginTop: '1px' }}>
      {visible && (
        <div className="WalletModal">
          <img src={logo} alt="logo" className="WalletModal__logo" />
          <div className="WalletModal__row">
            <p>
              Your WXT wallet ballance:{' '}
              <span className="WalletModal__row-value">
                {bigFloatToFixed(WXTWithDecimals(userBalance), 3)}
              </span>
            </p>
          </div>
          <div className="WalletModal__row">
            <p>
              If you locked it, you would earn an extra:{' '}
              <span className="WalletModal__row-value">
                $
                <CompactNumber
                  value={dailyRevenue.toFixed(4)}
                  maximumFractionDigits={4}
                  minimumFractionDigits={4}
                />
                /day
              </span>
            </p>
          </div>
          <button
            className="WalletModal__submit-btn Button"
            onClick={() => history.push('/manageWXT')}
          >
            Go to Manage WXT
          </button>
          <img
            src={whiteCloseIcon}
            alt="closeIcon"
            className="WalletModal__close-btn"
            onClick={() => setVisible(!visible)}
          />
        </div>
      )}
      <div className={classNames('Footer', { Footer__inside: inside })}>
        {/*<DarkModeSwitcher />*/}
        <div className="flex-item">
          {healthFactor > '0' ? (
            <>
              <p>Your Health Ratio</p>
              <p>{healthFactor}</p>
            </>
          ) : null}
          <p>Market Size </p>
          <p>
            <CompactNumber
              value={totalSizeInUsd.toString()}
              maximumFractionDigits={2}
              minimumFractionDigits={1}
            />
          </p>
        </div>
        <div className="flex-item">
          <p>WXT</p>
          <p>${priceUSD}</p>
          <div className="darkGreenCycle">
            <div className="lightGreenCycle" />
          </div>
          <p>{blockNumber}</p>
        </div>
        {/*<LangSwitcher />*/}
        <style jsx={true} global={true}>
          {staticStyles}
        </style>
        <style jsx={true} global={true}>{`
          @import 'src/_mixins/screen-size';
          .Button {
            background-color: ${currentTheme.white.hex};
            opacity: 0.85;
            color: ${currentTheme.headerBg.hex};
            &:after {
              height: 1px;
              width: 1px;
              background-color: ${currentTheme.headerBg.hex};
            }
          }
          .WalletModal {
            background-color: ${currentTheme.headerBg.hex};
            color: ${currentTheme.maxWhite.hex};
          }
          .darkGreenCycle {
            background-color: ${currentTheme.statusDarkGreen.hex};
            height: 12px;
            width: 12px;
            border-radius: 50%;
            position: relative;
            top: 0;
          }
          .lightGreenCycle {
            background-color: ${currentTheme.green.hex};
            height: 6px;
            width: 6px;
            margin: auto;
            border-radius: 50%;
            margin-top: 3px;
          }
          .flex-item {
            background: ${currentTheme.mainBg.hex};
            color: ${currentTheme.white.hex};
            &__top-contentWrapper {
              background: ${currentTheme.headerBg.hex};
              &:after {
                background: ${currentTheme.headerBg.hex};
              }
            }
          }
        `}</style>
      </div>
    </footer>
  );
}
