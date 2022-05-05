import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .TxConfirmationView {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    flex: 1;
    width: 33vw;
    margin: 0 auto;
    @include respond-to(md) {
      width: 380px;
    }
    @include respond-to(sm) {
      width: 95%;
      max-width: 380px;
    }

    &__content-inner {
      margin-bottom: 16px;
      width: 100%;
      text-align: center;
    }
    &__contentInner {
      margin-bottom: 0;
    }

    &__content {
      padding: 16px 12px;
      border-radius: $borderRadius;
      .Row {
        font-size: 12px;
        line-height: 16px;
        &__withMargin {
          margin-bottom: 12px;
        }
      }
      .Value__value {
        font-size: 12px;
        line-height: 16px;
      }
      .TextWithModal__text {
        font-size: 12px;
        line-height: 16px;
      }
      .ValuePercent__value {
        font-size: 12px;
        line-height: 16px;
      }
      .HealthFactor {
        margin-bottom: 12px;
        &:last-of-type {
          margin-bottom: 0px;
        }
      }
    }

    &__actions-inner {
      width: 100%;
    }

    .TokenIcon.TokenIcon .TokenIcon__name {
      font-size: $large;
      @include respond-to(xl) {
        font-size: $medium;
      }
      @include respond-to(lg) {
        font-size: $small;
      }
      @include respond-to(md) {
        font-size: $medium;
      }
      @include respond-to(sm) {
        font-size: $regular;
      }
    }

    .InfoPanel {
      &:last-of-type {
        margin-top: 15px;
      }
    }

    .Caption {
      margin-bottom: 32px;
    }
  }
`;

export default staticStyles;
