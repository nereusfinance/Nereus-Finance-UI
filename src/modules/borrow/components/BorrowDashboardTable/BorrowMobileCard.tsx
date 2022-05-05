import React from 'react';
import { useIntl } from 'react-intl';

import { BorrowRateMode } from '../../../../libs/pool-data-provider/graphql';
import MobileCardWrapper from '../../../../components/wrappers/MobileCardWrapper';
import Row from '../../../../components/basic/Row';
import Value from '../../../../components/basic/Value';
import LiquidityMiningCard from '../../../../components/liquidityMining/LiquidityMiningCard';
import NoData from '../../../../components/basic/NoData';
import Link from '../../../../components/basic/Link';
import DefaultButton from '../../../../components/basic/DefaultButton';
import AMPLWarning from '../../../../components/AMPLWarning';

import defaultMessages from '../../../../defaultMessages';
import messages from './messages';

import { BorrowTableItem } from './types';
import { useNereusIncentiveDataContext } from '../../../../libs/nereus-incentive-data-provider';

export default function BorrowMobileCard({
  reserve: { symbol, id },
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
  vincentivesAPR,
  sincentivesAPR,
}: BorrowTableItem) {
  const intl = useIntl();
  const { marketsAPR } = useNereusIncentiveDataContext();
  vincentivesAPR = marketsAPR[id]?.borrow || '0';
  return (
    <>
      <MobileCardWrapper symbol={symbol} className="MobileCardWrapperBorrow">
        <Row title={intl.formatMessage(messages.secondTableColumnTitle)} withMargin={true}>
          <Value
            value={Number(currentBorrows)}
            subValue={Number(currentBorrowsUSD)}
            subSymbol="USD"
          />
        </Row>

        <Row title={intl.formatMessage(messages.apyRowTitle)} withMargin={true}>
          {borrowingEnabled ? (
            <LiquidityMiningCard
              symbol={symbol}
              value={Number(borrowRate)}
              thirtyDaysValue={
                borrowRateMode === BorrowRateMode.Variable ? avg30DaysVariableRate : ''
              }
              liquidityMiningValue={
                borrowRateMode === BorrowRateMode.Variable ? vincentivesAPR : sincentivesAPR
              }
              type={
                borrowRateMode === BorrowRateMode.Variable ? 'borrow-variable' : 'borrow-stable'
              }
            />
          ) : (
            <NoData color="dark" />
          )}
        </Row>

        <Row
          title={intl.formatMessage(messages.borrowMore)}
          className="Row__center"
          withMargin={true}
        >
          <Link
            to={borrowLink}
            className="ButtonLink"
            disabled={!isActive || !borrowingEnabled || isFrozen}
          >
            <DefaultButton
              title={intl.formatMessage(defaultMessages.borrow)}
              color="nereusYellow"
              disabled={!isActive || !borrowingEnabled || isFrozen}
              className="btnBorrow"
            />
          </Link>
        </Row>

        <Row title={intl.formatMessage(messages.repayYourBorrow)} className="Row__center">
          <Link to={repayLink} className="ButtonLink" disabled={!isActive}>
            <DefaultButton
              title={intl.formatMessage(defaultMessages.repay)}
              color="btnGrey"
              transparent={true}
              disabled={!isActive}
              className="btnRepay"
            />
          </Link>
        </Row>
        <style jsx={true} global={true}>{`
          .MobileCardWrapperBorrow {
            height: 280px !important;
          }
          .btnRepay {
            font-size: 14px !important;
            width: 90px !important;
            height: 28px;
          }
          .btnBorrow {
            font-size: 14px !important;
            width: 77px !important;
            height: 28px;
          }
        `}</style>
      </MobileCardWrapper>

      {symbol === 'AMPL' && <AMPLWarning />}
    </>
  );
}
