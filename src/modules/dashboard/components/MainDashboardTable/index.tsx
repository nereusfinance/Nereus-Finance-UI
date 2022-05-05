import React from 'react';
import { useIntl } from 'react-intl';
import classNames from 'classnames';

import NoDataPanel from '../../../../components/NoDataPanel';
import ContentWrapper from '../../../../components/wrappers/ContentWrapper';
import BorrowDashboardTable from '../../../borrow/components/BorrowDashboardTable';
import { BorrowTableItem } from '../../../borrow/components/BorrowDashboardTable/types';
import DepositDashboardTable from '../../../deposit/components/DepositDashboardTable';
import { DepositTableItem } from '../../../deposit/components/DepositDashboardTable/types';

import messages from './messages';
import staticStyles from './style';
import { useThemeContext } from '@aave/aave-ui-kit';

interface MainDashboardTableProps {
  depositedPositions: DepositTableItem[];
  borrowedPositions: BorrowTableItem[];
  isBorrow: boolean;
}

export default function MainDashboardTable({
  depositedPositions,
  borrowedPositions,
  isBorrow,
}: MainDashboardTableProps) {
  const intl = useIntl();
  const { currentTheme } = useThemeContext();

  return (
    <div
      className={classNames('MainDashboardTable', {
        MainDashboardTable__onlyOne: isBorrow,
        MainDashboardTable__noBorrows: !borrowedPositions.length,
      })}
    >
      <div className="MainDashboardTable__left-inner">
        {!!depositedPositions.length && <DepositDashboardTable listData={depositedPositions} />}
      </div>

      <div className="MainDashboardTable__right-inner">
        {!!borrowedPositions.length ? (
          <BorrowDashboardTable listData={borrowedPositions} />
        ) : (
          <ContentWrapper withFullHeight={true}>
            <NoDataPanel
              title={intl.formatMessage(messages.nothingBorrowed)}
              description={intl.formatMessage(messages.nothingBorrowedDescription)}
              buttonTitle={intl.formatMessage(messages.borrowNow)}
              linkTo="/borrow"
              className="nothing-borrowed-panel"
            />
          </ContentWrapper>
        )}
      </div>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .MainDashboardTable {
          .TableHeader {
            background: ${currentTheme.whiteElement.hex};
            border-bottom: 1px solid ${currentTheme.mainBg.hex};
          }
          .nothing-borrowed-panel {
            .Caption {
              &__description {
                color: ${currentTheme.maxWhite.hex};
              }
            }

            button {
              background: ${currentTheme.nereusYellow.hex};
              span {
                color: ${currentTheme.maxBlack.hex};
              }
            }
          }
        }
      `}</style>
    </div>
  );
}
