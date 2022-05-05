// @ts-nocheck
import React from 'react';
import { useThemeContext } from '@aave/aave-ui-kit';
import { useIntl } from 'react-intl';
import ReactTooltip from 'react-tooltip';
import NereusButton from '../NereusButton';
import messages from './messages';
import staticStyles from './style';
import WXTimg from '../../../../images/WXT.svg';
import FormatedValue from '../FormatedValue';
import { useStakeLockDataContext } from '../../back/StakeLockDataContext';
import { useWXTPriceDataContext } from '../../../../libs/wxt-price-data-provider';

export default function ClaimCard() {
  const intl = useIntl();
  const { balanceData, claimUnlockedReward, claimTotalEarnedBalance, withdrawExpiredLocks } =
    useStakeLockDataContext();
  const { currentTheme, sm } = useThemeContext();
  const { WXTWithDecimals } = useWXTPriceDataContext();
  const unlockedWXT = balanceData.unlockedBalance;
  const vestingWXT = balanceData.amountWithPenalty;
  const penaltyPercent = balanceData.penaltyPercent.div(100).toString();
  const earlyExitPenalty = balanceData.fullWithdrawalPenalty;

  const onClaimWXTClick = () => {
    claimUnlockedReward();
  };

  const onClaimAllWithFeesClick = () => {
    claimTotalEarnedBalance();
  };
  // const onClaimAllClick = () => {
  //   claimUnlockedReward();
  // };

  function Placeholder() {
    return <div style={{ width: '106px', height: '1px' }} />;
  }

  return (
    <>
      <div className="ClaimCard">
        <div className="ClaimCardRow">
          <div className="ClaimCardRowFlexWrapper">
            <div className="ClaimCardRowTitleContainer">
              <p className="ClaimCardRowTitle">{intl.formatMessage(messages.unlockedWXT)}</p>
              <p className="ClaimCardRowDescr">{intl.formatMessage(messages.unlockedWXTDescr)}</p>
            </div>
          </div>
          {!sm ? (
            <>
              <div className="ClaimCardRowFlexWrapper ClaimCardRowFlexWrapper__center">
                <FormatedValue imgSrc={WXTimg} symbol="WXT" value={WXTWithDecimals(unlockedWXT)} />
              </div>

              <div className="ClaimCardRowFlexWrapper ClaimCardRowFlexWrapper__end">
                <NereusButton
                  text={intl.formatMessage(messages.claimWXT)}
                  small={true}
                  onClick={onClaimWXTClick}
                  disabled={unlockedWXT.isZero()}
                />
              </div>
            </>
          ) : (
            <div className="ClaimWXTMobile">
              <div className="ClaimCardRowFlexWrapper ClaimCardRowFlexWrapper__center">
                <FormatedValue imgSrc={WXTimg} symbol="WXT" value={WXTWithDecimals(unlockedWXT)} />
              </div>

              <div className="ClaimCardRowFlexWrapper ClaimCardRowFlexWrapper__end">
                <NereusButton
                  text={intl.formatMessage(messages.claimWXT)}
                  small={true}
                  onClick={onClaimWXTClick}
                  disabled={unlockedWXT.isZero()}
                />
              </div>
            </div>
          )}
        </div>

        <div className="ClaimCardRow">
          <div className="ClaimCardRowFlexWrapper">
            <div className="ClaimCardRowTitleContainer">
              <p className="ClaimCardRowTitle">{intl.formatMessage(messages.vestingWXT)}</p>
              <div className="ClaimCardRowDescr">
                <span>{intl.formatMessage(messages.vestingWXTDescr)}</span>
                <span className="RedTxt">{` ${penaltyPercent}% `}</span>
                <span className="RedTxt">{intl.formatMessage(messages.penalty)}</span>
              </div>
            </div>
          </div>

          <div className="ClaimCardRowFlexWrapper ClaimCardRowFlexWrapper__center">
            <FormatedValue imgSrc={WXTimg} symbol="WXT" value={WXTWithDecimals(vestingWXT)} />
          </div>

          <div className="ClaimCardRowFlexWrapper">
            <Placeholder />
          </div>
        </div>

        <div className="ClaimCardRow">
          <div className="ClaimCardRowTitleContainer">
            <p className="ClaimCardRowTitle">{intl.formatMessage(messages.claimAllAbove)}</p>
            <div className="ClaimCardRowDescr">
              <span>{intl.formatMessage(messages.claimAllAboveDescr)}</span>
              <span className="RedTxt" data-tip={true} data-for="early-exit-penalty">{`${Number(
                WXTWithDecimals(earlyExitPenalty)
              ).toFixed(3)} WXT`}</span>
            </div>
          </div>
          <Placeholder />
          <div className="BtnDiv">
            {/*<NereusButton*/}
            {/*  text={intl.formatMessage(messages.claimAll)}*/}
            {/*  small={true}*/}
            {/*  onClick={onClaimAllClick}*/}
            {/*  disabled={unlockedWXT.isZero()}*/}
            {/*/>*/}
            <NereusButton
              text={intl.formatMessage(messages.claimAllWithFees)}
              small={true}
              onClick={onClaimAllWithFeesClick}
              disabled={unlockedWXT.add(vestingWXT).isZero()}
            />
          </div>
        </div>

        {
          <ReactTooltip className="Value__tooltip" id="early-exit-penalty" effect="solid">
            <span>
              {intl.formatNumber(Number(WXTWithDecimals(earlyExitPenalty)), {
                maximumFractionDigits: 18,
              })}
              {' WXT'}
            </span>
          </ReactTooltip>
        }

        <div className="ClaimCardRow">
          <div className="ClaimCardRowFlexWrapper">
            <div className="ClaimCardRowTitleContainer">
              <p className="ClaimCardRowTitle">{intl.formatMessage(messages.expiredLockedWXT)}</p>
              <p className="ClaimCardRowDescr">
                {intl.formatMessage(messages.expiredLockedWXTDescr)}
              </p>
            </div>
          </div>

          {!sm ? (
            <>
              <div className="ClaimCardRowFlexWrapper ClaimCardRowFlexWrapper__center">
                <FormatedValue
                  imgSrc={WXTimg}
                  symbol="WXT"
                  value={WXTWithDecimals(balanceData.lockExpired)}
                />
              </div>

              <div className="ClaimCardRowFlexWrapper ClaimCardRowFlexWrapper__end">
                <NereusButton
                  text={intl.formatMessage(messages.claimWXT)}
                  small={true}
                  onClick={() => withdrawExpiredLocks()}
                  disabled={balanceData.lockExpired.isZero()}
                />
              </div>
            </>
          ) : (
            <div className="ClaimWXTMobile">
              <div className="ClaimCardRowFlexWrapper ClaimCardRowFlexWrapper__center">
                <FormatedValue
                  imgSrc={WXTimg}
                  symbol="WXT"
                  value={WXTWithDecimals(balanceData.lockExpired)}
                />
              </div>

              <div className="ClaimCardRowFlexWrapper ClaimCardRowFlexWrapper__end">
                <NereusButton
                  text={intl.formatMessage(messages.claimWXT)}
                  small={true}
                  onClick={() => withdrawExpiredLocks()}
                  disabled={balanceData.lockExpired.isZero()}
                />
              </div>
            </div>
          )}
        </div>
      </div>
      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .ClaimCard {
          background: ${currentTheme.whiteElement.hex};

          .ClaimCardRow {
            border-bottom: 1px solid ${currentTheme.mainBg.hex};
          }

          .ClaimCardRowTitle {
            color: ${currentTheme.maxWhite.hex};
          }
          .ClaimCardRowDescr {
            color: ${currentTheme.lightGray.hex};
          }
          .RedTxt {
            color: ${currentTheme.statusError.hex};
          }
        }
      `}</style>
    </>
  );
}
