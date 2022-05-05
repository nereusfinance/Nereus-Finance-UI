import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .info-block {
    display: flex;
    flex-direction: column;
    width: 100%;

    @include respond-to(sm) {
      gap: 8px;
    }

    &__title {
      @include respond-to(sm) {
        line-height: 1.25;
      }
    }

    &__number {
      font-size: 32px;
      line-height: 36px;

      @include respond-to(sm) {
        font-size: 24px;
        line-height: 28px;
      }
    }
  }

  .SwitchButtonWrapper {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    padding-right: 15px;
    margin-top: 13px;

    .SwitchButtonText {
      color: #fff;
      align-self: flex-end;
      margin-top: 13px;
      padding-right: 15px;
    }
  }

  .link-button {
    border-radius: 100px;
    width: 192px;
    height: 32px;
    font-size: 14px;
    padding: 0 8px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    @include respond-to(sm) {
      width: 100%;
      height: 48px;

      &:not(:last-of-type) {
        margin-bottom: 8px;
      }
    }
  }

  .WXTInfo {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: 144px;
    padding: 24px;

    @include respond-to(sm) {
      display: flex;
      flex-direction: column;
      justify-items: center;
      gap: 24px;
      align-items: flex-start;
      height: auto;
      padding: 16px;
    }
  }

  .marketInfo {
    display: flex;
    margin-bottom: 16px;
    gap: 16px;
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;

    @include respond-to(sm) {
      align-items: center;
      display: flex;
      flex-direction: column;
      gap: 8px;
      margin-bottom: 8px;
    }

    .TopPanelWrapper {
      @include respond-to(sm) {
        width: 100%;
      }
    }
  }

  .Markets {
    display: flex;
    flex-direction: column;
    flex: 1;
    margin-top: 50px !important;

    @include respond-to(sm) {
      margin-top: 0 !important;
    }

    &__devide {
      display: flex;
      align-items: center;
      gap: 16px;

      @include respond-to(sm) {
        flex-direction: column;
        gap: 8px;
      }
    }

    &__state {
      display: flex;
      justify-content: space-between;
      margin: 0 24px;

      @include respond-to(sm) {
        margin: 0;
        flex-direction: column;
        padding: 16px;
        gap: 16px;
      }
    }

    &__top-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-right: 40px;
      padding: 12px 0;

      @include respond-to(md) {
        padding: 10px;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
      }

      @include respond-to(sm) {
        width: 100%;
        margin: 0;
        padding: 0;
      }
    }

    &__market-switcher {
      display: none;

      @include respond-to(sm) {
        display: block;
        height: auto;
        padding-bottom: 16px;
        text-align: center;
      }
    }

    &__marketSwitcher--title {
      width: 100%;
      text-align: center;
      margin-bottom: 10px;
      font-size: $regular;
    }

    &__mobile--cards {
      display: none;

      @include respond-to(sm) {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        margin-top: 8px;
      }
    }

    &__help--modalInner {
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
    }

    .Markets__help--modal {
      .TextWithModal__text {
        font-size: $medium;
      }
    }

    &__price-switcher {
      margin-top: 30px;

      @include respond-to(xl) {
        margin-top: 20px;
      }

      @include respond-to(sm) {
        display: none;
      }
    }
  }

  .mobile-hidden {
    @include respond-to(sm) {
      display: none;
    }
  }
`;

export default staticStyles;
