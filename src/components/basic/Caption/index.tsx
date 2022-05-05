import React, { ReactNode } from 'react';
import classNames from 'classnames';
import { useThemeContext } from '@aave/aave-ui-kit';

import staticStyles from './style';

import animationCircle from '../../../images/animationCircle.svg';

interface CaptionProps {
  title: string;
  description?: string | ReactNode;
  color?: 'primary' | 'secondary' | 'dark';
  className?: string;
  marginBottom?: number;
  marginLeft?: number;
  marginTop?: number;
  withAnimationCircle?: boolean;
  onWhiteBackground?: boolean;
}

export default function Caption({
  title,
  description,
  color = 'primary',
  className,
  marginBottom,
  marginTop,
  marginLeft,
  withAnimationCircle,
  onWhiteBackground,
}: CaptionProps) {
  const { currentTheme } = useThemeContext();

  return (
    <div
      className={classNames('Caption', `Caption__${color}`, className)}
      style={{
        marginBottom: `${marginBottom}px`,
        marginLeft: `${marginLeft}px`,
        marginTop: `${marginTop}px`,
      }}
    >
      <h2 className={classNames({ Caption__titleWithCircle: withAnimationCircle })}>
        {title} {withAnimationCircle && <img src={animationCircle} alt="" />}
      </h2>
      {description && <div className="Caption__description">{description}</div>}

      <style jsx={true}>{staticStyles}</style>
      <style jsx={true}>{`
        .Caption {
          &__market {
            h2 {
              color: ${currentTheme.maxWhite.hex};
            }
          }

          &__primary {
            h2 {
              color: ${currentTheme.maxWhite.hex};
            }
          }

          &__secondary {
            h2 {
              color: ${currentTheme.secondary.hex};
            }
          }

          &__dark {
            h2 {
              color: ${onWhiteBackground
                ? currentTheme.darkBlue.hex
                : currentTheme.textDarkBlue.hex};
            }
          }

          &__description {
            color: ${currentTheme.textDescr.hex};
          }
        }
      `}</style>
    </div>
  );
}
