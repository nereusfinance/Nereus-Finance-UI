import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .FeesCard {
    .FeesCardTitle {
      display: flex;
      font-size: 16px;
      line-height: 24px;
      padding: 16px 32px 0px 24px;

      .FeesCardTitleItem {
        :last-of-type {
          margin-left: 24px;
        }

        &__inner {
          padding-bottom: 11px;
          border-bottom-width: 1px;
          border-bottom-style: solid;
        }
      }
    }
    .Placeholder {
      height: 38px;
    }

    .FeesCardContent {
      padding: 16px 32px 16px 24px;
      @include respond-to(sm) {
        padding: 10px 16px;
      }

      .FeesCardTable {
        display: flex;
        flex-direction: row;
        @include respond-to(sm) {
          width: 100%;
        }
      }

      .FeesCardTableCol {
        .TokenIcon__name {
          @include respond-to(sm) {
            font-size: $regular;
          }
        }
        &__1 {
          flex: 0.25;
          img {
            width: 16px;
            height: 16px;
            margin-right: 16px;
          }
        }
        &__2 {
          flex: 0.25;
        }
        &__3 {
          flex: 0.25;
        }
        &__4 {
          flex: 0.25;
        }
      }
      @include respond-to(sm) {
        .FeesCardTableCol {
          &__1 {
            flex: 0.33;
          }
          &__2 {
            flex: 0.33;
          }
          &__3 {
            flex: 0.33;
          }
        }
      }
      .FeesCardTableCol__Mobile {
        display: flex;
        justify-content: center;
      }

      .FeesCardTableHeader {
        font-size: 12px;
        line-height: 16px;
        margin-bottom: 22px;

        &__center {
          text-align: center;
        }
      }

      .FeesCardTableItem {
        height: 56px;
        display: flex;
        align-items: center;

        &__end {
          justify-content: end;
        }
        &__center {
          justify-content: center;
        }
      }

      .FeesCardTableItemToken {
        display: flex;
        flex-direction: row;
        align-items: center;
      }

      .FeesCardTotal {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        margin-top: 28px;
        @include respond-to(sm) {
          justify-content: left;
          margin: 18px 0;
        }

        .FeesCardTotal__left {
          font-size: 16px;
          line-height: 24px;
          display: flex;
          flex-direction: row;

          span :nth-child(2) {
            margin: 0px 8px;
            font-weight: 700;
          }
        }
      }

      .claimBtn {
        height: 28px;
      }
      .claimAllBtn {
        @include respond-to(sm) {
          width: 296px;
          height: 48px;
        }
      }
    }
  }
`;

export default staticStyles;
