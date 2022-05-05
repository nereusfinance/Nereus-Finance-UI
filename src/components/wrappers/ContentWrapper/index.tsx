import React, { ReactNode } from 'react';
import { useHistory } from 'react-router-dom';
import { useIntl } from 'react-intl';
import classNames from 'classnames';

import { useThemeContext } from '@aave/aave-ui-kit';

import messages from './messages';
import staticStyles from './style';

import backBtnIcon from '../../../images/backArrow.svg';

interface ContentWrapperProps {
  className?: string;
  withFullHeight?: boolean;
  withBackButton?: boolean;
  goBack?: () => void;
  children: ReactNode;
}

export default function ContentWrapper({
  className,
  children,
  withFullHeight,
  withBackButton,
  goBack,
}: ContentWrapperProps) {
  const intl = useIntl();
  const { currentTheme } = useThemeContext();
  const history = useHistory();

  return (
    <div
      className={classNames(
        'ContentWrapper',
        { ContentWrapper__fullHeight: withFullHeight },
        className
      )}
    >
      {withBackButton && history.length > 1 && (
        <button className="ContentWrapper__back-button" onClick={goBack || history.goBack}>
          <img src={backBtnIcon} alt="<" />
          <p>{intl.formatMessage(messages.back)}</p>
        </button>
      )}

      {children}

      <style jsx={true}>{staticStyles}</style>
      <style jsx={true}>{`
        .ContentWrapper {
          color: ${currentTheme.darkBlue.hex};
          background: ${currentTheme.whiteElement.hex};

          &__back-button {
            background: ${currentTheme.backgroundBackBtn.hex};
            color: ${currentTheme.maxWhite.hex};
            border: 0px solid ${currentTheme.textDarkBlue.hex};
          }
        }
      `}</style>
    </div>
  );
}
