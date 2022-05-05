// There is no garantee that context values calculated for market list refer to the latest list version

import React, { ReactNode } from 'react';
import { useWeb3React } from '@web3-react/core';
import { BigNumber, ethers } from 'ethers';
import { getProvider } from '../../helpers/config/markets-and-network-config';
import useContracts from '../../modules/manageWXT/hooks/useContracts';
import { usePoolData } from '../pool-data-provider/hooks/use-pool-data';
import { useProtocolDataContext } from '../protocol-data-provider';
import { ReserveDataHumanized } from '@aave/contract-helpers';
import { useWXTPriceDataContext } from '../wxt-price-data-provider';
import { calculateIncentiveAPR } from '@aave/math-utils/dist/cjs/formatters/incentive/calculate-incentive-apr';
import { useUserWalletDataContext } from '../web3-data-provider';

const APRDecimalsCorrection = 1e1;

interface INereusIncentiveDataContext {
  marketsAPR: any;
  claimableFees: any[];
  totalClaimableTokens: BigNumber;
  claimAll: () => void;
  claim: (address: string) => void;
}

export const NereusIncentiveDataContext = React.createContext<INereusIncentiveDataContext>({
  marketsAPR: undefined,
  claimableFees: [],
  totalClaimableTokens: BigNumber.from(0),
  claimAll: () => {},
  claim: (address: string) => {},
});

export function useNereusIncentiveDataContext() {
  return React.useContext(NereusIncentiveDataContext);
}

