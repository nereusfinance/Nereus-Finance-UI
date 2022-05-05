import React from 'react';
import staticStyles from './style';
import { useThemeContext } from '@aave/aave-ui-kit';
import classNames from 'classnames';

export default function NereusButton({
  text,
  onClick = () => {},
  disabled = false,
  small = false,
  className,
}: {
  text: string;
  onClick?: Function;
  disabled?: boolean;
  small?: boolean;
  className?: string;
}) {
  const { currentTheme } = useThemeContext();

  function click() {
    if (!disabled) onClick();
  }

  const customStyles = {
    background: disabled
      ? currentTheme.disabledButtonBackground.hex
      : currentTheme.nereusYellow.hex,
    borderWidth: `${disabled ? '1' : '0'}px`,
    borderColor: disabled ? currentTheme.disabledButtonBorder.hex : 'transparent',
    color: disabled ? currentTheme.lightGray.hex : currentTheme.maxBlack.hex,
    padding: small ? '6px 16px' : '8px 24px',
    fontSize: `${small ? '14' : '16'}px`,
    lineHeight: `${small ? '20' : '24'}px`,
    cursor: disabled ? 'default' : 'pointer',
  };

  return (
    <>
      <button
        className={classNames('NereusButton', className)}
        onClick={click}
        style={customStyles}
      >
        {text}
      </button>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
    </>
  );
}
