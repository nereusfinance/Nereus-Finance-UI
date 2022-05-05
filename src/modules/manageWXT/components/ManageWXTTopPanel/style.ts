import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .ManageWXTTopPanel {
    display: flex;
    margin-bottom: 16px;

    @include respond-to(sm) {
      display: block;
      margin-bottom: 0;
    }
  }

  .ManageWXTTopPanelBlock {
    border-radius: $borderRadius;
    padding: 24px 32px;
    display: flex;
    flex-direction: row;
    @include respond-to(sm) {
      flex-direction: column;
      margin: 10px 0;
    }

    .BottomMargin {
      margin-bottom: 4px;
      @include respond-to(sm) {
        padding: 5px 0;
      }
    }

    .MainNumber {
      font-size: 32px;
      line-height: 36px;
      margin-bottom: 8px;
      @include respond-to(sm) {
        font-size: 24px;
        line-height: 28px;
      }
    }

    .SmallerNumber {
      font-size: 16px;
      line-height: 24px;
      @include respond-to(sm) {
        font-size: 16px;
        line-height: 20px;
      }
    }

    &__left {
      flex: 0.579;
    }
    &__right {
      flex: 0.421;
      margin-left: 16px;
    }

    @include respond-to(sm) {
      width: 100%;
      &__right {
        flex: 0.421;
        margin-left: 0px;
        margin-top: 4px;
      }
    }
  }
`;

export default staticStyles;
