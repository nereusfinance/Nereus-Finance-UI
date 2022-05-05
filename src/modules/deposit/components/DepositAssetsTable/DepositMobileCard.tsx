import React from 'react';
import { useHistory } from 'react-router-dom';
import { useIntl } from 'react-intl';

import MobileCardWrapper from '../../../../components/wrappers/MobileCardWrapper';
import Row from '../../../../components/basic/Row';
import NoData from '../../../../components/basic/NoData';
import Value from '../../../../components/basic/Value';
import LiquidityMiningCard from '../../../../components/liquidityMining/LiquidityMiningCard';
import { isAssetStable } from '../../../../helpers/config/assets-config';

import messages from './messages';

import { DepositTableItem } from './types';
import { useNereusIncentiveDataContext } from '../../../../libs/nereus-incentive-data-provider';

export default function DepositMobileCard({
  id,
  symbol,
  underlyingAsset,
  walletBalance,
  walletBalanceInUSD,
  liquidityRate,
  avg30DaysLiquidityRate,
  userId,
  borrowingEnabled,
  isFreezed,
  aincentivesAPR,
}: DepositTableItem) {
  const intl = useIntl();
  const history = useHistory();

  const url = `/deposit/${underlyingAsset}-${id}`;
  const { marketsAPR } = useNereusIncentiveDataContext();
  aincentivesAPR = marketsAPR[id]?.deposit || '0';

  return (
    <MobileCardWrapper
      onClick={() => history.push(url)}
      symbol={symbol}
      withGoToTop={true}
      disabled={isFreezed}
      className="MobileCardWrappers"
    >
      <Row
        title={intl.formatMessage(messages.yourWalletBalance)}
        withMargin={true}
        titleWidth={'41%'}
      >
        {!userId || Number(walletBalance) <= 0 ? (
          <NoData color="dark" />
        ) : (
          <Value
            value={Number(walletBalance)}
            subValue={walletBalanceInUSD}
            maximumSubValueDecimals={2}
            subSymbol="USD"
            maximumValueDecimals={isAssetStable(symbol) ? 2 : 5}
            minimumValueDecimals={isAssetStable(symbol) ? 2 : 5}
          />
        )}
      </Row>

      {!isFreezed && (
        <Row title={intl.formatMessage(messages.APY)} withMargin={true}>
          {borrowingEnabled ? (
            <LiquidityMiningCard
              symbol={symbol}
              value={liquidityRate}
              thirtyDaysValue={avg30DaysLiquidityRate}
              liquidityMiningValue={aincentivesAPR}
              type="deposit"
            />
          ) : (
            <NoData color="dark" />
          )}
        </Row>
      )}
      <style jsx={true} global={true}>{`
        .MobileCardWrapper {
          height: 185px !important;
          &__content {
            .Row {
              &__dark {
                display: flex;
                flex-direction: row;
                align-items: center !important;
              }
            }
          }
        }
      `}</style>
    </MobileCardWrapper>
  );
}
