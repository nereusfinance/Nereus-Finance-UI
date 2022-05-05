import React, { ReactNode } from 'react';
import { BigNumber, ethers } from 'ethers';
import axios from 'axios';
import ERC20abi from './erc20_abi.json';
import { useWeb3React } from '@web3-react/core';
import { bigFloatToFixed } from '../utils/bigFloatToFixed';
import { useProtocolDataContext } from '../protocol-data-provider';
import { getNetworkConfig } from '../../helpers/config/markets-and-network-config';
import { ChainId } from '../../helpers/config/types';

const chainId = process.env.REACT_APP_CHAIN_ID === '5' ? ChainId.goerli : ChainId.avalanche;
const networkConfig = getNetworkConfig(chainId);

const WXTAddress = networkConfig.rewardTokenAddress || '0x9099ee16633d65A6492e69173e42e926D91CA2c2';

const WXTContract = new ethers.Contract(
  WXTAddress,
  ERC20abi,
  ethers.getDefaultProvider(networkConfig.rpcUrl)
);

interface IWXTPriceDataContext {
  priceUSD: number;
  marketCap: number;
  totalSupply: number;
  decimals: number;
  userBalance: BigNumber;
  WXTToUSD: (amount: BigNumber, precision?: number) => string;
  WXTWithDecimals: (amount: BigNumber) => string;
  parseWXT: (amount: string) => BigNumber;
}

export const WXTPriceDataContext = React.createContext<IWXTPriceDataContext>({
  priceUSD: 0,
  marketCap: 0,
  totalSupply: 0,
  decimals: 9,
  userBalance: BigNumber.from(0),
  WXTToUSD: () => Number.NaN.toString(),
  WXTWithDecimals: () => Number.NaN.toString(),
  parseWXT: () => BigNumber.from(0),
});

export function useWXTPriceDataContext() {
  return React.useContext(WXTPriceDataContext);
}

export function WXTPriceDataProvider({ children }: { children: ReactNode }) {
  const { account } = useWeb3React();
  const [decimals, setDecimals] = React.useState(18);
  const [priceUSD, setPriceUSD] = React.useState(0);
  const [marketCap, setMarketCap] = React.useState(0);
  const [totalSupply, setTotalSupply] = React.useState(0);
  const [userBalance, setUserBalance] = React.useState(BigNumber.from(0));
  const { blockNumber } = useProtocolDataContext();

  React.useEffect(() => {
    async function getDecimals() {
      setDecimals(await WXTContract.decimals());
    }

    getDecimals();
  }, []);

  React.useEffect(() => {
    async function getWXTInfo() {
      await axios({
        method: 'GET',
        url: 'https://min-api.cryptocompare.com/data/pricemultifull',
        params: {
          api_key: '9bf39d069bff24230fd3746f8ad4a5d9bb543794223e4d5e59776f61e5791fa4',
          fsyms: 'WXT',
          tsyms: 'USD',
        },
      }).then((body) => {
        setPriceUSD(body.data.RAW.WXT.USD.PRICE);
        setMarketCap(body.data.RAW.WXT.USD.MKTCAP);
        setTotalSupply(body.data.RAW.WXT.USD.SUPPLY);
      });
    }
    getWXTInfo();
  }, []);

  async function getUserBalance() {
    account && setUserBalance(await WXTContract.balanceOf(account));
  }

  React.useEffect(() => {
    getUserBalance();
  }, [account, blockNumber]);

  function WXTToUSD(amount: BigNumber, precision: number = 18): string {
    const parsedPrice = ethers.utils.parseUnits(priceUSD.toFixed(precision), precision);
    return ethers.utils.formatUnits(amount.mul(parsedPrice), decimals + precision);
  }

  function WXTWithDecimals(amount: BigNumber): string {
    return ethers.utils.formatUnits(amount, decimals);
  }

  function parseWXT(val: string) {
    if (!val) return BigNumber.from(0);
    return ethers.utils.parseUnits(bigFloatToFixed(val, decimals), decimals);
  }

  const value = {
    priceUSD,
    marketCap,
    totalSupply,
    decimals,
    userBalance,
    WXTToUSD,
    WXTWithDecimals,
    parseWXT,
  };
  return <WXTPriceDataContext.Provider value={value}>{children}</WXTPriceDataContext.Provider>;
}
