import React from 'react';

import TableCol from '../TableCol';
import Value from '../../../../../components/basic/Value';

import staticStyles from './style';

interface TableValueColProps {
  value: number;
  subValue?: number;
  tooltipId?: string;
}

export default function TableValueCol({ value, subValue, tooltipId }: TableValueColProps) {
  return (
    <TableCol>
      <Value
        value={value}
        subValue={subValue}
        subSymbol="USD"
        maximumValueDecimals={6}
        minimumValueDecimals={6}
        minimumSubValueDecimals={6}
        maximumSubValueDecimals={6}
        tooltipId={tooltipId}
        className="TableValueCol__value"
      />

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
    </TableCol>
  );
}
