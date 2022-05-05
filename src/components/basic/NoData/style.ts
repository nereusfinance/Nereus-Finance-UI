import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .NoData {
    font-size: 24px;
    line-height: 28px;
    padding: 10px;
  }
`;

export default staticStyles;
