import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import classNames from 'classnames';
import { valueToBigNumber } from '@aave/protocol-js';

import { useThemeContext } from '@aave/aave-ui-kit';
import { useDynamicPoolDataContext } from '../../libs/pool-data-provider';
import TopPanelWrapper from '../wrappers/TopPanelWrapper';
import Row from '../basic/Row';
import Value from '../basic/Value';
import MaxLTVHelpModal from '../HelpModal/MaxLTVHelpModal';
import ValuePercent from '../basic/ValuePercent';
import HealthFactor from '../HealthFactor';
import NoData from '../basic/NoData';
import CircleCompositionBar, {
  CircleCompositionBarItem,
} from '../compositionBars/CircleCompositionBar';
import CircleCollateralCompositionBar from '../compositionBars/CircleCollateralCompositionBar';
import LTVInfoModal from '../LTVInfoModal';
import ApproximateBalanceHelpModal from '../HelpModal/ApproximateBalanceHelpModal';

import messages from './messages';
import staticStyles from './style';
import { getAssetInfo, getAssetColor } from '../../helpers/config/assets-config';

export default function DepositBorrowTopPanel() {
  const intl = useIntl();
  const { currentTheme } = useThemeContext();
  const { user, reserves } = useDynamicPoolDataContext();

  const isCollapse = false;
  const [isLTVModalVisible, setLTVModalVisible] = useState(false);

  const maxBorrowAmount = valueToBigNumber(user?.totalBorrowsMarketReferenceCurrency || '0').plus(
    user?.availableBorrowsMarketReferenceCurrency || '0'
  );
  const collateralUsagePercent = maxBorrowAmount.eq(0)
    ? '1'
    : valueToBigNumber(user?.totalBorrowsMarketReferenceCurrency || '0')
        .div(maxBorrowAmount)
        .toFixed();

  const loanToValue = valueToBigNumber(user?.totalBorrowsMarketReferenceCurrency || '0')
    .dividedBy(
      user && user?.totalCollateralMarketReferenceCurrency !== '0'
        ? user.totalCollateralMarketReferenceCurrency
        : '1'
    )
    .toFixed();

  const depositCompositionData: CircleCompositionBarItem[] = [];
  const borrowCompositionData: CircleCompositionBarItem[] = [];

  user?.userReservesData.forEach((userReserve) => {
    const poolReserve = reserves.find((res) => res.symbol === userReserve.reserve.symbol);
    if (!poolReserve) {
      throw new Error('data is inconsistent pool reserve is not available');
    }
    if (userReserve.underlyingBalance !== '0' || userReserve.totalBorrows !== '0') {
      if (userReserve.underlyingBalance !== '0') {
        depositCompositionData.push({
          label: `${getAssetInfo(userReserve.reserve.symbol).formattedName}  ${intl.formatNumber(
            valueToBigNumber(userReserve.underlyingBalanceMarketReferenceCurrency)
              .dividedBy(user?.totalLiquidityMarketReferenceCurrency)
              .multipliedBy(100)
              .toNumber(),
            { maximumFractionDigits: 2 }
          )}%`,
          value: Number(userReserve.underlyingBalanceMarketReferenceCurrency),
          color: getAssetColor(userReserve.reserve.symbol),
        });
      }
      if (userReserve.totalBorrows !== '0') {
        borrowCompositionData.push({
          value: valueToBigNumber(userReserve.totalBorrowsMarketReferenceCurrency)
            .dividedBy(maxBorrowAmount)
            .multipliedBy(100)
            .toNumber(),
          label: `${getAssetInfo(userReserve.reserve.symbol).formattedName}  ${intl.formatNumber(
            valueToBigNumber(userReserve.totalBorrowsMarketReferenceCurrency)
              .dividedBy(maxBorrowAmount)
              .multipliedBy(100)
              .toNumber(),
            { maximumFractionDigits: 2 }
          )}%`,
          color: getAssetColor(userReserve.reserve.symbol),
        });
      }
    }
  });
  const usedBorrowPower = 100 - Number(collateralUsagePercent) * 100;

  borrowCompositionData.push({
    value: usedBorrowPower,
    label: `${intl.formatMessage(messages.borrowingPowerAvailable)}: ${usedBorrowPower.toFixed(
      2
    )}%`,
    color: currentTheme.white.hex,
  });

  return (
    <div className="DepositBorrowTopPanel">
      <TopPanelWrapper
        className={classNames('DepositBorrowTopPanel__topPanel')}
        isCollapse={false}
        withoutCollapseButton={true}
      >
        <div className="DepositBorrowTopPanel__topPanel-captionWrapper">
          <div className="DepositBorrowTopPanel__topPanel-caption">
            {user ? (
              <>
                <p
                  className={classNames({
                    DepositBorrowTopPanel__topPanelCaptionFull:
                      !depositCompositionData.length && !borrowCompositionData.length,
                  })}
                >
                  <i>
                    {intl.formatMessage(
                      !depositCompositionData.length
                        ? messages.noDeposits
                        : messages.depositInformation
                    )}
                  </i>
                </p>
                {!!depositCompositionData.length && (
                  <p>
                    <i>{intl.formatMessage(messages.borrowInformation)}</i>{' '}
                  </p>
                )}
              </>
            ) : (
              <p
                className={classNames({
                  DepositBorrowTopPanel__topPanelCaptionFull: !user,
                })}
              >
                <i>{intl.formatMessage(messages.connectWallet)}</i>
              </p>
            )}
          </div>
        </div>

        <div
          className={classNames('DepositBorrowTopPanel__topPanel-info', {
            DepositBorrowTopPanel__topPanelInfoCollapse: isCollapse,
            DepositBorrowTopPanel__topPanelNoUser: !user,
          })}
        >
          {user && (
            <>
              <div
                className={classNames('DepositBorrowTopPanel__topPanel-inner', {
                  DepositBorrowTopPanel__topPanelInnerFull: !depositCompositionData.length,
                })}
              >
                <div className="DepositBorrowTopPanel__topPanel-values">
                  <Row
                    title={
                      <ApproximateBalanceHelpModal
                        text={intl.formatMessage(messages.approximateBalance)}
                        lightWeight={true}
                      />
                    }
                    color="white"
                    weight="light"
                    isColumn={true}
                  >
                    {user && user.totalLiquidityUSD !== '0' ? (
                      <Value
                        value={user.totalLiquidityUSD}
                        symbol="USD"
                        tokenIcon={true}
                        withSmallDecimals={false}
                        color="white"
                        className="top-panel-value1"
                      />
                    ) : (
                      <NoData />
                    )}
                  </Row>
                </div>

                {!isCollapse && !!depositCompositionData.length && (
                  <div className="DepositBorrowTopPanel__topPanel-bars">
                    <CircleCompositionBar
                      title={intl.formatMessage(messages.depositComposition)}
                      totalValue={Number(user?.totalLiquidityMarketReferenceCurrency || 0)}
                      data={depositCompositionData}
                    />
                  </div>
                )}
              </div>

              {!!depositCompositionData.length && (
                <div className="DepositBorrowTopPanel__topPanel-inner">
                  <div
                    className={classNames('DepositBorrowTopPanel__topPanel-values', {
                      DepositBorrowTopPanel__topPanelValuesCollapse: isCollapse,
                    })}
                  >
                    <div
                      className={classNames('DepositBorrowTopPanel__topPanel-valuesInner', {
                        DepositBorrowTopPanel__topPanelValuesInnerCollapse: isCollapse,
                      })}
                    >
                      <Row
                        title={intl.formatMessage(messages.youBorrowed)}
                        color="white"
                        weight="light"
                        isColumn={true}
                      >
                        {user && user.totalBorrowsUSD !== '0' ? (
                          <Value
                            value={user.totalBorrowsUSD}
                            symbol="USD"
                            tokenIcon={true}
                            minimumValueDecimals={2}
                            maximumValueDecimals={2}
                            color="white"
                          />
                        ) : (
                          <NoData />
                        )}
                      </Row>

                      {isCollapse && (
                        <Row
                          title={intl.formatMessage(messages.yourCollateral)}
                          color="white"
                          weight="light"
                          isColumn={true}
                        >
                          {user && user.totalCollateralUSD !== '0' ? (
                            <Value
                              value={user.totalCollateralUSD}
                              symbol="USD"
                              tokenIcon={true}
                              minimumValueDecimals={2}
                              maximumValueDecimals={2}
                              color="white"
                            />
                          ) : (
                            <NoData />
                          )}
                        </Row>
                      )}

                      <HealthFactor
                        value={user?.healthFactor || '-1'}
                        isColumn={true}
                        titleColor="white"
                        titleLightWeight={true}
                      />
                    </div>

                    <div
                      className={classNames('DepositBorrowTopPanel__topPanel-valuesInner', {
                        DepositBorrowTopPanel__topPanelValuesInnerCollapse: isCollapse,
                      })}
                    >
                      {!isCollapse && (
                        <Row
                          title={intl.formatMessage(messages.yourCollateral)}
                          color="white"
                          weight="light"
                          isColumn={true}
                        >
                          {user && user.totalCollateralUSD !== '0' ? (
                            <Value
                              value={user.totalCollateralUSD}
                              symbol="USD"
                              tokenIcon={true}
                              minimumValueDecimals={2}
                              maximumValueDecimals={2}
                              color="white"
                            />
                          ) : (
                            <NoData />
                          )}
                        </Row>
                      )}

                      {!isCollapse && (
                        <Row
                          title={intl.formatMessage(messages.borrowingPowerUsed)}
                          color="white"
                          weight="light"
                          isColumn={true}
                        >
                          {user && collateralUsagePercent !== '0' ? (
                            <ValuePercent value={collateralUsagePercent} color="white" />
                          ) : (
                            <NoData />
                          )}
                        </Row>
                      )}
                    </div>

                    <div
                      className={classNames('DepositBorrowTopPanel__topPanel-valuesInner', {
                        DepositBorrowTopPanel__topPanelValuesInnerCollapse: isCollapse,
                      })}
                    >
                      {!isCollapse && (
                        <Row
                          title={
                            <MaxLTVHelpModal
                              text={intl.formatMessage(messages.currentLTV)}
                              color="white"
                              lightWeight={true}
                            />
                          }
                          color="white"
                          weight="light"
                          isColumn={true}
                        >
                          {user && loanToValue !== '0' ? (
                            <ValuePercent value={loanToValue} color="white" />
                          ) : (
                            <NoData />
                          )}
                        </Row>
                      )}

                      {loanToValue !== '0' && (
                        <button
                          className="dashboard-grey-button"
                          onClick={() => setLTVModalVisible(true)}
                        >
                          <p>{intl.formatMessage(messages.details)}</p>
                        </button>
                      )}
                    </div>
                  </div>

                  {!isCollapse && (
                    <div className="DepositBorrowTopPanel__topPanel-bars">
                      {!!borrowCompositionData.length && (
                        <CircleCompositionBar
                          title={intl.formatMessage(messages.borrowComposition)}
                          totalValue={Number(maxBorrowAmount || 0)}
                          data={borrowCompositionData}
                        />
                      )}

                      {+collateralUsagePercent !== 1 && <CircleCollateralCompositionBar />}
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </TopPanelWrapper>

      {loanToValue !== '0' && (
        <LTVInfoModal visible={isLTVModalVisible} setVisible={setLTVModalVisible} />
      )}

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .DepositBorrowTopPanel {
          &__topPanel-caption {
            p {
              background: ${currentTheme.whiteElement.hex};
              border-bottom: 1px solid ${currentTheme.mainBg.hex};
            }
          }

          &__topPanel-inner {
            background: ${currentTheme.whiteElement.hex};
          }

          &__topPanel-captionWrapper {
            color: ${currentTheme.maxWhite.hex};
          }

          &__topPanelNoUser {
            background: ${currentTheme.whiteElement.hex};
          }

          .dashboard-grey-button {
            background: ${currentTheme.backgroundBackBtn.hex};
            p {
              color: ${currentTheme.maxWhite.hex};
            }
          }
        }
        .TopPanelWrapper {
          border-radius: 4px !important;
        }
      `}</style>
    </div>
  );
}
