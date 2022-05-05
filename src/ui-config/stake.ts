import { ChainId } from '../helpers/config/types';

export interface StakeConfig {
  chainId: ChainId;
  tokens: {
    [token: string]: {
      STAKING_POOL: string;
      LP_TOKEN: string;
      CHEF_CONTROLLER: string;
      STAKING_REWARD_TOKEN: string;
    };
  };
}

//goerli
export const stakeConfig: StakeConfig = {
  chainId: 43114,
  tokens: {
    nxusd_3crv: {
      STAKING_POOL: '0xE37d992c8324D33D6510D3c4fbbB47a777AA6e88',
      LP_TOKEN: '0x6BF6fc7EaF84174bb7e1610Efd865f0eBD2AA96D',
      CHEF_CONTROLLER: '0xa57a8C5dd29bd9CC605027E62935db2cB5485378',
      STAKING_REWARD_TOKEN: '0xfcDe4A87b8b6FA58326BB462882f1778158B02F1',
    },
    wxt_nxusd: {
      STAKING_POOL: '0x112289c95cbD62B4479163201DBEF65693A7D540',
      LP_TOKEN: '0x5A7a792d70d1eA39708b9ad9531069E73795C6a4',
      CHEF_CONTROLLER: '0xa57a8C5dd29bd9CC605027E62935db2cB5485378',
      STAKING_REWARD_TOKEN: '0xfcDe4A87b8b6FA58326BB462882f1778158B02F1',
    },
  },
};
