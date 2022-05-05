import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .ContentWrapper {
    position: relative;
    border-radius: $borderRadius;
    box-shadow: $boxShadow;
    &__fullHeight {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 20px;
      flex: 1;
      margin-bottom: 10px;
      padding: 0px;
      @include respond-to(sm) {
        max-height: 100%;
        padding: 0;
        background: transparent !important;
        box-shadow: none !important;
      }
    }

    &__back-button {
      position: absolute;
      left: 32px;
      top: 25px;
      min-width: 81px;
      height: 32px;
      border-radius: 100px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      line-height: 20px;
      font-weight: 400;
      transition: $transition;
      opacity: 0.9;
      padding-right: 4px;
      @include respond-to(sm) {
        display: none;
      }
      img {
        width: 11px;
        height: 13px;
        margin-right: 10px;
        margin-bottom: 1px;
      }
    }
  }

  @media not all and (min-resolution: 0.001dpcm) {
    @supports (-webkit-appearance: none) and (stroke-color: transparent) {
      .ContentWrapper {
        @include respond-to(sm) {
          display: block;
        }
      }
    }
  }
`;

export default staticStyles;
