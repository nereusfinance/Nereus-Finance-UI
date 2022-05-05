import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .FormattedValue {
    display: flex;
    flex-direction: row;
    align-items: center;
    @include respond-to(sm) {
      flex-direction: row;
    }
    img {
      margin-right: 8px;
      width: 16px;
      height: 16px;
    }
    span {
      font-size: 16px;
      line-height: 24px;
      margin: 0px 2px;
    }
    .ValueBold {
      font-weight: 700;
    }
  }
`;

export default staticStyles;
