import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .errorSpace {
    height: 64px;
    font-weight: 700;
    font-size: 16px;
    line-height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 24px;
  }
  .ScreensWrapper {
    display: flex;
    flex-direction: column;
    flex: 1;
    position: relative;
    overflow: hidden;

    &__content {
      display: flex;
      flex-direction: column;
      flex: 1;
      overflow: auto;
      overflow-x: hidden;
      position: relative;
      z-index: 2;
    }

    &__top-contentWrapper {
      position: relative;
      @include respond-to(sm) {
        display: none;
      }
      &:after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        height: 210px;
        width: 100%;
        transition-property: height;
        transition-duration: 0.1s;
        transition-timing-function: ease-in-out;
      }
    }

    &__topPanelSmall {
      .ScreensWrapper__top-contentWrapper {
        &:after {
          height: 80px;
        }
      }
    }

    &__topPanelWXT {
      .ScreensWrapper__top-contentWrapper {
        &:after {
          height: 224px;
        }
      }
    }

    &__background {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      object-fit: cover;

      @include respond-to(sm) {
        display: none;
      }
    }
    @include respond-to(sm) {
      min-width: 320px;
    }
  }
`;

export default staticStyles;
