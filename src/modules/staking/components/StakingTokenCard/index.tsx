import React from 'react';
import { useHistory } from 'react-router-dom';
import { useIntl } from 'react-intl';

import { CompactNumber } from '../../../../components/basic/CompactNumber';
import DefaultButton from '../../../../components/basic/DefaultButton';
import Value from '../../../../components/basic/Value';
import TitleWithHelper from '../../../manageWXT/components/TitleWithHelper';
import WXTIcon from '../../../../images/WXT.svg';

import messages from './messages';
import staticStyles from './style';
import { divideIntegerWithComa } from '../../../../libs/utils/bigFloatToFixed';
import SubValue from '../../../../components/basic/Value/SubValue';

interface StakingTokenCardProps {
  stakeTokenTitle: string;
  stakeAPR: number | string;
  lpTokenPrice: number | string;
  stakedByUser: number | string;
  rewardPerDay: any;
  rewardPerWeek: any;
  rewardPerDayUSD: any;
  rewardPerWeekUSD: any;
  stakeContractBalance: string;
  stakeContractBalanceUSD: any;
  stakedByUserUSD: string | number;
  secondaryLogo: string;
}

export function StakingTokenCard({
  stakeTokenTitle,
  stakeAPR,
  lpTokenPrice,
  stakedByUser,
  rewardPerDay,
  rewardPerWeek,
  stakeContractBalance,
  stakeContractBalanceUSD,
  rewardPerDayUSD,
  rewardPerWeekUSD,
  stakedByUserUSD,
  secondaryLogo,
}: StakingTokenCardProps) {
  const intl = useIntl();
  const history = useHistory();

  const stakeToken = () => {
    history.push(`/staking/stake/${stakeTokenTitle}`);
  };

  const vestAndUnstakeToken = () => {
    history.push(`/staking/vest-&-unstake/vest/confirmation/${stakeTokenTitle}`);
  };

  return (
    <>
      <div className="StakingTokenCard">
        <div className="StakingTokenCard__title">
          {`${intl.formatMessage(messages.stake)} ${stakeTokenTitle}`}
        </div>
        <div className="StakingTokenCard__row">
          <p className="StakingTokenCard__row-title">{intl.formatMessage(messages.stakingAPR)}</p>
          <p className="StakingTokenCard__row-value">{divideIntegerWithComa(stakeAPR)}%</p>
        </div>
        <div className="StakeButton">
          <DefaultButton
            title={`${intl.formatMessage(messages.stake)} ${stakeTokenTitle}`}
            onClick={stakeToken}
            color="nereusYellow"
            size="ultra_big"
          />
        </div>
        <div className="StakingTokenCard__row">
          <div className="StakingTokenCard__row-title">
            {intl.formatMessage(messages.LPTokenPrice)}
          </div>
          <div className="StakingTokenCard__row-value">{`$ ${divideIntegerWithComa(
            lpTokenPrice
          )}`}</div>
        </div>
        <div className="StakingTokenCard__row">
          <div className="StakingTokenCard__row-title">
            {intl.formatMessage(messages.TotalLPStaked)}
          </div>
          <div>
            <Value
              value={stakeContractBalance}
              compact={true}
              symbol={stakeTokenTitle}
              minimumValueDecimals={2}
              maximumValueDecimals={2}
              color="white"
              className="StakingTokenCard__row-value"
            />
            <div className="SubValueBlock">
              <div className="USD">$</div>
              <SubValue value={stakeContractBalanceUSD} />
            </div>
          </div>
        </div>
        <div className="StakingTokenCard__row">
          <div className="StakingTokenCard__row-title">
            <TitleWithHelper
              text={intl.formatMessage(messages.TotalRewardsDay)}
              helperTitle={'Total Rewards per day'}
              helperDescr={'Total WXT paid out to LP token stakers per day'}
            />
          </div>
          <div>
            <Value
              value={rewardPerDay}
              compact={true}
              symbol="WXT"
              minimumValueDecimals={2}
              maximumValueDecimals={2}
              color="white"
              className="StakingTokenCard__row-value"
            />
            <div className="SubValueBlock">
              <div className="USD">$</div>
              <SubValue value={rewardPerDayUSD} />
            </div>
          </div>
        </div>
        <div className="StakingTokenCard__row">
          <div className="StakingTokenCard__row-title">
            <TitleWithHelper
              text={intl.formatMessage(messages.TotalRewardsWeek)}
              helperTitle={'Total Rewards per week'}
              helperDescr={'Total WXT paid out to LP token stakers per week'}
            />
          </div>
          <div>
            <Value
              value={rewardPerWeek}
              compact={true}
              symbol="WXT"
              minimumValueDecimals={2}
              maximumValueDecimals={2}
              color="white"
              className="StakingTokenCard__row-value"
            />
            <div className="SubValueBlock">
              <div className="USD">$</div>
              <SubValue value={rewardPerWeekUSD} />
            </div>
          </div>
        </div>
        <div className="UnstakeTokenBlock">
          <p className="UnstakeTokenBlock__title">
            {`${intl.formatMessage(messages.staked)} ${stakeTokenTitle}`}
          </p>
          <div className="UnstakeTokenBlock__value">
            <div className="UnstakeTokenBlock__value-token">
              <div className="CurrencyLogo">
                <img src={WXTIcon} alt="logo" className="PrimaryLogo" />
                <img src={secondaryLogo} alt="logo" className="SecondaryLogo" />
              </div>
              <p>
                <CompactNumber
                  value={stakedByUser}
                  maximumFractionDigits={4}
                  minimumFractionDigits={0}
                />
              </p>
            </div>
            <div className="UnstakeTokenBlock__value-subValue">{`$${divideIntegerWithComa(
              stakedByUserUSD
            )} USD`}</div>
          </div>
          <DefaultButton
            title={intl.formatMessage(messages.unstakeWXT)}
            onClick={vestAndUnstakeToken}
            disabled={Number(stakedByUser) === 0 ? true : false}
            size="normal"
            className="UnstakeButton VestAndUnstakeButton"
            onDarkBackground={true}
            color={'nereusYellow'}
          />
        </div>
      </div>

      <style jsx={true}>{staticStyles}</style>
      <style jsx={true} global={true}>{`
        @import 'src/_mixins/screen-size';

        .UnstakeButton {
          color: #ffffff;
          background-color: #353535;
          border-color: transparent;
          font-weight: 400;
          font-size: 14px;
          line-height: 20px;

          @include respond-to(sm) {
            width: 88px;
            height: 32px;
          }
        }

        .VestAndUnstakeButton {
          width: 140px;
        }
      `}</style>
    </>
  );
}
