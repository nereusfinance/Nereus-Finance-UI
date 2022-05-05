// @ts-nocheck
import { useThemeContext } from '@aave/aave-ui-kit';
import { useIntl } from 'react-intl';
import staticStyles from './style';
import messages from './messages';
import classNames from 'classnames';
import TitleWithHelper from '../../../manageWXT/components/TitleWithHelper';
import { divideIntegerWithComa } from '../../../../libs/utils/bigFloatToFixed';
import { useStakeLPDataContext } from '../../../../libs/StakeLPContext';
import wxtIcon from '../../../../images/WXT.svg';
import usdcIcon from '../../../../images/USDS.svg';
import avaxIcon from '../../../../images/AVAX.svg';
import Value from '../../../../components/basic/Value';
import { useState } from 'react';
import SwitcherStaking from '../../../../components/basic/SwitcherStaking';
import React from 'react';
import ReactTooltip from 'react-tooltip';

interface StakingTopPanelProps {
  className?: string;
}

export function StakingTopPanel({ className }: StakingTopPanelProps) {
  const { currentTheme, sm } = useThemeContext();
  const intl = useIntl();
  const { balanceLPData } = useStakeLPDataContext();
  const [visibleFirstToken, setVisibleFirstToken] = useState(false);
  const [visibleSecondToken, setVisibleSecondToken] = useState(false);

  const [totalStakedUser, setTotalStakedUser] = useState(0);
  const [totalDailyRevenue, setTotalDailyRevenue] = useState(0);
  const [totalWeeklyRevenue, setTotalWeeklyRevenue] = useState(0);
  const [totalMonthlyRevenue, setTotalMonthlyRevenue] = useState(0);
  const [totalYearlyRevenue, setTotalYearlyRevenue] = useState(0);
  React.useEffect(() => {
    setTotalStakedUser(balanceLPData[0].userStakeInUsd + balanceLPData[1].userStakeInUsd);
    setTotalDailyRevenue(+balanceLPData[0].dailyRevenue + +balanceLPData[1].dailyRevenue);
    setTotalWeeklyRevenue(+balanceLPData[0].weeklyRevenue + +balanceLPData[1].weeklyRevenue);
    setTotalMonthlyRevenue(+balanceLPData[0].monthlyRevenue + +balanceLPData[1].monthlyRevenue);
    setTotalYearlyRevenue(+balanceLPData[0].yearlyRevenue + +balanceLPData[1].yearlyRevenue);
  }, [balanceLPData]);

  return (
    <>
      {!sm ? (
        <div className={classNames(className, 'StakeTopPanelBlock')}>
          <div className="TableDescription">
            <div className="BottomMargin"></div>
            <div className="BottomMargin">
              <TitleWithHelper
                text={intl.formatMessage(messages.staked)}
                helperTitle={intl.formatMessage(messages.staked)}
                helperDescr={intl.formatMessage(messages.StakedHelperDescr)}
              />
            </div>
            <div className="BottomMargin TopInfo">{intl.formatMessage(messages.yourShare)}</div>
            <div className="BottomMargin">
              {' '}
              <TitleWithHelper
                text={intl.formatMessage(messages.dailyRevenue)}
                helperTitle={intl.formatMessage(messages.dailyRevenue)}
                helperDescr={intl.formatMessage(messages.dailyRevenueHelperDescr)}
              />
            </div>
            <div className="BottomMargin">
              {' '}
              <TitleWithHelper
                text={intl.formatMessage(messages.weeklyRevenue)}
                helperTitle={intl.formatMessage(messages.weeklyRevenue)}
                helperDescr={intl.formatMessage(messages.weeklyRevenueHelperDescr)}
                className="WeeklyRevenue"
              />
            </div>
          </div>

          <div className="TableDescription">
            <div className="BottomMargin">
              <div className="iconsContent">
                <img src={wxtIcon} alt="" width={24} height={24} className="wxtIcon" />
                <img src={avaxIcon} alt="" width={24} height={24} className="otherIcon" />
              </div>
              <div className="TextUnderIcon">NXUSD-3CRV</div>
            </div>
            <div className="BottomMargin">
              <div className="Value_Symbol">
                <Value
                  value={balanceLPData[0].userStakeInUsd}
                  subValue={balanceLPData[0].stakedByUser}
                  compact={true}
                  tokenIcon={true}
                  withoutSymbol
                  subSymbol="NXUSD-3CRV"
                  minimumValueDecimals={2}
                  maximumValueDecimals={2}
                  dollarSignWithoutSpace
                />
              </div>
            </div>
            <div className="BottomMargin" data-tip={true} data-for="user-share-first">
              {balanceLPData[0].userShare.toFixed(2)} %
            </div>
            {
              <ReactTooltip className="Value__tooltip" id="user-share-first" effect="solid">
                <span>
                  {balanceLPData[0].userShare}
                  {' %'}
                </span>
              </ReactTooltip>
            }
            <div className="BottomMargin">
              ${divideIntegerWithComa(balanceLPData[0].dailyRevenue)}
            </div>
            <div className="BottomMargin">
              <p className="MainNumber">{`$${divideIntegerWithComa(
                balanceLPData[0].weeklyRevenue
              )}`}</p>
              <p className="SmallerNumber">{`$ ${divideIntegerWithComa(
                balanceLPData[0].monthlyRevenue
              )}/${intl.formatMessage(messages.month)}`}</p>
              <p className="SmallerNumber">{`$ ${divideIntegerWithComa(
                balanceLPData[0].yearlyRevenue
              )}/${intl.formatMessage(messages.year)}`}</p>
            </div>
          </div>

          <div className="TableDescription">
            <div className="BottomMargin">
              <div className="iconsContent">
                <img src={wxtIcon} alt="" width={24} height={24} className="wxtIcon" />
                <img src={usdcIcon} alt="" width={24} height={24} className="otherIcon" />
              </div>
              <div className="TextUnderIcon">WXT-NXUSD</div>
            </div>

            <div className="BottomMargin">
              <div className="Value_Symbol">
                <Value
                  value={balanceLPData[1].userStakeInUsd || 0}
                  subValue={balanceLPData[1].stakedByUser}
                  compact={true}
                  tokenIcon={true}
                  subSymbol="WXT-NXUSD"
                  minimumValueDecimals={2}
                  maximumValueDecimals={2}
                  dollarSignWithoutSpace
                />
              </div>
            </div>
            <div className="BottomMargin" data-tip={true} data-for="user-share-second">
              {balanceLPData[1].userShare.toFixed(2)} %
            </div>

            {
              <ReactTooltip className="Value__tooltip" id="user-share-second" effect="solid">
                <span>
                  {balanceLPData[1].userShare}
                  {' %'}
                </span>
              </ReactTooltip>
            }
            <div className="BottomMargin">
              ${divideIntegerWithComa(balanceLPData[1].dailyRevenue)}
            </div>
            <div className="BottomMargin">
              <p className="MainNumber">{`$${divideIntegerWithComa(
                balanceLPData[1].weeklyRevenue
              )}`}</p>
              <p className="SmallerNumber">{`$ ${divideIntegerWithComa(
                balanceLPData[1].monthlyRevenue
              )}/${intl.formatMessage(messages.month)}`}</p>
              <p className="SmallerNumber">{`$ ${divideIntegerWithComa(
                balanceLPData[1].yearlyRevenue
              )}/${intl.formatMessage(messages.year)}`}</p>
            </div>
          </div>

          <div className="TableDescription">
            <div className="BottomMargin TextUnderIcon">Total:</div>
            <div className="BottomMargin">
              <div className="Value_Symbol">
                <div>$</div>
                <Value
                  value={totalStakedUser || 0}
                  compact={true}
                  tokenIcon={true}
                  minimumValueDecimals={2}
                  maximumValueDecimals={2}
                />
              </div>
            </div>
            <div className="BottomMargin"></div>
            <div className="BottomMargin">${divideIntegerWithComa(totalDailyRevenue)}</div>
            <div className="BottomMargin">
              <p className="MainNumber">{`$${divideIntegerWithComa(totalWeeklyRevenue)}`}</p>
              <p className="SmallerNumber">{`$ ${divideIntegerWithComa(
                totalMonthlyRevenue
              )}/${intl.formatMessage(messages.month)}`}</p>
              <p className="SmallerNumber">{`$ ${divideIntegerWithComa(
                totalYearlyRevenue
              )}/${intl.formatMessage(messages.year)}`}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="TopPanelSM">
          <h2>Staking</h2>
          <div className="TotalValues">
            <div className="TotalValuesItem">
              <TitleWithHelper
                text={intl.formatMessage(messages.staked)}
                helperTitle={intl.formatMessage(messages.staked)}
                helperDescr={intl.formatMessage(messages.StakedHelperDescr)}
                className="TitleWithHelperSM"
              />
              <Value
                value={totalStakedUser || 0}
                compact={true}
                tokenIcon={true}
                withoutSymbol
                symbol="USD"
                minimumValueDecimals={2}
                maximumValueDecimals={2}
              />
            </div>
            <div className="TotalValuesItem">
              <TitleWithHelper
                text={intl.formatMessage(messages.dailyRevenue)}
                helperTitle={intl.formatMessage(messages.dailyRevenue)}
                helperDescr={intl.formatMessage(messages.dailyRevenueHelperDescr)}
                className="TitleWithHelperSM"
              />
              <p className="MainNumber">$ {divideIntegerWithComa(totalDailyRevenue)}</p>
            </div>
            <div className="TotalValuesItem">
              <TitleWithHelper
                text={intl.formatMessage(messages.weeklyRevenue)}
                helperTitle={intl.formatMessage(messages.weeklyRevenue)}
                helperDescr={intl.formatMessage(messages.weeklyRevenueHelperDescr)}
                className="WeeklyRevenue TitleWithHelperSM"
              />
              <div>
                <p className="MainNumber">{`$ ${divideIntegerWithComa(totalWeeklyRevenue)}`}</p>
                <p className="SmallerNumber">{`$ ${divideIntegerWithComa(
                  totalMonthlyRevenue
                )}/${intl.formatMessage(messages.month)}`}</p>
                <p className="SmallerNumber">{`$ ${divideIntegerWithComa(
                  totalYearlyRevenue
                )}/${intl.formatMessage(messages.year)}`}</p>
              </div>
            </div>
          </div>

          <hr className="DivideLine" />
          <div
            className="SwitcherVisibility"
            onClick={() => setVisibleFirstToken(!visibleFirstToken)}
          >
            <div className="iconsContent">
              <img src={wxtIcon} alt="" width={24} height={24} className="wxtIcon" />
              <img src={avaxIcon} alt="" width={24} height={24} className="otherIcon" />
              <p>NXUSD-3CRV</p>
            </div>
            <SwitcherStaking
              active={!visibleFirstToken}
              onClick={() => setVisibleFirstToken(visibleFirstToken)}
            />
          </div>
          <div className={classNames('TokenInfoDisabled', { TokenInfoVisible: visibleFirstToken })}>
            <div className="TotalValues">
              <div className="TotalValuesItem">
                <TitleWithHelper
                  text={intl.formatMessage(messages.stakedDescr)}
                  helperTitle={intl.formatMessage(messages.stakedDescr)}
                  helperDescr={intl.formatMessage(messages.StakedHelperDescr)}
                  className="TitleWithHelperSM"
                />
                <Value
                  value={balanceLPData[0].userStakeInUsd}
                  subValue={balanceLPData[0].stakedByUser}
                  compact={true}
                  tokenIcon={true}
                  withoutSymbol
                  symbol="USD"
                  subSymbol="NXUSD-3CRV"
                  minimumValueDecimals={2}
                  maximumValueDecimals={2}
                />
              </div>
              <div className="TotalValuesItem">
                {intl.formatMessage(messages.yourShare)}
                <p className="MainNumber">{balanceLPData[0].userShare} %</p>
              </div>
              <div className="TotalValuesItem">
                <TitleWithHelper
                  text={intl.formatMessage(messages.dailyRevenue)}
                  helperTitle={intl.formatMessage(messages.dailyRevenue)}
                  helperDescr={intl.formatMessage(messages.dailyRevenueHelperDescr)}
                  className="TitleWithHelperSM"
                />
                <div>$ {divideIntegerWithComa(balanceLPData[0].dailyRevenue)}</div>
              </div>
              <div className="TotalValuesItem">
                <TitleWithHelper
                  text={intl.formatMessage(messages.weeklyRevenue)}
                  helperTitle={intl.formatMessage(messages.weeklyRevenue)}
                  helperDescr={intl.formatMessage(messages.weeklyRevenueHelperDescr)}
                  className="WeeklyRevenue TitleWithHelperSM"
                />
                <div>
                  <p className="MainNumber">{`$ ${divideIntegerWithComa(
                    balanceLPData[0].weeklyRevenue
                  )}`}</p>
                  <p className="SmallerNumber">{`$ ${divideIntegerWithComa(
                    balanceLPData[0].monthlyRevenue
                  )}/${intl.formatMessage(messages.month)}`}</p>
                  <p className="SmallerNumber">{`$ ${divideIntegerWithComa(
                    balanceLPData[0].yearlyRevenue
                  )}/${intl.formatMessage(messages.year)}`}</p>
                </div>
              </div>
            </div>
          </div>

          <hr className="DivideLine" />
          <div
            className="SwitcherVisibility"
            onClick={() => setVisibleSecondToken(!visibleSecondToken)}
          >
            <div className="iconsContent">
              <img src={wxtIcon} alt="" width={24} height={24} className="wxtIcon" />
              <img src={usdcIcon} alt="" width={24} height={24} className="otherIcon" />
              <p>WXT-NXUSD</p>
            </div>
            <SwitcherStaking
              active={!visibleSecondToken}
              onClick={() => setVisibleSecondToken(visibleSecondToken)}
            />
          </div>
          <div
            className={classNames('TokenInfoDisabled', { TokenInfoVisible: visibleSecondToken })}
          >
            <div className="TotalValues">
              <div className="TotalValuesItem">
                <TitleWithHelper
                  text={intl.formatMessage(messages.staked)}
                  helperTitle={intl.formatMessage(messages.staked)}
                  helperDescr={intl.formatMessage(messages.StakedHelperDescr)}
                  className="TitleWithHelperSM"
                />
                <Value
                  value={balanceLPData[1].userStakeInUsd}
                  subValue={balanceLPData[1].stakedByUser}
                  compact={true}
                  tokenIcon={true}
                  withoutSymbol
                  symbol="USD"
                  subSymbol="WXT-NXUSD"
                  minimumValueDecimals={2}
                  maximumValueDecimals={2}
                />
              </div>
              <div className="TotalValuesItem">
                {intl.formatMessage(messages.yourShare)}
                <p className="MainNumber">{balanceLPData[1].userShare} %</p>
              </div>
              <div className="TotalValuesItem">
                <TitleWithHelper
                  text={intl.formatMessage(messages.dailyRevenue)}
                  helperTitle={intl.formatMessage(messages.dailyRevenue)}
                  helperDescr={intl.formatMessage(messages.dailyRevenueHelperDescr)}
                  className="TitleWithHelperSM"
                />
                <div>$ {divideIntegerWithComa(balanceLPData[1].dailyRevenue)}</div>
              </div>
              <div className="TotalValuesItem">
                <TitleWithHelper
                  text={intl.formatMessage(messages.weeklyRevenue)}
                  helperTitle={intl.formatMessage(messages.weeklyRevenue)}
                  helperDescr={intl.formatMessage(messages.weeklyRevenueHelperDescr)}
                  className="WeeklyRevenue TitleWithHelperSM"
                />
                <div>
                  <p className="MainNumber">{`$ ${divideIntegerWithComa(
                    balanceLPData[1].weeklyRevenue
                  )}`}</p>
                  <p className="SmallerNumber">{`$ ${divideIntegerWithComa(
                    balanceLPData[1].monthlyRevenue
                  )}/${intl.formatMessage(messages.month)}`}</p>
                  <p className="SmallerNumber">{`$ ${divideIntegerWithComa(
                    balanceLPData[1].weeklyRevenue
                  )}/${intl.formatMessage(messages.year)}`}</p>
                </div>
              </div>
            </div>
          </div>
          <hr className="DivideLine" />
        </div>
      )}

      <style jsx={true}>{staticStyles}</style>
      <style jsx={true} global={true}>{`
        .StakeTopPanelBlock {
          background: ${currentTheme.whiteElement.hex};
          margin-bottom: 20px;
          .TitleWithHelperText,
          .TopInfo {
            font-size: 12px;
            color: ${currentTheme.lightGray.hex} !important;
          }
          .Value {
            align-items: center;
            .SubValue {
              font-size: 12px;
            }
            .Value__value {
              font-size: 16px;
            }
          }
        }
        .TitleWithHelper {
          justify-content: center;
        }
        .WeeklyRevenue {
          justify-content: end;
          align-self: start;
        }
        .TitleWithHelperSM {
          .TitleWithHelperText {
            font-size: 16px;
            color: ${currentTheme.white.hex} !important;
          }
        }
        .TopPanelSM {
          color: ${currentTheme.white.hex};
        }
        .SmallerNumber {
          color: ${currentTheme.lightGray.hex};
        }
        .BottomMargin {
          color: ${currentTheme.maxWhite.hex};
        }
        .TextUnderIcon {
          font-size: 10px;
          color: ${currentTheme.lightGray.hex};
          padding-top: 5px;
          &:first-child {
            font-size: 16px;
          }
        }
        .TokenInfoDisabled {
          display: none;
        }
        .TokenInfoVisible {
          display: block;
        }
        .DivideLine {
          background: ${currentTheme.lightGray.hex};
        }
      `}</style>
    </>
  );
}
