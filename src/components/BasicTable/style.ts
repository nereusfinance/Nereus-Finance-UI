import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .BasicTable {
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow-x: auto;
    overflow-y: hidden;
    margin: 0;
    position: relative;
    z-index: 1;
    width: 100%;

    @include respond-to(sm) {
      display: block;
      flex: none;
    }

    &__wrapper {
      display: flex;
      flex-direction: column;
      flex: 1;
    }

    &__content {
      display: flex;
      flex-direction: column;
      overflow-x: hidden;
      overflow-y: auto;
      flex: auto;
      height: 1px;
      min-height: 250px;

      @include respond-to(sm) {
        height: auto;
      }
    }

    &__content-inner {
      display: block;
      padding: 0;

      @include respond-to(sm) {
        padding: 5px 5px 12px;
      }
    }

    &__header {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      padding: 0;
      margin-bottom: 8px;

      @include respond-to(sm) {
        padding: 0 15px;
        margin-bottom: 0;
      }
    }
  }
`;

export default staticStyles;
