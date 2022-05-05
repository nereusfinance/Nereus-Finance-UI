import React, { ReactNode } from 'react';
import classNames from 'classnames';

import { useThemeContext } from '@aave/aave-ui-kit';

import staticStyles from './style';

interface APYCardProps {
  title: string;
  color?: 'orange' | 'primary' | 'secondary' | 'gray';
  children?: ReactNode;
}

export default function APYCard({ title, color = 'gray', children }: APYCardProps) {
  const { currentTheme } = useThemeContext();

  return (
    <div className={classNames('APYCard', `APYCard__${color}`)}>
      <div className="APYCard__title">
        <p>{title}</p>
      </div>
      <div className="APYCard__content">{children}</div>

      <style jsx={true}>{staticStyles}</style>
      <style jsx={true}>{`
        .APYCard {
          .APYCard__title {
            p {
              color: ${currentTheme.white.hex};
            }
          }

          &__orange {
            border-color: ${currentTheme.darkOrange.hex};
            .APYCard__title {
              background: ${currentTheme.darkOrange.hex};
            }
          }
          &__gray {
            border-color: ${currentTheme.gray.hex};
            .APYCard__title {
              background: ${currentTheme.gray.hex};
            }
          }

          &__primary {
            border-color: ${currentTheme.primary.hex};
            .APYCard__title {
              background: ${currentTheme.primary.hex};
            }
          }

          &__secondary {
            border-color: ${currentTheme.secondary.hex};
            .APYCard__title {
              background: ${currentTheme.secondary.hex};
            }
          }
        }
      `}</style>
    </div>
  );
}
