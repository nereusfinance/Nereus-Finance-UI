import React from 'react';
import { ChainId } from '@aave/contract-helpers';

import TxConfirmationView, {
  TxConfirmationViewProps,
} from '../../../../components/TxConfirmationView';
import { useStakeDataContext } from '../../../../libs/pool-data-provider/hooks/use-stake-data-context';

type StakeTxConfirmationViewProps = Omit<TxConfirmationViewProps, 'txChainId' | 'allowedChainIds'>;

function StakeTxConfirmationView({ onMainTxConfirmed, ...props }: StakeTxConfirmationViewProps) {
  const { stakeConfig } = useStakeDataContext();

  const handleMainTxConfirmed = () => {
    if (typeof onMainTxConfirmed === 'function') {
      onMainTxConfirmed();
    }
  };
  return (
    <TxConfirmationView
      {...props}
      txChainId={stakeConfig.chainId}
      allowedChainIds={[ChainId.mainnet, ChainId.kovan]}
      onMainTxConfirmed={handleMainTxConfirmed}
    />
  );
}

export default StakeTxConfirmationView;
