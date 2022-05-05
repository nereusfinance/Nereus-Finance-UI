import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .DepositBorrowTopPanel {
    margin-top: -1px;
    &__topPanel {
      margin-bottom: 16px;
    }
    &__topPanelTransparent {
      background: transparent !important;
      border-radius: 0 !important;
      box-shadow: none !important;
    }

    &__topPanel-caption {
      display: flex;
      justify-content: space-between;
      p {
        width: calc(50% - 10px);
        font-size: 16px;
        line-height: 24px;
        display: flex;
        flex-direction: column;
        border-top-right-radius: $borderRadius;
        border-top-left-radius: $borderRadius;
        @include respond-to(md) {
          /*font-size: $small;*/
        }
        i {
          font-style: normal;
          display: inline-block;
          padding: 16px 32px;
        }

        &.DepositBorrowTopPanel__topPanelCaptionFull {
          width: 100%;
        }
      }
    }

    &__topPanel-info {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
    &__topPanelInfoCollapse {
      .DepositBorrowTopPanel__topPanel-inner {
        padding: 12px 32px;
      }
      .DepositBorrowTopPanel__topPanel-depositValues {
        flex-direction: row;
      }
    }
    &__topPanelNoUser {
      padding: 22px;
    }

    &__topPanel-inner {
      width: calc(50% - 10px);
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom-right-radius: $borderRadius;
      border-bottom-left-radius: $borderRadius;
      transition: $transition;
      padding: 40px 32px;
      @include respond-to(lg) {
        align-items: flex-start;
        flex-direction: column;
        padding: 20px 10px;
      }
      @include respond-to(md) {
        align-items: flex-start;
        flex-direction: column;
        padding: 20px 10px;
      }
    }

    &__topPanelInnerFull {
      width: 100% !important;
    }

    &__topPanel-values {
      display: flex;
      flex-direction: column;
      width: 100%;
      .Row {
        margin-right: 60px;
        @include respond-to(xl) {
          margin-right: 40px;
        }
      }
    }
    &__topPanelValuesCollapse {
      flex-direction: row;
    }
    &__topPanel-valuesInner {
      display: flex;
      margin-bottom: 12px;
      &:last-of-type {
        align-items: center;
      }
      .Row {
        width: 50%;
        margin-right: 0;
      }
    }
    &__topPanelValuesInnerCollapse {
      margin-bottom: 0;
      flex-wrap: wrap;
      .Row {
        width: auto;
        margin-right: 60px;
        @include respond-to(xl) {
          margin-right: 40px;
        }
      }
      &:last-of-type {
        flex: 1;
        align-items: center;
        justify-content: flex-end;
        @include respond-to(md) {
          display: none;
        }
      }
    }
    .DepositBorrowTopPanel__buttonCollapse {
      width: 120px;
      min-height: 36px;
      font-size: $medium;
      @include respond-to(xl) {
        width: 70px;
        min-height: 24px;
        font-size: $extraSmall;
      }
    }

    &__topPanel-bars {
      display: flex;
      align-items: center;
      justify-content: space-between;
      @include respond-to(md) {
        margin-top: 30px;
        width: 100%;
        max-width: 320px;
      }
      .CircleCompositionBar {
        margin-left: 16px;

        &:first-of-type {
          margin-left: 0;
        }
      }
    }

    .Row.Row__column {
      .Row__title-inner {
        text-align: left;
      }
      .Row__content,
      .Value {
        align-items: flex-start;
        justify-content: flex-start;
      }
      .Row__content {
        text-align: left;
      }
    }
    .HealthFactor__column {
      text-align: left;
      .HealthFactor__percent {
        justify-content: flex-start;
      }
      .HealthFactor__no-value {
        text-align: left;
        justify-content: flex-start;
        font-size: 24px;
        line-height: 28px;
      }
    }

    .Value__value {
      font-weight: 700;
    }

    .top-panel-value1 {
      .Value__value {
        font-size: 24px;
        line-height: 28px;
        font-weight: 400;
      }
      .TokenIcon__dollar {
        font-size: 24px;
        line-height: 28px;
        font-weight: 400;
      }
    }

    .dashboard-grey-button {
      padding: 6px 16px;
      border-radius: 100px;
      p {
        margin: 0;
        font-size: 14px;
        line-height: 20px;
      }
    }
  }
`;

export default staticStyles;
