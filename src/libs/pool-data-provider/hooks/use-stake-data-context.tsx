import React, { ReactNode, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { useProtocolDataContext } from '../../protocol-data-provider';
import { StakeConfig } from '../../../ui-config';
import { getProvider } from '../../../helpers/config/markets-and-network-config';
import { StakingService } from '../../../helpers/stakeHelper/staking-contract/index';

const StakeDataContext = React.createContext<{
  stakeConfig: StakeConfig;
  stakingService: StakingService;
}>({
  stakeConfig: {} as StakeConfig,
  stakingService: {} as StakingService,
});

export function StakeDataProvider({
  children,
  stakeConfig,
}: {
  stakeConfig: StakeConfig;
  children: ReactNode;
}) {
  const { chainId } = useProtocolDataContext();
  const location = useLocation();
  let selectedStake;

  if (location.pathname.split('/')[3]?.toLowerCase() === 'wxt-nxusd') {
    selectedStake = 'wxt_nxusd';
  } else if (location.pathname.split('/')[3]?.toLowerCase() === 'nxusd3crv') {
    selectedStake = 'nxusd-3crv';
  } else {
    selectedStake =
      location.pathname.split('/')[4]?.toLowerCase() === 'wxt-nxusd' ? 'wxt_nxusd' : 'nxusd_3crv';
  }

  const selectedStakeAddresses = stakeConfig.tokens[selectedStake];
  const rpcProvider = getProvider(chainId) || getProvider(stakeConfig.chainId);
  const stakingService = new StakingService(rpcProvider, {
    STAKING_POOL: selectedStakeAddresses.STAKING_POOL,
    LP_TOKEN: selectedStakeAddresses.LP_TOKEN,
    CHEF_CONTROLLER: selectedStakeAddresses.CHEF_CONTROLLER,
  });
  return (
    <StakeDataContext.Provider
      value={{
        stakeConfig,
        stakingService,
      }}
    >
      {children}
    </StakeDataContext.Provider>
  );
}

export const useStakeDataContext = () => useContext(StakeDataContext);
