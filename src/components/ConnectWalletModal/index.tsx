import React from 'react';
import { useIntl } from 'react-intl';
import { useThemeContext } from '@aave/aave-ui-kit';
import {
  AvailableWeb3Connectors,
  ConnectWalletModalProps,
  getWeb3ProviderFromBrowser,
} from '../../libs/web3-data-provider';

import WarningArea from '../WarningArea';
import Link from '../basic/Link';
import UnlockWalletWrapper from './components/ConnectWalletWrapper';
import WalletCard from './components/WalletCard';
import LedgerChecklist from './components/LedgerChecklist';
import {
  AUTHEREUM_API_KEY,
  getFortmaticKeyByChainId,
  PORTIS_DAPP_ID,
} from '../../helpers/config/wallet-config';
import { UnlockWalletExtraText } from '../../ui-config';

import messages from './messages';
import staticStyles from './style';

import * as icons from './images';
import { useWeb3React } from '@web3-react/core';
import warningIcon from '../../images/warningIcon.svg';
import SwitchChainButton from '../SwitchChainButton';
import { isAllowedChain } from '../../helpers/is-allowed-chain';
import { ChainId } from '../../helpers/config/types';

export interface Wallet {
  title: string;
  description?: string;
  providerName: AvailableWeb3Connectors;
  icon: string;
  disabled?: boolean;
  notSupported?: boolean;
  errorMessage?: string;
}

