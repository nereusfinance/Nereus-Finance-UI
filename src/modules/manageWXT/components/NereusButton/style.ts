import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .NereusButton {
    border-radius: 100px;
    white-space: nowrap;
  }
`;

export default staticStyles;
