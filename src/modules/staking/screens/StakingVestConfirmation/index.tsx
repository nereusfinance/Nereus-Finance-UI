import { useIntl } from 'react-intl';

import { useStakeDataContext } from '../../../../libs/pool-data-provider/hooks/use-stake-data-context';
import Row from '../../../../components/basic/Row';
import StakeTxConfirmationView from '../../components/StakeTxConfirmationView';
import Value from '../../../../components/basic/Value';
import { stakeConfig } from '../../../../ui-config';

import messages from './messages';
import { useStakeLPDataContext } from '../../../../libs/StakeLPContext';
import { useUserWalletDataContext } from '../../../../libs/web3-data-provider';
import { ethers } from 'ethers';

export default function StakingVestConfirmation() {
  const intl = useIntl();
  const { currentAccount: walletAddress } = useUserWalletDataContext();
  const { stakingService } = useStakeDataContext();
  const { balanceLPData } = useStakeLPDataContext();

  const handleGetTransactions = async () =>
    stakingService.claimRewards(walletAddress, [
      stakeConfig?.tokens.nxusd_3crv.STAKING_POOL,
      stakeConfig?.tokens.wxt_nxusd.STAKING_POOL,
    ]);

  let blockingError = '';
  // if (selectedStakeData.userIncentivesToClaim === '0') {
  //   blockingError = intl.formatMessage(messages.notEnoughBalance);
  // }

  // if (amount.gt(selectedStakeData.userIncentivesToClaim)) {
  //   blockingError = intl.formatMessage(messages.notHaveEnoughIncentives);
  // }

  // const formattedAmount = amount.eq(-1)
  //   ? selectedStakeData.userIncentivesToClaim
  //   : amount.toString();

  return (
    <StakeTxConfirmationView
      caption={intl.formatMessage(messages.title)}
      description={intl.formatMessage(messages.description)}
      getTransactionsData={handleGetTransactions}
      boxTitle={intl.formatMessage(messages.claim)}
      boxDescription={intl.formatMessage(messages.boxDescription)}
      mainTxName={intl.formatMessage(messages.claim)}
      blockingError={blockingError}
      goToAfterSuccess="/staking"
      successButtonTitle={intl.formatMessage(messages.backToStaking)}
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
