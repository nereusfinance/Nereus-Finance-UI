import React from 'react';
import { useLocation } from 'react-router-dom';
import { useIntl } from 'react-intl';
import BigNumber from 'bignumber.js';
import queryString from 'query-string';
import wxtIcon from '../../../../images/WXT.svg';
import avaxIcon from '../../../../images/AVAX.svg';
import usdcIcon from '../../../../images/USDS.svg';
import { useStakeDataContext } from '../../../../libs/pool-data-provider/hooks/use-stake-data-context';
import { useStaticPoolDataContext } from '../../../../libs/pool-data-provider';
import Row from '../../../../components/basic/Row';
import Value from '../../../../components/basic/Value';

import messages from './messages';
import StakeTxConfirmationView from '../../components/StakeTxConfirmationView';
import { useStakeLPDataContext } from '../../../../libs/StakeLPContext';

export default function UnstakeConfirmation() {
  const intl = useIntl();
  const location = useLocation();
  const { userId } = useStaticPoolDataContext();
  const { stakingService } = useStakeDataContext();
  const { balanceLPData } = useStakeLPDataContext();

  const selectedStake =
    location.pathname.split('/')[4]?.toLowerCase() === 'wxt-nxusd' ? 'wxt_nxusd' : 'nxusd_3crv';
  const tokenSymbol =
    selectedStake === 'wxt_nxusd' ? balanceLPData[1].tokenSymbol : balanceLPData[0].tokenSymbol;

  const query = queryString.parse(location.search);
  let amount = new BigNumber(typeof query.amount === 'string' ? query.amount : 0);

  if (amount.eq(0) || !userId) {
    return null;
  }

  let blockingError = '';
  if (
    Number(amount) >
    (selectedStake === 'wxt_nxusd'
      ? +balanceLPData[1].stakedByUser
      : +balanceLPData[0].stakedByUser)
  ) {
    blockingError = intl.formatMessage(messages.blockingError);
  }

  const handleGetTransactions = async () => stakingService.withdraw(userId, amount.toString());

  return (
    <StakeTxConfirmationView
      caption={intl.formatMessage(messages.title)}
      description={intl.formatMessage(messages.description)}
      getTransactionsData={handleGetTransactions}
      boxTitle={intl.formatMessage(messages.unstakeAsset, { symbol: tokenSymbol })}
      boxDescription={intl.formatMessage(messages.boxDescription)}
      mainTxName={intl.formatMessage(messages.unstake)}
      goToAfterSuccess="/staking"
      successButtonTitle={intl.formatMessage(messages.backToStaking)}
      blockingError={blockingError}
      buttonTitle={intl.formatMessage(messages.unstake)}
    >
      <Row title={intl.formatMessage(messages.unstakeAsset, { symbol: tokenSymbol })}>
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
