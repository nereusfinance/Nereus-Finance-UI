import React, { ReactNode, useEffect } from 'react';
import { useIntl } from 'react-intl';
import { useHeaderTitle } from '../../../../components/wrappers/ScreensWrapper';

import ScreenWrapper from '../../../../components/wrappers/ScreenWrapper';

import messages from './messages';
import staticStyles from './style';

type DashboardWrapperProps = {
  children: ReactNode;
};

export default function DashboardWrapper({ children }: DashboardWrapperProps) {
  const intl = useIntl();
  const { setTitle } = useHeaderTitle();
  useEffect(() => setTitle(intl.formatMessage(messages.pageTitle)), []);

  return (
    <ScreenWrapper
      pageTitle={intl.formatMessage(messages.pageTitle)}
      className="DashboardWrapper"
      withMobileGrayBg={true}
    >
      <div className="DashboardWrapper__content">{children}</div>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
    </ScreenWrapper>
  );
}
