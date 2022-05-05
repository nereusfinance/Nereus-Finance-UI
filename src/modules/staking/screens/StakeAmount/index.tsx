import { useHistory, useLocation } from 'react-router-dom';
import { useIntl } from 'react-intl';
import queryString from 'query-string';

import messages from './messages';
import { useStakeDataContext } from '../../../../libs/pool-data-provider/hooks/use-stake-data-context';
import BasicForm from '../../../../components/forms/BasicForm';
import defaultMessages from '../../../../defaultMessages';
import wxtIcon from '../../../../images/WXT.svg';
import avaxIcon from '../../../../images/AVAX.svg';
import usdcIcon from '../../../../images/USDS.svg';
import { useStakeLPDataContext } from '../../../../libs/StakeLPContext';

export default function StakeAmount() {
  const intl = useIntl();
  const { stakingService } = useStakeDataContext();
  const history = useHistory();
  const { balanceLPData } = useStakeLPDataContext();
  const location = useLocation();

  const selectedStake =
    location.pathname.split('/')[3]?.toLowerCase() === 'wxt-nxusd' ? 'wxt_nxusd' : 'nxusd_3crv';

  const handleSubmit = (amount: string) => {
    const query = queryString.stringify({ amount });
    history.push(`${history.location.pathname}/confirmation?${query}`);
  };

  const handleGetTransactions = (userId: string) => async () => {
    if (
      selectedStake === 'wxt_nxusd'
        ? balanceLPData[1].userBalance
        : balanceLPData[0].userBalance === '0'
    )
      return [];
    return await stakingService.stake(
      userId,
      selectedStake === 'wxt_nxusd' ? balanceLPData[1].userBalance : balanceLPData[0].userBalance
    );
  };
  return (
    <>
      <BasicForm
        title={intl.formatMessage(messages.caption)}
        description={intl.formatMessage(messages.description, {
          symbol:
            selectedStake === 'wxt_nxusd'
              ? balanceLPData[1].tokenSymbol
              : balanceLPData[0].tokenSymbol,
        })}
        amountFieldTitle={intl.formatMessage(messages.availableToStake)}
        maxAmount={
          selectedStake === 'wxt_nxusd'
            ? balanceLPData[1].userBalance
            : balanceLPData[0].userBalance
        }
        currencySymbol={
          selectedStake === 'wxt_nxusd'
            ? balanceLPData[1].tokenSymbol
            : balanceLPData[0].tokenSymbol
        }
        onSubmit={handleSubmit}
        submitButtonTitle={intl.formatMessage(defaultMessages.stake)}
        getTransactionData={handleGetTransactions}
        doubleIcon={true}
        imgSrc={wxtIcon}
        imgSrcSecond={selectedStake === 'wxt_nxusd' ? usdcIcon : avaxIcon}
      />
    </>
  );
}
