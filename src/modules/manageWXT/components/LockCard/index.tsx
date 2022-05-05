import React from 'react';
import messages from './messages';
import TransactionsCard from '../TransactionsCard';
import { useIntl } from 'react-intl';
import stakeIcon from '../../../../images/stake.svg';
import useLockAPR from '../../../../helpers/useLockAPR';

export default function LockCard() {
  const { lockAPR } = useLockAPR();
  const intl = useIntl();

  return (
    <TransactionsCard
      title={intl.formatMessage(messages.lockBlizz)}
      description={intl.formatMessage(messages.lockBlizzDescr)}
      description2={intl.formatMessage(messages.lockBlizzDescr2)}
      APR={lockAPR}
      imgSrc={stakeIcon}
      isLock
    />
  );
}
