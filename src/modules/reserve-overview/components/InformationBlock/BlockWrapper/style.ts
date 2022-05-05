import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .BlockWrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;

    @include respond-to(sm) {
      width: 48%;
      margin-bottom: 16px;
      align-items: flex-start;

      &:last-of-type {
        margin-bottom: 0;
      }
    }

    &__title-inner {
      @include respond-to(md) {
        margin-bottom: 4px;
      }

      .TextWithModal__text,
      p {
        font-size: $regular;

        @include respond-to(xl) {
          font-size: $small;
        }

        @include respond-to(lg) {
          font-size: $extraSmall;
        }

        @include respond-to(md) {
          display: flex;
          align-items: center;
          font-size: $small;
          line-height: 1.33;
        }
      }

      .TextWithModal__button {
        margin-left: 4px;
      }

      .TextWithModal__button img {
        @include respond-to(xl) {
          width: 10px !important;
          height: 10px !important;
        }
        @include respond-to(lg) {
          width: 8px !important;
          height: 8px !important;
        }
        @include respond-to(md) {
          width: 10px !important;
          height: 10px !important;
        }
        @include respond-to(sm) {
          width: 12px !important;
          height: 12px !important;
        }
      }
    }
  }
`;

export default staticStyles;
