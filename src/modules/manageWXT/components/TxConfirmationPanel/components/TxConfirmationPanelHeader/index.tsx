import React from 'react';
import { useThemeContext } from '@aave/aave-ui-kit';
import staticStyles from './style';
import classNames from 'classnames';

export default function TxConfirmationPanelHeader({
  tabTitles,
  allCompleted,
  activeIndex,
}: {
  tabTitles: string[];
  allCompleted: boolean;
  activeIndex: number;
}) {
  const { currentTheme } = useThemeContext();
  const flex = 1 / tabTitles.length;

  return (
    <>
      <div className="ActionsPanelHeader">
        {tabTitles.map((el, ind) => (
          <>
            <div
              key={ind + el.toString()}
              className={classNames({
                ActionsPanelHeaderItem: true,
                ActionsPanelHeaderItem__active: !allCompleted && activeIndex === ind,
                ActionsPanelHeaderItem__completed: allCompleted || activeIndex > ind,
              })}
              style={{ flex: flex }}
            >
              <div>{el}</div>
              <div className="line"></div>
            </div>
          </>
        ))}
      </div>
      <style jsx={true} global={false}>{`
        .ActionsPanelHeader {
          background: ${currentTheme.whiteElement.hex};

          .ActionsPanelHeaderItem {
            color: ${currentTheme.lightGray.hex};

            &__active {
              background: ${currentTheme.whiteElement.hex};
              color: ${currentTheme.maxWhite.hex};
            }
            &__completed {
              background: ${currentTheme.whiteElement.hex};
              color: ${currentTheme.maxWhite.hex};
            }
          }
        }
      `}</style>
      <style jsx={true} global={false}>
        {staticStyles}
      </style>
    </>
  );
}
