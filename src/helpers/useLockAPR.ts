import useStakeAPR from './useStakeAPR';
import { useStakeLockDataContext } from '../modules/manageWXT/back/StakeLockDataContext';
import { useWXTPriceDataContext } from '../libs/wxt-price-data-provider';
import { useRewardsContext } from '../libs/rewards-provider';
import { BigNumber } from 'ethers';
// import { ethers } from 'ethers';

export default function useLockAPR() {
  const { priceUSD } = useWXTPriceDataContext();
  const { lockedSupply } = useStakeLockDataContext();
  const { stakeAPR } = useStakeAPR();
  const { platformPenalties } = useRewardsContext();

  const weeklyFees = () => {
    return Number(BigNumber.from(platformPenalties.weekly).toString());
  };
  // console.log('platformPenalties.weekly', weeklyFees() / 1e6);
  // console.log('lockedSupply', lockedSupply);
  // console.log('priceUSD', priceUSD);
  const lockAPR =
    stakeAPR + (100 * 365 * (weeklyFees() / 1e6 / 7)) / (Number(lockedSupply) * priceUSD);
  // console.log('lockAPR', lockAPR);

  return { lockAPR: lockAPR };
}
