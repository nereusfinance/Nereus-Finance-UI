import React, { useEffect, useRef, useState } from 'react';
import { useIntl } from 'react-intl';
import queryString from 'query-string';
import { normalize, valueToBigNumber } from '@aave/protocol-js';

import { useTxBuilderContext } from '../../../../libs/tx-provider';
import { getLPTokenPoolLink } from '../../../../helpers/lp-tokens';
import { useProtocolDataContext } from '../../../../libs/protocol-data-provider';
import NoDataPanel from '../../../../components/NoDataPanel';
import DefaultButton from '../../../../components/basic/DefaultButton';
import BasicForm from '../../../../components/forms/BasicForm';
import Link from '../../../../components/basic/Link';
import InfoPanel from '../../../../components/InfoPanel';
import InfoWrapper from '../../../../components/wrappers/InfoWrapper';
import AMPLWarning from '../../../../components/AMPLWarning';
import DepositCurrencyWrapper from '../../components/DepositCurrencyWrapper';
import routeParamValidationHOC, {
  ValidationWrapperComponentProps,
} from '../../../../components/RouteParamsValidationWrapper';
import staticStyles from './style';

import messages from './messages';

import linkIcon from '../../../../images/whiteLinkIcon.svg';
import { isFeatureEnabled } from '../../../../helpers/config/markets-and-network-config';
import { getAssetInfo } from '../../../../helpers/config/assets-config';
import { useWithDesktopTitle } from '../../../../components/wrappers/ScreensWrapper';
import { useThemeContext } from '@aave/aave-ui-kit';

import { useStaticPoolDataContext } from '../../../../libs/pool-data-provider';

interface DepositAmountProps
  extends Pick<
    ValidationWrapperComponentProps,
    'currencySymbol' | 'poolReserve' | 'history' | 'walletBalance' | 'user' | 'userReserve'
  > {}

