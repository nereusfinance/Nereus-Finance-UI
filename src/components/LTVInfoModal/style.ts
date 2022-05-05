import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .ReactModal__Content.LTVInfoModal__wrapper {
    max-width: 100% !important;
    padding: 54px 24px 40px 24px !important;

    .BasicModal__close-wrapper {
      top: 29px;
      right: 45px;
    }
  }

  .LTVInfoModal {
    .Caption {
      max-width: 500px;
      margin-bottom: 16px;
      h2 {
        justify-content: center !important;
        margin-bottom: 24px !important;
        font-size: 20px !important;
        line-height: 24px !important;
        font-weight: 400 !important;
      }
    }

    .ValuePercent__value {
      font-weight: 700;
    }

    .Caption__description {
      font-size: 16px;
      line-height: 24px;
    }

    .Row__withMargin {
      margin-bottom: 24px;
    }

    &__content {
      padding: 24px;
      border-radius: $borderRadius;

      @include respond-to(sm) {
        padding: 20px 10px;
      }
    }

    &__title {
      display: flex;
      align-items: center;
      .TokenIcon {
        &__image {
          margin-left: 3px;
          margin-right: 0;
        }
      }
      .MultipleIcons {
        margin-right: 0;
        margin-left: 3px;
        .TokenIcon__image {
          margin-right: 0 !important;
          margin-left: 0 !important;
        }
      }
    }

    &__subTitle {
      margin-right: 10px;
      font-size: $regular;
      @include respond-to(xl) {
        font-size: $small;
      }
      @include respond-to(lg) {
        font-size: $extraSmall;
      }
      @include respond-to(md) {
        font-size: $small;
      }
    }
  }
`;

export default staticStyles;
