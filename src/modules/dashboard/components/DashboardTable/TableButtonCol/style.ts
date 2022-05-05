import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .TableButtonCol__button.TableButtonCol__button {
    width: 90px;
    min-height: 32px;
    font-size: 14px;
    line-height: 20px;
    padding: 6px 16px;
    border-radius: 100px;
  }

  .TableButtonCol__button {
    pointer-events: none;
    border: none;
  }

  .NoButtonLink .TableButtonCol__button {
    margin-left: 4px;
  }
`;

export default staticStyles;
