import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .MobileCardWrapper {
    border-radius: $borderRadius;
    box-shadow: $boxShadow;
    width: 100%;
    margin-bottom: 8px;
    height: 210px;

    @include respond-to(sm) {
      height: 240px;
    }

    &__symbol--inner {
      padding: 16px;
    }

    &__content {
      padding: 10px 16px;
      .Row {
        &__dark {
          display: flex;
          align-items: start;
        }
      }
    }

    .TokenIcon__image {
      margin-right: 16px;
    }

    .TokenIcon__name {
      max-width: 250px;

      b {
        font-size: $regular;
        font-weight: 400;
      }
    }

    .Row .Row__title,
    .Value .SubValue,
    .TextWithModal__text {
      font-size: 16px;
    }

    .SubValue {
      @include respond-to(sm) {
        font-size: 12px;
      }
    }

    .Row__center {
      align-items: center;
    }

    .DefaultButton {
      width: 120px;
      min-height: 28px;
      font-size: $small;
      @include respond-to(sm) {
        border-radius: 21px;
      }
    }
  }
`;

export default staticStyles;
