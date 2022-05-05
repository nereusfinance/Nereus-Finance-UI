import { providers } from 'ethers';
import React, { PropsWithChildren, useContext, useEffect, useState } from 'react';
import { MarketDataType, NetworkConfig } from '../../helpers/config/types';
import {
  availableMarkets,
  marketsData,
  getNetworkConfig,
  getProvider,
  CustomMarket,
} from '../../helpers/config/markets-and-network-config';

const LS_KEY = 'selectedMarket';

export interface ProtocolContextData {
  currentMarket: CustomMarket;
  setCurrentMarket: (market: CustomMarket) => void;
  currentMarketData: MarketDataType;
  // currently selected one
  chainId: number;
  networkConfig: NetworkConfig;
  jsonRpcProvider: providers.Provider;
  blockNumber: number;
}

const PoolDataContext = React.createContext({} as ProtocolContextData);

/**
 * @returns the last accessed market if it's still available, the first market if not.
 */
const getInitialMarket = () => {
  const cachedMarket = localStorage.getItem(LS_KEY) as CustomMarket | undefined;
  if (cachedMarket && availableMarkets.includes(cachedMarket)) return cachedMarket;
  // temporary fix to use kovan
  return process.env.REACT_APP_CHAIN_ID === '43114' ? availableMarkets[0] : availableMarkets[1];
};

export function ProtocolDataProvider({ children }: PropsWithChildren<{}>) {
  const [currentMarket, setCurrentMarket] = useState<CustomMarket>(getInitialMarket());
  const [blockNumber, setBlockNumber] = useState(0);

  useEffect(() => {
    const provider = getProvider(currentMarketData.chainId);
    provider.on('block', (blockNumber) => {
      setBlockNumber(blockNumber);
    });
  }, []);

  const currentMarketData = marketsData[currentMarket];

  const handleSetMarket = (market: CustomMarket) => {
    localStorage.setItem(LS_KEY, market);
    setCurrentMarket(market);
  };

  return (
    <PoolDataContext.Provider
      value={{
        currentMarket,
        chainId: currentMarketData.chainId,
        setCurrentMarket: handleSetMarket,
        currentMarketData: currentMarketData,
        networkConfig: getNetworkConfig(currentMarketData.chainId),
        jsonRpcProvider: getProvider(currentMarketData.chainId),
        blockNumber,
      }}
    >
      {children}
    </PoolDataContext.Provider>
  );
}

export const useProtocolDataContext = () => useContext(PoolDataContext);
