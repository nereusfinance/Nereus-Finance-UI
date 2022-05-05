import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .VestCard {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 192px;
    margin-left: 16px;
    border-radius: 4px;
    .MainText {
      color: #fff;
      padding: 12px;
    }
    .SubValueBlock {
      display: flex;
      align-items: center;
      margin-bottom: 16px;
      .USD {
        font-size: 12px;
        color: grey;
      }
    }
    @include respond-to(sm) {
      margin: 16px 0;
      height: 186px;
    }
  }
`;

export default staticStyles;
