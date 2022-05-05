import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .ManageWXTTopPanelItem {
    display: flex;
    flex-direction: column;
    margin-right: 40px;
    :last-of-type {
      margin-right: 0px;
    }
  }
`;

export default staticStyles;
