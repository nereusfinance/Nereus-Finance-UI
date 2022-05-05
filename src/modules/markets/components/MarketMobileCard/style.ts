import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .MarketMobileCard {
    &__topRows {
      .Row {
        margin-top: 16px;

        .Row__title {
          font-size: $regular;
        }
      }

      .TokenIcon__dollar {
        color: #8a8a8a;
      }
    }

    &__button-inner,
    &__isFreezed--inner {
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      width: 100%;
    }

    &__cards {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 12px;
    }

    &__card {
      color: #8a8a8a;
      &--title-deposit {
        font-size: $medium;
        margin: 2px;
        padding: 0;
        font-weight: 600;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        span {
          font-weight: 400;
          font-size: $small;
          margin-left: 5px;
        }
      }
      &--title-borrow {
        font-size: $medium;
        margin: 2px;
        padding: 0;
        font-weight: 600;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        span {
          font-weight: 400;
          font-size: $small;
          margin-left: 5px;
        }
      }

      .LiquidityMiningCard__noData {
        display: none;
      }
    }
    .LiquidityMiningCard {
      padding-top: 4px;
      &__left {
        padding: 4;
      }
    }

    .LiquidityMiningAPYLine {
      margin-top: 12px;
      padding: 4px;
    }
  }
`;

export default staticStyles;
