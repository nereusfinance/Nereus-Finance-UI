// @ts-nocheck
import { useIntl } from 'react-intl';
import ReactTooltip from 'react-tooltip';
import { useThemeContext } from '@aave/aave-ui-kit';
import classNames from 'classnames';

import { useProtocolDataContext } from '../../../libs/protocol-data-provider';
import ValuePercent from '../../basic/ValuePercent';
import TribeRewardHelpModal from '../../HelpModal/TribeRewardHelpModal';

import messages from './messages';
import staticStyles from './style';

import tribeIcon from '../../../images/tirbe.svg';
import WXTLogo from '../../../images/WXT.svg';

interface LiquidityMiningAPYLineProps {
  symbol?: string;
  value: string | number;
  tooltipId?: string;
}

export default function LiquidityMiningAPYLine({
  symbol,
  value,
  tooltipId,
}: LiquidityMiningAPYLineProps) {
  const intl = useIntl();
  const { currentTheme, isCurrentThemeDark } = useThemeContext();
  const { networkConfig } = useProtocolDataContext();

  const isFeiReward = symbol === 'FEI';

  return (
    <div
      className={classNames('LiquidityMiningAPYLine', {
        LiquidityMiningAPYLine__withTooltip: tooltipId,
      })}
      data-tip={true}
      data-for={tooltipId}
    >
      {isFeiReward ? (
        <div className="LiquidityMiningAPYLine__tribe">
          <img src={tribeIcon} alt="" />
          <strong className="LiquidityMiningAPYLine__titleTribe LiquidityMiningAPYLine__title">
            TRIBE
          </strong>
        </div>
      ) : (
        <div style={{ display: 'flex' }}>
          <img src={WXTLogo} alt="WXT logo" style={{ height: '16px' }} />
          <ValuePercent
            value={value}
            maximumDecimals={2}
            minimumDecimals={2}
            color="green"
            percentColor={currentTheme.nereusYellow.hex}
          />
        </div>
      )}

      {isFeiReward ? (
        <TribeRewardHelpModal text="" />
      ) : (
        <p className="LiquidityMiningAPYLine__title">{intl.formatMessage(messages.apr)}</p>
      )}

      {!!tooltipId && !isFeiReward && (
        <ReactTooltip className="LiquidityMiningAPYLine__tooltip" id={tooltipId} effect="solid">
          <div className="LiquidityMiningAPYLine__tooltip--content">
            <p>
              {intl.formatMessage(messages.tooltipText, {
                token: networkConfig.rewardTokenSymbol,
              })}
            </p>
          </div>
        </ReactTooltip>
      )}

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .LiquidityMiningAPYLine {
          color: ${currentTheme.white.hex};
          border-radius: 100px;
          border: 1px solid ${currentTheme.nereusYellow.hex};

          &__tribe {
            strong {
              color: ${currentTheme.textDarkBlue.hex};
            }
          }

          .LiquidityMiningAPYLine__tooltip {
            background: ${isCurrentThemeDark
              ? currentTheme.mainBg.hex
              : currentTheme.darkBlue.hex} !important;
            &:after {
              border-top-color: ${isCurrentThemeDark
                ? currentTheme.mainBg.hex
                : currentTheme.darkBlue.hex} !important;
            }
          }
        }
      `}</style>
    </div>
  );
}
