import React, { ReactNode } from 'react';
import classNames from 'classnames';
import { useIntl } from 'react-intl';
import { gradient, useThemeContext } from '@aave/aave-ui-kit';

import { EthTransactionData, TxStatusType } from '../../../helpers/send-ethereum-tx';
import TxBottomStatusLine from '../TxBottomStatusLine';

import messages from './messages';
import staticStyles from './style';

interface ActionsWrapperProps {
  approveTxData?: EthTransactionData;
  actionTxData?: EthTransactionData;
  selectedStep: number;
  setSelectedStep: (value: number) => void;
  numberOfSteps: number;
  unlockedSteps: number;
  error?: boolean;
  children: ReactNode;
}

export default function ActionsWrapper({
  approveTxData,
  actionTxData,
  selectedStep,
  setSelectedStep,
  numberOfSteps,
  unlockedSteps,
  error,
  children,
}: ActionsWrapperProps) {
  const intl = useIntl();
  const { currentTheme } = useThemeContext();

  const activeGradient = gradient(
    90,
    `${currentTheme.secondary.rgb}, 1`,
    0,
    `${currentTheme.primary.rgb}, 1`,
    100
  );
  const allowedGradient = gradient(
    90,
    `${currentTheme.secondary.rgb}, 0.5`,
    0,
    `${currentTheme.primary.rgb}, 0.5`,
    100
  );

  const approveSubmitted = approveTxData?.txStatus === TxStatusType.submitted;
  const approveConfirmed = approveTxData?.txStatus === TxStatusType.confirmed;
  const approveError = approveTxData?.error && approveTxData.txStatus === TxStatusType.error;
  const actionSubmitted = actionTxData?.txStatus === TxStatusType.submitted;
  const actionConfirmed = actionTxData?.txStatus === TxStatusType.confirmed;
  const actionError = actionTxData?.error && actionTxData.txStatus === TxStatusType.error;

  return (
    <div
      className={classNames('ActionsWrapper', {
        ActionsWrapper__submitted: actionSubmitted,
        ActionsWrapper__confirmed: actionConfirmed,
        ActionsWrapper__error: (!actionConfirmed && actionError) || (error && !actionConfirmed),
      })}
    >
      <div className="ActionsWrapper__buttons">
        {approveTxData && (
          <div className="ActionsWrapper__Confirmation">
            <button
              className={classNames('ActionsWrapper__button', {
                ActionsWrapper__buttonActive: selectedStep === 1,
                ActionsWrapper__buttonSubmitted: approveSubmitted,
                ActionsWrapper__buttonConfirmed: approveConfirmed,
                ActionsWrapper__buttonError:
                  (!approveConfirmed && approveError) || (error && !approveConfirmed),
              })}
              onClick={() => setSelectedStep(1)}
              disabled={approveConfirmed || !!approveError || selectedStep === 1}
            >
              {!approveConfirmed ? (
                <div
                  className={classNames('NumOfStep', {
                    NumOfStep__active: selectedStep === 1,
                    NumOfStep__submitted: approveSubmitted,
                    NumOfStep__confirmed: approveConfirmed,
                    NumOfStep__error:
                      (!actionConfirmed && actionError) || (error && !actionConfirmed),
                  })}
                >
                  1
                </div>
              ) : (
                <div
                  className={classNames('NumOfStep', {
                    NumOfStep__active: selectedStep === 1,
                    NumOfStep__submitted: approveSubmitted,
                    NumOfStep__confirmed: approveConfirmed,
                    NumOfStep__error:
                      (!actionConfirmed && actionError) || (error && !actionConfirmed),
                  })}
                >
                  &#10004;
                </div>
              )}
              <p>{approveTxData.name}</p>
            </button>
            <hr className="horizontalLine" />
          </div>
        )}
        {actionTxData && (
          <div className="ActionsWrapper__Confirmation">
            <button
              className={classNames('ActionsWrapper__button', {
                ActionsWrapper__buttonActive: selectedStep === numberOfSteps,
                ActionsWrapper__buttonSubmitted: actionSubmitted,
                ActionsWrapper__buttonConfirmed: actionConfirmed,
                ActionsWrapper__buttonError:
                  (!actionConfirmed && actionError) || (error && !actionConfirmed),
              })}
              onClick={() => unlockedSteps >= numberOfSteps && setSelectedStep(numberOfSteps)}
              disabled={actionConfirmed || !!actionError || selectedStep === numberOfSteps}
            >
              {!actionConfirmed ? (
                <div
                  className={classNames('NumOfStep', {
                    NumOfStep__active: selectedStep === numberOfSteps,
                    NumOfStep__submitted: actionSubmitted,
                    NumOfStep__confirmed: actionConfirmed,
                    NumOfStep__error:
                      (!actionConfirmed && actionError) || (error && !actionConfirmed),
                  })}
                >
                  {numberOfSteps}
                </div>
              ) : (
                <div
                  className={classNames('NumOfStep', {
                    NumOfStep__active: selectedStep === numberOfSteps,
                    NumOfStep__submitted: actionSubmitted,
                    NumOfStep__confirmed: actionConfirmed,
                    NumOfStep__error:
                      (!actionConfirmed && actionError) || (error && !actionConfirmed),
                  })}
                >
                  &#10004;
                </div>
              )}
              <p>{actionTxData.name}</p>
            </button>
            <hr className="horizontalLine" />
          </div>
        )}

        {!!numberOfSteps && (
          <div className="ActionsWrapper__Confirmation">
            <button
              className={classNames('ActionsWrapper__button', {
                ActionsWrapper__buttonSubmitted: actionSubmitted,
                ActionsWrapper__buttonConfirmed: actionConfirmed,
                ActionsWrapper__buttonError:
                  (!actionConfirmed && actionError) || (error && !actionConfirmed),
              })}
              onClick={() => unlockedSteps > numberOfSteps && setSelectedStep(numberOfSteps + 1)}
              disabled={true}
            >
              {!actionConfirmed ? (
                <div
                  className={classNames('NumOfStep', {
                    NumOfStep__submitted: actionSubmitted,
                    NumOfStep__confirmed: actionConfirmed,
                    NumOfStep__error:
                      (!actionConfirmed && actionError) || (error && !actionConfirmed),
                  })}
                >
                  {numberOfSteps + 1}
                </div>
              ) : (
                <div
                  className={classNames('NumOfStep', {
                    NumOfStep__submitted: actionSubmitted,
                    NumOfStep__confirmed: actionConfirmed,
                    NumOfStep__error:
                      (!actionConfirmed && actionError) || (error && !actionConfirmed),
                  })}
                >
                  &#10004;
                </div>
              )}
              <p>
                {!actionError
                  ? intl.formatMessage(actionSubmitted ? messages.pending : messages.finished)
                  : intl.formatMessage(messages.failed)}
              </p>
            </button>
          </div>
        )}
      </div>

      {children}

      {approveTxData && (approveConfirmed || approveSubmitted || !!approveError) && (
        <TxBottomStatusLine
          title={approveTxData.name}
          confirmed={approveConfirmed}
          submitted={approveSubmitted}
          failed={!!approveError}
          error={error && !approveConfirmed}
          txHash={approveTxData.txHash}
        />
      )}

      {actionTxData && (actionConfirmed || actionSubmitted || !!actionError) && (
        <TxBottomStatusLine
          title={actionTxData.name}
          confirmed={actionConfirmed}
          submitted={actionSubmitted}
          failed={!!actionError}
          error={error && !actionConfirmed}
          txHash={actionTxData.txHash}
        />
      )}

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .ActionsWrapper {
          background: ${currentTheme.whiteItem.hex};
          border: 1px solid ${currentTheme.gray.hex};
          .NumOfStep {
            width: 16px;
            height: 16px;
            border: 2px solid ${currentTheme.textDescr.hex};
            border-radius: 50%;
            font-size: 9px;
            margin-right: 6px;
            &__active {
              color: ${currentTheme.white.hex};
              border-color: ${currentTheme.white.hex};
            }
            &__submitted {
              color: ${currentTheme.white.hex};
              border-color: ${currentTheme.white.hex};
            }
            &__confirmed {
              color: ${currentTheme.green.hex};
              border-color: ${currentTheme.green.hex};
            }
            &__error {
              color: ${currentTheme.red.hex};
              border-color: ${currentTheme.red.hex};
            }
          }
          &__button {
            background: ${currentTheme.whiteElement.hex};
            color: ${currentTheme.textDescr.hex};
          }
          &__buttonAllowed {
            background: ${allowedGradient};
            color: ${currentTheme.maxWhite.hex};
            &:hover {
              background: ${activeGradient};
            }
          }
          &__buttonActive {
            color: ${currentTheme.white.hex};
          }
          &__buttonSubmitted {
            color: ${currentTheme.maxWhite.hex};
          }
          &__buttonConfirmed {
            color: ${currentTheme.green.hex};
          }
          &__buttonError {
            color: ${currentTheme.red.hex};
          }
        }
      `}</style>
    </div>
  );
}
