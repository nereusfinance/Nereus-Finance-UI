import React, { ReactNode, useContext } from 'react';
import { useIntl } from 'react-intl';

import BasicTable from '../../../../components/BasicTable';
import TableColumn from '../../../../components/BasicTable/TableColumn';
import TableHeaderButton from '../../../../components/BasicTable/TableHeaderButton';
import { switchAPRContext } from '../../screens/Markets';

import messages from './messages';
import staticStyles from './style';
import { useThemeContext } from '@aave/aave-ui-kit';

interface MarketTableProps {
  sortName: string;
  setSortName: (value: string) => void;
  sortDesc: boolean;
  setSortDesc: (value: boolean) => void;
  children: ReactNode;
}

export default function MarketTable({
  sortName,
  setSortName,
  sortDesc,
  setSortDesc,
  children,
}: MarketTableProps) {
  const intl = useIntl();
  const { currentTheme } = useThemeContext();
  const showTotal = useContext(switchAPRContext);
  const columns = [
    {
      title: messages.assets,
      sortKey: 'currencySymbol',
    },
    {
      title: messages.marketSize,
      sortKey: 'totalLiquidity',
    },
    {
      title: messages.totalBorrowed,
      sortKey: 'totalBorrows',
    },
    {
      title: showTotal ? messages.depositAPYTotal : messages.depositAPY,
      sortKey: 'depositAPY',
    },
    {
      title: showTotal ? messages.borrowAPYTotal : messages.borrowAPY,
      sortKey: 'variableBorrowRate',
    },
  ];

  return (
    <BasicTable
      className="MarketTable"
      headerColumns={
        <React.Fragment>
          {columns.map((column, index) => (
            <TableColumn className="MarketTable__header-column" key={index}>
              <TableHeaderButton
                sortName={sortName}
                sortDesc={sortDesc}
                setSortName={setSortName}
                setSortDesc={setSortDesc}
                sortKey={column.sortKey}
                withSorting={true}
                title={intl.formatMessage(column.title)}
                size="small"
              />
            </TableColumn>
          ))}
        </React.Fragment>
      }
    >
      {children}

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .MarketTable__header-column {
          background-color: ${currentTheme.whiteElement.hex};
        }
      `}</style>
    </BasicTable>
  );
}
