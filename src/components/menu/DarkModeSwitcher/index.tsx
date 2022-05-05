import React from 'react';
import { useIntl } from 'react-intl';
import { useThemeContext, ThemeNames } from '@aave/aave-ui-kit';

import SwitcherWrapper from '../SwitcherWrapper';

import messages from './messages';

export default function DarkModeSwitcher() {
  const intl = useIntl();
  const { isCurrentThemeDark, changeTheme } = useThemeContext();

  return (
    <SwitcherWrapper
      title={intl.formatMessage(messages.darkMode)}
      value={isCurrentThemeDark}
      leftOption={intl.formatMessage(messages.on)}
      rightOption={intl.formatMessage(messages.off)}
      onToggle={() =>
        isCurrentThemeDark ? changeTheme(ThemeNames.light) : changeTheme(ThemeNames.default)
      }
      labelUppercase={true}
    />
  );
}
