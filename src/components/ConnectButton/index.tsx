import React from 'react';
import { useIntl } from 'react-intl';
import classNames from 'classnames';
import { useThemeContext } from '@aave/aave-ui-kit';

import { useUserWalletDataContext } from '../../libs/web3-data-provider';
import { useMenuContext } from '../../libs/menu';

import messages from './messages';
import staticStyles from './style';

interface ConnectButtonProps {
  className?: string;
  size?: 'small' | 'normal';
}

export default function ConnectButton({ className, size = 'small' }: ConnectButtonProps) {
  const intl = useIntl();
  const { currentTheme, sm } = useThemeContext();
  const { showSelectWalletModal } = useUserWalletDataContext();
  const { closeMobileMenu } = useMenuContext();

  return (
    <button
      className={classNames('ConnectButton', `ConnectButton__${size}`, className)}
      type="button"
      onClick={() => {
        showSelectWalletModal();
        closeMobileMenu();
      }}
    >
      <div className="ConnectButton__inner">
        <span>{intl.formatMessage(sm ? messages.connectWallet : messages.connect)}</span>
      </div>

      <style jsx={true}>{staticStyles}</style>
      <style jsx={true}>{`
        .ConnectButton {
          &__inner {
            background: ${currentTheme.nereusYellow.hex};
            color: ${currentTheme.maxBlack.hex};
          }
        }

        .ConnectButton__small {
          .ConnectButton__inner {
            font-size: 14px;
            line-height: 20px;
          }
        }

        .ConnectButton__normal {
          .ConnectButton__inner {
            font-size: 16px;
            line-height: 24px;
          }
        }
      `}</style>
    </button>
  );
}
