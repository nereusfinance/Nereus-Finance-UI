import { useHistory } from 'react-router-dom';
import { useContext } from 'react';
import { switchAPRContext } from '../../screens/Markets';
import TableItemWrapper from '../../../../components/BasicTable/TableItemWrapper';
import TableColumn from '../../../../components/BasicTable/TableColumn';
import Value from '../../../../components/basic/Value';
import FreezedWarning from '../../../../components/FreezedWarning';
import NoData from '../../../../components/basic/NoData';
import LiquidityMiningCard from '../../../../components/liquidityMining/LiquidityMiningCard';
import { getAssetInfo, TokenIcon } from '../../../../helpers/config/assets-config';

import staticStyles from './style';

export interface MarketTableItemProps {
  id: string;
  underlyingAsset: string;
  currencySymbol: string;
  totalLiquidity: number;
  totalLiquidityInUSD: number;
  totalBorrows: number;
  totalBorrowsInUSD: number;
  depositAPY: number;
  aincentivesAPR?: string;
  vincentivesAPR?: string;
  sincentivesAPR?: string;
  avg30DaysLiquidityRate: number;
  stableBorrowRate: number;
  variableBorrowRate: number;
  avg30DaysVariableRate: number;
  borrowingEnabled?: boolean;
  stableBorrowRateEnabled?: boolean;
  isFreezed?: boolean;
  isPriceInUSD?: boolean;
}

export default function MarketTableItem({
  id,
  underlyingAsset,
  currencySymbol,
  totalLiquidity,
  totalLiquidityInUSD,
  totalBorrows,
  totalBorrowsInUSD,
  depositAPY,
  aincentivesAPR,
  vincentivesAPR,
  avg30DaysLiquidityRate,
  variableBorrowRate,
  avg30DaysVariableRate,
  borrowingEnabled,
  isFreezed,
  isPriceInUSD,
}: MarketTableItemProps) {
  const history = useHistory();

  const asset = getAssetInfo(currencySymbol);
  const showTotal = useContext(switchAPRContext);
  const depositAPR = Number(aincentivesAPR);
  const BorrowAPR = Number(vincentivesAPR);

  const handleClick = () => {
    history.push(`/reserve-overview/${underlyingAsset}-${id}`);
  };

  return (
    <TableItemWrapper onClick={handleClick} className="MarketTableItem" withGoToTop={true}>
      <TableColumn className="MarketTableItem__column">
        <TokenIcon
          tokenSymbol={currencySymbol}
          height={35}
          width={35}
          tokenFullName={asset.name}
          className="MarketTableItem__token"
        />
      </TableColumn>
      <TableColumn className="MarketTableItem__column">
        <Value
          value={isPriceInUSD ? totalLiquidityInUSD : totalLiquidity}
          compact={true}
          color="white"
          maximumValueDecimals={2}
          withoutSymbol={true}
          tooltipId={`market-size-${asset.symbol}`}
          symbol={isPriceInUSD ? 'USD' : ''}
          tokenIcon={isPriceInUSD}
          className="MarketTableItem__value"
        />
      </TableColumn>
      <TableColumn className="MarketTableItem__column">
        {borrowingEnabled ? (
          <Value
            value={isPriceInUSD ? totalBorrowsInUSD : totalBorrows}
            compact={true}
            color="white"
            maximumValueDecimals={2}
            className="MarketTableItem__value"
            withoutSymbol={true}
            symbol={isPriceInUSD ? 'USD' : ''}
            tokenIcon={isPriceInUSD}
            tooltipId={`borrows-size-${asset.symbol}`}
          />
        ) : (
          <NoData color="dark" />
        )}
      </TableColumn>

      {!isFreezed && (
        <>
          <TableColumn className="MarketTableItem__column">
            <LiquidityMiningCard
              topPercentColor="gray"
              value={showTotal ? depositAPY + depositAPR : depositAPY}
              thirtyDaysValue={avg30DaysLiquidityRate}
              liquidityMiningValue={showTotal ? 0 : aincentivesAPR}
              symbol={currencySymbol}
              type="deposit"
            />
          </TableColumn>

          <TableColumn className="MarketTableItem__column">
            {borrowingEnabled && +variableBorrowRate >= 0 ? (
              <LiquidityMiningCard
                topPercentColor="gray"
                value={showTotal ? -variableBorrowRate + BorrowAPR : -variableBorrowRate}
                thirtyDaysValue={avg30DaysVariableRate}
                liquidityMiningValue={showTotal ? 0 : vincentivesAPR}
                symbol={currencySymbol}
                type="borrow-variable"
              />
            ) : (
              <NoData color="dark" />
            )}
          </TableColumn>
        </>
      )}

      {isFreezed && (
        <>
          <div />
          <div className="MarketTableItem__isFreezed-inner">
            <FreezedWarning symbol={currencySymbol} />
          </div>
        </>
      )}

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
    </TableItemWrapper>
  );
}
