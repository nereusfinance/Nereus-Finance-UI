import React from 'react';
import classNames from 'classnames';

import { useThemeContext } from '@aave/aave-ui-kit';
import Link from '../../../../../components/basic/Link';
import DefaultButton from '../../../../../components/basic/DefaultButton';
import TableCol from '../TableCol';

import staticStyles from './style';

type TableButtonColProps = {
  title: string;
  linkTo: string;
  disabled?: boolean;
  withoutBorder?: boolean;
};

export default function TableButtonCol({
  title,
  linkTo,
  disabled,
  withoutBorder,
}: TableButtonColProps) {
  const { currentTheme } = useThemeContext();

  const columnWidth = 94;

  return (
    <TableCol maxWidth={columnWidth} minWidth={columnWidth}>
      <Link
        to={linkTo}
        disabled={disabled}
        className={classNames({ ButtonLink: !withoutBorder, NoButtonLink: withoutBorder })}
      >
        {withoutBorder ? (
          <DefaultButton
            className="TableButtonCol__button"
            color="dark"
            title={title}
            disabled={disabled}
          />
        ) : (
          <DefaultButton
            className="TableButtonCol__button"
            color="dark"
            title={title}
            disabled={disabled}
          />
        )}
      </Link>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={false}>{`
        .TableButtonCol__buttonText {
          color: ${currentTheme.textDarkBlue.hex};
        }
        .ButtonLink .TableButtonCol__button {
          background: ${currentTheme.nereusYellow.hex};
          color: ${currentTheme.maxBlack.hex} !important;
        }
        .NoButtonLink .TableButtonCol__button {
          background: ${currentTheme.btnGrey.hex};
          color: ${currentTheme.maxWhite.hex} !important;
        }
      `}</style>
    </TableCol>
  );
}
