import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .BasicForm {
    max-width: 550px;
    margin: 0 auto;
    @include respond-to(sm) {
      height: 320px;
    }
    &__warning {
      max-width: 430px;
      margin: 0 auto;
      text-align: center;
      font-size: $medium;
      @include respond-to(xl) {
        max-width: 335px;
        font-size: $small;
      }
      @include respond-to(lg) {
        font-size: $extraSmall;
      }
      @include respond-to(md) {
        font-size: $small;
      }
      @include respond-to(sm) {
        font-size: $medium;
      }
    }

    &__buttons {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 24px;
    }
  }
`;

export default staticStyles;
