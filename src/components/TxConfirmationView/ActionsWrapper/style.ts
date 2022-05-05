import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .ActionsWrapper {
    width: 100%;
    border-radius: $borderRadius;
    display: flex;
    flex-direction: column;
    transition: $transition;
    .horizontalLine {
      width: 24px;
    }
    &__Confirmation {
      display: flex;
      flex-direction: row;
      align-items: center;
    }
    &__buttons {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #262626;
    }
    &__button {
      display: flex;
      align-items: center;
      text-align: center;
      min-height: 20px;
      font-size: $small;
      flex: 1;
      font-weight: 400;
      transition: $transition;
      cursor: default;
      padding: 5px 14px;

      &:last-of-type {
        border-right: none !important;
      }
      p {
        opacity: 0.8;
      }
    }

    &__buttonActive,
    &__buttonSubmitted,
    &__buttonConfirmed,
    &__buttonError {
      p {
        opacity: 1;
      }
    }
  }
`;

export default staticStyles;
