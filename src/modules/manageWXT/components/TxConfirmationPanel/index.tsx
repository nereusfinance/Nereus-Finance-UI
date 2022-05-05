import React, { useEffect } from 'react';
import { SpinLoader, useThemeContext } from '@aave/aave-ui-kit';
import { useIntl } from 'react-intl';
import messages from './messages';
import staticStyles from './style';
import WXTIcon from '../../../../images/WXT.svg';
import { BigNumber } from 'ethers';
import { useWXTPriceDataContext } from '../../../../libs/wxt-price-data-provider';
import { useStakeLockDataContext } from '../../back/StakeLockDataContext';
import classNames from 'classnames';
import NereusButton from '../NereusButton';
import greenDot from '../../../../images/greenDot.svg';
import redDot from '../../../../images/redDot.svg';
import linkIcon from '../../../../images/linkIcon.svg';
import { useProtocolDataContext } from '../../../../libs/protocol-data-provider';
import { divideIntegerWithComa } from '../../../../libs/utils/bigFloatToFixed';
import { getScannerLink } from '../../utils/getScannerLink';
import TxConfirmationPanelHeader from './components/TxConfirmationPanelHeader';

export enum TransactionStatus {
  completed,
  pending,
  error,
}

type TransactionListItem = {
  title: string;
  status: TransactionStatus;
  link: string;
  id?: number;
};

