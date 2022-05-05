import React from 'react';
import staticStyles from './style';
import { useThemeContext } from '@aave/aave-ui-kit';
import Modal from 'react-modal';
import NereusButton from '../NereusButton';

Modal.setAppElement('#root');

export default function HelperModal({
  isOpen,
  close,
  title,
  descr,
  btnText = 'OK, I got it',
}: {
  isOpen: boolean;
  close: Function;
  title: string;
  descr: string;
  btnText?: string;
}) {
  const { currentTheme, sm, md } = useThemeContext();

  const customStyles = {
    content: {
      margin: 'auto',
      width: sm || md ? '68vw' : '31vw',
      background: currentTheme.whiteElement.hex,
      padding: '40px 32px !important',
      borderRadius: '8px !important',
      border: 'none',
    },
  };

  return (
    <>
      <Modal isOpen={isOpen} style={customStyles}>
        <div className="HelperModalContent">
          <p className="HelperModalContent__title">{title}</p>
          <p className="HelperModalContent__descr">{descr}</p>
          <NereusButton text={btnText} onClick={close} />
        </div>
      </Modal>
      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .HelperModalContent {
          &__title {
            color: ${currentTheme.maxWhite.hex};
          }
          &__descr {
            color: ${currentTheme.maxWhite.hex};
          }
        }
      `}</style>
    </>
  );
}
