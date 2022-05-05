import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .MobileCardWrapper {
    height: 320px;
  }
  .DashboardEarnRewardsPanel {
    margin-bottom: 16px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 20px 32px 10px 24px;
    border-radius: 4px;
    .CurrencyLogo {
      @include respond-to(sm) {
        height: 70px;
      }
    }
    @include respond-to(sm) {
      margin-left: 10px;
      margin-right: 10px;
      flex-direction: column;
      align-items: stretch;
      padding: 4px;
    }
    .CurrencyLogo-mobile {
      @include respond-to(sm) {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
      }
    }
    .West-button-mobile {
      @include respond-to(sm) {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
    }

    .TableValueCol__value {
      align-items: flex-end;
      .Value__subValue--line {
        margin-bottom: 2px;
      }
      .SubValue {
        font-size: 12px;
        line-height: 18px;
      }
    }

    .Value__value {
      font-size: 16px;
      line-height: 24px;
      font-weight: 400;
    }

    .CurrencyLogo {
      display: flex;
      flex-direction: row;
      align-items: center;
      img {
        width: 24px;
        height: 24px;
      }
      p {
        font-size: 16px;
        line-height: 24px;
        margin-left: 16px;
      }
    }
    .APYWrapper {
      display: flex;
      flex-direction: column;
      &__inner {
        width: fit-content;
        display: flex;
        flex-direction: row;
        justify-content: end;
        align-items: center;
        align-self: end;
        padding: 4px;
        border-radius: 100px;
        img {
          width: 16px;
          height: 16px;
          margin-right: 4px;
        }
        p {
          font-size: 12px;
          line-height: 16px;
        }
        .APYText {
          margin-right: 4px;
        }
      }
    }

    .westBtn {
      font-size: 16px;
      line-height: 20px;
      border-radius: 100px;
      padding: 6px 16px;
      @include respond-to(sm) {
        width: 300px;
        height: 48px;
        margin-top: 15px;
      }
    }
  }
`;

export default staticStyles;
