import React from 'react';
import { useThemeContext } from '@aave/aave-ui-kit';
import { useIntl } from 'react-intl';
import messages from './messages';
import staticStyles from './style';
import WXTimg from '../../../../images/WXT.svg';
import FormatedValue from '../FormatedValue';
import { useStakeLockDataContext } from '../../back/StakeLockDataContext';
import { useWXTPriceDataContext } from '../../../../libs/wxt-price-data-provider';
import { ethers } from 'ethers';
import { bigFloatToFixed, divideIntegerWithComa } from '../../../../libs/utils/bigFloatToFixed';

// param isVests: show captions for vesting or locking
export default function VestsCard({ isVests = true, items }: { isVests?: boolean; items: any[] }) {
  const intl = useIntl();
  const { currentTheme } = useThemeContext();
  const { WXTToUSD, WXTWithDecimals } = useWXTPriceDataContext();
  const { balanceData } = useStakeLockDataContext();

  function formatDate(date: Date) {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    let res = date.toLocaleDateString('en-EN', { weekday: 'long' });
    res = `${res} ${date.toLocaleDateString('en-EN', { month: 'short' })}`;
    res = `${res} ${date.getDate()},`;
    res = `${res} ${hours <= 9 ? '0' : ''}${hours}:${minutes <= 9 ? '0' : ''}${minutes}`;
    res = `${res} ${date.getFullYear()}`;
    return res;
  }

  const totalUSD = bigFloatToFixed(
    WXTToUSD(isVests ? balanceData.earnedBalance : balanceData.lockedWXT),
    2,
    true
  );

  return (
    <>
      <div className="VestsCard">
        <div className="VestsCardTitle">
          <p>{intl.formatMessage(isVests ? messages.WXTVests : messages.WXTLocks)}</p>
        </div>
        <div className="VestsCardContent">
          <div className="VestsCardTable">
            <div className="VestsCardTableCol VestsCardTableCol__left">
              <p className="VestsCardTableHeader">
                {intl.formatMessage(isVests ? messages.vesting : messages.locked)}
              </p>
              {items.map((item, index) => (
                <div className="VestsCardTableItem VestsCardTableItemAmount" key={index}>
                  <FormatedValue
                    symbol="WXT"
                    imgSrc={WXTimg}
                    value={ethers.utils.formatUnits(item.amount.toString(), 18)}
                  />
                </div>
              ))}
            </div>
            <div className="VestsCardTableCol VestsCardTableCol__right">
              <p className="VestsCardTableHeader">{intl.formatMessage(messages.expiry)}</p>
              {items.map((item, index) => (
                <p className="VestsCardTableItem VestsCardTableItemExpiry" key={index}>
                  {formatDate(new Date(item.unlockTime.toNumber() * 1000))}
                </p>
              ))}
            </div>
          </div>

          <div className="VestsCardTotal">
            <p>{intl.formatMessage(isVests ? messages.totalVesting : messages.totalLocked)}</p>
            <span>
              {isVests
                ? divideIntegerWithComa(
                    bigFloatToFixed(WXTWithDecimals(balanceData.earnedBalance), 2, true)
                  )
                : divideIntegerWithComa(
                    bigFloatToFixed(WXTWithDecimals(balanceData.lockedWXT), 2, true)
                  )}
            </span>
            <p>{'WXT'}</p>
          </div>
          <div className="VestsCardTotal">
            <p>{intl.formatMessage(messages.totalValue)}</p>
            <span>{divideIntegerWithComa(totalUSD)}</span>
            <p>{'USD'}</p>
          </div>
        </div>
      </div>
      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .VestsCard {
          background: ${currentTheme.whiteElement.hex};

          .VestsCardTitle {
            color: ${currentTheme.maxWhite.hex};
            border-bottom: 1px solid ${currentTheme.mainBg.hex};
          }

          .VestsCardTotal,
          .VestsCardTableItemExpiry {
            color: ${currentTheme.maxWhite.hex};
          }

          .VestsCardTableHeader {
            color: ${currentTheme.lightGray.hex};
          }
        }
      `}</style>
    </>
  );
}
