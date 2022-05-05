import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .TxConfirmationPanel {
    .AmountPanel {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-radius: 4px;
      border-width: 1px;
      border-style: solid;
      padding: 18px 12px;
      cursor: pointer;
      margin-bottom: 8px;

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

    .ActionsPanel {
      border-radius: 4px;
      border-width: 1px;
      border-style: solid;

      .ActionsPanelBodyWrapper {
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;

        .ActionsPanelBody {
          padding: 16px 12px 16px;
          display: flex;
          flex-direction: row;
          align-items: center;
          font-size: 16px;
          line-heigth: 20px;

          &__between {
            justify-content: space-between;
          }

          .ActionsPanelBodyTitle {
            font-size: 12px;
            line-height: 16px;
          }

          .ActionsPanelBodyDescription {
            font-size: 14px;
            line-height: 20px;
            margin-top: 2px;
          }

          .ActionsPanelCancelBtn {
            margin-right: 8px;
          }
        }

        .ActionsPanelTxList {
          border-bottom-left-radius: 4px;
          border-bottom-right-radius: 4px;

          .ActionsPanelTxListItem {
            display: flex;
            justify-content: space-between;
            font-size: 10px;
            line-height: 16px;
            padding: 8px 12px 9px;
            border-top-width: 1px;
            border-top-style: solid;

            * {
              flex: 0.33;
            }

            .ActionsPanelTxListItemStatus {
              display: flex;
              align-items: center;
              justify-content: center;

              .ActionsPanelTxListItemStatusImg {
                width: 8px;
                height: 8px;
                margin-left: 8px;
              }

              .ActionsPanelTxListItemStatusLoader {
                margin-left: 14px;
                margin-top: 4px;
                width: 14px;
                height: 14px;
              }
            }

            .ActionsPanelTxListItemExplorer {
              display: flex;
              align-items: center;
              justify-content: end;

              img {
                margin-left: 10px;
                width: 14px;
                heigth: 14px;
              }
            }
          }
        }
      }
    }
  }
`;

export default staticStyles;
