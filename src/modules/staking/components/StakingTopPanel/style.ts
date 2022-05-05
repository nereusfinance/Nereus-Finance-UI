import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .StakeTopPanelBlock {
    border-radius: $borderRadius;
    padding: 24px 32px;
    display: flex;
    flex-direction: column;
    text-align: center;
    @include respond-to(sm) {
      flex-direction: column;
      height: 350px;
      padding: 16px;
      margin-top: 24px;
    }
  }
  .TopPanelSM {
    margin-top: 24px;
  }
  .SwitcherVisibility {
    display: flex;
    align-items: end;
    justify-content: space-between;
    margin: 2px 0 16px;
  }
  .Value {
    align-items: center;
    @include respond-to(sm) {
      align-items: end;
    }
  }

  .TotalValuesItem {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 20px 0;
  }

  .TableDescription {
    display: flex;
    flex-direstion: row;
    align-items: center;
    justify-content: space-between;
  }

  .BottomMargin {
    margin-bottom: 4px;
    width: 20%;
    text-align: center;
    .Value_Symbol {
      display: flex;
      justify-content: center;
    }
    @include respond-to(sm) {
      padding: 5px 0;
    }
  }

  .TextUnderIcon {
    text-align: start;
  }
  .iconsContent {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 16px;
    .otherIcon {
      position: relative;
      right: 12;
      z-index: 1;
    }
    .wxtIcon {
      z-index: 2;
    }
  }
  .MainNumber {
    font-size: 16px;
    line-height: 24px;
    text-align: end;
    @include respond-to(sm) {
      font-size: 16px;
      line-height: 20px;
    }
  }
  .SmallerNumber {
    font-size: 12px;
    line-height: 16px;
    text-align: end;
    @include respond-to(sm) {
      font-size: 14px;
      line-height: 16px;
    }
  }
`;

export default staticStyles;
