import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .TableItem {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 20px 24px 20px 20px;
    position: relative;
    box-shadow: $boxShadow;
    border-radius: $borderRadius;
    margin-bottom: 6px;
    min-height: 40px;

    &__withInfo {
      position: relative;
      margin-bottom: 35px;
    }

    .TableItem__inner {
      align-items: flex-start;
    }

    &__assetColor {
      display: inline-block;
      position: absolute;
      left: 0;
      width: 2px;
      height: 25px;
    }

    .TableItem__token {
      .TokenIcon__name {
        font-size: 16px;
        line-height: 24px;
        b {
          font-weight: 400;
        }
      }
      .TokenIcon__image {
        margin-right: 15px;
        width: 32px;
        height: 32px;
      }
      .MultipleIcons {
        margin-right: 5px;
        .TokenIcon__image {
          margin-right: 0;
        }
      }
    }

    .TableCol {
      &:nth-of-type(3) {
        max-width: 130px;
      }
    }

    .Value {
      .Value__Value {
        @include respond-to(xl) {
          font-size: $regular;
        }
        @include respond-to(lg) {
          font-size: $medium;
        }
      }
      .SubValue {
        @include respond-to(xl) {
          font-size: $small;
        }
        @include respond-to(lg) {
          font-size: $extraSmall;
        }
      }
    }
  }
`;

export default staticStyles;
