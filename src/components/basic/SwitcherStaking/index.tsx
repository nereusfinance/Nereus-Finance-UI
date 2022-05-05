import React from 'react';
import classNames from 'classnames';
import { useThemeContext } from '@aave/aave-ui-kit';
import arrow from '../../../images/backArrow.svg';
import staticStyles from './style';

interface SwitcherStakingProps {
  active: boolean;
  onClick?: () => void;
  className?: string;
}

export default function SwitcherStaking({ active, onClick, className }: SwitcherStakingProps) {
  const { currentTheme } = useThemeContext();

  return (
    <div
      className={classNames('SwitcherStaking', { SwitcherStaking__active: active }, className)}
      onClick={onClick}
    >
      <img src={arrow} alt="" />

      <style jsx={true}>{staticStyles}</style>
      <style jsx={true}>{`
        .SwitcherStaking {
          background: ${currentTheme.disabledButtonBackground.hex};
        }
      `}</style>
    </div>
  );
}