export function NereusIncentiveDataProvider({ children }: { children: ReactNode }) {
  const { library } = useWeb3React();
  const { chainId, currentMarketData, networkConfig, blockNumber } = useProtocolDataContext();
  const { currentAccount } = useUserWalletDataContext();
  const { data: poolData } = usePoolData(
    currentMarketData.addresses.LENDING_POOL_ADDRESS_PROVIDER,
    chainId,
    networkConfig.addresses.uiPoolDataProvider,
    false
  );
  const { chefIncentivesControllerContract } = useContracts(
    library ? library.getSigner() : getProvider(chainId)
  );
  const { priceUSD, parseWXT, decimals: WXTDecimals } = useWXTPriceDataContext();
  const priceWXTUSDWithDecimals = parseWXT(priceUSD.toString());

  const [chefIncentivesPoolData, setChefIncentivesPoolData] = React.useState<any>({});
  const [totalAllocationPoints, setTotalAllocationPoints] = React.useState<BigNumber>(
    BigNumber.from(1)
  );
  const [claimableFees, setClaimableFees] = React.useState<any[]>([]);
  const [rewardsPerSecond, setRewardsPerSecond] = React.useState<BigNumber>(BigNumber.from(0));
  const savedActiveReservesData = React.useRef<ReserveDataHumanized[]>([]);
  const [emissionsPerSecond, setEmissionsPerSecond] = React.useState<any>(undefined);
  const [marketsAPR, setMarketsAPR] = React.useState<any>([]);
  const [savedActiveReservesDataCurrent, setSavedActiveReservesDataCurrent] = React.useState<
    ReserveDataHumanized[]
  >([]);
  const [totalClaimableTokens, setTotalClaimableTokens] = React.useState<BigNumber>(
    BigNumber.from(0)
  );

  React.useEffect(() => {
    setSavedActiveReservesDataCurrent(savedActiveReservesData.current);
  }, [blockNumber]);

  // Get pool data from ChefIncentivesController for a single reserve
  async function getPoolDataForMarket(reserveData: ReserveDataHumanized) {
    const aTokenPoolData = await chefIncentivesControllerContract.poolInfo(
      reserveData.aTokenAddress
    );
    const variableDebtTokenPoolData = await chefIncentivesControllerContract.poolInfo(
      reserveData.variableDebtTokenAddress
    );

    return {
      aTokenPoolData,
      variableDebtTokenPoolData,
      id: reserveData.id,
      decimals: reserveData.decimals,
      price: reserveData.priceInMarketReferenceCurrency,
    };
  }

  // Get active reserves data
  if (!savedActiveReservesDataCurrent.length && poolData.reserves) {
    setSavedActiveReservesDataCurrent(
      poolData.reserves?.reservesData.filter((reserveData) => reserveData.isActive) || []
    );
  }
  const activeReservesData = savedActiveReservesDataCurrent;

  // Get rewards per second
  React.useEffect(() => {
    async function getRewardsPerSecond() {
      setRewardsPerSecond(await chefIncentivesControllerContract.rewardsPerSecond());
    }

    getRewardsPerSecond();
  }, []);

  // Get total allocation points
  React.useEffect(() => {
    async function getTotalAllocationPoints() {
      setTotalAllocationPoints(await chefIncentivesControllerContract.totalAllocPoint());
    }

    getTotalAllocationPoints();
  }, []);

  // Get chefIncetives pool data
  React.useEffect(() => {
    async function getChefIncentivesPoolData() {
      const newCIPoolData = await Promise.all(
        activeReservesData.map(async (singleData: ReserveDataHumanized) => {
          return await getPoolDataForMarket(singleData);
        })
      );

      const res: any = {};
      newCIPoolData.forEach((el) => (res[el.id] = el));
      setChefIncentivesPoolData(res);
    }

    getChefIncentivesPoolData();
  }, [JSON.stringify(activeReservesData)]);

  async function claim(asset: string) {
    console.log('claim', asset);
    await chefIncentivesControllerContract.claim(currentAccount, [asset]);
  }
  async function claimAll() {
    console.log('claimAll');
    const assets = claimableFees.map((asset) => {
      return asset.address;
    });
    console.log('claimAll', assets);
    await chefIncentivesControllerContract.claim(currentAccount, assets);
  }

  React.useEffect(() => {
    async function getChefIncentivesPoolData() {
      let totalClaimableTokens = BigNumber.from('0');
      const rewardData: any = [];
      const aTokenAddress: string[] = [];
      const variableDebtTokenAddress: string[] = [];
      activeReservesData.map(async (singleData: ReserveDataHumanized) => {
        if (singleData.aTokenAddress) {
          aTokenAddress.push(singleData.aTokenAddress);
        } else {
          aTokenAddress.push('0x0000000000000000000000000000000000000000');
        }
        if (singleData.variableDebtTokenAddress) {
          variableDebtTokenAddress.push(singleData.variableDebtTokenAddress);
        } else {
          variableDebtTokenAddress.push('0x0000000000000000000000000000000000000000');
        }
      });
      const userBaseClaimable = await chefIncentivesControllerContract.userBaseClaimable(
        currentAccount
      );
      totalClaimableTokens = totalClaimableTokens.add(userBaseClaimable);
      const depositRewardPools = await chefIncentivesControllerContract.claimableReward(
        currentAccount,
        aTokenAddress
      );
      const borrowRewardPools = await chefIncentivesControllerContract.claimableReward(
        currentAccount,
        variableDebtTokenAddress
      );
      depositRewardPools.map(async (pool: BigNumber, index: number) => {
        if (!pool.isZero()) {
          totalClaimableTokens = totalClaimableTokens.add(pool);
          rewardData.push({
            amount: pool,
            symbol: activeReservesData[index].symbol,
            name: 'n' + activeReservesData[index].symbol,
            address: activeReservesData[index].aTokenAddress,
          });
        }
      });
      borrowRewardPools.map(async (pool: BigNumber, index: number) => {
        if (!pool.isZero()) {
          totalClaimableTokens = totalClaimableTokens.add(pool);
          rewardData.push({
            amount: pool,
            symbol: activeReservesData[index].symbol,
            name: 'dept' + activeReservesData[index].symbol,
            address: activeReservesData[index].variableDebtTokenAddress,
          });
        }
      });
      setClaimableFees(rewardData);
      setTotalClaimableTokens(totalClaimableTokens);
    }

    if (!currentAccount) return;
    getChefIncentivesPoolData();
  }, [activeReservesData, currentAccount, blockNumber]);

  // Calculate emissions per second
  React.useEffect(() => {
    async function calculateEPS() {
      const emissionsPerSecond: any = {};
      for (let id in chefIncentivesPoolData) {
        emissionsPerSecond[id] = {
          deposit: chefIncentivesPoolData[id].aTokenPoolData.allocPoint
            .mul(rewardsPerSecond)
            .div(totalAllocationPoints),
          borrow: chefIncentivesPoolData[id].variableDebtTokenPoolData.allocPoint
            .mul(rewardsPerSecond)
            .div(totalAllocationPoints),
        };
      }

      setEmissionsPerSecond(emissionsPerSecond);
    }

    calculateEPS();
  }, [rewardsPerSecond, totalAllocationPoints, chefIncentivesPoolData]);

  // Calculate APR
  React.useEffect(() => {
    async function calculateMarketsAPR() {
      const res: any = {};
      for (let id in emissionsPerSecond) {
        const emissionPerSecondDeposit = emissionsPerSecond[id].deposit;
        const emissionPerSecondBorrow = emissionsPerSecond[id].borrow;
        const totalATokenSupply = chefIncentivesPoolData[id].aTokenPoolData.totalSupply;
        const totalVTokenSupply = chefIncentivesPoolData[id].variableDebtTokenPoolData.totalSupply;
        const { price, decimals } = chefIncentivesPoolData[id];

        const depositAPR = calculateIncentiveAPR({
          emissionPerSecond: emissionPerSecondDeposit.toString(),
          rewardTokenPriceInMarketReferenceCurrency: priceWXTUSDWithDecimals
            .div(APRDecimalsCorrection)
            .toString(),
          totalTokenSupply: totalATokenSupply.toString(),
          priceInMarketReferenceCurrency: price,
          decimals: decimals,
          rewardTokenDecimals: WXTDecimals,
        });

        const borrowAPR = calculateIncentiveAPR({
          emissionPerSecond: emissionPerSecondBorrow.toString(),
          rewardTokenPriceInMarketReferenceCurrency: priceWXTUSDWithDecimals
            .mul(APRDecimalsCorrection)
            .toString(),
          totalTokenSupply: totalVTokenSupply.toString(),
          priceInMarketReferenceCurrency: price,
          decimals: decimals,
          rewardTokenDecimals: WXTDecimals,
        });

        res[id] = {
          deposit:
            depositAPR === 'Infinity' ? '0' : ethers.utils.formatUnits(parseInt(depositAPR), 9),
          borrow:
            borrowAPR === 'Infinity' ? '0' : ethers.utils.formatUnits(parseInt(borrowAPR), 11),
        };
      }

      setMarketsAPR(res);
    }

    calculateMarketsAPR();
  }, [emissionsPerSecond, WXTDecimals]);

  const value = { marketsAPR, claimableFees, totalClaimableTokens, claimAll, claim };
  return (
    <NereusIncentiveDataContext.Provider value={value}>
      {children}
    </NereusIncentiveDataContext.Provider>
  );
}
