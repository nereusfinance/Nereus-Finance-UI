import React from 'react';
import staticStyles from './style';
import { useThemeContext } from '@aave/aave-ui-kit';
import infoOrange from '../../../../images/infoOrange.svg';
import infoIcon from '../../../../images/info.svg';
import infoDisabled from '../../../../images/infoDisabled.svg';
import classNames from 'classnames';
import HelperModal from '../HelperModal';

export enum TextWithHelperColor {
  primary = 'primary',
  disabled = 'disabled',
  orange = 'orange',
}

export default function TitleWithHelper({
  text,
  helperTitle,
  helperDescr,
  className,
  color = TextWithHelperColor.primary,
}: {
  text: string;
  helperTitle: string;
  helperDescr: string;
  className?: string;
  color?: TextWithHelperColor;
}) {
  const { currentTheme } = useThemeContext();
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  function getAssetIcon(color: TextWithHelperColor) {
    if (color === TextWithHelperColor.disabled) return infoDisabled;
    if (color === TextWithHelperColor.orange) return infoOrange;
    return infoIcon;
  }

  function getAssetColor(color: TextWithHelperColor) {
    if (color === TextWithHelperColor.disabled) return currentTheme.lightGray.hex;
    if (color === TextWithHelperColor.orange) return currentTheme.nereusYellow.hex;
    return currentTheme.maxWhite.hex;
  }

  return (
    <>
      <div
        className={classNames(className, 'TitleWithHelper')}
        style={{ cursor: color === TextWithHelperColor.primary ? 'default' : 'pointer' }}
      >
        <div className="TitleWithHelperText" style={{ color: getAssetColor(color) }}>
          {text}
          <img
            src={getAssetIcon(color)}
            alt="i"
            className="TitleWithHelperIcon"
            onClick={() => setIsModalOpen(true)}
          />
        </div>

        <HelperModal
          isOpen={isModalOpen}
          close={() => {
            setIsModalOpen(false);
          }}
          title={helperTitle}
          descr={helperDescr}
        />
      </div>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
    </>
  );
}
