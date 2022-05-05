import { useLocation } from 'react-router-dom';
import { useIntl } from 'react-intl';
import BigNumber from 'bignumber.js';
import queryString from 'query-string';

import messages from './messages';
import StakeTxConfirmationView from '../../components/StakeTxConfirmationView';
import { useStaticPoolDataContext } from '../../../../libs/pool-data-provider';
import { useStakeDataContext } from '../../../../libs/pool-data-provider/hooks/use-stake-data-context';
import Row from '../../../../components/basic/Row';
import Value from '../../../../components/basic/Value';
import wxtIcon from '../../../../images/WXT.svg';
import avaxIcon from '../../../../images/AVAX.svg';
import usdcIcon from '../../../../images/USDS.svg';
import { useStakeLPDataContext } from '../../../../libs/StakeLPContext';

export default function StakeWithApprovalConfirmation() {
  const intl = useIntl();
  const location = useLocation();
  const { userId } = useStaticPoolDataContext();
  const { stakingService } = useStakeDataContext();
  const { balanceLPData } = useStakeLPDataContext();

  //const userBalance = balanceLPData[0].userBalance;
  const selectedStake =
    location.pathname.split('/')[3]?.toLowerCase() === 'wxt-nxusd' ? 'wxt_nxusd' : 'nxusd_3crv';

  const query = queryString.parse(location.search);
  let amount = new BigNumber(typeof query.amount === 'string' ? query.amount : 0);

  if (!amount || !userId) {
    return null;
  }

  const handleGetTransactions = async () => await stakingService.stake(userId, amount.toString());

  let blockingError = '';
  const tokenSymbol =
    selectedStake === 'wxt_nxusd' ? balanceLPData[1].tokenSymbol : balanceLPData[0].tokenSymbol;

  if (
    Number(amount) >
    (selectedStake === 'wxt_nxusd' ? +balanceLPData[1].userBalance : +balanceLPData[0].userBalance)
  ) {
    blockingError = intl.formatMessage(messages.notEnoughBalance, {
      symbol: tokenSymbol,
    });
  }
  return (
    <StakeTxConfirmationView
      caption={intl.formatMessage(messages.title)}
      description={intl.formatMessage(messages.description, {
        symbol: tokenSymbol,
      })}
      getTransactionsData={handleGetTransactions}
      boxTitle={intl.formatMessage(messages.stake, {
        symbol: tokenSymbol,
      })}
      boxDescription={intl.formatMessage(messages.boxDescription)}
      mainTxName={intl.formatMessage(messages.stake, {
        symbol: tokenSymbol,
      })}
      mainTxType="STAKE_ACTION"
      blockingError={blockingError}
      goToAfterSuccess="/staking"
      successButtonTitle={intl.formatMessage(messages.backToStaking)}
      buttonTitle={intl.formatMessage(messages.buttonTitle)}
    >
      <Row title={intl.formatMessage(messages.amount)}>
        <Value
          symbol={tokenSymbol}
          value={amount.toString()}
          doubleIcon={true}
          imgSrc={wxtIcon}
          imgSrcSecond={selectedStake === 'wxt_nxusd' ? usdcIcon : avaxIcon}
        />
      </Row>
    </StakeTxConfirmationView>
  );
}
