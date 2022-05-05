// @ts-nocheck
import { useIntl } from 'react-intl';
import { useThemeContext } from '@aave/aave-ui-kit';

import { CompactNumber } from '../../../../components/basic/CompactNumber';

import messages from './messages';
import staticStyles from './style';
import enquire from '../../../../images/enquire.svg';
import ReactTooltip from 'react-tooltip';

interface TotalPlatformFeesProps {
  value: number;
}

export default function TotalPlatformFees({ value }: TotalPlatformFeesProps) {
  const intl = useIntl();
  const { currentTheme } = useThemeContext();

  return (
    <div className="TotalMarketsSize">
      <p className="title">
        {intl.formatMessage(messages.title)}{' '}
        <img
          alt="Enquire symbol"
          src={enquire}
          data-tip="50% of platform fees goes to token holders"
        />
      </p>
      <ReactTooltip
        className="Tooltip"
        place="top"
        effect="solid"
        backgroundColor={currentTheme.gray.hex}
      />
      <h2>
        ${' '}
        {value < 100000000000 ? (
          intl.formatNumber(value, {
            maximumFractionDigits: 2,
            minimumFractionDigits: 2,
          })
        ) : (
          <CompactNumber value={value} maximumFractionDigits={2} minimumFractionDigits={2} />
        )}
      </h2>

      <style jsx={true}>{staticStyles}</style>
      <style jsx={true}>{`
        .TotalMarketsSize {
          color: ${currentTheme.white.hex};
          background: ${currentTheme.whiteElement.hex};
        }
        .Tooltip {
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
}
