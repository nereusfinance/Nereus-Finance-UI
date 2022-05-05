import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .DropdownWrapper__content {
    background: none;
  }

  .AddressInfo {
    margin-left: 0;

    &__button {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-end;
      text-align: right;
      min-width: 110px;
      padding: 5px;
      height: 40px;
      border-radius: 1px;
      font-size: $extraSmall;
      border: 1px solid transparent;
      transition: $transition;

      @include respond-to(sm) {
        width: 110px;
        height: 54px;
        font-size: $small;
        align-items: center;
      }

      p {
        margin-bottom: 2px;
        text-transform: capitalize;
        white-space: nowrap;
        @include respond-to(sm) {
          margin-bottom: 5px;
        }
      }

      span {
        opacity: 0.5;
      }
    }

    &__content {
      width: 160px;
      padding: 4px;
      border-radius: $borderRadius;
      @include respond-to(sm) {
        width: 260px;
      }
    }

    &__content-caption {
      padding: 10px 5px 14px;
      @include respond-to(sm) {
        padding: 10px 25px;
      }
    }

    &__content-network {
      font-size: $extraSmall;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      margin-bottom: 12px;
      @include respond-to(sm) {
        margin-bottom: 10px;
        font-size: $small;
      }

      span {
        display: inline-flex;
        text-transform: capitalize;
      }

      i {
        display: block;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        margin-right: 6px;
        position: relative;
        bottom: 1px;
        @include respond-to(sm) {
          margin-right: 5px;
          width: 12px;
          height: 12px;
        }
      }
    }

    &__content-address {
      font-size: $small;
      word-break: break-all;
      text-align: center;
      @include respond-to(sm) {
        font-size: $regular;
      }
    }

    &__content-ens {
      font-size: $small;
      word-break: break-all;
      text-align: center;
      margin-top: 12px;
      @include respond-to(sm) {
        font-size: $regular;
      }
    }

    &__contentButton {
      font-weight: 300;
      text-transform: uppercase;
      font-size: $medium;
      width: 100%;
      height: 32px;
      right: 80px;
      top: 88px;
      text-align: center;
      backface-visibility: hidden;
      transform: translateZ(0);

      &:hover {
        border-bottom: 1px solid transparent;
      }

      @include respond-to(sm) {
        padding: 18px 5px;
        font-size: $regular;
      }

      &:last-child {
        border-bottom: none !important;
      }

      * {
        backface-visibility: hidden;
        transform: translateZ(0);
      }
    }
  }
`;

export default staticStyles;
