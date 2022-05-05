import React from 'react';
import { useThemeContext } from '@aave/aave-ui-kit';
import { useIntl } from 'react-intl';
import messages from './messages';
import staticStyles from './style';
import FormatedValue from '../FormatedValue';
import NereusButton from '../NereusButton';
import TitleWithHelper, { TextWithHelperColor } from '../TitleWithHelper';
import { TokenIcon } from '../../../../helpers/config/assets-config';
import classNames from 'classnames';
import { useWXTPriceDataContext } from '../../../../libs/wxt-price-data-provider';
import { BigNumber, ethers } from 'ethers';
import { useStakeLockDataContext } from '../../back/StakeLockDataContext';
import {
  useDynamicPoolDataContext,
  useStaticPoolDataContext,
} from '../../../../libs/pool-data-provider';
import { bigFloatToFixed } from '../../../../libs/utils/bigFloatToFixed';
import Value from '../../../../components/basic/Value';
import { getNetworkConfig } from '../../../../helpers/config/markets-and-network-config';
import { ChainId } from '../../../../helpers/config/types';

function Placeholder() {
  return <div className="Placeholder" />;
}

const BNFloatMultPrecision = 100;
const BNFloatMultPrecisionMultiplyer = BigNumber.from(10).pow(BNFloatMultPrecision);

const chainId = process.env.REACT_APP_CHAIN_ID === '5' ? ChainId.goerli : ChainId.avalanche;
const networkConfig = getNetworkConfig(chainId);

