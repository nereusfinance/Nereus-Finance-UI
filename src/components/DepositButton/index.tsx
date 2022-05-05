import React from 'react';
import { useIntl } from 'react-intl';
import classNames from 'classnames';
import { useThemeContext } from '@aave/aave-ui-kit';

import Link from '../../components/basic/Link';
import { useMenuContext } from '../../libs/menu';

import messages from './messages';
import staticStyles from './style';

interface ConnectButtonProps {
  className?: string;
}

export default function DepositButton({ className }: ConnectButtonProps) {
  const intl = useIntl();
  const { currentTheme } = useThemeContext();
  const { closeMobileMenu } = useMenuContext();

  return (
    <Link to="/deposit" className="ButtonLink">
      <button
        className={classNames('DepositButton', className)}
        type="button"
        onClick={() => {
          closeMobileMenu();
        }}
      >
        <div className="DepositButton__inner">
          <span>{intl.formatMessage(messages.depositNow)}</span>
        </div>

        <style jsx={true}>{staticStyles}</style>
        <style jsx={true}>{`
          .DepositButton {
            &__inner {
              background: ${currentTheme.nereusYellow.hex};
              color: ${currentTheme.maxBlack.hex};
            }
          }
        `}</style>
      </button>
    </Link>
  );
}
