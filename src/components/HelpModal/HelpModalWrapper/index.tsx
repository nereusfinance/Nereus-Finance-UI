import { useThemeContext } from '@aave/aave-ui-kit';
import classNames from 'classnames';
import React, { ReactNode } from 'react';

import HelpItem from '../../HelpItem';
import TextWithModal from '../../TextWithModal';
import staticStyles from './style';

export interface HelpModalWrapperProps {
  text: string;
  iconSize?: number;
  className?: string;
  caption: string;
  description: string | ReactNode;
  color?: 'dark' | 'white';
  lightWeight?: boolean;
  onWhiteBackground?: boolean;
  modalClassName?: string;
  clickOnText?: boolean;
  withGrayIcon?: boolean;
  captionColor?: 'primary' | 'secondary' | 'dark';
}

export default function HelpModalWrapper({
  text,
  iconSize,
  className,
  caption,
  description,
  color,
  lightWeight,
  onWhiteBackground,
  modalClassName,
  clickOnText,
  withGrayIcon,
  captionColor,
}: HelpModalWrapperProps) {
  const { currentTheme } = useThemeContext();
  return (
    <>
      <TextWithModal
        text={text}
        iconSize={iconSize}
        className={className}
        color={color}
        lightWeight={lightWeight}
        onWhiteBackground={onWhiteBackground}
        modalClassName={classNames('NereusHelpModal', modalClassName)}
        clickOnText={clickOnText}
        withGrayIcon={withGrayIcon}
      >
        <HelpItem
          caption={caption}
          description={description}
          onWhiteBackground={onWhiteBackground}
          captionColor={captionColor}
        />
      </TextWithModal>
      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .NereusHelpModal {
          background: ${currentTheme.whiteElement.hex} !important;

          .Caption__description {
            color: ${currentTheme.maxWhite.hex};
          }

          .Button {
            background: ${currentTheme.nereusYellow.hex};
            color: ${currentTheme.maxBlack.hex};
          }
        }
      `}</style>
    </>
  );
}
