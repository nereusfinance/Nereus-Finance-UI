import React, { ReactNode, useEffect, useState } from 'react';
import useContracts from '../../modules/manageWXT/hooks/useContracts';
import { BigNumber, ethers } from 'ethers';
import { useUserWalletDataContext } from '../web3-data-provider';
import { getProvider } from '../../helpers/config/markets-and-network-config';
import { useProtocolDataContext } from '../protocol-data-provider';
import { useWeb3React } from '@web3-react/core';
import { stakeConfig } from '../../ui-config';
import { useWXTPriceDataContext } from '../wxt-price-data-provider';
import { calculateIncentiveAPR } from '@aave/math-utils/dist/cjs/formatters/incentive/calculate-incentive-apr';
import { useDynamicPoolDataContext } from '../pool-data-provider';

const defaultBalanceData = {
  tokenSymbol: '',
  stakingAPR: '',
  rewardsPerDay: BigNumber.from('1'),
  rewardsPerWeek: BigNumber.from('1'),
  stakedByUser: '',
  vestRewardByUser: BigNumber.from('1'),
  userBalance: '',
  totalLPBalance: '',
  LPTokenPrice: 0,
  userShare: 0,
  dailyRevenue: '',
  weeklyRevenue: '',
  monthlyRevenue: '',
  yearlyRevenue: '',
  userStakeInUsd: 0,
};

const defaultArr = [defaultBalanceData, defaultBalanceData];

export const StakeLPDataContext = React.createContext({
  balanceLPData: defaultArr,
});

export function useStakeLPDataContext() {
  return React.useContext(StakeLPDataContext);
}

export function StakeLPDataContextProvider({ children }: { children: ReactNode }) {
  const { currentAccount: walletAddress } = useUserWalletDataContext();
  const { library } = useWeb3React();
  const { chainId, blockNumber } = useProtocolDataContext();
  const { currentAccount } = useUserWalletDataContext();

  const [balanceLPData, setBalanceLPData] = useState(defaultArr);
  const { reserves } = useDynamicPoolDataContext();
  const { stakingPoolContract, nxusd_3crvToken, wxt_nxusdToken, chefIncentivesControllerContract } =
    useContracts(library ? library.getSigner() : getProvider(chainId));
  const { priceUSD: priceUSDWXT } = useWXTPriceDataContext();

  async function getStakeData() {
    let arr = [];

    if (currentAccount) {
      for (let token in stakeConfig?.tokens) {
        const poolContract = stakingPoolContract(stakeConfig?.tokens[token].STAKING_POOL);

        const totalAllocPoint = await chefIncentivesControllerContract.totalAllocPoint();
        const userInfo = await chefIncentivesControllerContract.poolInfo(
          stakeConfig?.tokens[token].STAKING_POOL
        );
        const userClaimableRewardContract = await chefIncentivesControllerContract.claimableReward(
          walletAddress,
          [stakeConfig?.tokens.nxusd_3crv.STAKING_POOL, stakeConfig?.tokens.wxt_nxusd.STAKING_POOL]
        );
        const userClaimableReward = userClaimableRewardContract[0].add(
          userClaimableRewardContract[1]
        );
        const ChefControllerRewardsPerSecond =
          await chefIncentivesControllerContract.rewardsPerSecond();
        const tokenSymbol =
          token === 'nxusd_3crv' ? await nxusd_3crvToken.symbol() : await wxt_nxusdToken.symbol();
        const allocPoint = userInfo[1];
        const tokenTotalSupply =
          token === 'nxusd_3crv'
            ? await nxusd_3crvToken.totalSupply()
            : await wxt_nxusdToken.totalSupply();

        const userBalance =
          token === 'nxusd_3crv'
            ? await nxusd_3crvToken.balanceOf(walletAddress)
            : await wxt_nxusdToken.balanceOf(walletAddress);

        const userPoolBalance = await poolContract.balanceOf(walletAddress);
        const poolTotalSupply = await poolContract.totalSupply();

        const wxt_nxusdBalances = await wxt_nxusdToken.getReserves();
        const LPWXTBalance = wxt_nxusdBalances[1];

        const LPNXUSdBalance =
          token === 'nxusd_3crv' ? await nxusd_3crvToken.balances(0) : wxt_nxusdBalances[0];

        const av3CRVPrice = await nxusd_3crvToken.get_virtual_price();
        const LPav3CRVBalance = await nxusd_3crvToken.balances(1);

        let LPpriceInUSD = 0;
        if (Number.isNaN(1) || Number.isNaN(priceUSDWXT)) {
          return;
        } else {
          LPpriceInUSD =
            token === 'nxusd_3crv'
              ? (+ethers.utils.formatEther(LPNXUSdBalance) +
                  +ethers.utils.formatEther(LPav3CRVBalance) *
                    +ethers.utils.formatEther(av3CRVPrice)) /
                +ethers.utils.formatEther(tokenTotalSupply)
              : (+ethers.utils.formatEther(LPNXUSdBalance) +
                  +ethers.utils.formatEther(LPWXTBalance) * priceUSDWXT) /
                +ethers.utils.formatEther(tokenTotalSupply);
        }

        const userStakeInUsd = Number(ethers.utils.formatEther(userPoolBalance)) * LPpriceInUSD;
        let userShare = 0;
        if (Number(poolTotalSupply.toString()) === 0) {
          userShare = 0;
        } else {
          userShare =
            (100 * Number(userPoolBalance.toString())) / Number(poolTotalSupply.toString());
        }
        const rewardsPerSecond = allocPoint
          .mul(ChefControllerRewardsPerSecond)
          .div(totalAllocPoint);
        const rewardsPerDay = rewardsPerSecond.mul(BigNumber.from('86400'));
        const rewardsPerWeek = rewardsPerDay.mul(BigNumber.from('7'));

        const dailyRevenue =
          (userShare / 100) * Number(ethers.utils.formatEther(rewardsPerDay)) * priceUSDWXT;
        const weeklyRevenue = dailyRevenue * 7;
        const monthlyRevenue = weeklyRevenue * 4;
        const yearlyRevenue = monthlyRevenue * 12;

        const APR = calculateIncentiveAPR({
          emissionPerSecond: rewardsPerSecond.toString(),
          rewardTokenPriceInMarketReferenceCurrency: priceUSDWXT.toString(),
          totalTokenSupply: poolTotalSupply.toString(),
          priceInMarketReferenceCurrency: LPpriceInUSD.toString(),
          decimals: 18,
          rewardTokenDecimals: 18,
        });

        arr.push({
          tokenSymbol: tokenSymbol,
          stakingAPR: APR,
          rewardsPerDay: rewardsPerDay,
          rewardsPerWeek: rewardsPerWeek,
          stakedByUser: ethers.utils.formatEther(userPoolBalance),
          vestRewardByUser: userClaimableReward,
          userBalance: ethers.utils.formatEther(userBalance),
          totalLPBalance: ethers.utils.formatEther(poolTotalSupply),
          LPTokenPrice: LPpriceInUSD,
          userShare: userShare,
          dailyRevenue: dailyRevenue.toString(),
          weeklyRevenue: weeklyRevenue.toString(),
          monthlyRevenue: monthlyRevenue.toString(),
          yearlyRevenue: yearlyRevenue.toString(),
          userStakeInUsd: userStakeInUsd,
        });
      }
    }
    setBalanceLPData(arr);
  }

  useEffect(() => {
    getStakeData();
  }, [blockNumber, currentAccount, reserves]);

  return (
    <StakeLPDataContext.Provider
      value={{
        balanceLPData,
      }}
    >
      {children}
    </StakeLPDataContext.Provider>
  );
}
