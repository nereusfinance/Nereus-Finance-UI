import { ChainId } from '@aave/protocol-js';

export function isAllowedChain(chainId: ChainId | undefined) {
  return chainId !== undefined && chainId.toString() === process.env.REACT_APP_CHAIN_ID;
}
