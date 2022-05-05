import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .DashboardCustomTableCol {
    display: flex;
    flex-direction: column;
    margin: 0px 2px;
    @include respond-to(sm) {
      flex-direction: row;
      justify-content: space-between;
      margin: 0px 6px 10px;
    }

    .DashboardCustomTableColTitle {
      font-size: 12px;
      line-height: 18px;
      color: white;
      @include respond-to(sm) {
        font-size: 16px;
      }
    }

    .Placeholder {
      font-size: 12px;
      line-height: 18px;
      color: transparent;
      user-select: none;
    }

    .DashboardCustomTableColChildrenWrapper {
      display: flex;
      align-items: center;
    }

    .DashboardCustomTableColTitleWrapper {
      display: flex;
      align-items: start;
      p {
        white-space: nowrap;
      }
    }
  }
`;

export default staticStyles;
