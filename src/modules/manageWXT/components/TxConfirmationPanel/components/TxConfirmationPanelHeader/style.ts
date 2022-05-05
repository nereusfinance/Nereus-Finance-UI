import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .ActionsPanelHeader {
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    .ActionsPanelHeaderItem {
      padding: 5px;
      font-size: 10px;
      line-height: 16px;
      display: flex;
      justify-content: center;
      .line {
        align-self: center;
        width: 24px;
        height: 1px;
        background: #606060;
        position: relative;
        left: 7.5%;
      }

      &:first-of-type {
        border-top-left-radius: 4px;
        justify-content: end;
      }

      &:last-of-type {
        justify-content: start;
        .line {
          &:last-of-type {
            display: none;
          }
        }
      }
    }
  }
`;

export default staticStyles;
