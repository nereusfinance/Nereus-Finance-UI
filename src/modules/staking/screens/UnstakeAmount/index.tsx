import { useHistory, useLocation } from 'react-router-dom';
import { useIntl } from 'react-intl';
import queryString from 'query-string';

import messages from './messages';
import { useStakeDataContext } from '../../../../libs/pool-data-provider/hooks/use-stake-data-context';
import BasicForm from '../../../../components/forms/BasicForm';
import wxtIcon from '../../../../images/WXT.svg';
import avaxIcon from '../../../../images/AVAX.svg';
import usdcIcon from '../../../../images/USDS.svg';
import { useStakeLPDataContext } from '../../../../libs/StakeLPContext';

export default function UnstakeAmount() {
  const intl = useIntl();
  const history = useHistory();
  const { stakingService } = useStakeDataContext();
  const location = useLocation();

  const handleSubmit = (amount: string) => {
    const query = queryString.stringify({ amount });
    history.push(`${history.location.pathname}/confirmation?${query}`);
  };

  const { balanceLPData } = useStakeLPDataContext();
  const selectedStake =
    location.pathname.split('/')[4]?.toLowerCase() === 'wxt-nxusd' ? 'wxt_nxusd' : 'nxusd_3crv';

  const tokenSymbol =
    selectedStake === 'wxt_nxusd' ? balanceLPData[1].tokenSymbol : balanceLPData[0].tokenSymbol;

  const handleGetTransactions = (userId: string) => async () =>
    stakingService.withdraw(
      userId,
      selectedStake === 'wxt_nxusd' ? balanceLPData[1].stakedByUser : balanceLPData[0].stakedByUser
    );

  return (
    <BasicForm
      title={intl.formatMessage(messages.caption, { symbol: tokenSymbol })}
      description={intl.formatMessage(messages.description)}
      amountFieldTitle={intl.formatMessage(messages.currentlyStaked)}
      maxAmount={
        selectedStake === 'wxt_nxusd'
          ? balanceLPData[1].stakedByUser
          : balanceLPData[0].stakedByUser
      }
      currencySymbol={tokenSymbol}
      onSubmit={handleSubmit}
      submitButtonTitle={intl.formatMessage(messages.unstake)}
      getTransactionData={handleGetTransactions}
      doubleIcon={true}
      imgSrc={wxtIcon}
      imgSrcSecond={selectedStake === 'wxt_nxusd' ? usdcIcon : avaxIcon}
    />
  );
}
