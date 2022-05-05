import React, { ReactNode } from 'react';
import { useThemeContext } from '@aave/aave-ui-kit';

import staticStyles from './style';
import classNames from 'classnames';

export default function DashboardCustomTableCol({
  title,
  className,
  flex,
  children,
  justifyContent,
}: {
  title: string;
  className?: string;
  flex?: number;
  children?: ReactNode;
  justifyContent: string;
}) {
  const { currentTheme } = useThemeContext();

  return (
    <div className={classNames('DashboardCustomTableCol', className)} style={{ flex: flex }}>
      <div
        className="DashboardCustomTableColTitleWrapper"
        style={{ justifyContent: justifyContent }}
      >
        {title ? <p className="DashboardCustomTableColTitle">{title}</p> : null}
      </div>
      <div
        className="DashboardCustomTableColChildrenWrapper"
        style={{ justifyContent: justifyContent }}
      >
        {children}
      </div>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .DashboardEarnRewardsPanel {
          background: ${currentTheme.whiteElement.hex};
        }
        .DashboardCustomTableColTitle {
          color: ${currentTheme.lightGray.hex};
        }
      `}</style>
    </div>
  );
}