export default function ConnectWalletModal({
  preferredChainId,
  supportedChainIds,
  onUnlockExternalWallet,
  connectorConfig,
  error,
  showLedgerBanner,
  isVisible,
  onBackdropPress,
}: ConnectWalletModalProps) {
  const intl = useIntl();
  const browserWalletProvider = getWeb3ProviderFromBrowser();
  const { library, chainId } = useWeb3React();
  const { currentTheme } = useThemeContext();
  const handleUnlockExternalWallet = (providerName: AvailableWeb3Connectors) =>
    onUnlockExternalWallet(
      providerName,
      preferredChainId,
      supportedChainIds,
      connectorConfig,
      false
    );

  // @ts-ignore
  const isImToken = !!window.imToken;

  const wallets: Wallet[] = [
    {
      title: intl.formatMessage(messages.titleBrowserWallet, {
        walletName: isImToken ? 'imToken' : 'Browser',
      }),
      description: '(MetaMask, Trustwallet, Enjin)',
      providerName: 'browser',
      icon: isImToken ? icons.imToken : icons.browserWallets,
      disabled: !browserWalletProvider,
      errorMessage: intl.formatMessage(messages.noBrowserBrowserWallet),
    },
    {
      title: 'Portis',
      providerName: 'portis',
      icon: icons.portisIcon,
      notSupported: !PORTIS_DAPP_ID || preferredChainId === ChainId.avalanche,
    },
    {
      title: 'Ledger',
      providerName: 'ledger',
      icon: icons.ledgerIcon,
      notSupported: preferredChainId === ChainId.polygon || preferredChainId === ChainId.avalanche,
    },
    {
      title: 'MEW wallet',
      providerName: 'mew-wallet',
      icon: icons.MEWIcon,
      notSupported: preferredChainId !== ChainId.mainnet,
    },
    {
      title: 'Coinbase',
      providerName: 'wallet-link',
      icon: icons.coinbaseIcon,
      notSupported: preferredChainId === ChainId.avalanche,
    },
    {
      title: 'Authereum',
      providerName: 'authereum',
      icon: icons.authereumIcon,
      notSupported: !AUTHEREUM_API_KEY || preferredChainId !== ChainId.mainnet,
    },
    {
      title: 'Wallet Connect',
      providerName: 'wallet-connect',
      icon: icons.walletConnectIcon,
    },
    {
      title: 'Torus',
      providerName: 'torus',
      icon: icons.torusIcon,
      notSupported: preferredChainId === ChainId.avalanche,
    },
    {
      title: 'Fortmatic',
      providerName: 'fortmatic',
      icon: icons.formaticIcon,
      notSupported:
        !getFortmaticKeyByChainId(preferredChainId) ||
        preferredChainId === ChainId.polygon ||
        preferredChainId === ChainId.avalanche,
    },
    {
      title: 'imToken',
      providerName: 'wallet-connect',
      icon: icons.imToken,
      notSupported:
        isImToken || preferredChainId === ChainId.polygon || preferredChainId === ChainId.avalanche,
    },
  ];

  return (
    <UnlockWalletWrapper
      isVisible={isVisible}
      onBackdropPress={onBackdropPress}
      className="ConnectWalletModal"
    >
      {error && (
        <WarningArea
          className="ConnectWalletModal__warningArea ConnectWalletModal__warningArea-mobile"
          title={intl.formatMessage(messages.errorCaption)}
        >
          <p>{error}</p>
        </WarningArea>
      )}

      {(error?.includes('Ledger') || showLedgerBanner) && (
        <LedgerChecklist className="ConnectWalletModal__LedgerChecklist-mobile" />
      )}
      <div className="ConnectWalletModal__content">
        {!library &&
          wallets
            .filter((wallet) => !wallet.notSupported)
            .map((wallet, index) => (
              <WalletCard
                title={wallet.title}
                description={wallet.description}
                errorMessage={
                  wallet.providerName === 'browser' && !browserWalletProvider
                    ? wallet.errorMessage
                    : ''
                }
                providerName={wallet.providerName}
                icon={wallet.icon}
                disabled={wallet.disabled}
                handleUnlockExternalWallet={handleUnlockExternalWallet}
                key={index}
              />
            ))}
      </div>

      {error && (
        <WarningArea
          className="ConnectWalletModal__warningArea"
          title={intl.formatMessage(messages.errorCaption)}
        >
          <p>{error}</p>
        </WarningArea>
      )}
      {chainId && !isAllowedChain(chainId) && (
        <WarningArea className="ConnectWalletModal__warningArea">
          <div style={{ display: 'flex' }}>
            <img
              src={warningIcon}
              alt="Warning icon"
              style={{ width: '15px', height: '13px', marginRight: '8px', marginTop: '2px' }}
            />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <p style={{ fontSize: '14px', fontWeight: 400, lineHeight: '20px' }}>
                {intl.formatMessage(messages.errorCaption)}
              </p>
              <p style={{ fontSize: '12px', fontWeight: 400 }}>Connected to unsupported network</p>
            </div>
          </div>
        </WarningArea>
      )}

      {(error?.includes('Ledger') || showLedgerBanner) && (
        <LedgerChecklist className="ConnectWalletModal__warningArea" />
      )}

      <SwitchChainButton chainId={chainId} library={library} />

      <div className="ConnectWalletModal__privacy-inner">
        <p>
          {intl.formatMessage(messages.needHelp, {
            readOurFAQ: (
              <Link
                to="https://docs.nereus.finance/"
                title={intl.formatMessage(messages.readOurFAQ)}
                absolute={true}
                inNewWindow={true}
                bold={true}
                color="white"
              />
            ),
          })}
        </p>
        <p>
          <UnlockWalletExtraText intl={intl} />
        </p>
        <p>
          {intl.formatMessage(messages.disclaimerBottomText, {
            disclaimer: <span key="disclaimer">{intl.formatMessage(messages.disclaimer)}</span>,
          })}
        </p>
      </div>
      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .ConnectWalletModal {
          &__changeNetworkButton {
            margin-top: 24px;
            border-radius: 100px;
            width: 202px;
            padding: 1% 1%;
            font-size: 14px;
            background-color: ${currentTheme.nereusYellow.hex};
            color: ${currentTheme.whiteElement.hex};
          }
        }
      `}</style>
    </UnlockWalletWrapper>
  );
}
