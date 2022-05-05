import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .NereusHelpModal {
    padding: 40px 32px !important;

    .Caption__description {
      text-align: center;
      font-size: 16px;
      line-height: 24px;
      font-weight: 400;
    }

    .Caption__primary h2 {
      justify-content: center !important;
      font-size: 20px !important;
      line-height: 24px !important;
      font-weight: 400 !important;
      margin-bottom: 24px !important;
      text-align: center;
    }

    .Button {
      border: none;
      border-radius: 100px;
      font-size: 16px;
      line-height: 24px;
      padding: 8px 24px;
      max-width: none;
      width: auto;
      &:after {
        opacity: 0;
      }
    }
  }
`;

export default staticStyles;
