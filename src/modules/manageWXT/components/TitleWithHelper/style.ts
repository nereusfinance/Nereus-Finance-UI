import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .TitleWithHelper {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .TitleWithHelperText {
    font-size: 16px;
    line-height: 24px;
    @include respond-to(sm) {
      line-height: 20px;
    }
  }

  .TitleWithHelperIcon {
    width: 14px;
    height: 14px;
    margin-left: 5px;
    cursor: pointer;
  }
`;

export default staticStyles;
