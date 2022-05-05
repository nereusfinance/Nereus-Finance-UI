import React, { ReactNode, useEffect, useState } from 'react';
import useContracts from '../../hooks/useContracts';
import { BigNumber } from 'ethers';
import { useUserWalletDataContext } from '../../../../libs/web3-data-provider';
import {
  getNetworkConfig,
  getProvider,
} from '../../../../helpers/config/markets-and-network-config';
import { useProtocolDataContext } from '../../../../libs/protocol-data-provider';
import { useWeb3React } from '@web3-react/core';
import { useWXTPriceDataContext } from '../../../../libs/wxt-price-data-provider';
import { ChainId } from '../../../../helpers/config/types';

interface IClaimableReward {
  token: string;
  amount: BigNumber;
  symbol: string;
  decimals: number;
}

interface IStakeLockDataContext {
  makeStakeLock(amount: BigNumber, isLocking: boolean): any;
  approve(): any;
  isApproveEnough(amount: BigNumber): Promise<boolean>;
  claimUnlockedReward(): any;
  claimTotalEarnedBalance(): any;
  calculateLockedReward(amount: BigNumber, seconds: BigNumber): any;
  calculateStakedReward(amount: BigNumber, seconds: BigNumber): any;
  getRewards(addresses: string[]): void;
  withdrawExpiredLocks(): void;
  lockedSupply: string;
  stakedSupply: string;
  totalSupply: string;
  balanceData: {
    penaltyPercent: BigNumber;
    lockedWXT: BigNumber;
    locks: any;
    unlockedBalance: BigNumber;
    totalBalance: BigNumber;
    lockExpired: BigNumber;
    fullWithdrawalPenalty: BigNumber;
    earnedBalance: BigNumber;
    amountWithPenalty: BigNumber;
    earningsData: any;
    rewardRate: number;
  };
  claimableRewards: IClaimableReward[];
}

const defaultBalanceData = {
  penaltyPercent: BigNumber.from('0'),
  lockedWXT: BigNumber.from('0'),
  locks: [],
  unlockedBalance: BigNumber.from('0'),
  totalBalance: BigNumber.from('0'),
  lockExpired: BigNumber.from('0'),
  fullWithdrawalPenalty: BigNumber.from('0'),
  amountWithPenalty: BigNumber.from('0'),
  earnedBalance: BigNumber.from('0'),
  earningsData: [],
  rewardRate: 0,
};

const chainId = process.env.REACT_APP_CHAIN_ID === '5' ? ChainId.goerli : ChainId.avalanche;
const networkConfig = getNetworkConfig(chainId);

export const StakeLockDataContext = React.createContext<IStakeLockDataContext>({
  makeStakeLock: () => {},
  claimUnlockedReward: () => {},
  claimTotalEarnedBalance: () => {},
  calculateLockedReward: () => {},
  calculateStakedReward: () => {},
  approve: () => {},
  isApproveEnough: async () => true,
  getRewards: () => {},
  withdrawExpiredLocks: () => {},
  balanceData: defaultBalanceData,
  lockedSupply: '0',
  stakedSupply: '0',
  totalSupply: '0',
  claimableRewards: [],
});

const contractAddress =
  networkConfig.addresses.multiFeeDistributionProvider ||
  '0xFa3a8b4Ef20C595c6888E667903D7Ab56C86Fde9';

const WXTAddress = networkConfig.rewardTokenAddress || '0x9099ee16633d65A6492e69173e42e926D91CA2c2';

export function useStakeLockDataContext() {
  return React.useContext(StakeLockDataContext);
}

