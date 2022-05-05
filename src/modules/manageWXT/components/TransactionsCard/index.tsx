import React from 'react';
import { useThemeContext } from '@aave/aave-ui-kit';
import staticStyles from './style';
import TransactionPanel from '../TransactionPanel';
import { divideIntegerWithComa } from '../../../../libs/utils/bigFloatToFixed';

export default function TransactionsCard({
  title,
  imgSrc,
  description,
  description2,
  APR,
  isLock = false,
}: {
  title: string;
  imgSrc: any;
  description: string;
  description2?: string;
  APR: number;
  isLock?: boolean;
}) {
  const { currentTheme } = useThemeContext();

  return (
    <>
      <div className="TransactionsCard">
        <div className="TransactionsCardTitle">
          <div className="TransactionsCardTitle__left">
            <img alt="" src={imgSrc} />
            <p>{title}</p>
          </div>
          <div className="TransactionsCardTitle__right">
            <span className="TransactionsCardTitleTextSecondary">{'APR'}</span>
            <span className="TransactionsCardTitleTextPrimary">{`${divideIntegerWithComa(
              APR,
              2
            )}%`}</span>
          </div>
        </div>
        <div className="TransactionsCardContent">
          <p className="TransactionsCardDescr">{description}</p>
          {description2 ? <p className="TransactionsCardDescr">{description2}</p> : null}
          <TransactionPanel isLock={isLock} />
        </div>
      </div>
      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .TransactionsCard {
          background: ${currentTheme.whiteElement.hex};

          .TransactionsCardTitle {
            border-bottom: 1px solid ${currentTheme.mainBg.hex};
          }

          .TransactionsCardTitle__left,
          .TransactionsCardDescr {
            color: ${currentTheme.maxWhite.hex};
          }

          .TransactionsCardTitle__right {
            border: 1px solid ${currentTheme.nereusYellow.hex};
          }

          .TransactionsCardTitleTextSecondary {
            color: ${currentTheme.lightGray.hex};
          }

          .TransactionsCardTitleTextPrimary {
            color: ${currentTheme.nereusYellow.hex};
          }
        }
      `}</style>
    </>
  );
}
