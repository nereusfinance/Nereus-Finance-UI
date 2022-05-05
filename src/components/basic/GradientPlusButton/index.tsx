import React from 'react';
import classNames from 'classnames';
import { useThemeContext } from '@aave/aave-ui-kit';

import staticStyles from './style';

interface GradientPlusButtonProps {
  active: boolean;
  positionVertical: 'top' | 'bottom';
  positionHorizontal: 'left' | 'right';
  onClick?: () => void;
  className?: string;
}

export default function GradientPlusButton({
  active,
  positionVertical,
  positionHorizontal,
  onClick,
  className,
}: GradientPlusButtonProps) {
  const { currentTheme } = useThemeContext();

  return (
    <div
      className={classNames(
        'GradientPlusButton',
        `GradientPlusButton__${positionVertical}`,
        `GradientPlusButton__${positionHorizontal}`,
        { GradientPlusButton__active: active },
        className
      )}
      onClick={onClick}
    >
      <span />
      <span />

      <style jsx={true}>{staticStyles}</style>
      <style jsx={true}>{`
        .GradientPlusButton {
          span {
            background: ${currentTheme.white.hex};
          }
        }
      `}</style>
    </div>
  );
}
