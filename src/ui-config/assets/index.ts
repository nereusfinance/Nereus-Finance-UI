import {
  assetsList as assetsListFromKit,
  Asset,
  assetsOrder as assetsOrderFromKit,
} from '@aave/aave-ui-kit';

export const assetsList: Asset[] = assetsListFromKit;

export const assetsOrder: string[] = assetsOrderFromKit;
export const stableAssets = ['USDC', 'USDC.E', 'USDT', 'USDT.E', 'DAI', 'DAI.E', 'UST'];

export const marketsTokensOrder = [
  'AVAX',
  'AVAX.e',
  'WETH',
  'WETH.e',
  'WBTC',
  'WBTC.e',
  'USDC',
  'USDC.e',
  'USDT',
  'USDT.e',
  'DAI',
  'DAI.e',
  'UST',
  'CRV',
  'CRVSEC',
  'JOE',
  'JOESEC',
  'CRV.e',
];
