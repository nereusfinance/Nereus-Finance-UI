import { ChainId, MarketDataType } from '../../helpers/config/types';

import * as logos from './images';

export enum CustomMarket {
  proto_mainnet = 'proto_mainnet',
  proto_avalanche = 'proto_avalanche',
  proto_matic = 'proto_matic',
  proto_mumbai = 'proto_mumbai',
  proto_kovan = 'proto_kovan',
  proto_goerli = 'proto_goerli',
  proto_fuji = 'proto_fuji',
}
export enum CustomAvalancheMarket {
  proto_avalanche = 'proto_avalanche',
  proto_kovan = 'proto_kovan',
  proto_goerli = 'proto_goerli',
  // proto_fuji = 'proto_fuji',
}
export const marketsData: { [key in keyof typeof CustomAvalancheMarket]: MarketDataType } = {
  [CustomMarket.proto_avalanche]: {
    chainId: ChainId.avalanche,
    logo: logos.aaveLogo,
    activeLogo: logos.aaveActiveLogo,
    subLogo: logos.avalanche,
    aTokenPrefix: 'N',
    addresses: {
      LENDING_POOL_ADDRESS_PROVIDER: '0xaD1ecb393F084403ACCA9dA6f71d4477745AF85E'.toLowerCase(),
      LENDING_POOL: '0xB9257597EDdfA0eCaff04FF216939FBc31AAC026',
      WETH_GATEWAY: '0xcf9477a5E24c0C42122bfa9A06e02ebbB5B2B0FD',
    },
  },
  [CustomMarket.proto_goerli]: {
    chainId: ChainId.goerli,
    logo: logos.aavev2Logo,
    activeLogo: logos.aavev2ActiveLogo,
    aTokenPrefix: 'N',
    addresses: {
      LENDING_POOL_ADDRESS_PROVIDER: '0xA6545f706B504cd49CD61ACf0f9E4dcdc212dAd2'.toLowerCase(),
      LENDING_POOL: '0xDb6e0CE310021719966F2deb20065b119b451E6A',
      WETH_GATEWAY: '0xA61ca04DF33B72b235a8A28CfB535bb7A5271B70',
      FAUCET: '0x600103d518cC5E8f3319D532eB4e5C268D32e604',
    },
  },
  [CustomMarket.proto_kovan]: {
    chainId: ChainId.kovan,
    logo: logos.aavev2Logo,
    activeLogo: logos.aavev2ActiveLogo,
    aTokenPrefix: 'N',
    addresses: {
      LENDING_POOL_ADDRESS_PROVIDER: '0xc3dbe2FCB23CC7190C36DcEC36dD923E855266b6'.toLowerCase(),
      LENDING_POOL: '0x7F3860C40559b8B337f11f098A63685d55aD8821',
      WETH_GATEWAY: '0xA61ca04DF33B72b235a8A28CfB535bb7A5271B70',
      FAUCET: '0x600103d518cC5E8f3319D532eB4e5C268D32e604',
    },
  },
  // [CustomMarket.proto_fuji]: {
  //   chainId: ChainId.fuji,
  //   logo: logos.avalanche,
  //   activeLogo: logos.avalanche,
  //   aTokenPrefix: 'N',
  //   addresses: {
  //     LENDING_POOL_ADDRESS_PROVIDER: '0xa340343aF6F72236465a8fE3cE51098334f1E625'.toLowerCase(),
  //     LENDING_POOL: '0xcE34815a9308a949ae4B7c76aBE6b02f8812E3f1',
  //   },
  // },
} as const;
