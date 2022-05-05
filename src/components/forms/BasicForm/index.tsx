import React, { FormEvent, ReactNode, useState } from 'react';
import { useIntl } from 'react-intl';
import classNames from 'classnames';
import { valueToBigNumber, EthereumTransactionTypeExtended } from '@aave/protocol-js';
import { useThemeContext } from '@aave/aave-ui-kit';

import { useUserWalletDataContext } from '../../../libs/web3-data-provider';
import { useProtocolDataContext } from '../../../libs/protocol-data-provider';
import TxEstimation from '../../TxEstimation';
import Caption from '../../basic/Caption';
import AmountField from '../../fields/AmountField';
import RiskBar from '../../basic/RiskBar';
import DefaultButton from '../../basic/DefaultButton';
import ConnectButton from '../../ConnectButton';

import messages from './messages';
import staticStyles from './style';
import { ChainId } from '../../../helpers/config/types';

interface BasicFormProps {
  title?: string;
  description?: string | ReactNode;
  descriptionMarginLeft?: number;
  maxAmount: string;
  amountFieldTitle?: string;
  currencySymbol: string;
  onSubmit: (amount: string, max?: boolean) => void;
  withRiskBar?: boolean;
  submitButtonTitle?: string;
  absoluteMaximum?: boolean;
  className?: string;
  maxDecimals?: number;
  warning?: ReactNode;
  children?: ReactNode;
  doubleIcon?: boolean;
  imgSrc?: any;
  imgSrcSecond?: any;
  getTransactionData?: (
    user: string
  ) => () => Promise<EthereumTransactionTypeExtended[]> | EthereumTransactionTypeExtended[];
}

export default function BasicForm({
  title,
  description,
  descriptionMarginLeft = 93,
  maxAmount,
  amountFieldTitle,
  currencySymbol,
  onSubmit,
  withRiskBar,
  submitButtonTitle,
  absoluteMaximum,
  className,
  maxDecimals,
  warning,
  children,
  getTransactionData,
  doubleIcon,
  imgSrc,
  imgSrcSecond,
}: BasicFormProps) {
  const intl = useIntl();
  const { chainId } = useProtocolDataContext();
  const { currentAccount } = useUserWalletDataContext();
  const { sm } = useThemeContext();
  const [isMaxSelected, setIsMaxSelected] = useState(false);
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');

  const handleAmountChange = (newAmount: string) => {
    const newAmountValue = valueToBigNumber(newAmount);
    setError('');
    if (newAmountValue.gt(maxAmount)) {
      setAmount(maxAmount);
      return setIsMaxSelected(true);
    } else if (newAmountValue.isNegative()) {
      setAmount('0');
    } else {
      setAmount(newAmount);
    }
    setIsMaxSelected(false);
  };

  const handleMaxButtonClick = () => {
    setAmount(maxAmount);
    setIsMaxSelected(true);
    setError('');
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!valueToBigNumber(amount).isNaN() && +amount !== 0) {
      return onSubmit(amount, absoluteMaximum && isMaxSelected);
    }

    setError(intl.formatMessage(messages.error));
  };

  return (
    <form onSubmit={handleSubmit} className={classNames('BasicForm', className)}>
      {!!title && (
        <Caption
          title={title}
          description={description}
          marginLeft={sm ? 0 : descriptionMarginLeft}
          marginTop={sm ? 0 : 33}
        />
      )}

      <div className="BasicForm__inner">
        {children}

        <AmountField
          title={amountFieldTitle}
          maxAmount={maxAmount}
          symbol={currencySymbol}
          maxDecimals={maxDecimals}
          value={amount}
          onChange={handleAmountChange}
          onMaxButtonClick={handleMaxButtonClick}
          error={error}
          doubleIcon={doubleIcon}
          imgSrc={imgSrc}
          imgSrcSecond={imgSrcSecond}
        />

        {[ChainId.avalanche].includes(chainId) && getTransactionData && (
          <TxEstimation getTransactionsData={getTransactionData} amount={amount} />
        )}

        {withRiskBar && (
          <RiskBar
            value={Number(amount)}
            onChange={handleAmountChange}
            maxAmount={maxAmount}
            currencySymbol={currencySymbol}
          />
        )}

        {!!warning && <div className="BasicForm__warning">{warning}</div>}
      </div>

      <div className="BasicForm__buttons">
        {!currentAccount ? (
          <ConnectButton size="normal" />
        ) : (
          <DefaultButton
            title={submitButtonTitle || intl.formatMessage(messages.continue)}
            mobileBig={true}
            size="ultra_big"
            type="submit"
            color="nereusYellow"
          />
        )}
      </div>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
    </form>
  );
}
