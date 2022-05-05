import React from 'react';

import TableItem from '../../../../components/BasicAssetsTable/TableItem';
import TableColumn from '../../../../components/BasicTable/TableColumn';
import Value from '../../../../components/basic/Value';
import LiquidityMiningCard from '../../../../components/liquidityMining/LiquidityMiningCard';
import NoData from '../../../../components/basic/NoData';
import { isAssetStable } from '../../../../helpers/config/assets-config';

import { BorrowTableItem } from './types';
import { useThemeContext } from '@aave/aave-ui-kit';
import { useNereusIncentiveDataContext } from '../../../../libs/nereus-incentive-data-provider';

export default function BorrowItem({
  id,
  symbol,
  underlyingAsset,
  availableBorrows,
  availableBorrowsInUSD,
  variableBorrowRate,
  vincentivesAPR,
  avg30DaysVariableRate,
  userId,
  isFreezed,
}: BorrowTableItem) {
  const url = `/borrow/${underlyingAsset}-${id}`;
  const { currentTheme } = useThemeContext();
  const { marketsAPR } = useNereusIncentiveDataContext();
  vincentivesAPR = marketsAPR[id]?.borrow || '0';
  return (
    <TableItem
      symbol={symbol}
      url={url}
      isFreezed={isFreezed}
      isBorrow={true}
      darkOnDarkMode={true}
    >
      <TableColumn className="tableColumn">
        {!userId || Number(availableBorrows) <= 0 ? (
          <NoData color="dark" />
        ) : (
          <Value
            value={Number(availableBorrows)}
            subValue={availableBorrowsInUSD}
            subSymbol="USD"
            maximumSubValueDecimals={2}
            minimumValueDecimals={isAssetStable(symbol) ? 2 : 6}
            maximumValueDecimals={isAssetStable(symbol) ? 2 : 6}
          />
        )}
      </TableColumn>

      {!isFreezed && (
        <TableColumn>
          <LiquidityMiningCard
            value={variableBorrowRate}
            thirtyDaysValue={avg30DaysVariableRate}
            symbol={symbol}
            topPercentColor={currentTheme.lightGray.hex}
            type="borrow-variable"
            liquidityMiningValue={vincentivesAPR}
          />
        </TableColumn>
      )}
      <style jsx={true}>{`
        .tableColumn {
          margin-right: 35px;
        }
      `}</style>
    </TableItem>
  );
}
