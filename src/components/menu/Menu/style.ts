import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .Menu {
    user-select: none;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    height: 80px;
    z-index: 5;

    @include respond-to(sm) {
      padding: 0;
      box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.1);
      border: none;
      height: auto;
      min-height: 56px;
    }

    &__logo-inner {
      img {
        margin: 24px 60px;
        width: 146px;
        height: 32px;
      }
      @include respond-to(sm) {
        display: none;
      }
    }

    &__back-button {
      position: absolute;
      padding: 15px;
      left: 0;
      img {
        width: 9px;
        height: 15px;
      }
    }

    &__title-inner {
      display: none;

      @include respond-to(sm) {
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        width: 100%;
        padding: 0 50px;
      }
    }

    &__right-inner {
      display: flex;
      align-items: center;
    }

    &__navigation-inner {
      margin-right: 24px;
      @include respond-to(md) {
        display: none;
      }
      ul {
        display: flex;
        align-items: center;
        .Menu__link-inner {
          margin-left: 20px;
          @include respond-to(xl) {
            margin-left: 15px;
          }
          @include respond-to(lg) {
            margin-left: 10px;
          }
        }
        li {
          &:last-child {
            margin-right: -10px;
            margin-left: 0;
          }
        }
      }
    }

    &__linkHidden {
      display: none;
    }

    &__burger-inner {
      display: none;
      @include respond-to(md) {
        display: block;
        margin-right: 5px;
      }
      @include respond-to(sm) {
        margin-right: 0;
        position: absolute;
        right: 0;
      }
    }

    &__buttons-inner {
      display: flex;
      align-items: center;
      margin-right: 80px;
      @include respond-to(xl) {
        margin-right: 60px;
      }
      @include respond-to(lg) {
        margin-right: 40px;
      }
      @include respond-to(sm) {
        display: none;
      }
    }
  }
`;

export default staticStyles;