export default function TxConfirmationPanel({
  amount,
  isLock,
  goBack = () => {},
}: {
  amount: BigNumber;
  isLock: boolean;
  goBack?: any;
}) {
  const intl = useIntl();
  const { currentTheme } = useThemeContext();
  const { WXTWithDecimals } = useWXTPriceDataContext();
  const { isApproveEnough, approve, makeStakeLock } = useStakeLockDataContext();
  const { chainId } = useProtocolDataContext();
  const [activeTab, setActiveTab] = React.useState(0);
  const [allCompleted, setAllCompleted] = React.useState(false);

  const tabTitles = [
    `1 ${intl.formatMessage(messages.approve)}`,
    `2 ${intl.formatMessage(isLock ? messages.lockWXT : messages.stakeWXT)}`,
    `3 ${intl.formatMessage(messages.finished)}`,
  ];

  useEffect(() => {
    async function checkApprove() {
      const isEnough = await isApproveEnough(amount);
      if (isEnough) {
        setActiveTab(1);
      }
    }

    checkApprove();
  }, []);

  function body(activeIndex: number) {
    const [isWaiting, setIsWaiting] = React.useState(false);
    const txList = React.useRef<TransactionListItem[]>([]);
    const nextTransactionId = React.useRef<number>(0);

    function addTransaction(tx: TransactionListItem) {
      tx.id = nextTransactionId.current;
      nextTransactionId.current++;
      txList.current = [...txList.current, tx];
      return tx.id;
    }

    async function onApproveClick() {
      const tx = await approve();

      const txId = addTransaction({
        title: intl.formatMessage(messages.approve),
        status: TransactionStatus.pending,
        link: getScannerLink(tx.hash, chainId),
      });

      setIsWaiting(true);

      tx.wait()
        .then(() => {
          updateTxState(txId, true);
          setIsWaiting(false);
          setActiveTab(1);
        })
        .catch(() => {
          updateTxState(txId, false);
          setIsWaiting(false);
        });
    }

    async function onStakeLockClick() {
      const tx = await makeStakeLock(amount, isLock);

      const txId = addTransaction({
        title: intl.formatMessage(isLock ? messages.Lock : messages.Stake),
        status: TransactionStatus.pending,
        link: getScannerLink(tx.hash, chainId),
      });

      setIsWaiting(true);

      tx.wait()
        .then(() => {
          updateTxState(txId, true);
          setIsWaiting(false);
          setActiveTab(2);
          setAllCompleted(true);
        })
        .catch(() => {
          updateTxState(txId, false);
          setIsWaiting(false);
        });
    }

    function updateTxState(txId: number, confirmed: boolean) {
      console.log('\n');
      console.log(txId);
      console.log(txList.current);
      const aimItem = txList.current.find((el) => el.id === txId);
      if (aimItem) {
        aimItem.status = confirmed ? TransactionStatus.completed : TransactionStatus.error;
      }
    }

    function contents() {
      if (isWaiting)
        return (
          <p className="ActionsPanelBodyTxPendingMsg">
            {intl.formatMessage(messages.transactionsPending)}
          </p>
        );

      if (activeIndex === 0)
        return (
          <>
            <p className="ActionsPanelBodyTitle">{`1/${tabTitles.length} ${intl.formatMessage(
              messages.approve
            )}`}</p>
            <NereusButton
              text={intl.formatMessage(messages.approve)}
              small
              onClick={onApproveClick}
            />
          </>
        );

      if (activeIndex === 1)
        return (
          <>
            <div>
              <p className="ActionsPanelBodyTitle">{`2/${tabTitles.length} ${intl.formatMessage(
                isLock ? messages.lockWXT : messages.stakeWXT
              )}`}</p>
              <p className="ActionsPanelBodyDescription">{`${intl.formatMessage(
                messages.plsSubmitTo
              )} ${intl.formatMessage(isLock ? messages.lock : messages.stake)}`}</p>
            </div>
            <div>
              <NereusButton
                className="ActionsPanelCancelBtn"
                onClick={goBack}
                text={intl.formatMessage(messages.cancel)}
                small
              />
            </div>
            <div>
              <NereusButton
                text={intl.formatMessage(isLock ? messages.Lock : messages.Stake)}
                small
                onClick={onStakeLockClick}
              />
            </div>
          </>
        );

      if (activeIndex === 2)
        return (
          <>
            <p className="ActionsPanelBodyTitle">{`3/${tabTitles.length} ${intl.formatMessage(
              messages.success
            )}`}</p>
            <NereusButton text={intl.formatMessage(messages.back)} small onClick={goBack} />
          </>
        );
    }

    return (
      <div className="ActionsPanelBodyWrapper">
        <div
          className={classNames({ ActionsPanelBody: true, ActionsPanelBody__between: !isWaiting })}
        >
          {contents()}
        </div>
        <div className="ActionsPanelTxList">
          {txList.current.map((el) => (
            <div className="ActionsPanelTxListItem" key={el.id}>
              <p>{el.title}</p>
              <div className="ActionsPanelTxListItemStatus">
                {el.status === TransactionStatus.pending ? (
                  <>
                    <p>{intl.formatMessage(messages.pending)}</p>
                    <SpinLoader
                      className="ActionsPanelTxListItemStatusLoader"
                      color={currentTheme.orange.hex}
                    />
                  </>
                ) : el.status === TransactionStatus.completed ? (
                  <>
                    <p>{intl.formatMessage(messages.confirmed)}</p>
                    <img className="ActionsPanelTxListItemStatusImg" alt="" src={greenDot} />
                  </>
                ) : (
                  <>
                    <p>{intl.formatMessage(messages.failed)}</p>
                    <img className="ActionsPanelTxListItemStatusImg" alt="" src={redDot} />
                  </>
                )}
              </div>
              <div className="ActionsPanelTxListItemExplorer">
                <>
                  <p>{intl.formatMessage(messages.explorer)}</p>
                  <a href={el.link} target="_blank" rel="noreferrer">
                    <img src={linkIcon} alt="" />
                  </a>
                </>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="TxConfirmationPanel">
        <div className="AmountPanel" onClick={goBack}>
          <p className="AmountPanelTitle">{intl.formatMessage(messages.amount)}</p>
          <div className="AmountPanelValue">
            <img src={WXTIcon} alt="" />
            <span className="AmountSpan">{divideIntegerWithComa(WXTWithDecimals(amount))}</span>
            <span className="SymbolSpan">WXT</span>
          </div>
        </div>
        <div className="ActionsPanel">
          <TxConfirmationPanelHeader
            activeIndex={activeTab}
            tabTitles={tabTitles}
            allCompleted={allCompleted}
          />
          {body(activeTab)}
        </div>
      </div>

      <style jsx={true} global={false}>{`
        .TxConfirmationPanel {
          .ActionsPanel,
          .AmountPanel {
            border-color: ${currentTheme.gray.hex};
          }

          .ActionsPanelBody {
            color: ${currentTheme.maxWhite.hex};

            .ActionsPanelBodyTxPendingMsg {
              color: ${currentTheme.submittedTransactionColor.hex};
            }

            .ActionsPanelCancelBtn {
              color: ${currentTheme.statusError.hex} !important;
              background: ${currentTheme.maxWhite.hex} !important;
            }
          }

          .ActionsPanelTxListItem {
            color: ${currentTheme.maxWhite.hex};
            border-top-color: ${currentTheme.gray.hex};
          }
        }
      `}</style>
      <style jsx={true} global={false}>
        {staticStyles}
      </style>
    </>
  );
}
