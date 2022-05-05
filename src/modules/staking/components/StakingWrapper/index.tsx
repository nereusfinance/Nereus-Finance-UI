import { useThemeContext } from '@aave/aave-ui-kit';
import React, { ReactNode, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useIntl } from 'react-intl';
import classNames from 'classnames';

import { StakingTopPanel } from '../StakingTopPanel';
import ScreenWrapper from '../../../../components/wrappers/ScreenWrapper';
import ContentWrapper from '../../../../components/wrappers/ContentWrapper';
import NoDataPanel from '../../../../components/NoDataPanel';

import messages from './messages';
import staticStyles from './style';
import { useUserWalletDataContext } from '../../../../libs/web3-data-provider';
import VestCard from '../WXTClaim';

interface StakingWrapperProps {
  children: ReactNode;
}

export default function StakingWrapper({ children }: StakingWrapperProps) {
  const intl = useIntl();
  const location = useLocation();
  const { currentTheme } = useThemeContext();
  const { currentAccount: walletAddress } = useUserWalletDataContext();

  const [isShowYourIncentives] = useState(false);

  return (
    <>
      {!walletAddress ? (
        <ContentWrapper withBackButton={false} withFullHeight={true}>
          <div className="NoDataPanelWrapper">
            <NoDataPanel
              title={intl.formatMessage(messages.connectWallet)}
              description={intl.formatMessage(messages.connectWalletDescription)}
              withConnectButton={true}
            />
          </div>
        </ContentWrapper>
      ) : (
        <ScreenWrapper
          className="StakingWrapper"
          pageTitle={intl.formatMessage(messages.pageTitle)}
          isTopLineSmall={true}
        >
          <div className="TopPanel">
            <StakingTopPanel className="StakingTopPanel" />
            <VestCard className="EarnedWXT" />
          </div>

          <div className="StakingWrapper__content-inner">
            {location.pathname === '/staking' ? (
              <>{children}</>
            ) : (
              <ContentWrapper
                className={classNames('StakingWrapper__content-item', {
                  StakingWrapper__contentActive: !isShowYourIncentives,
                })}
                withBackButton={true}
              >
                {children}
              </ContentWrapper>
            )}
          </div>
        </ScreenWrapper>
      )}
      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        @import 'src/_mixins/screen-size';

        .StakingWrapper {
          &__content-left,
          &__content-right {
            background: ${currentTheme.whiteElement.hex};
          }
        }
        .SubValue {
          font-size: 12px !important;
        }
        .BasicForm {
          background: ${currentTheme.whiteElement.hex};
          border-radius: 4px;
        }
      `}</style>
    </>
  );
}
