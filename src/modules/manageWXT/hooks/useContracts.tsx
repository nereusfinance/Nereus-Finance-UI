import { ethers } from 'ethers';
import stakingContractAbi from '../back/MultiFeeDistribution.json';
import stakingPool from '../back/StakingPool.json';
import erc20Abi from '../back/ERC20.json';
import nxusd_3crvABI from '../back/nxusd_3crv.json';
import wxt_nxusdABI from '../back/wxt_nxusd.json';
import chefIncentivesControllerData from '../../../libs/nereus-incentive-data-provider/ChefIncentivesControllerABI.json';
import { getNetworkConfig } from '../../../helpers/config/markets-and-network-config';
import { ChainId } from '../../../helpers/config/types';
import { stakeConfig } from '../../../ui-config';

export default function useContracts(provider: any): {
  stakingContract: ethers.Contract;
  rewardTokenContract: ethers.Contract;
  chefIncentivesControllerContract: ethers.Contract;
  stakingPoolContract(address: string): ethers.Contract;
  nxusd_3crvToken: ethers.Contract;
  wxt_nxusdToken: ethers.Contract;
  getERC20Contract(address: string): ethers.Contract;
} {
  const chainId = process.env.REACT_APP_CHAIN_ID === '5' ? ChainId.goerli : ChainId.avalanche;
  const networkConfig = getNetworkConfig(chainId);

  const stakingContractAddress =
    networkConfig.addresses.multiFeeDistributionProvider ||
    '0xFa3a8b4Ef20C595c6888E667903D7Ab56C86Fde9';

  const stakingContract = new ethers.Contract(stakingContractAddress, stakingContractAbi, provider);

  const rewardTokenContract = new ethers.Contract(
    stakeConfig?.tokens.nxusd_3crv.STAKING_REWARD_TOKEN ||
      '0x2D53d9aDC63482B0452eb2EDCc2bDFB4c110D3Cd',
    erc20Abi,
    provider
  );
  const nxusd_3crvToken = new ethers.Contract(
    stakeConfig?.tokens.nxusd_3crv.LP_TOKEN || '0x6BF6fc7EaF84174bb7e1610Efd865f0eBD2AA96D',
    nxusd_3crvABI,
    provider
  );
  const wxt_nxusdToken = new ethers.Contract(
    stakeConfig?.tokens.wxt_nxusd.LP_TOKEN || '0x5A7a792d70d1eA39708b9ad9531069E73795C6a4',
    wxt_nxusdABI,
    provider
  );
  function stakingPoolContract(address: string) {
    return new ethers.Contract(address, stakingPool, provider);
  }

  const chefIncentivesControllerContract = new ethers.Contract(
    networkConfig.addresses.chefIncentivesProvider || '0x7287A7f14Ef7595AD7D339ad0a715898518c11Fe',
    chefIncentivesControllerData.abi,
    provider
  );

  function getERC20Contract(address: string) {
    return new ethers.Contract(address, erc20Abi, provider);
  }

  return {
    stakingContract,
    rewardTokenContract,
    chefIncentivesControllerContract,
    stakingPoolContract,
    nxusd_3crvToken,
    wxt_nxusdToken,
    getERC20Contract,
  };
}
