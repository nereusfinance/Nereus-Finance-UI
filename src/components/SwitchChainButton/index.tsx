import React from 'react';
import useAddChainId from '../SwitchChainHooks/useAddChainId';
import useSwitchChainId from '../SwitchChainHooks/useSwitchChainId';
import { useThemeContext } from '@aave/aave-ui-kit';
import { isAllowedChain } from '../../helpers/is-allowed-chain';

export interface SwitchChainButtonProps {
  library?: any;
  chainId?: number | undefined;
  marginTop?: string;
}

export default function SwitchChainButton({ library, chainId, marginTop }: SwitchChainButtonProps) {
  const { currentTheme } = useThemeContext();
  async function changeChainID(e: any): Promise<void> {
    e.preventDefault();
    await useAddChainId(library.provider);
    await useSwitchChainId(library.provider);
  }
  return (
    <>
      {library && !isAllowedChain(chainId) && (
        <button className="ConnectWalletModal__changeNetworkButton" onClick={changeChainID}>
          Switch to Avalanche
        </button>
      )}
      <style jsx={true} global={true}>{`
        .ConnectWalletModal {
          &__changeNetworkButton {
            margin-top: ${marginTop ? marginTop : '24px'};
            border-radius: 100px;
            width: 202px;
            padding: 7px 6px;
            font-size: 14px;
            background-color: ${currentTheme.nereusYellow.hex};
            color: ${currentTheme.whiteElement.hex};
          }
        }
      `}</style>
    </>
  );
}