// param isVests: show captions for vesting or locking
export default function FeesCard() {
  const { WXTToUSD } = useWXTPriceDataContext();
  const intl = useIntl();
  const { currentTheme, sm } = useThemeContext();
  const { claimableRewards, getRewards } = useStakeLockDataContext();
  const { reserves } = useDynamicPoolDataContext();
  const { marketRefPriceInUsd } = useStaticPoolDataContext();

  const [activeTab, setActiveTab] = React.useState(0);
  const [claimableRewardsUSD, setClaimableRewardsUSD] = React.useState<{ [token: string]: string }>(
    {}
  );
  const [totalClaimableRewardsUSD, setTotalClaimableRewardsUSD] = React.useState('0');

  // calculate claimableRewardsUSD
  React.useEffect(() => {
    if (claimableRewards.length && reserves.length && marketRefPriceInUsd) {
      const newClaimableRewardsUSD: { [token: string]: string } = {};

      claimableRewards.forEach((reward) => {
        if (reward.token === networkConfig.rewardTokenAddress) {
          newClaimableRewardsUSD[reward.token] = WXTToUSD(reward.amount);
        } else {
          const correspondingReserve = reserves.find(
            (reserve) => reserve.aTokenAddress === reward.token
          );

          if (correspondingReserve) {
            const priceUSD = BigNumber.from(reward.amount)
              .mul(
                ethers.utils.parseUnits(
                  correspondingReserve.priceInMarketReferenceCurrency,
                  BNFloatMultPrecision
                )
              )
              .mul(ethers.utils.parseUnits(marketRefPriceInUsd, BNFloatMultPrecision))
              .div(BNFloatMultPrecisionMultiplyer)
              .div(BNFloatMultPrecisionMultiplyer);

            newClaimableRewardsUSD[reward.token] = ethers.utils.formatUnits(
              priceUSD,
              reward.decimals
            );
          }
        }
      });

      setClaimableRewardsUSD(newClaimableRewardsUSD);
    }
  }, [claimableRewards, reserves, marketRefPriceInUsd]);

  // calculate totalClaimableRewardsUSD
  React.useEffect(() => {
    let newTotalUSD = BigNumber.from(0);
    for (const key in claimableRewardsUSD) {
      newTotalUSD = newTotalUSD.add(
        ethers.utils.parseUnits(claimableRewardsUSD[key], BNFloatMultPrecision)
      );
    }

    setTotalClaimableRewardsUSD(ethers.utils.formatUnits(newTotalUSD, BNFloatMultPrecision));
  }, [claimableRewardsUSD]);

  // TODO: get data
  const totalClaimedUSD = BigNumber.from('0');
  const [claimedFees] = React.useState<any[]>([]);
  const onLoadClaimedFeesClick = () => {};
  const onRefreshClick = () => {};
  //

  function tokenSymbolWithoutPrefix(symbol: string) {
    if (['a', 'b', 'n', 'an'].includes(symbol[0])) {
      return symbol.substring(1);
    }
    return symbol;
  }

  return (
    <>
      <div className="FeesCard">
        <div className="FeesCardTitle">
          <div className="FeesCardTitleItem" onClick={() => setActiveTab(0)}>
            <TitleWithHelper
              className={classNames(
                'FeesCardTitleItem__inner',
                activeTab === 0
                  ? 'FeesCardTitleItem__innerActive'
                  : 'FeesCardTitleItem__innerDisabled'
              )}
              color={activeTab === 0 ? TextWithHelperColor.orange : TextWithHelperColor.disabled}
              text={intl.formatMessage(messages.claimableFees)}
              helperTitle={intl.formatMessage(messages.claimableFees)}
              helperDescr={intl.formatMessage(messages.claimableFeesHelperDescr)}
            />
          </div>
          {/*<div className="FeesCardTitleItem" onClick={() => setActiveTab(1)}>*/}
          {/*  <TitleWithHelper*/}
          {/*    className={classNames(*/}
          {/*      'FeesCardTitleItem__inner',*/}
          {/*      activeTab === 1*/}
          {/*        ? 'FeesCardTitleItem__innerActive'*/}
          {/*        : 'FeesCardTitleItem__innerDisabled'*/}
          {/*    )}*/}
          {/*    color={activeTab === 1 ? TextWithHelperColor.orange : TextWithHelperColor.disabled}*/}
          {/*    text={intl.formatMessage(messages.claimedFees)}*/}
          {/*    helperTitle={intl.formatMessage(messages.claimedFees)}*/}
          {/*    helperDescr={intl.formatMessage(messages.claimedFeesHelperDescr)}*/}
          {/*  />*/}
          {/*</div>*/}
        </div>

        {activeTab === 0 ? (
          <div className="FeesCardContent">
            <div className="FeesCardTable">
              <div className="FeesCardTableCol FeesCardTableCol__1">
                <p className="FeesCardTableHeader">{intl.formatMessage(messages.token)}</p>
                {claimableRewards.map((item, index) => (
                  <div className="FeesCardTableItem FeesCardTableItemToken" key={item.symbol}>
                    <TokenIcon
                      tokenSymbol={tokenSymbolWithoutPrefix(item.symbol)}
                      height={16}
                      width={16}
                      tokenFullName={item.symbol}
                      className="MarketTableItem__token"
                    />
                  </div>
                ))}
              </div>
              <div className="FeesCardTableCol FeesCardTableCol__2">
                <p className="FeesCardTableHeader FeesCardTableHeader__center">
                  {intl.formatMessage(messages.amount)}
                </p>
                {claimableRewards.map((item, index) => (
                  <div className="FeesCardTableItem FeesCardTableItem__center" key={index}>
                    {!sm ? (
                      <Value
                        value={ethers.utils.formatUnits(item.amount, item.decimals)}
                        symbol=""
                        compact={true}
                        minimumValueDecimals={4}
                        maximumValueDecimals={4}
                        minimumSubValueDecimals={4}
                        maximumSubValueDecimals={4}
                        withoutSymbol={true}
                        tooltipId={`claim-size-${item.amount}`}
                      />
                    ) : (
                      <Value
                        value={ethers.utils.formatUnits(item.amount, item.decimals)}
                        subValue={claimableRewardsUSD[item.token] || '0'}
                        subSymbol="USD"
                        symbol=""
                        minimumValueDecimals={4}
                        maximumValueDecimals={4}
                        minimumSubValueDecimals={4}
                        maximumSubValueDecimals={4}
                      />
                    )}
                  </div>
                ))}
              </div>
              {!sm ? (
                <div className="FeesCardTableCol FeesCardTableCol__3">
                  <Placeholder />
                  {claimableRewards.map((item, index) => (
                    <div
                      className="FeesCardTableItem FeesCardTableItemToken FeesCardTableItem__center"
                      key={index}
                    >
                      <span>$</span>
                      <Value
                        value={claimableRewardsUSD[item.token] || '0'}
                        symbol="USD"
                        compact={true}
                        minimumValueDecimals={4}
                        maximumValueDecimals={4}
                        minimumSubValueDecimals={4}
                        maximumSubValueDecimals={4}
                        tooltipId={`claim-size-usd-${item.amount}`}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                ''
              )}
              {!sm ? (
                <div className="FeesCardTableCol FeesCardTableCol__4">
                  <Placeholder />
                  {claimableRewards.map((item, index) => (
                    <div className="FeesCardTableItem FeesCardTableItem__end" key={index}>
                      <NereusButton
                        onClick={() => getRewards([item.token])}
                        small={true}
                        text={intl.formatMessage(messages.claim)}
                        className="claimBtn"
                        disabled={item.amount.isZero()}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="FeesCardTableCol FeesCardTableCol__3">
                  <Placeholder />
                  {claimableRewards.map((item, index) => (
                    <div className="FeesCardTableItem FeesCardTableItem__end" key={index}>
                      <NereusButton
                        onClick={() => getRewards([item.token])}
                        small={true}
                        text={intl.formatMessage(messages.claim)}
                        className="claimBtn"
                        disabled={item.amount.isZero()}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="FeesCardTotal">
              <div className="FeesCardTotal__left">
                <p>{intl.formatMessage(messages.totalValue)}</p>
                {<FormatedValue symbol="USD" value={totalClaimableRewardsUSD} />}
              </div>
              {!sm ? (
                <NereusButton
                  text={intl.formatMessage(messages.claimAll)}
                  small={true}
                  disabled={
                    BigNumber.from(bigFloatToFixed(totalClaimableRewardsUSD, 0)) ===
                    BigNumber.from('0')
                  }
                  onClick={() => getRewards(claimableRewards.map((item) => item.token))}
                />
              ) : (
                ''
              )}
            </div>
            {sm ? (
              <div className="FeesCardTableCol__Mobile">
                <NereusButton
                  text={intl.formatMessage(messages.claimAll)}
                  small={true}
                  disabled={
                    BigNumber.from(bigFloatToFixed(totalClaimableRewardsUSD, 0)) ===
                    BigNumber.from('0')
                  }
                  onClick={() => getRewards(claimableRewards.map((item) => item.token))}
                  className="claimAllBtn"
                />
              </div>
            ) : (
              ''
            )}
          </div>
        ) : (
          <div className="FeesCardContent">
            {claimedFees.length === 0 ? (
              <NereusButton
                text={intl.formatMessage(messages.loadClaimedFees)}
                onClick={onLoadClaimedFeesClick}
                small={true}
                disabled
              />
            ) : (
              <>
                <div className="FeesCardTable">
                  <div className="FeesCardTableCol FeesCardTableCol__1">
                    <p className="FeesCardTableHeader">{intl.formatMessage(messages.token)}</p>
                    {claimedFees.map((item, index) => (
                      <div className="FeesCardTableItem FeesCardTableItemToken" key={index}>
                        <img src={item.imgSrc} alt="" />
                        <p>{item.symbol}</p>
                      </div>
                    ))}
                  </div>
                  <div className="FeesCardTableCol FeesCardTableCol__2">
                    <p className="FeesCardTableHeader FeesCardTableHeader__center">
                      {intl.formatMessage(messages.amount)}
                    </p>
                    {claimedFees.map((item, index) => (
                      <div className="FeesCardTableItem FeesCardTableItem__center" key={index}>
                        <FormatedValue symbol="" value={item.amount} />
                      </div>
                    ))}
                  </div>
                  <div className="FeesCardTableCol FeesCardTableCol__3">
                    <Placeholder />
                    {claimedFees.map((item, index) => (
                      <div
                        className="FeesCardTableItem FeesCardTableItemToken FeesCardTableItem__center"
                        key={index}
                      >
                        <FormatedValue symbol="USD" value={item.amountUSD} />
                      </div>
                    ))}
                  </div>
                  <div className="FeesCardTableCol FeesCardTableCol__4">
                    <Placeholder />
                    {claimedFees.map((item, index) => (
                      <div className="FeesCardTableItem FeesCardTableItem__end" key={index}>
                        <Placeholder />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="FeesCardTotal">
                  <div className="FeesCardTotal__left">
                    <p>{intl.formatMessage(messages.totalValue)}</p>
                    <FormatedValue symbol="USD" value={WXTToUSD(totalClaimedUSD)} />
                  </div>
                  <NereusButton
                    text={intl.formatMessage(messages.refresh)}
                    small={true}
                    disabled={totalClaimedUSD === BigNumber.from('0')}
                    onClick={onRefreshClick}
                  />
                </div>
              </>
            )}
          </div>
        )}
      </div>
      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .FeesCard {
          background: ${currentTheme.whiteElement.hex};

          .FeesCardTitle {
            color: ${currentTheme.maxWhite.hex};
            border-bottom: 1px solid ${currentTheme.mainBg.hex};
          }

          .FeesCardTotal__left,
          .FeesCardTableItemExpiry {
            color: ${currentTheme.maxWhite.hex};
          }

          .FeesCardTableHeader {
            color: ${currentTheme.lightGray.hex};
          }

          .FeesCardTableItemToken {
            p,
            span {
              color: ${currentTheme.maxWhite.hex};
            }

            span {
              display: inline-block;
              padding-right: 3px;
            }
          }

          .FeesCardTableItem {
            border-bottom: 1px solid ${currentTheme.mainBg.hex};
          }
          .FeesCardTitleItem__innerActive {
            border-bottom-color: ${currentTheme.nereusYellow.hex};
          }
          .FeesCardTitleItem__innerDisabled {
            border-bottom-color: transparent;
          }
        }
      `}</style>
    </>
  );
}
