import { ChainId } from '../../helpers/config/types';

const aimChain = process.env.REACT_APP_CHAIN_ID
  ? process.env.REACT_APP_CHAIN_ID
  : ChainId.avalanche.toString();

export default async function useAddChainId(provider: any): Promise<void> {
  if (provider) {
    try {
      await provider.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: `0x${Number.parseInt(aimChain).toString(16)}`,
            rpcUrls: ['https://api.avax.network/ext/bc/C/rpc'],
            chainName: 'Avalanche Mainnet C-Chain',
          },
        ],
      });
    } catch (e) {}
  }
}
