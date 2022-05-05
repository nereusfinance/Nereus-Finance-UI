import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { ATokenInfo } from '../../helpers/get-atoken-info';
import { useThemeContext } from '@aave/aave-ui-kit';

import { useProtocolDataContext } from '../../libs/protocol-data-provider';
import { addERC20Token } from '../../helpers/add-erc20';

import messages from './messages';
import staticStyles from './style';

interface AddATokenButtonProps {
  aTokenData: ATokenInfo;
}

export default function AddATokenButton({ aTokenData }: AddATokenButtonProps) {
  const intl = useIntl();
  const { currentTheme } = useThemeContext();
  const { currentMarketData } = useProtocolDataContext();
  const [isDisabled, setIsDisabled] = useState(false);

  const symbol =
    aTokenData.formattedSymbol ||
    `${currentMarketData.aTokenPrefix.toLowerCase()}${aTokenData.symbol}`;

  const handleAddAsset = async () => {
    setIsDisabled(true);
    const result = await addERC20Token(
      aTokenData.address,
      symbol,
      aTokenData.decimals,
      aTokenData.icon
    );
    // If user added the token, we get a true back, which means we can let the button be in disabled state
    setIsDisabled(result);
  };

  return (
    <button className="AddATokenButton" onClick={handleAddAsset} disabled={isDisabled}>
      <div className="AddATokenButton__circle" />
      <span className="AddATokenButton__title">
        {intl.formatMessage(messages.title, { asset: symbol })}
      </span>

      <style jsx={true}>{staticStyles}</style>
      <style jsx={true}>{`
        @import 'src/_mixins/screen-size';

        .AddATokenButton {
          background: ${currentTheme.backgroundBackBtn.hex};
          color: ${currentTheme.textDarkBlue.hex};
          border: 1px solid transparent;
          @include respond-to(sm) {
            background: ${currentTheme.whiteElement.hex};
          }

          &:disabled {
            background: ${currentTheme.disabledGray.hex};
          }

          &:hover {
            border: 1px ${currentTheme.maxWhite.hex} solid;
          }

          &__circle {
            background: ${currentTheme.maxWhite.hex};
            &:after,
            &:before {
              background: ${currentTheme.gray.hex};
            }
          }
        }
      `}</style>
    </button>
  );
}
