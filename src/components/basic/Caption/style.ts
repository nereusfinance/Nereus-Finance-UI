import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css`
  @import 'src/_mixins/screen-size';
  @import 'src/_mixins/vars';

  .Caption {
    margin-bottom: 40px;
    text-align: center;
    overflow: hidden;
    @include respond-to(sm) {
      margin-bottom: 25px;
      width: 100%;
      padding-left: 16px;
    }
    h2 {
      width: 100%;
      margin-bottom: 16px;
      font-size: 16px;
      line-height: 24px;
      font-weight: 700;
      display: flex;
      align-items: center;
      text-align: left;
      justify-content: left;
      position: relative;

      &.Caption__titleWithCircle {
        left: 21px;
        @include respond-to(lg) {
          left: 17px;
        }
        @include respond-to(md) {
          left: 21px;
        }
      }

      img {
        width: 32px;
        height: 32px;
        margin-left: 10px;
        @include respond-to(lg) {
          width: 24px;
          height: 24px;
        }
        @include respond-to(md) {
          width: 32px;
          height: 32px;
        }
      }
    }
    &__description {
      text-align: left;

      font-size: 14px;
      line-height: 20px;
    }
  }
`;

export default staticStyles;
