import { MessageDescriptor } from 'react-intl';
import {
  moreMenuExtraItems,
  moreMenuItems,
  moreMenuMobileOnlyItems,
  stakeConfig,
} from '../../../ui-config';
import { MarketDataType } from '../../../helpers/config/types';

import messages from './messages';

export interface Navigation {
  link: string;
  title: MessageDescriptor;
  hiddenWithoutWallet?: boolean;
  absolute?: boolean;
  onClick?: () => void;
  isVisible?: (data: MarketDataType) => boolean | undefined;
}

const navigation: Navigation[] = [
  {
    link: '/markets',
    title: messages.markets,
  },
  {
    link: '/dashboard',
    title: messages.dashboard,
  },
  {
    link: '/deposit',
    title: messages.deposit,
  },
  {
    link: '/borrow',
    title: messages.borrow,
  },
  {
    link: '/staking',
    title: messages.stake,
  },
  {
    link: '/manageWXT',
    title: messages.manageWXT,
    isVisible: () => !!stakeConfig,
  },
];

export const moreNavigation: Navigation[] = [...moreMenuItems, ...moreMenuExtraItems];

export const mobileNavigation: Navigation[] = [
  ...navigation,
  ...moreMenuItems,
  ...moreMenuMobileOnlyItems,
];

export default navigation;
