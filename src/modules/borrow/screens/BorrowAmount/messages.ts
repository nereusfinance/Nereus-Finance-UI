import { defineMessages } from 'react-intl';

export default defineMessages({
  title: 'How much would you like to borrow?',
  description:
    'Please enter an amount you would like to borrow. The maximum amount you can borrow is shown below.',
  amountTitle: 'Available to borrow',

  noDataTitle: 'No deposits found for your address',
  noDataDescription:
    'We could not detect a deposit from your address. Make your first time deposit now.',
  noLiquidityAvailableTitle: 'No liquidity',
  noLiquidityAvailableDescription: 'There is no {symbol} available liquidity to borrow.',
  healthFactorTooLowTitle: 'Health factor too low',
  healthFactorTooLowDescription:
    'Deposit more collateral or repay part of your borrowings to increase your health factor and be able to borrow.',
  noDataButtonTitle: 'Deposit now',

  connectWallet: 'Please connect your wallet',
  connectWalletDescription:
    'To see your deposited / borrowed assets, you need to connect your wallet.',
});
