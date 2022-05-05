import { useThemeContext } from '@aave/aave-ui-kit';
import { ethers } from 'ethers';
import { useIntl } from 'react-intl';
import { useHistory } from 'react-router-dom';
import classNames from 'classnames';

import messages from './messages';
import staticStyles from './style';
import Value from '../../../../components/basic/Value';
import { useStakeLPDataContext } from '../../../../libs/StakeLPContext';
import DefaultButton from '../../../../components/basic/DefaultButton';
import { useWXTPriceDataContext } from '../../../../libs/wxt-price-data-provider';
import SubValue from '../../../../components/basic/Value/SubValue';

interface VestCardProps {
  className?: string;
}

export default function VestCard({ className }: VestCardProps) {
  const intl = useIntl();
  const { currentTheme } = useThemeContext();
  const { WXTToUSD } = useWXTPriceDataContext();
  const { balanceLPData } = useStakeLPDataContext();
  const history = useHistory();

  const vest = () => {
    history.push(`/staking/vest/confirmation?${balanceLPData[0].vestRewardByUser}`);
  };
  return (
    <>
      <div className={classNames(className, 'VestCard')}>
        <div className="MainText">{intl.formatMessage(messages.earnedWXT)}</div>
        <Value
          value={ethers.utils.formatEther(balanceLPData[0].vestRewardByUser)}
          compact={true}
          tokenIcon={true}
          withoutSymbol
          symbol="wxt"
          minimumValueDecimals={2}
          maximumValueDecimals={2}
          color="white"
          className="WXTValue"
        />
        <div className="SubValueBlock">
          <div className="USD">$</div>
          <SubValue value={+WXTToUSD(balanceLPData[0].vestRewardByUser)} />
          <div className="USD">USD</div>
        </div>
        <DefaultButton
          title={intl.formatMessage(messages.vest)}
          disabled={Number(balanceLPData[0].vestRewardByUser) === 0 ? true : false}
          size="medium"
          className="UnstakeButton"
          onDarkBackground={true}
          color={'nereusYellow'}
          onClick={vest}
        />
      </div>

      <style jsx={true}>{staticStyles}</style>
      <style jsx={true} global={true}>{`
        .VestCard {
          background: ${currentTheme.whiteElement.hex};
          .WXTValue {
            margin-bottom: 10px;
            align-items: center;
          }
          .SubValue {
            font-size: 12px;
          }
          .Value {
            margin-bottom: 7px;
          }
        }
      `}</style>
    </>
  );
}
