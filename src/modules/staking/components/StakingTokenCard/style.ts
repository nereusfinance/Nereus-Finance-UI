import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .StakingTokenCard {
    width: auto;
    justify-self: center;
    align-self: center;
    .SubValueBlock {
      display: flex;
      margin-bottom: 16px;
      justify-content: right;
      .USD {
        font-size: 12px;
        color: grey;
      }
    }

    &__title {
      font-style: normal;
      font-weight: 400;
      font-size: 20px;
      line-height: 26px;
      color: #ffffff;
      padding-bottom: 12px;
    }

    &__row {
      display: flex;
      justify-content: space-between;
      width: 100%;
      padding-top: 20px;

      &-title {
        width: 136px;
        color: #ffffff;
      }

      &-value {
        text-align: right;
        font-weight: 400;
        font-size: 16px;
        line-height: 24px;
        color: #ffffff;
      }
    }
  }

  .StakeButton {
    width: auto;
    margin: 16px 0;
  }

  .UnstakeTokenBlock {
    border: 1px solid #606060;
    box-sizing: border-box;
    border-radius: 4px;
    margin-top: 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 24px 0;

    &__title {
      font-weight: 400;
      font-size: 16px;
      line-height: 24px;
      color: #ffffff;
    }

    &__value {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 12px 0 16px;

      &-token {
        display: flex;
        align-items: center;

        p {
          font-weight: 400;
          font-size: 24px;
          line-height: 28px;
          padding-left: 5px;
          color: #ffffff;
        }
      }

      &-subValue {
        font-weight: 400;
        font-size: 14px;
        line-height: 20px;
        color: #8a8a8a;
      }
    }
  }

  .CurrencyLogo {
    display: flex;
    flex-direction: row;
    align-items: center;

    img {
      width: 16px;
      height: 16px;
    }

    .PrimaryLogo {
      z-index: 1;
    }

    .SecondaryLogo {
      margin-left: -8px;
    }
  }
`;

export default staticStyles;