function DepositAmount({
  currencySymbol,
  poolReserve,
  user,
  userReserve,
  history,
  walletBalance,
}: DepositAmountProps) {
  const intl = useIntl();
  const { networkConfig, currentMarketData } = useProtocolDataContext();
  const { sm } = useThemeContext();
  const { lendingPool } = useTxBuilderContext();
  const { setTopPanelSmall } = useWithDesktopTitle();

  const { userId } = useStaticPoolDataContext();
  const [estimatedTx, setEstimatedTx] = useState<string>('0');

  let maxAmountToDeposit = valueToBigNumber(walletBalance);
  const asset = getAssetInfo(currencySymbol);
  const lpPoolLink = getLPTokenPoolLink(poolReserve);
  const gasData = useRef('0');

  useEffect(() => {
    localStorage.setItem('isTopPanelSmall', 'false');
    setTopPanelSmall(false);
  }, []);

  const handleTransactionData = (userId: string) => async () => {
    return await lendingPool.deposit({
      user: userId,
      reserve: poolReserve.underlyingAsset,
      amount: maxAmountToDeposit.toString(10),
      referralCode: undefined,
    });
  };

  const handleSubmit = (amount: string) => {
    const query = queryString.stringify({ amount });
    history.push(`${history.location.pathname}/confirmation?${query}`);
  };

  const calculationGas = async () => {
    if (!userId) return;
    try {
      const txData = handleTransactionData(userId);
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

        const estimation = normalize(
          accumulated.gasLimit.times(accumulated.gasPrice.times(1.3)),
          18
        );
        // We update in case of the user has added specific amount
        if (estimatedTx !== '0') setEstimatedTx(estimation);
        gasData.current = estimation;
      }
    } catch (e) {
      console.log(e);
    }
  };

  const updateGasPrice = () => {
    if (maxAmountToDeposit.eq('0')) {
      setEstimatedTx('0');
      return;
    }
    setEstimatedTx(gasData.current);
  };

  if (maxAmountToDeposit.gt(0) && poolReserve.symbol.toUpperCase() === networkConfig.baseAsset) {
    maxAmountToDeposit = maxAmountToDeposit.minus(Number(estimatedTx));
  }

  useEffect(() => {
    if (gasData.current === '0') calculationGas();
    const timeout = setInterval(calculationGas, 10000);
    return () => clearInterval(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  useEffect(() => {
    let timeout: number = 0;
    if (timeout !== 0) {
      clearTimeout(timeout);
      timeout = 0;
    }
    timeout = window.setTimeout(updateGasPrice, 250);

    return () => {
      clearTimeout(timeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [maxAmountToDeposit, userId]);

  return (
    <DepositCurrencyWrapper
      currencySymbol={currencySymbol}
      poolReserve={poolReserve}
      walletBalance={walletBalance}
      userReserve={userReserve}
      user={user}
    >
      {maxAmountToDeposit.gt('0') && Boolean(Number(gasData.current)) && (
        <BasicForm
          title={intl.formatMessage(messages.title)}
          description={
            currencySymbol === 'ETH' && isFeatureEnabled.staking(currentMarketData)
              ? intl.formatMessage(messages.aaveDescription, {
                  stake: <strong>{intl.formatMessage(messages.stake)}</strong>,
                  link: (
                    <Link
                      className="italic"
                      to="/staking"
                      bold={true}
                      title={intl.formatMessage(messages.stakingView)}
                    />
                  ),
                })
              : intl.formatMessage(messages.description)
          }
          amountFieldTitle={intl.formatMessage(messages.amountTitle)}
          maxAmount={maxAmountToDeposit.toString(10)}
          currencySymbol={currencySymbol}
          onSubmit={handleSubmit}
          maxDecimals={poolReserve.decimals}
          getTransactionData={handleTransactionData}
        />
      )}

      {maxAmountToDeposit.lte('0') && Boolean(Number(gasData.current)) && (
        <NoDataPanel
          title={intl.formatMessage(messages.noFunds)}
          description={intl.formatMessage(messages.noFundsDescription)}
        />
      )}

      {maxAmountToDeposit.eq('0') && !Boolean(Number(gasData.current)) && (!user || !lpPoolLink) && (
        <NoDataPanel
          title={
            !user
              ? intl.formatMessage(messages.connectWallet)
              : intl.formatMessage(messages.noDataTitle)
          }
          description={
            !user
              ? intl.formatMessage(messages.connectWalletDescription)
              : intl.formatMessage(messages.noDataDescription, {
                  currencySymbol: asset.formattedName,
                })
          }
          linkTo={
            !user
              ? undefined
              : isFeatureEnabled.faucet(currentMarketData)
              ? `/faucet/${currencySymbol}`
              : undefined
          }
          buttonTitle={
            !user
              ? undefined
              : isFeatureEnabled.faucet(currentMarketData)
              ? intl.formatMessage(messages.noDataButtonTitle)
              : undefined
          }
          withConnectButton={!user}
        />
      )}

      {maxAmountToDeposit.eq('0') && !Boolean(Number(gasData.current)) && user && lpPoolLink && (
        <NoDataPanel
          title={intl.formatMessage(messages.noDataTitle)}
          description={intl.formatMessage(messages.noDataLPTokenDescription, {
            currencySymbol: asset.formattedName,
          })}
        >
          <Link to={lpPoolLink} absolute={true} inNewWindow={true} className="ButtonLink">
            <DefaultButton
              className="DepositAmount__poolLink--button"
              title={intl.formatMessage(messages.viewPool)}
              iconComponent={<img src={linkIcon} alt="" />}
              size="medium"
              mobileBig={true}
            />
          </Link>
        </NoDataPanel>
      )}

      {!sm ? (
        <InfoWrapper>
          {currencySymbol === 'AMPL' && <AMPLWarning withInfoPanel={true} />}

          {currencySymbol === 'AAVE' && isFeatureEnabled.staking(currentMarketData) && (
            <InfoPanel>
              {intl.formatMessage(messages.aaveWarning, {
                link: (
                  <Link
                    className="italic"
                    to="/staking"
                    bold={true}
                    title={intl.formatMessage(messages.stakingView)}
                  />
                ),
              })}
            </InfoPanel>
          )}

          {currencySymbol === 'SNX' && !maxAmountToDeposit.eq('0') && (
            <InfoPanel>
              {intl.formatMessage(messages.warningText, {
                symbol: <strong>{currencySymbol}</strong>,
              })}
            </InfoPanel>
          )}
        </InfoWrapper>
      ) : (
        ''
      )}
      <style jsx={true} global={true}>
        {staticStyles}
      </style>
    </DepositCurrencyWrapper>
  );
}

export default routeParamValidationHOC({
  withWalletBalance: true,
})(DepositAmount);
