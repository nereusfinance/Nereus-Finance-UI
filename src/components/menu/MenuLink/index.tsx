import React from 'react';
import classNames from 'classnames';
import { gradient, useThemeContext } from '@aave/aave-ui-kit';

import goToTop from '../../../helpers/goToTop';
import Link from '../../basic/Link';

import staticStyles from './style';

interface MenuLinkProps {
  to: string;
  title: string;
  isActive: boolean;
  hidden?: boolean;
}

export default function MenuLink({ to, title, isActive, hidden }: MenuLinkProps) {
  const { currentTheme } = useThemeContext();

  const activeGradient = gradient(
    230,
    `${currentTheme.primary.rgb}, 1`,
    0,
    `${currentTheme.secondary.rgb}, 1`,
    100
  );

  return (
    <Link
      to={to}
      className={classNames('MenuLink ButtonLink', {
        MenuLink__active: isActive,
        MenuLink__nonActive: !isActive,
        MenuLink__hidden: hidden,
      })}
      onClick={() => goToTop()}
    >
      <div className="MenuLink__title">
        <p>
          <b>{title}</b> <strong>{title}</strong>
        </p>{' '}
        <i />
      </div>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .MenuLink {
          color: ${currentTheme.white.hex} !important;
          .MenuLink__title {
            i {
              background: ${activeGradient} !important;
            }
          }
          &__nonActive {
            &:hover {
              background-color: ${currentTheme.chosenLinkColor.hex};
              border-radius: 21px;
            }
          }
          &__active {
            background-color: ${currentTheme.chosenLinkColor.hex};
            border-radius: 21px;
          }
        }
      `}</style>
    </Link>
  );
}
