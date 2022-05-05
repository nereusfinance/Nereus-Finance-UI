import { ChainId } from '../../helpers/config/types';

const aimChain = process.env.REACT_APP_CHAIN_ID
  ? process.env.REACT_APP_CHAIN_ID
  : ChainId.avalanche.toString();

export default async function useSwitchChainId(provider: any): Promise<void> {
  if (provider) {
    try {
      await provider.request({
        method: 'wallet_switchEthereumChain',
        params: [
          {
            chainId: `0x${(Number.parseInt(aimChain) || ChainId.avalanche).toString(16)}`,
          },
        ],
      });
    } catch (e) {}
  }
}
