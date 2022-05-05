import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .TransactionsCard {
    margin-bottom: 16px;

    @include respond-to(sm) {
      flex-direction: column;
      margin-bottom: 10px;
      border-radius: $borderRadius;
    }

    .TransactionsCardTitle {
      display: flex;
      flex-direction: row;
      padding: 12px 24px;
      justify-content: space-between;
      align-items: center;

      &__left {
        display: flex;
        align-items: center;

        img {
          width: 18px;
          height: 22px;
          margin-right: 15px;
        }

        p {
          font-size: 16px;
          line-height: 24px;
        }
      }

      &__right {
        padding: 6px 16px;
        border-radius: 100px;

        .TransactionsCardTitleTextSecondary {
          font-size: 12px;
          line-height: 16px;
          margin-right: 4px;
        }
        .TransactionsCardTitleTextPrimary {
          font-size: 16px;
          line-height: 20px;
          font-weight: 700;
        }
      }
    }

    .TransactionsCardContent {
      padding: 16px 24px 24px;

      .TransactionsCardDescr {
        font-size: 16px;
        line-height: 24px;
        margin-bottom: 24px;
      }
    }
  }
`;

export default staticStyles;
