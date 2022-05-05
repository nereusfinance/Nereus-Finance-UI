import React from 'react';
import messages from './messages';
import TransactionsCard from '../TransactionsCard';
import { useIntl } from 'react-intl';
import stakeIcon from '../../../../images/stake.svg';
import useStakeAPR from '../../../../helpers/useStakeAPR';

export default function StakeCard() {
  const { stakeAPR } = useStakeAPR();
  const intl = useIntl();

  return (
    <TransactionsCard
      title={intl.formatMessage(messages.stakeTitle)}
      description={intl.formatMessage(messages.stakeDescr)}
      APR={stakeAPR}
      imgSrc={stakeIcon}
    />
  );
}
