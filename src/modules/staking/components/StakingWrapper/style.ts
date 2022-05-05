import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .StakingWrapper {
    margin-top: 50px !important;
    margin-bottom: 10px !important;
    @include respond-to(sm) {
      margin-top: 0 !important;
      display: block !important;
    }
    .TopPanel {
      display: flex;
      .StakingTopPanel {
        width: 75%;
      }
      .EarnedWXT {
        width: 25%;
        @include respond-to(sm) {
          width: 100%;
          .Value__value {
            font-size: 28px;
          }
          .SubValue {
            font-size: 14px !important;
          }
          .UnstakeButton {
            width: 296px;
            height: 48px;
          }
        }
      }
      @include respond-to(sm) {
        flex-direction: column;
      }
    }
    .BasicForm {
      @include respond-to(md) {
        .Caption {
          margin-left: 35px !important;
        }
      }
      @include respond-to(sm) {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .Caption {
          margin-left: 4px !important;
        }
      }
    }

    &__mobile-switcher {
      display: none;
      @include respond-to(sm) {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 24px 0 16px;
      }
    }

    &__content-inner {
      display: flex;
      flex: 1;
      gap: 16px;
      @include respond-to(sm) {
        display: block;
      }
    }

    &__content-item {
      border-radius: $borderRadius;
      box-shadow: $boxShadow;
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      flex: 1;
      padding: 20px 10px;

      @include respond-to(sm) {
        display: none;
        padding: 20px 0;
      }
    }

    &__contentActive {
      @include respond-to(sm) {
        display: flex;
      }
    }
  }
`;

export default staticStyles;
