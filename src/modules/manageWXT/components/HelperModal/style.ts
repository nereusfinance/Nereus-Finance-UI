import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .HelperModalContent {
    &__title {
      font-size: 20px;
      line-height: 24px;
      margin-bottom: 24px;
    }
    &__descr {
      font-size: 16px;
      line-height: 24px;
      margin-bottom: 40px;
    }
  }
`;

export default staticStyles;
