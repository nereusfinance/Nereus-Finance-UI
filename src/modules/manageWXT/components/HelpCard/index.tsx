import { useThemeContext } from '@aave/aave-ui-kit';
import React from 'react';
import { useIntl } from 'react-intl';
import NereusButton from '../NereusButton';
import messages from './messages';
import staticStyles from './style';

export default function HelpCard() {
  const intl = useIntl();
  const { currentTheme, sm } = useThemeContext();

  return (
    <>
      <div className="HelpCard">
        <div className="HelpCard__title">
          <p>{intl.formatMessage(messages.help)}</p>
        </div>
        {!sm ? (
          <div className="HelpCard__content">
            <p>
              {intl.formatMessage(messages.helpDescr)}
              <a href="https://discord.com/invite/4tw3VsuTf9" className="LinkDiscord">
                Discord
              </a>
            </p>
            <a
              href="https://docs.nereus.finance/"
              className="HelpCardLink"
              target="_blank"
              rel="noreferrer"
            >
              <NereusButton
                small={true}
                className="DocsBtn"
                text={intl.formatMessage(messages.docs)}
              />
            </a>
          </div>
        ) : (
          <>
            <div className="HelpCard__content">
              <p>{intl.formatMessage(messages.helpDescr)}</p>
            </div>
            <div className="ButtonDocs">
              <a
                href="https://docs.nereus.finance/"
                className="HelpCardLink"
                target="_blank"
                rel="noreferrer"
              >
                <NereusButton
                  small={true}
                  className="DocsBtn"
                  text={intl.formatMessage(messages.docs)}
                />
              </a>
            </div>
          </>
        )}
      </div>
      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .HelpCard {
          color: ${currentTheme.maxWhite.hex};
          background: ${currentTheme.whiteElement.hex};
          &__title {
            border-bottom: 1px solid ${currentTheme.mainBg.hex};
          }
        }
      `}</style>
    </>
  );
}
