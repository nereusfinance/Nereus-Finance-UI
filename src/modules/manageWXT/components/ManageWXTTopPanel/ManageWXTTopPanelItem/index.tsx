import React, { ReactNode } from 'react';
import staticStyles from './style';

export default function ManageWXTTopPanelItem({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="ManageWXTTopPanelItem">{children}</div>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
    </>
  );
}
