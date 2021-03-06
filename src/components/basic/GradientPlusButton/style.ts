import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css`
  @import 'src/_mixins/vars';

  .GradientPlusButton {
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    span {
      width: 10px;
      height: 2px;
      transition: $transition;
      border-radius: $borderRadius;
      &:last-of-type {
        position: absolute;
      }
    }

    &__top {
      top: 0;
    }
    &__bottom {
      bottom: 0;
    }
    &__left {
      left: 0;
    }
    &__right {
      right: 10;
    }

    &__active {
      span {
        &:last-of-type {
          transform: rotate(90deg);
        }
      }
    }
  }
`;

export default staticStyles;
