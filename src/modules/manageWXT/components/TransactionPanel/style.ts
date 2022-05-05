import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .TransactionPanel {
    .TransactionPanelCollateralUsageWrapper {
      margin-bottom: 24px;
    }

    .InputRow {
      display: flex;
      align-items: center;
      @include respond-to(sm) {
        flex-direction: column;
      }

      .TransactionActionBtn {
        height: 32px;
        margin-left: 16px;
        @include respond-to(sm) {
          margin-left: 0;
          margin-top: 20px;
          width: 100%;
          height: 48px;
        }
      }

      .TransactionAmountField {
        .AmountField__wrapper {
          padding: 12px;
          input,
          button {
            padding: 0;
            font-weight: 400;
            font-size: 14px;
            line-heigth: 20px;
          }
          @include respond-to(sm) {
            width: 100%;
          }
        }
      }
    }

    .AmountPanel {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-radius: 4px;
      border-width: 1px;
      border-style: solid;
      padding: 18px 12px;
      cursor: pointer;

      .AmountPanelTitle {
        font-size: 14px;
        line-height: 20px;
      }

      .AmountPanelValue {
        display: flex;
        align-items: center;

        img {
          margin-right: 4px;
          width: 16px;
          heigth: 16px;
        }

        .AmountSpan {
          font-weight: 700;
          font-size: 14px;
          line-height: 20px;
        }
        .SymbolSpan {
          font-size: 16px;
          line-height: 24px;
          margin-top: 2px;
          margin-left: 4px;
        }
      }
    }
  }
  @media (max-width: 360px) {
    .AmountField__wrapper {
      width: 96% !important;
    }
  }
`;

export default staticStyles;
