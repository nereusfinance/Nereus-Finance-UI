import { useIntl } from 'react-intl';
import { useLocation } from 'react-router-dom';
import { ethers } from 'ethers';

import { useStakeDataContext } from '../../../../libs/pool-data-provider/hooks/use-stake-data-context';
import Row from '../../../../components/basic/Row';
import StakeTxConfirmationView from '../../components/StakeTxConfirmationView';
import Value from '../../../../components/basic/Value';
import { stakeConfig } from '../../../../ui-config';

import messages from './messages';
import { useStakeLPDataContext } from '../../../../libs/StakeLPContext';
import { useUserWalletDataContext } from '../../../../libs/web3-data-provider';

export default function VestWithUnstakeConfirmation() {
  const intl = useIntl();
  const { currentAccount: walletAddress } = useUserWalletDataContext();
  const { stakingService } = useStakeDataContext();
  const { balanceLPData } = useStakeLPDataContext();
  const location = useLocation();

  const selectedStake =
    location.pathname.split('/')[5]?.toLowerCase() === 'nxusd-3crv' ? 'nxusd-3crv' : 'wxt-nxusd';

  const handleGetTransactions = async () =>
    stakingService.claimRewards(walletAddress, [
      stakeConfig?.tokens.nxusd_3crv.STAKING_POOL,
      stakeConfig?.tokens.wxt_nxusd.STAKING_POOL,
    ]);

  let blockingError = '';

  return (
    <StakeTxConfirmationView
      caption={intl.formatMessage(messages.title)}
      description={intl.formatMessage(messages.description)}
      getTransactionsData={handleGetTransactions}
      boxTitle={intl.formatMessage(messages.claim)}
      boxDescription={intl.formatMessage(messages.boxDescription)}
      mainTxName={intl.formatMessage(messages.claim)}
      blockingError={blockingError}
      goToAfterSuccess={`/staking/vest-&-unstake/unstake/${
        selectedStake === 'nxusd-3crv' ? 'NXUSD-3CRV' : 'WXT-NXUSD'
      }`}
      successButtonTitle={intl.formatMessage(messages.proceedToUnstaking)}
    >
      <Row title={intl.formatMessage(messages.claim)}>
        <Value
          symbol="wxt"
          value={ethers.utils.formatEther(balanceLPData[0].vestRewardByUser)}
          tokenIcon={true}
        />
      </Row>
    </StakeTxConfirmationView>
  );
}
