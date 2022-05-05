import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .MainDashboardTable {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 10px;
    flex: 1;
    .MobileCardWrapper {
      height: 320px;
    }
    @include respond-to(lg) {
      flex-direction: column;
      justify-content: flex-start;
      display: block;
    }

    &__left-inner,
    &__right-inner {
      width: calc(50% - 10px);
      display: flex;
      align-self: stretch;
      flex-direction: column;
      @include respond-to(lg) {
        width: 100%;
        flex: none;
        min-height: auto;
        display: block;
        margin-left: auto;
        margin-right: auto;
      }
      @include respond-to(sm) {
        flex: 1;
      }
    }

    &__left-inner {
      @include respond-to(lg) {
        margin-bottom: 20px;
      }
      @include respond-to(md) {
        margin-bottom: 30px;
      }
    }

    &__right-inner {
      @include respond-to(sm) {
        display: none;
      }
    }

    &__onlyOne {
      @include respond-to(sm) {
        .MainDashboardTable__left-inner {
          display: none;
        }
        .MainDashboardTable__right-inner {
          display: flex;
        }
      }
    }

    &__noBorrows {
      .MainDashboardTable__left-inner {
        width: 100%;
        margin-right: 16px;
      }
      .MainDashboardTable__right-inner {
        max-width: 240px;
      }
      .ContentWrapper {
        margin: 0px 0 0;
        @include respond-to(sm) {
          padding: 0 10px;
        }
      }
    }

    .TableHeader {
      padding: 20px 24px 15px;
      &__inner {
        margin: 0;
      }
      &__item {
        justify-content: center;
        p {
          font-size: 12px;
          font-weight: 400;
          line-height: 16px;
        }
      }
    }

    .TableItem {
      margin-bottom: 1px;
      .Value__value {
        font-weight: 400;
      }
      .ValuePercent__value {
        font-weight: 400;
      }
    }

    .nothing-borrowed-panel {
      align-items: center;
      padding: 4px 16px;
      border-radius: 4px;
      @include respond-to(sm) {
        display: contents;
        text-align: start;
        padding: 1px;
      }
      .Caption {
        text-align: center;
        h2 {
          font-size: 16px;
          line-height: 24px;
          font-weight: 700;
          justify-content: center;
        }
      }

      button {
        padding: 6px 16px;
        border-radius: 100px;
        border: none;
        pointer-events: none;
        span {
          font-size: 14px;
          line-height: 20px;
          font-weight: 400;
        }
      }
    }
  }

  @media (max-height: 750px) and (max-width: 1200px) {
    .MainDashboardTable {
      display: block;
    }
  }
`;

export default staticStyles;
