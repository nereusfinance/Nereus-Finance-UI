import React, { useEffect } from 'react';
import { useIntl } from 'react-intl';
import classNames from 'classnames';
import { useSwipeable } from 'react-swipeable';
import { useThemeContext, DropdownWrapper, SocialIcons } from '@aave/aave-ui-kit';

import { useProtocolDataContext } from '../../../libs/protocol-data-provider';
import { useMenuContext } from '../../../libs/menu';
import goToTop from '../../../helpers/goToTop';
import Link from '../../basic/Link';
import AddressInfo from '../AddressInfo';

import { mobileNavigation } from '../navigation';
import { socialIcons } from '../../../ui-config';

import staticStyles from './style';
import mobileMenuIcon from '../../../images/mobileMenuIcon.svg';

interface MobileContentProps {
  isActive: (url: string) => boolean;
  currentAccount: string;
}

export default function MobileContent({ isActive, currentAccount }: MobileContentProps) {
  const intl = useIntl();
  const { currentTheme, md, isCurrentThemeDark } = useThemeContext();
  const { openMobileMenu, closeMobileMenu, mobileMenuVisible, setMobileMenuVisible } =
    useMenuContext();
  const { currentMarketData } = useProtocolDataContext();

  useEffect(() => {
    if (mobileMenuVisible && !md) {
      closeMobileMenu();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [md]);

  const handleLinkClick = () => {
    goToTop();
    closeMobileMenu();
  };

  const handlers = useSwipeable({
    onSwipedRight: () => closeMobileMenu(),
  });

  return (
    <div {...handlers}>
      <div
        className={classNames('MobileContent__overlay', {
          MobileContent__overlayActive: mobileMenuVisible,
        })}
      />

      <DropdownWrapper
        visible={mobileMenuVisible}
        setVisible={setMobileMenuVisible}
        className="MobileContent"
        contentClassName="MobileContent__content-wrapper"
        contentId="MobileMenuContent"
        buttonComponent={
          <button
            className={classNames('MobileContent__button', {
              MobileContent__buttonActive: mobileMenuVisible,
            })}
            onClick={openMobileMenu}
            type="button"
          >
            <img src={mobileMenuIcon} alt="" />
          </button>
        }
      >
        <div className="MobileContent__content">
          <div className="MobileContent__top">
            <AddressInfo />
          </div>

          <div className="MobileContent__navigation">
            <ul>
              {mobileNavigation.map((link, index) => (
                <li
                  className={classNames('MobileContent__link-wrapper', {
                    MobileContent__linkHidden:
                      (!currentAccount && link.hiddenWithoutWallet) ||
                      (link.isVisible && !link.isVisible(currentMarketData)),
                  })}
                  key={index}
                >
                  {!link.onClick ? (
                    <Link
                      className={classNames('MobileContent__link', {
                        MobileContent__linkActive: isActive(link.link),
                      })}
                      to={link.link}
                      absolute={link.absolute}
                      inNewWindow={link.absolute}
                      onClick={() => !link.absolute && handleLinkClick()}
                      color="white"
                    >
                      <span>{intl.formatMessage(link.title)}</span>
                    </Link>
                  ) : (
                    <div
                      className="MobileContent__link MobileContent__link-chat"
                      onClick={link.onClick}
                    >
                      <span>{intl.formatMessage(link.title)}</span>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="MobileContent__bottom">
          {/*<div className="MobileContent__lang-switcher">*/}
          {/*  <LangSwitcher inside={true} />*/}
          {/*</div>*/}

          <SocialIcons
            icons={socialIcons}
            className="MobileContent__social-icons"
            iconHeight={40}
            iconWidth={40}
            white={true}
          />
        </div>
      </DropdownWrapper>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .MobileContent {
          &__button-inner,
          &__button-inner:before,
          &__button-inner:after {
            background: ${currentTheme.white.hex};
          }

          .MobileContent__content-wrapper.DropdownWrapper__content {
            background-color: ${currentTheme.whiteElement.hex};
          }

          &__bottom,
          &__top {
            display: flex;
            justify-content: center;
            &:after {
              background: ${isCurrentThemeDark ? 'black' : 'white'};
            }
          }

          .MobileContent__link {
            color: ${currentTheme.white.hex};
          }
        }
      `}</style>
    </div>
  );
}
