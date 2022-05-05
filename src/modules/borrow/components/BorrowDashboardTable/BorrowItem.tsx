import React from 'react';
import { useIntl } from 'react-intl';

import TableItem from '../../../dashboard/components/DashboardTable/TableItem';
import TableValueCol from '../../../dashboard/components/DashboardTable/TableValueCol';
import TableButtonsWrapper from '../../../dashboard/components/DashboardTable/TableButtonsWrapper';
import TableButtonCol from '../../../dashboard/components/DashboardTable/TableButtonCol';
import TableAprCol from '../../../dashboard/components/DashboardTable/TableAprCol';
import { BorrowRateMode } from '../../../../libs/pool-data-provider/graphql';

import defaultMessages from '../../../../defaultMessages';

import { BorrowTableItem } from './types';
import { useNereusIncentiveDataContext } from '../../../../libs/nereus-incentive-data-provider';

export default function BorrowItem({
  reserve: { symbol, id },
  uiColor,
  currentBorrows,
  currentBorrowsUSD,
  borrowRate,
  avg30DaysVariableRate,
  borrowRateMode,
  onSwitchToggle,
  isActive,
  isFrozen,
  borrowingEnabled,
  stableBorrowRateEnabled,
  repayLink,
  borrowLink,
  index,
  vincentivesAPR,
  sincentivesAPR,
}: BorrowTableItem) {
  const intl = useIntl();
  const { marketsAPR } = useNereusIncentiveDataContext();
  vincentivesAPR = marketsAPR[id]?.borrow || '0';

  return (
    <TableItem tokenSymbol={symbol} color={uiColor}>
      <TableValueCol
        value={Number(currentBorrows)}
        subValue={Number(currentBorrowsUSD)}
        tooltipId={`borrow-${symbol}__${index}`}
      />
      <TableAprCol
        value={Number(borrowRate)}
        thirtyDaysAverage={borrowRateMode === BorrowRateMode.Variable ? avg30DaysVariableRate : ''}
        liquidityMiningValue={
          borrowRateMode === BorrowRateMode.Variable ? vincentivesAPR : sincentivesAPR
        }
        symbol={symbol}
        type={borrowRateMode === BorrowRateMode.Variable ? 'borrow-variable' : 'borrow-stable'}
      />

      <TableButtonsWrapper>
        <TableButtonCol
          disabled={!isActive || !borrowingEnabled || isFrozen}
          title={intl.formatMessage(defaultMessages.borrow)}
          linkTo={borrowLink}
        />
        <TableButtonCol
          disabled={!isActive}
          title={intl.formatMessage(defaultMessages.repay)}
          linkTo={repayLink}
          withoutBorder={true}
        />
      </TableButtonsWrapper>
    </TableItem>
  );
}
