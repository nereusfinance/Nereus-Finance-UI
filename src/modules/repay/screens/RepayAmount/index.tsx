import React, { useEffect, useRef } from 'react';
import { useIntl } from 'react-intl';
import queryString from 'query-string';
import { BigNumber, InterestRate, normalize, valueToBigNumber } from '@aave/protocol-js';

import BasicForm from '../../../../components/forms/BasicForm';
import routeParamValidationHOC, {
  ValidationWrapperComponentProps,
} from '../../../../components/RouteParamsValidationWrapper';
import InfoWrapper from '../../../../components/wrappers/InfoWrapper';
import InfoPanel from '../../../../components/InfoPanel';
import RepayInfoPanel from '../../components/RepayInfoPanel';

import { useTxBuilderContext } from '../../../../libs/tx-provider';
import defaultMessages from '../../../../defaultMessages';
import messages from './messages';
import { useProtocolDataContext } from '../../../../libs/protocol-data-provider';
import { useStaticPoolDataContext } from '../../../../libs/pool-data-provider';

function RepayAmount({
  currencySymbol,
  userReserve,
  poolReserve,
  walletBalance,
  history,
  location,
}: ValidationWrapperComponentProps) {
  const intl = useIntl();
  const { networkConfig } = useProtocolDataContext();
  const { lendingPool } = useTxBuilderContext();
  const query = queryString.parse(location.search);
  const debtType = query.debtType || InterestRate.Variable;

  const { userId } = useStaticPoolDataContext();
  const gasData = useRef('0');

  if (!userReserve) {
    throw new Error(intl.formatMessage(messages.error));
  }

  // keep it for gas cost
  const normalizedWalletBalance = walletBalance.minus(
    userReserve.reserve.symbol.toUpperCase() === networkConfig.baseAsset ? gasData.current : '0'
  );

  const maxAmountToRepay = BigNumber.min(
    normalizedWalletBalance,
    debtType === InterestRate.Stable ? userReserve.stableBorrows : userReserve.variableBorrows
  );

  const handleSubmit = (amount: string, max?: boolean) => {
    const query = queryString.stringify({ debtType, amount: max ? '-1' : amount });
    history.push(`${history.location.pathname}confirmation?${query}`);
  };

  const handleGetTransactions = (userId: string) => async () =>
    await lendingPool.repay({
      user: userId,
      reserve: poolReserve.underlyingAsset,
      amount: '-1',
      interestRateMode: debtType as InterestRate,
    });

  const calculationGas = async () => {
    if (!userId) return;
    try {
      const txData = handleGetTransactions(userId);
      const txs = await txData();
      const gasEstimations = await Promise.all(txs.map((tx) => (tx.gas ? tx.gas() : null)));

      if (gasEstimations.length > 0 && !gasEstimations.includes(null)) {
        const accumulated = gasEstimations.reduce(
          (prev, next) => {
            if (next) {
              prev.gasLimit = prev.gasLimit.plus(next.gasLimit || '0');
              prev.gasPrice = valueToBigNumber(next.gasPrice);
            }
            return prev;
          },
          {
            gasLimit: valueToBigNumber('0'),
            gasPrice: valueToBigNumber('0'),
          }
        );

        const estimation = normalize(accumulated.gasLimit.times(accumulated.gasPrice), 18);
        gasData.current = estimation;
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (gasData.current === '0') calculationGas();
    const timeout = setInterval(calculationGas, 10000);
    return () => clearInterval(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  return (
    <>
      <BasicForm
        title={intl.formatMessage(defaultMessages.repay)}
        descriptionMarginLeft={0}
        description={intl.formatMessage(messages.formDescription)}
        maxAmount={maxAmountToRepay.toString(10)}
        amountFieldTitle={intl.formatMessage(messages.amountTitle)}
        currencySymbol={currencySymbol}
        onSubmit={handleSubmit}
        absoluteMaximum={true}
        maxDecimals={poolReserve.decimals}
        getTransactionData={handleGetTransactions}
      />

      <InfoWrapper>
        <RepayInfoPanel />
        {currencySymbol === 'SNX' && (
          <InfoPanel>
            {intl.formatMessage(messages.warningText, {
              symbol: <span>{currencySymbol}</span>,
            })}
          </InfoPanel>
        )}
      </InfoWrapper>
    </>
  );
}

export default routeParamValidationHOC({
  withWalletBalance: true,
  withUserReserve: true,
})(RepayAmount);
