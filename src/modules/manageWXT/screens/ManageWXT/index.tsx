import React, { useEffect } from 'react';
import { useIntl } from 'react-intl';
import ScreenWrapper from '../../../../components/wrappers/ScreenWrapper';
import staticStyles from './style';
import messages from './messages';
import { useThemeContext } from '@aave/aave-ui-kit';
import ManageWXTTopPanel from '../../components/ManageWXTTopPanel';
import { useHeaderTitle } from '../../../../components/wrappers/ScreensWrapper';
import HelpCard from '../../components/HelpCard';
import ClaimCard from '../../components/ClaimCard';
import VestsCard from '../../components/VestsCard';
import StakeCard from '../../components/StakeCard';
import LockCard from '../../components/LockCard';
import FeesCard from '../../components/FeesCard';
import {
  StakeLockDataContextProvider,
  useStakeLockDataContext,
} from '../../back/StakeLockDataContext';
import { useUserWalletDataContext } from '../../../../libs/web3-data-provider';
import ContentWrapper from '../../../../components/wrappers/ContentWrapper';
import NoDataPanel from '../../../../components/NoDataPanel';

export default function ManageWXT() {
  const intl = useIntl();
  const { currentTheme, sm } = useThemeContext();
  const { balanceData } = useStakeLockDataContext();
  const { setTitle } = useHeaderTitle();
  useEffect(() => setTitle(intl.formatMessage(messages.title)), []);

  // TODO: get data
  const vests: any[] = balanceData.earningsData;
  const { currentAccount: walletAddress } = useUserWalletDataContext();

  return (
    <>
      {walletAddress ? (
        <StakeLockDataContextProvider>
          <ScreenWrapper className="ManageScreenWrapper" withMobileGrayBg={false}>
            <p className="ManageTitle">{intl.formatMessage(messages.title)}</p>
            <p className="ManageSubTitle">{intl.formatMessage(messages.subtitle)}</p>
            <ManageWXTTopPanel />
            <div className="ManageWxtColWrapper">
              <div className="ManageWXTCol ManageWXTCol__left">
                <StakeCard />
                <LockCard />
                {!sm ? <HelpCard /> : ''}
              </div>
              <div className="ManageWXTCol ManageWXTCol__right">
                <ClaimCard />
                <VestsCard items={vests} />
                <VestsCard isVests={false} items={balanceData.locks} />
                <FeesCard />
                {sm ? <HelpCard /> : ''}
              </div>
            </div>
          </ScreenWrapper>
        </StakeLockDataContextProvider>
      ) : (
        <ContentWrapper withBackButton={true} withFullHeight={true}>
          <div className="NoDataPanelWrapper">
            <NoDataPanel
              title={intl.formatMessage(messages.connectWallet)}
              description={intl.formatMessage(messages.connectWalletDescription)}
              withConnectButton={true}
            />
          </div>
        </ContentWrapper>
      )}
      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .ManageTitle {
          color: ${currentTheme.maxWhite.hex};
        }
        .ManageSubTitle {
          color: ${currentTheme.maxWhite.hex};
        }
      `}</style>
    </>
  );
}
