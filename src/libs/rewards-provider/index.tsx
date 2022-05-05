import { ReactNode, useContext, useState, createContext, useEffect } from 'react';
import axios from 'axios';
import { getNetworkConfig } from '../../helpers/config/markets-and-network-config';
import { useWXTPriceDataContext } from '../wxt-price-data-provider';
import { ethers } from 'ethers';
import { ChainId } from '../../helpers/config/types';

interface PlatformFees {
  weekly: string;
  total: string;
}

interface PlatformPenalties {
  weekly: string;
}

interface RewardsContextProps {
  platformFees: PlatformFees;
  platformPenalties: PlatformPenalties;
}

const RewardsContext = createContext({} as RewardsContextProps);

interface RewardsProviderProps {
  children: ReactNode;
}

export function RewardsProvider({ children }: RewardsProviderProps) {
  const chainId = process.env.REACT_APP_CHAIN_ID === '5' ? ChainId.goerli : ChainId.avalanche;
  const networkConfig = getNetworkConfig(chainId);
  const { priceUSD } = useWXTPriceDataContext();
  const [rewards, setRewards] = useState({
    platformFees: {
      weekly: '0',
      total: '0',
    },
    platformPenalties: {
      weekly: '0',
    },
  });

  useEffect(() => {
    if (priceUSD) {
      // console.log('priceUSD', priceUSD);
      const priceInUSDT = ethers.utils.parseUnits(String(priceUSD.toFixed(6)), 6);
      axios({
        method: 'GET',
        url: networkConfig.rewardsHistoryUrl,
      }).then((response) => {
        const platformFees = response.data;
        const weeklyPlatformPenalties = ethers.BigNumber.from(platformFees.platformPenalties.weekly)
          .mul(priceInUSDT)
          .div(ethers.constants.WeiPerEther);
        if (platformFees) {
          setRewards({ ...platformFees, platformPenalties: { weekly: weeklyPlatformPenalties } });
        }
      });
    }
  }, [priceUSD]);

  return (
    <RewardsContext.Provider
      value={{ platformFees: rewards.platformFees, platformPenalties: rewards.platformPenalties }}
    >
      {children}
    </RewardsContext.Provider>
  );
}

export const useRewardsContext = () => useContext(RewardsContext);
