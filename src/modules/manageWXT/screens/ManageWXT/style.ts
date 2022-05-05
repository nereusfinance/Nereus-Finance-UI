import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .ManageTitle {
    margin: 24px 0px 16px;
    font-size: 40px;
    line-height: 48px;
    font-weight: 700;
    @include respond-to(sm) {
      font-size: 26px;
      line-height: 28px;
    }
  }

  .ManageSubTitle {
    margin-bottom: 16px;
    font-size: 20px;
    line-height: 24px;
    @include respond-to(sm) {
      font-size: 18px;
      line-height: 24px;
    }
  }

  .ManageWXTColWrapper {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    @include respond-to(sm) {
      display: block;
    }
  }

  .ManageWXTCol {
    &__left {
      flex: 0.2631;
      min-width: 325px;
    }

    &__right {
      flex: 0.7363;
      margin-left: 16px;
    }

    @include respond-to(sm) {
      &__right {
        margin-left: 0px;
        margin-top: 16px;
      }
    }
  }
`;

export default staticStyles;
