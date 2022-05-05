import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .WalletModal {
    position: relative;
    height: 56px;
    gap: 24px;
    font-size: 16px;
    font-weight: 400;
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: center;

    @include respond-to(sm) {
      display: block;
      height: auto;
      gap: 8px;
      padding: 16px;
    }

    &__logo {
      height: 32px;
      width: 32px;

      @include respond-to(sm) {
        display: none;
      }
    }

    &__row {
      display: flex;
      flex-direction: row;

      &-value {
        margin-left: 4px;
        font-size: $regular;
        font-weight: 700;
      }

      @include respond-to(sm) {
        margin-bottom: 8px;
        max-width: 270px;
      }
    }

    &__submit-btn {
      line-height: 20px;
      padding: 6px 16px;
      border-radius: 100px;
      border: none;
    }

    &__close-btn {
      position: absolute;
      height: 14px;
      right: 21px;
      top: 50%;
      transform: translateY(-50%);

      &:hover {
        opacity: 0.7;
      }
    }
  }

  .Footer {
    position: relative;
    z-index: 2;
    padding: 10px 15px 10px;
    display: flex;
    font-size: 12px;
    font-weight: 400;
    align-items: center;
    flex-direction: row;
    justify-content: flex-end;

    @include respond-to(xl) {
      padding: 10px 10px 5px;
    }
    @include respond-to(sm) {
      display: none;
    }
    .flex-item {
      margin-right: 16px;
      display: flex;
      gap: 5px;
    }
    &__inside {
      @include respond-to(md) {
        display: none;
      }
    }
    .DarkModeSwitcher {
      margin-right: 10px;
    }
  }
`;

export default staticStyles;
