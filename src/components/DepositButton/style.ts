import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .DepositButton {
    position: relative;

    &__inner {
      padding: 6px 16px;
      min-height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 0px solid transparent;
      border-radius: 21px;
      position: relative;
      font-size: 16px;
      line-height: 24px;
      padding: 8px 75px;
      font-weight: 400;
      z-index: 2;
      @include respond-to(sm) {
        width: 150px;
        min-height: 54px;
        padding: 0 10px;
      }
      span {
        @include respond-to(sm) {
          font-size: $regular;
        }
      }
    }
  }

  @keyframes animate {
    0% {
      background-position: 0 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0 50%;
    }
  }
`;

export default staticStyles;
