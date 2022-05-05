import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .VestsCard {
    margin-bottom: 16px;

    .VestsCardTitle {
      font-size: 16px;
      line-height: 24px;
      padding: 16px 32px 16px 24px;
    }

    .VestsCardContent {
      padding: 16px 32px 16px 24px;

      .VestsCardTable {
        display: flex;
        flex-direction: row;
      }

      .VestsCardTableCol {
        &__left {
          flex: 0.4;
        }
        &__right {
          flex: 0.6;
        }
      }

      .VestsCardTableHeader {
        font-size: 12px;
        line-height: 16px;
        margin-bottom: 22px;
      }

      .VestsCardTableItem {
        height: 22px;
        margin-bottom: 36px;
      }

      .VestsCardTableItemAmount {
        display: flex;
        flex-direction: row;

        img {
          margin-right: 16px;
          width: 22px;
          height: 22px;
        }
      }

      .VestsCardTotal {
        font-size: 16px;
        line-height: 24px;
        display: flex;
        flex-direction: row;

        span {
          margin: 0px 8px;
          font-weight: 700;
        }

        :last-of-type {
          margin-top: 16px;
        }
      }
    }
  }
`;

export default staticStyles;
