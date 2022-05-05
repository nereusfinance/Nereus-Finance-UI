import React, { ReactNode } from 'react';
import classNames from 'classnames';

import { useThemeContext } from '@aave/aave-ui-kit';

import staticStyles from './style';

interface RepayWithdrawWrapperProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export default function RepayWithdrawWrapper({
  title,
  children,
  className,
}: RepayWithdrawWrapperProps) {
  const { currentTheme } = useThemeContext();

  return (
    <div className={classNames('RepayWithdrawWrapper', className)}>
      <div className="RepayWithdrawWrapper__caption">
        <p>{title}</p>
      </div>

      <div className="RepayWithdrawWrapper__content">{children}</div>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true}>{`
        .RepayWithdrawWrapper {
          color: ${currentTheme.maxWhite.hex};
          background: ${currentTheme.whiteElement.hex};

          &__caption {
            border-bottom: 1px solid ${currentTheme.mainBg.hex};
          }
        }
      `}</style>
    </div>
  );
}
