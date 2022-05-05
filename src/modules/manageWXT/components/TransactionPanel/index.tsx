import React from 'react';
import messages from './messages';
import { useIntl } from 'react-intl';
import staticStyles from './style';
import CollateralUsagePanel from '../CollateralUsagePanel';
import AmountField from '../../../../components/fields/AmountField';
import { valueToBigNumber } from '@aave/protocol-js';
import WXTIcon from '../../../../images/WXT.svg';
import NereusButton from '../NereusButton';
import { useThemeContext } from '@aave/aave-ui-kit';
import { useWXTPriceDataContext } from '../../../../libs/wxt-price-data-provider';
import { bigFloatToFixed } from '../../../../libs/utils/bigFloatToFixed';
import TxConfirmationPanel from '../TxConfirmationPanel';

export default function TransactionPanel({ isLock = false }: { isLock?: boolean }) {
  const {
    decimals: maxDecimals,
    userBalance,
    WXTWithDecimals,
    parseWXT,
  } = useWXTPriceDataContext();
  const maxAmount = bigFloatToFixed(WXTWithDecimals(userBalance), maxDecimals);

  const intl = useIntl();
  const { currentTheme } = useThemeContext();

  const [amount, setAmount] = React.useState('');
  const [inputActive, setInputActive] = React.useState(true);

  function onChange(newVal: string) {
    const newValBn = valueToBigNumber(newVal);
    if (newValBn.gt(maxAmount)) {
      setAmount(maxAmount);
    } else if (newValBn.isNegative()) {
      setAmount('0');
    } else {
      setAmount(newVal);
    }
  }

  function onMaxClick() {
    setAmount(maxAmount);
  }

  function onActionBtnClick() {
    if (!parseWXT(amount).isZero()) {
      setInputActive(false);
    }
  }

  return (
    <>
      <div className="TransactionPanel">
        {inputActive ? (
          <>
            <div className="TransactionPanelCollateralUsageWrapper">
              <CollateralUsagePanel />
            </div>
            <div className="InputRow">
              <AmountField
                onChange={onChange}
                value={amount}
                maxAmount={maxAmount}
                symbol="WXT"
                onMaxButtonClick={onMaxClick}
                maxDecimals={maxDecimals}
                imgSrc={WXTIcon}
                className="TransactionAmountField"
              />
              <NereusButton
                text={`${intl.formatMessage(isLock ? messages.lock : messages.stake)} WXT`}
                onClick={onActionBtnClick}
                className="TransactionActionBtn"
                small={true}
              />
            </div>
          </>
        ) : (
          <TxConfirmationPanel
            amount={parseWXT(amount)}
            goBack={() => setInputActive(true)}
            isLock={isLock}
          />
        )}
      </div>

      <style jsx={true} global={false}>{`
        .AmountPanel {
          border-color: ${currentTheme.gray.hex};
        }

        .AmountPanelTitle,
        .AmountPanelValue {
          color: ${currentTheme.maxWhite.hex};
        }
      `}</style>
      <style jsx={true} global={false}>
        {staticStyles}
      </style>
    </>
  );
}
