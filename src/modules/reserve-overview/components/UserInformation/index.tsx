import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useIntl } from 'react-intl';
import classNames from 'classnames';
import { valueToBigNumber, BigNumber, InterestRate } from '@aave/protocol-js';

import { useThemeContext } from '@aave/aave-ui-kit';
import { toggleUseAsCollateral } from '../../../../helpers/toggle-use-as-collateral';
import Row from '../../../../components/basic/Row';
import Link from '../../../../components/basic/Link';
import DefaultButton from '../../../../components/basic/DefaultButton';
import Value from '../../../../components/basic/Value';
import ValuePercent from '../../../../components/basic/ValuePercent';
import CustomSwitch from '../../../../components/basic/CustomSwitch';
import HealthFactor from '../../../../components/HealthFactor';
import CollateralHelpModal from '../../../../components/HelpModal/CollateralHelpModal';
import GradientPlusButton from '../../../../components/basic/GradientPlusButton';

import defaultMessages from '../../../../defaultMessages';
import messages from './messages';
import staticStyles from './style';
import { ComputedReserveData, UserSummary } from '../../../../libs/pool-data-provider';
import { ComputedUserReserve } from '@aave/math-utils';
import { loanActionLinkComposer } from '../../../../helpers/loan-action-link-composer';

interface UserInformationProps {
  user?: UserSummary;
  poolReserve: ComputedReserveData;
  userReserve?: ComputedUserReserve;
  symbol: string;
  walletBalance: BigNumber;
}

