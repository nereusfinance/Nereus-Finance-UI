import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .ConnectButton {
    position: relative;

    &__inner {
      padding: 6px 16px;
      min-height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 0 solid transparent;
      border-radius: 24px;
      position: relative;
      z-index: 2;
      @include respond-to(sm) {
        width: 270px;
        min-height: 48px;
        padding: 0 10px;
      }
      span {
        @include respond-to(sm) {
          font-size: $regular;
        }
      }
    }
  }

  .ConnectButton__normal {
    .ConnectButton__inner {
      padding: 8px 90px;
      @include respond-to(sm) {
        width: 300px;
        min-height: 50px;
      }
      span {
        font-size: $regular;
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
