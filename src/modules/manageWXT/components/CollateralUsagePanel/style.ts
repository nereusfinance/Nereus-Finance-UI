import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .CollateralUsagePanel {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    .CollateralUsagePanelValues {
      display: flex;
      flex-direction: column;
      align-items: end;
    }

    .CollateralUsagePanelTitle {
      font-size: 16px;
      line-height: 24px;
    }

    .CollateralUsagePanelValuesMain {
      font-size: 16px;
      line-height: 24px;
      font-weight: 700;
    }

    .CollateralUsagePanelValuesSecondary {
      font-size: 12px;
      line-height: 16px;
    }
  }
`;

export default staticStyles;