export default function UserInformation({
  user,
  userReserve,
  poolReserve,
  symbol,
  walletBalance,
}: UserInformationProps) {
  const intl = useIntl();
  const { currentTheme, xl, sm, isCurrentThemeDark } = useThemeContext();
  const history = useHistory();

  const borrows = valueToBigNumber(userReserve?.variableBorrows || '0').toNumber();
  const repayLink = loanActionLinkComposer(
    'repay',
    poolReserve.id,
    InterestRate.Variable,
    poolReserve.underlyingAsset
  );
  const [contentVisible, setContentVisibility] = useState(false);

  const totalBorrows = valueToBigNumber(userReserve?.totalBorrows || '0').toNumber();
  const underlyingBalance = valueToBigNumber(userReserve?.underlyingBalance || '0').toNumber();

  const availableBorrowsMarketReferenceCurrency = valueToBigNumber(
    user?.availableBorrowsMarketReferenceCurrency || 0
  );
  const availableBorrows = availableBorrowsMarketReferenceCurrency.gt(0)
    ? BigNumber.min(
        availableBorrowsMarketReferenceCurrency
          .div(poolReserve.priceInMarketReferenceCurrency)
          .multipliedBy(user && user.totalBorrowsMarketReferenceCurrency !== '0' ? '0.99' : '1'),
        poolReserve.availableLiquidity
      ).toNumber()
    : 0;

  const switcherHeight = xl && !sm ? 16 : sm ? 18 : 20;
  const switcherWidth = xl && !sm ? 30 : sm ? 32 : 40;
  const rowWeight = sm ? 'light' : 'normal';
  const elementsColor = sm ? 'white' : 'dark';

  return (
    <div className="UserInformation">
      <div
        className="UserInformation__mobile-caption"
        onClick={() => setContentVisibility(!contentVisible)}
      >
        <GradientPlusButton
          active={!contentVisible}
          positionVertical="bottom"
          positionHorizontal="right"
          onClick={() => setContentVisibility(contentVisible)}
        />
        <h2>{intl.formatMessage(messages.yourInformation)}</h2>
      </div>

      <div
        className={classNames('UserInformation__content-wrapper', {
          UserInformation__contentWrapperVisible: contentVisible,
        })}
      >
        <div className="UserInformation__content-inner">
          <div
            className="UserInformation__info-wrapper"
            style={{
              marginBottom: '0',
              borderBottom: `1px ${currentTheme.mainBg.hex} solid`,
            }}
          >
            <h3>
              <span>{intl.formatMessage(messages.deposits)}</span>
              <div className="UserInformation__caption-buttons">
                <Link
                  to={`/deposit/${poolReserve.underlyingAsset}-${poolReserve.id}`}
                  className="ButtonLink"
                  disabled={poolReserve.isFrozen}
                >
                  <DefaultButton
                    className="UserInformation__leftButton"
                    title={intl.formatMessage(defaultMessages.deposit)}
                    color={elementsColor}
                    disabled={poolReserve.isFrozen}
                    onDarkBackground={isCurrentThemeDark}
                  />
                </Link>
                <Link
                  className="ButtonLink"
                  to={`/withdraw/${poolReserve.underlyingAsset}-${poolReserve.id}`}
                  disabled={!underlyingBalance}
                >
                  <DefaultButton
                    className="UserInformation__rightButton"
                    title={intl.formatMessage(defaultMessages.withdraw)}
                    color={elementsColor}
                    disabled={!underlyingBalance}
                    onDarkBackground={isCurrentThemeDark}
                  />
                </Link>
              </div>
            </h3>
          </div>
          <div className="UserInformation__info-wrapper">
            <div className="UserInformation__info-inner">
              <Row
                title={intl.formatMessage(messages.yourWalletBalance)}
                withMargin={true}
                weight={rowWeight}
                color={elementsColor}
              >
                <Value
                  value={walletBalance.toString()}
                  symbol={symbol}
                  minimumValueDecimals={2}
                  maximumValueDecimals={2}
                  color={elementsColor}
                />
              </Row>
              <Row
                title={intl.formatMessage(messages.youAlreadyDeposited)}
                withMargin={!!underlyingBalance}
                weight={rowWeight}
                color={elementsColor}
              >
                <Value
                  value={underlyingBalance}
                  symbol={symbol}
                  minimumValueDecimals={2}
                  maximumValueDecimals={2}
                  color={elementsColor}
                />
              </Row>
              {!!underlyingBalance && (
                <div className="UserInformation__row" style={{ marginTop: '12px' }}>
                  <CollateralHelpModal
                    text={intl.formatMessage(messages.collateral)}
                    color={elementsColor}
                    lightWeight={sm}
                  />
                  <CustomSwitch
                    value={
                      userReserve?.usageAsCollateralEnabledOnUser &&
                      poolReserve.usageAsCollateralEnabled
                    }
                    offLabel={intl.formatMessage(messages.depositOffLabel)}
                    onLabel={intl.formatMessage(messages.depositOnLabel)}
                    onColor={currentTheme.switchOnColor.hex}
                    offColor={currentTheme.red.hex}
                    onSwitch={() =>
                      toggleUseAsCollateral(
                        history,
                        poolReserve.id,
                        !userReserve?.usageAsCollateralEnabledOnUser,
                        poolReserve.underlyingAsset
                      )
                    }
                    disabled={!poolReserve.usageAsCollateralEnabled}
                    swiperHeight={switcherHeight}
                    swiperWidth={switcherWidth}
                    onDarkBackground={sm}
                  />
                </div>
              )}
            </div>
          </div>
          <div className="mobile-divider" />
          <div
            className="UserInformation__info-wrapper"
            style={{
              marginBottom: '0',
              borderBottom: `1px ${currentTheme.mainBg.hex} solid`,
            }}
          >
            <h3>
              <span>{intl.formatMessage(messages.borrows)}</span>{' '}
              <div className="UserInformation__caption-buttons">
                <Link
                  to={`/borrow/${poolReserve.underlyingAsset}-${poolReserve.id}`}
                  className="ButtonLink"
                  disabled={
                    !availableBorrows || !poolReserve.borrowingEnabled || poolReserve.isFrozen
                  }
                >
                  <DefaultButton
                    className="UserInformation__leftButton"
                    title={intl.formatMessage(defaultMessages.borrow)}
                    color={elementsColor}
                    disabled={
                      !availableBorrows || !poolReserve.borrowingEnabled || poolReserve.isFrozen
                    }
                    onDarkBackground={isCurrentThemeDark}
                  />
                </Link>

                <Link className="ButtonLink" to={repayLink} disabled={!borrows}>
                  <DefaultButton
                    className="UserInformation__rightButton"
                    title={intl.formatMessage(defaultMessages.repay)}
                    color={elementsColor}
                    disabled={!borrows}
                    onDarkBackground={isCurrentThemeDark}
                  />
                </Link>
              </div>
            </h3>
          </div>
          <div className="UserInformation__info-wrapper">
            <div className="UserInformation__info-inner">
              <Row
                title={intl.formatMessage(messages.borrowed)}
                withMargin={true}
                weight={rowWeight}
                color={elementsColor}
              >
                {poolReserve.borrowingEnabled ? (
                  <Value
                    value={totalBorrows || 0}
                    symbol={symbol}
                    minimumValueDecimals={2}
                    maximumValueDecimals={2}
                    color={elementsColor}
                  />
                ) : (
                  <span className="UserInformation__noData">—</span>
                )}
              </Row>
              <HealthFactor
                value={user?.healthFactor || '-1'}
                titleColor={elementsColor}
                titleLightWeight={sm}
              />
              <Row
                title={intl.formatMessage(messages.loanToValue)}
                withMargin={true}
                weight={rowWeight}
                color={elementsColor}
              >
                <ValuePercent value={user?.currentLoanToValue || 0} color={elementsColor} />
              </Row>
              <Row
                title={intl.formatMessage(messages.availableToYou)}
                weight={rowWeight}
                color={elementsColor}
              >
                {poolReserve.borrowingEnabled ? (
                  <Value
                    value={availableBorrows}
                    symbol={symbol}
                    minimumValueDecimals={2}
                    maximumValueDecimals={2}
                    color={elementsColor}
                  />
                ) : (
                  <span className="UserInformation__noData">—</span>
                )}
              </Row>
            </div>
          </div>
        </div>
      </div>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .UserInformation {
          @import 'src/_mixins/screen-size';

          @include respond-to(sm) {
            background: ${currentTheme.mainBg.hex};

            .UserInformation__leftButton {
              color: ${currentTheme.whiteElement.hex};
              height: 32px;
              border: none;
            }
            .UserInformation__rightButton {
              color: ${currentTheme.whiteElement.hex};
              height: 32px;
            }
          }

          .mobile-divider {
            @include respond-to(sm) {
              height: 1px;
              background-color: ${currentTheme.gray.hex};
              margin-bottom: 22px;
            }
          }

          &__mobile-caption {
            h2 {
              color: ${currentTheme.white.hex};
            }
          }

          .UserInformation__leftButton {
            background-color: ${currentTheme.nereusYellow.hex};
            color: black;
          }

          .UserInformation__rightButton {
            background-color: ${currentTheme.backgroundBackBtn.hex};
            color: ${currentTheme.white.hex};
            border: none;
          }

          &__info-wrapper {
            background: ${currentTheme.whiteElement.hex};

            h3 {
              color: ${currentTheme.textDarkBlue.hex};

              @include respond-to(sm) {
                color: ${currentTheme.white.hex};
              }
            }
          }

          .UserInformation__swiper {
            .CustomSwitch__label {
              @include respond-to(sm) {
                color: ${currentTheme.white.hex} !important;
              }
            }
          }

          &__button-noBorder {
            color: ${currentTheme.textDarkBlue.hex};
            @include respond-to(sm) {
              color: ${currentTheme.white.hex};
            }
          }

          &__noData {
            @include respond-to(sm) {
              color: ${currentTheme.white.hex};
            }
          }

          &__borrow-table {
            @include respond-to(sm) {
              background: ${currentTheme.mainBg.hex};
            }
          }
        }
      `}</style>
    </div>
  );
}
