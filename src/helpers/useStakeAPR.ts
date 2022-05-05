import { useWXTPriceDataContext } from '../libs/wxt-price-data-provider';
import { useStakeLockDataContext } from '../modules/manageWXT/back/StakeLockDataContext';
import { useRewardsContext } from '../libs/rewards-provider';
import { BigNumber, ethers } from 'ethers';

export default function useStakeAPR() {
  const { priceUSD } = useWXTPriceDataContext();
  const { totalSupply } = useStakeLockDataContext();
  const { platformFees } = useRewardsContext();

  const weeklyFees = () => {
    return Number(BigNumber.from(platformFees.weekly).toString());
  };
  // console.log('platformFees.weekly', weeklyFees() / 1e6);
  // console.log('stakedSupply', stakedSupply);
  // console.log('priceUSD', priceUSD);
  const stakeAPR =
    ((365 * (weeklyFees() / 1e6 / 7)) /
      (Number(ethers.utils.formatEther(totalSupply)) * priceUSD)) *
    100;
  // console.log('stakeAPR', stakeAPR);
  return { stakeAPR: stakeAPR || 0 };
}
