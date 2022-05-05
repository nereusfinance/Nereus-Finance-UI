import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import classNames from 'classnames';
import { useThemeContext } from '@aave/aave-ui-kit';

import Footer from '../../Footer';
import Menu from '../../menu/Menu';
import { BottomDisclaimer, TopDisclaimer } from '../../../ui-config';

import messages from './messages';
import staticStyles from './style';

import { useLocation } from 'react-router';
import { useDynamicPoolDataContext } from '../../../libs/pool-data-provider';
import SwitchChainButton from '../../SwitchChainButton';
import { useWeb3React } from '@web3-react/core';
import { isAllowedChain } from '../../../helpers/is-allowed-chain';

export interface ScreensWrapperProps {
  children: ReactNode;
}

export const TitleContext = createContext({
  title: '',
  setTitle: (title: string) => {},
});

export function useHeaderTitle() {
  const { title, setTitle } = useContext(TitleContext);
  return { title, setTitle };
}

export const TopPanelSmallContext = createContext({
  isTopPanelSmall: false,
  setTopPanelSmall: (isSmallTopLine: boolean) => {},
});

export function useWithDesktopTitle() {
  const { isTopPanelSmall, setTopPanelSmall } = useContext(TopPanelSmallContext);
  return { isTopPanelSmall, setTopPanelSmall };
}

export default function ScreensWrapper({ children }: ScreensWrapperProps) {
  const intl = useIntl();
  const { currentTheme } = useThemeContext();
  const { library, chainId } = useWeb3React();
  const [title, setTitle] = useState(intl.formatMessage(messages.pageTitle));
  const [isTopPanelSmall, setTopPanelSmall] = useState(
    localStorage.getItem('isTopPanelSmall') === 'true' || false
  );
  const location = useLocation();
  const { user } = useDynamicPoolDataContext();
  const [dashBoardTopPanelSmall, setDashBoardTopPanelSmall] = useState(false);
  // TODO: Add check for empty deposits
  useEffect(() => {
    // set top panel small if current tab is dashboard and user is not logged in or user has no deposits
    setDashBoardTopPanelSmall(
      location.pathname.includes('/withdraw') ||
        location.pathname.includes('/repay') ||
        (location.pathname === '/dashboard' &&
          (!user ||
            !user?.userReservesData.some((userReserve) => userReserve.underlyingBalance !== '0')))
    );
  }, [user, location.pathname]);
  //useEffect(() => setTitle(intl.formatMessage(messages.pageTitle)), []);

  return (
    <div
      className={classNames('ScreensWrapper', {
        ScreensWrapper__topPanelWXT: location.pathname.includes('/manageWXT'),
        ScreensWrapper__topPanelSmall: isTopPanelSmall || dashBoardTopPanelSmall,
      })}
    >
      <BottomDisclaimer />

      <TopDisclaimer />
      {chainId && !isAllowedChain(chainId) && (
        <div className="errorSpace">
          Connected to the wrong network
          <SwitchChainButton chainId={chainId} library={library} marginTop={'0'} />
        </div>
      )}
      <Menu title={title} />

      <main className="ScreensWrapper__content" id="ScreensWrapper__content-wrapper">
        <div className="ScreensWrapper__top-contentWrapper" />

        <TitleContext.Provider value={{ title, setTitle }}>
          <TopPanelSmallContext.Provider value={{ isTopPanelSmall, setTopPanelSmall }}>
            {children}
          </TopPanelSmallContext.Provider>
        </TitleContext.Provider>
      </main>

      <Footer inside={true} />

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        @import 'src/_mixins/screen-size';
        .errorSpace {
          background-color: ${currentTheme.headerDarkBg.hex};
          color: ${currentTheme.statusError.hex};
        }
        .ScreensWrapper {
          background: ${currentTheme.mainBg.hex};
          &__top-contentWrapper {
            background: ${currentTheme.headerBg.hex};
            &:after {
              background: ${currentTheme.headerBg.hex};
            }
          }
        }
      `}</style>
    </div>
  );
}
