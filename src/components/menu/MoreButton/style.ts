import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .MoreButton {
    padding: 8px 12px;
    .DropdownWrapper__contentVisible.DropdownWrapper__content {
      top: 100%;
    }
    &__button {
      font-size: $regular;
      position: relative;
      text-transform: uppercase;
      @include respond-to(xl) {
        font-size: $medium;
      }
      @include respond-to(lg) {
        font-size: $small;
      }
      span {
        font-weight: 300;
        transition: $transition;
        opacity: 1;
      }
      strong {
        transition: $transition;
        position: absolute;
        left: 12px;
        opacity: 0;
      }
    }

    &__content {
      width: 144px;
    }

    &__links {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      width: 100%;
      li {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 37px;
        &:last-of-type {
          border-bottom: none;
        }
      }
      .MoreButton__linkHidden {
        display: none;
      }
    }

    &__link {
      font-weight: 400;
      text-transform: uppercase;
      font-size: $regular;
      padding: 8px 12px;
      width: 100%;
      backface-visibility: hidden;
      transform: translateZ(0);
      min-height: 20px;
      * {
        backface-visibility: hidden;
        transform: translateZ(0);
      }
    }

    &__switcher-inner {
      margin-bottom: 20px;
      min-height: auto;
      border-bottom: none !important;
    }

    &__socialIcon {
      margin: 0 9px;
    }
  }
`;

export default staticStyles;
