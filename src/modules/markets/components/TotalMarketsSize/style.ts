import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .TotalMarketsSize {
    padding-right: 10px;
    width: 155px;

    @include respond-to(md) {
      padding-right: 0;
      margin-bottom: 10px;
    }

    @include respond-to(sm) {
      width: 100%;
      text-align: initial;
    }

    &__text {
      font-size: $large;
      margin-bottom: 5px;

      @include respond-to(xl) {
        font-size: $regular;
        margin-bottom: 3px;
      }

      @include respond-to(lg) {
        font-size: $medium;
      }

      @include respond-to(sm) {
        font-weight: 300;
        margin-bottom: 8px;
        font-size: $regular;
      }
    }

    &__title {
      white-space: nowrap;
      font-size: 30px;

      @include respond-to(xl) {
        font-size: 20px;
      }

      @include respond-to(sm) {
        font-size: $extraLarge;
      }
    }
  }
`;

export default staticStyles;
