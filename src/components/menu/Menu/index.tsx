import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useIntl } from 'react-intl';
import classNames from 'classnames';
import { useThemeContext } from '@aave/aave-ui-kit';

import { useUserWalletDataContext } from '../../../libs/web3-data-provider';
import { useProtocolDataContext } from '../../../libs/protocol-data-provider';
import goToTop from '../../../helpers/goToTop';
import Link from '../../basic/Link';
import MenuLink from '../MenuLink';
import MoreButton from '../MoreButton';
import AddressInfo from '../AddressInfo';
import MobileContent from '../MobileContent';

import staticStyles from './style';

import navigation from '../navigation';

import backIcon from '../../../images/mobileBackArrow.svg';
import darkLogo from '../../../images/NereusDark.svg';
import lightLogo from '../../../images/NereusLight.svg';

interface MenuProps {
  title: string;
}

export default function Menu({ title }: MenuProps) {
  const location = useLocation();
  const history = useHistory();
  const intl = useIntl();
  const { currentTheme, isCurrentThemeDark } = useThemeContext();
  const { currentAccount } = useUserWalletDataContext();
  const { currentMarketData } = useProtocolDataContext();

  const isActive = (url: string) => {
    return `/${url.split('/')[1]}` === `/${location.pathname.split('/')[1]}`;
  };

  return (
    <header className="Menu">
      <div className="Menu__logo-inner">
        <Link className="Menu__logo-link" to="/markets" onClick={() => goToTop()}>
          <img src={isCurrentThemeDark ? lightLogo : darkLogo} alt="WXT" />
        </Link>
      </div>

      <div className="Menu__title-inner">
        {history.length > 2 && (
          <button className="Menu__back-button" onClick={history.goBack}>
            <img src={backIcon} alt="" />
          </button>
        )}

        <p>{title}</p>
      </div>

      <div className="Menu__right-inner">
        <nav className="Menu__navigation-inner">
          <ul>
            {navigation.map((link, index) => (
              <li
                className={classNames('Menu__link-inner', {
                  Menu__linkHidden:
                    (!currentAccount && link.hiddenWithoutWallet) ||
                    (link.isVisible && !link.isVisible(currentMarketData)),
                })}
                key={index}
              >
                <MenuLink
                  to={link.link}
                  title={intl.formatMessage(link.title)}
                  isActive={isActive(link.link)}
                />
              </li>
            ))}
            <li className="Menu__link-inner">
              <MoreButton />
            </li>
          </ul>
        </nav>

        <div className="Menu__burger-inner">
          <MobileContent isActive={isActive} currentAccount={currentAccount} />
        </div>

        <div className="Menu__buttons-inner">
          <AddressInfo />
        </div>
      </div>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .Menu {
          background: ${currentTheme.headerBg.hex};
          &__title-inner {
            p {
              color: ${currentTheme.white.hex};
            }
          }
        }
      `}</style>
    </header>
  );
}
