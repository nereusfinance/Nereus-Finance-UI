import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames';

import LabeledSwitcher from '../../../../components/basic/LabeledSwitcher';
import ContentWrapper from '../../../../components/wrappers/ContentWrapper';
import { StakingTokenCard } from '../../components/StakingTokenCard';

import { useStakeLPDataContext } from '../../../../libs/StakeLPContext';
import { useWXTPriceDataContext } from '../../../../libs/wxt-price-data-provider';
import AVAXIcon from '../../../../images/AVAX.svg';
import USDSIcon from '../../../../images/USDS.svg';
import { ethers } from 'ethers';

export default function StakingTokensPanel() {
  const [isShowYourIncentives, setShowYourIncentives] = useState(false);
  const location = useLocation();
  const { balanceLPData } = useStakeLPDataContext();
  const { WXTToUSD } = useWXTPriceDataContext();

  const totalStakedUSDNXUSD3CRV =
    Number(balanceLPData[0].totalLPBalance) * balanceLPData[0].LPTokenPrice;
  const totalStakedUSDNXUSDWXT =
    Number(balanceLPData[1].totalLPBalance) * balanceLPData[1].LPTokenPrice;

  const NXUSD3CRV = 'NXUSD-3CRV';
  const WXTNXUSD = 'WXT-NXUSD';

  return (
    <>
      <ContentWrapper
        className={classNames('StakingWrapper__content-item', {
          StakingWrapper__contentActive: !isShowYourIncentives,
        })}
      >
        {location.pathname === '/staking' && (
          <div className="StakingWrapper__mobile-switcher">
            <LabeledSwitcher
              value={isShowYourIncentives}
              leftOption={NXUSD3CRV}
              rightOption={WXTNXUSD}
              onToggle={setShowYourIncentives}
              width={296}
              darkOnDarkMode={true}
            />
          </div>
        )}
        <StakingTokenCard
          stakeTokenTitle={NXUSD3CRV}
          stakeAPR={Number(balanceLPData[0].stakingAPR) * 100 || 0}
          lpTokenPrice={Number(balanceLPData[0].LPTokenPrice) || 0}
          rewardPerDay={ethers.utils.formatEther(balanceLPData[0].rewardsPerDay)}
          rewardPerWeek={ethers.utils.formatEther(balanceLPData[0].rewardsPerWeek)}
          rewardPerDayUSD={WXTToUSD(balanceLPData[0].rewardsPerDay)}
          rewardPerWeekUSD={WXTToUSD(balanceLPData[0].rewardsPerWeek)}
          stakeContractBalance={balanceLPData[0].totalLPBalance}
          stakeContractBalanceUSD={totalStakedUSDNXUSD3CRV.toString()}
          stakedByUser={Number(balanceLPData[0].stakedByUser) || 0}
          stakedByUserUSD={Number(balanceLPData[0].userStakeInUsd) || 0}
          secondaryLogo={AVAXIcon}
        />
      </ContentWrapper>
      <ContentWrapper
        className={classNames('StakingWrapper__content-item', {
          StakingWrapper__contentActive: isShowYourIncentives,
        })}
      >
        {location.pathname === '/staking' && (
          <div className="StakingWrapper__mobile-switcher">
            <LabeledSwitcher
              value={isShowYourIncentives}
              leftOption={NXUSD3CRV}
              rightOption={WXTNXUSD}
              onToggle={setShowYourIncentives}
              width={296}
              darkOnDarkMode={true}
            />
          </div>
        )}
        <StakingTokenCard
          stakeTokenTitle={WXTNXUSD}
          stakeAPR={Number(balanceLPData[1].stakingAPR) * 100 || 0}
          lpTokenPrice={Number(balanceLPData[1].LPTokenPrice) || 0}
          rewardPerDay={ethers.utils.formatEther(balanceLPData[1].rewardsPerDay)}
          rewardPerWeek={ethers.utils.formatEther(balanceLPData[1].rewardsPerWeek)}
          rewardPerDayUSD={WXTToUSD(balanceLPData[1].rewardsPerDay)}
          rewardPerWeekUSD={WXTToUSD(balanceLPData[1].rewardsPerWeek)}
          stakeContractBalance={balanceLPData[1].totalLPBalance}
          stakeContractBalanceUSD={totalStakedUSDNXUSDWXT.toString()}
          stakedByUser={Number(balanceLPData[1].stakedByUser) || 0}
          stakedByUserUSD={Number(balanceLPData[1].userStakeInUsd) || 0}
          secondaryLogo={USDSIcon}
        />
      </ContentWrapper>
    </>
  );
}
