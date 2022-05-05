import React from 'react';
import { useHistory } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { useThemeContext } from '@aave/aave-ui-kit';

import MobileCardWrapper from '../../../../components/wrappers/MobileCardWrapper';
import LiquidityMiningCard from '../../../../components/liquidityMining/LiquidityMiningCard';
import Row from '../../../../components/basic/Row';
import FreezedWarning from '../../../../components/FreezedWarning';
import Value from '../../../../components/basic/Value';
import NoData from '../../../../components/basic/NoData';

import messages from './messages';
import staticStyles from './style';

import { MarketTableItemProps } from '../MarketTableItem';

export default function MarketMobileCard({
  id,
  currencySymbol,
  underlyingAsset,
  totalLiquidityInUSD,
  totalBorrowsInUSD,
  depositAPY,
  aincentivesAPR,
  vincentivesAPR,
  sincentivesAPR,
  avg30DaysLiquidityRate,
  stableBorrowRate,
  variableBorrowRate,
  avg30DaysVariableRate,
  borrowingEnabled,
  stableBorrowRateEnabled,
  isFreezed,
}: MarketTableItemProps) {
  const intl = useIntl();
  const history = useHistory();
  const { currentTheme } = useThemeContext();

  const cards = [
    {
      title: messages.deposit,
      value: depositAPY,
      thirtyDaysValue: avg30DaysLiquidityRate,
      liquidityMiningValue: aincentivesAPR,
      enabled: true,
      type: 'deposit',
    },
    {
      title: messages.borrow,
      value: variableBorrowRate,
      thirtyDaysValue: avg30DaysVariableRate,
      liquidityMiningValue: vincentivesAPR,
      enabled: borrowingEnabled,
      type: 'borrow-variable',
    },
  ];

  const handleClick = () => {
    history.push(`/reserve-overview/${underlyingAsset}-${id}`);
  };

  return (
    <MobileCardWrapper
      symbol={currencySymbol}
      onClick={handleClick}
      withGoToTop={true}
      className="MarketMobileCard"
      subSymbolComponent={
        <div className="MarketMobileCard__topRows">
          <Row title={intl.formatMessage(messages.marketSize)}>
            <Value
              value={totalLiquidityInUSD}
              symbol="USD"
              tokenIcon={true}
              compact={true}
              withoutSymbol={true}
              maximumValueDecimals={2}
            />
          </Row>
          <Row title={intl.formatMessage(messages.totalBorrowed)}>
            {borrowingEnabled ? (
              <>
                <Value
                  value={totalBorrowsInUSD}
                  symbol="USD"
                  tokenIcon={true}
                  compact={true}
                  maximumValueDecimals={2}
                  withoutSymbol={true}
                />
              </>
            ) : (
              <NoData color="dark" />
            )}
          </Row>
        </div>
      }
    >
      {!isFreezed && (
        <div className="MarketMobileCard__cards">
          {cards.map((card, index) => (
            <div className="MarketMobileCard__card" key={index}>
              <p
                className={
                  intl.formatMessage(card.title) === 'Borrow'
                    ? 'MarketMobileCard__card--title-borrow'
                    : 'MarketMobileCard__card--title-deposit'
                }
              >
                {intl.formatMessage(card.title)}{' '}
              </p>
              {card.enabled ? (
                <LiquidityMiningCard
                  topPercentColor="gray"
                  symbol={currencySymbol}
                  value={intl.formatMessage(card.title) === 'Borrow' ? -card.value : card.value}
                  thirtyDaysValue={card.thirtyDaysValue}
                  liquidityMiningValue={card.liquidityMiningValue}
                  mobilePosition={intl.formatMessage(card.title) === 'Borrow' ? 'right' : 'left'}
                  type={card.type}
                  className="LiquidityMiningCard"
                />
              ) : (
                <NoData color="dark" />
              )}
            </div>
          ))}
        </div>
      )}

      {isFreezed && (
        <div className="MarketMobileCard__isFreezed--inner">
          <FreezedWarning symbol={currencySymbol} />
        </div>
      )}

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .MarketMobileCard {
          &__card--title {
            color: ${currentTheme.gray.hex};
            span {
              color: ${currentTheme.lightBlue.hex};
            }
          }
        }
      `}</style>
    </MobileCardWrapper>
  );
}
