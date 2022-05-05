import React from 'react';
import { IntlShape } from 'react-intl/src/types';
import { SocialIcon, SocialType } from '@aave/aave-ui-kit';

import FormattedTxErrorTextUI from './FormattedTxErrorText';
import TopDisclaimerUI from './TopDisclaimer';
import LegalBanner from './LegalBanner';
import {
  DashboardLeftTopLine as DashboardLeftTopLineUI,
  DashboardLeftTopLineProps,
} from './DashboardLeftTopLine';
import { UnlockWalletExtraText as UnlockWalletExtraTextUI } from './UnlockWalletExtraText';

import logo from './images/aaveLogo.svg';

export const LOGO = logo;

export const socialIcons: SocialIcon[] = [
  {
    url: 'https://medium.com/nereus-protocol',
    type: SocialType.Medium,
  },
  {
    url: 'https://discord.gg/4tw3VsuTf9',
    type: SocialType.Discord,
  },
  {
    url: 'https://twitter.com/nereusfinance',
    type: SocialType.Twitter,
  },
];

export const TopDisclaimer: React.FC = TopDisclaimerUI;
export const BottomDisclaimer: React.FC = LegalBanner;
export const FormattedTxErrorText: React.FC = FormattedTxErrorTextUI;

export const DashboardLeftTopLine: React.FC<DashboardLeftTopLineProps> = DashboardLeftTopLineUI;

export const UnlockWalletExtraText: React.FC<{ intl: IntlShape }> = UnlockWalletExtraTextUI;
