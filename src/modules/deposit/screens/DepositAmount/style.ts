import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';
  .BasicForm {
    @include respond-to(sm) {
      height: 270px;
    }
  }
`;

export default staticStyles;
