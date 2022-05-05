import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .DashboardStakePanel {
    widrh: 100%;
    margin-bottom: 16px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    padding: 20px 32px 10px 24px;
    border-radius: 4px;
    @include respond-to(sm) {
      margin-left: 10px;
      margin-right: 10px;
      flex-direction: column;
      padding: 4px;
    }

    .TableValueCol__value {
      align-items: flex-end;
      .Value__subValue--line {
        margin-top: 0px;
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

    .APRString {
      white-space: nowrap;
    }

    .CurrencyLogo {
      display: flex;
      flex-direction: row;
      align-items: center;
      img {
        width: 32px;
        height: 32px;
      }
      p {
        font-size: 16px;
        line-height: 24px;
        margin-left: 16px;
      }
      .PrimaryLogo {
        z-index: 1;
      }
      .SecondaryLogo {
        margin-left: -20px;
      }
    }

    .APRString {
      font-size: 16px;
      line-height: 24px;
    }
  }
`;

export default staticStyles;
