import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .ClaimCard {
    margin-bottom: 16px;
    .ClaimCardRow {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding: 15px 32px 15px 24px;
      @include respond-to(sm) {
        flex-direction: column;
        align-items: flex-start;
        line-height: 20px;
        .ClaimWXTMobile {
          width: 100%;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
        }
      }

      .ClaimCardRowTitle {
        font-size: 16px;
        line-heigth: 20px;
      }
      .ClaimCardRowDescr {
        font-size: 12px;
        line-heigth: 14px;
        margin-top: 2px;
        @include respond-to(sm) {
          padding-bottom: 10px;
        }
      }
    }

    .ClaimCardRowFlexWrapper {
      display: flex;
      flex: 0.33;
      &__center {
        justify-content: center;
        .FormattedValue {
          justify-content: center;
        }
      }
      &__end {
        justify-content: end;
      }
    }

    .BtnDiv {
      display: flex;
      flex-direction: row;
      > :last-child {
        margin-left: 8px;
        @include respond-to(sm) {
          margin-left: 0;
        }
      }
    }
  }
`;

export default staticStyles;