export function StakeLockDataContextProvider({ children }: { children: ReactNode }) {
  const { library } = useWeb3React();
  const { chainId, blockNumber } = useProtocolDataContext();
  const { WXTWithDecimals } = useWXTPriceDataContext();
  const { currentAccount } = useUserWalletDataContext();
  const { stakingContract, rewardTokenContract, getERC20Contract } = useContracts(
    library ? library.getSigner() : getProvider(chainId)
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [totalEarnedBalance, setTotalEarnedBalance] = useState(BigNumber.from('0'));
  const [lockedSupply, setLockedSupply] = useState('0');
  const [totalSupply, setTotalSupply] = useState('0');
  const [stakedSupply, setStakedSupply] = useState('0');
  const [balanceData, setBalanceData] = useState(defaultBalanceData);
  const [claimableRewards, setClaimableRewards] = useState<IClaimableReward[]>([]);

  function claimUnlockedReward() {
    stakingContract.withdraw(balanceData.unlockedBalance);
  }

  async function calculateStakedReward(amount: BigNumber, seconds: BigNumber) {
    const total = await stakingContract.totalSupply();
    const rewardData = await stakingContract.rewardData(WXTAddress);
    const rewardFull = seconds
      .mul(rewardData.rewardRate)
      .mul(BigNumber.from('1000000000000000000'))
      .mul(amount)
      .div(BigNumber.from('1000000000000000000'));
    if (total.isZero()) {
      return BigNumber.from('0');
    } else {
      return rewardFull.div(total);
    }
  }

  async function calculateLockedReward(amount: BigNumber, seconds: BigNumber) {
    const locked = await stakingContract.lockedSupply();
    const rewardData = await stakingContract.rewardData(WXTAddress);
    const rewardFull = seconds
      .mul(rewardData.rewardRate)
      .mul(BigNumber.from('1000000000000000000'))
      .mul(amount)
      .div(BigNumber.from('1000000000000000000'));
    if (locked.isZero()) {
      return BigNumber.from('0');
    } else {
      return rewardFull.div(locked);
    }
  }

  function claimTotalEarnedBalance() {
    stakingContract.exit(false);
  }
  async function getStakeLockData() {
    // const penaltyPercent = 7500;
    const lockedSupply = await stakingContract.lockedSupply();
    const totalSupply = await stakingContract.totalSupply();
    // console.log('lockedSupply', lockedSupply.toString());
    // console.log('stakedSupply(totalSupply-lockedSupply)', totalSupply.sub(lockedSupply).toString());
    // console.log('totalSupply(staked+locked)', totalSupply.toString());
    setTotalSupply(totalSupply);
    setStakedSupply(WXTWithDecimals(totalSupply.sub(lockedSupply)));
    setLockedSupply(WXTWithDecimals(lockedSupply));
    if (currentAccount) {
      //       const penaltyPercent = await stakingContract.penaltyPercent();
      const penaltyPercent = BigNumber.from('7500');
      const lockData = await stakingContract.lockedBalances(currentAccount);
      const rewardData = await stakingContract.rewardData(WXTAddress);
      const totalBalance = await stakingContract.totalBalance(currentAccount);
      const unlockedBalance = await stakingContract.unlockedBalance(currentAccount);
      const fullWithdrawal = await stakingContract.withdrawableBalance(currentAccount);
      const earnedBalances = await stakingContract.earnedBalances(currentAccount);
      setTotalEarnedBalance(fullWithdrawal.penaltyAmount);
      setBalanceData({
        penaltyPercent: penaltyPercent,
        lockedWXT: lockData.locked,
        locks: lockData.lockData,
        lockExpired: lockData.unlockable,
        unlockedBalance: unlockedBalance,
        totalBalance: totalBalance,
        fullWithdrawalPenalty: fullWithdrawal.penaltyAmount,
        rewardRate: rewardData.rewardRate,
        amountWithPenalty: fullWithdrawal.penaltyAmount.mul(10000).div(penaltyPercent),
        earnedBalance: earnedBalances.total,
        earningsData: earnedBalances.earningsData,
      });
    }
  }

  useEffect(() => {
    getStakeLockData();
  }, [blockNumber, currentAccount]);

  async function getSingleClaimableReward(reward: any): Promise<IClaimableReward> {
    const rewardContract = getERC20Contract(reward.token);
    const tokenSymbol = await rewardContract.symbol();
    const tokenDecimals = (await rewardContract.decimals()).toNumber();
    return {
      token: reward.token,
      amount: reward.amount,
      decimals: tokenDecimals,
      symbol: tokenSymbol,
    };
  }

  async function getClaimableRewards() {
    const claimableRewardsRaw = await stakingContract.claimableRewards(currentAccount);
    const newClaimableRewards = await Promise.all(
      claimableRewardsRaw
        .filter((item: any) => !item.amount.isZero())
        .map((item: any) => getSingleClaimableReward(item))
    );
    setClaimableRewards(newClaimableRewards);
  }

  useEffect(() => {
    if (!currentAccount) return;
    getClaimableRewards();
  }, [blockNumber, currentAccount]);

  function makeStakeLock(amount: BigNumber, isLocking: boolean) {
    if (currentAccount) {
      return stakingContract.stake(amount, isLocking);
    }
  }

  function approve() {
    return rewardTokenContract.approve(contractAddress, BigNumber.from(2).pow(255));
  }

  async function isApproveEnough(amount: BigNumber) {
    if (!currentAccount) return false;
    const allowance = await rewardTokenContract.allowance(currentAccount, contractAddress);
    return amount.lt(allowance);
  }

  function getRewards(addresses: string[]) {
    if (currentAccount) {
      stakingContract.getReward(addresses);
    }
  }

  function withdrawExpiredLocks() {
    if (currentAccount) {
      stakingContract.withdrawExpiredLocks();
    }
  }

  return (
    <StakeLockDataContext.Provider
      value={{
        makeStakeLock,
        balanceData,
        claimUnlockedReward,
        claimTotalEarnedBalance,
        lockedSupply,
        stakedSupply,
        totalSupply,
        approve,
        isApproveEnough,
        claimableRewards,
        getRewards,
        calculateLockedReward,
        calculateStakedReward,
        withdrawExpiredLocks,
      }}
    >
      {children}
    </StakeLockDataContext.Provider>
  );
}
