import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .TopInfoPanel {
    display: flex;
    margin-bottom: 5px;
    gap: 5px;
    @include respond-to(sm) {
      flex-direction: column;
      padding: 0 6px;
      justify-content: center;
      align-items: center;
    }

    .TopInfoPanel__line {
      margin-right: 30px;
      @include respond-to(sm) {
        width: 100%;
        display: flex;
        flex-direction: row;
        margin-right: 0;
        padding: 7px;
        .Row__title-inner {
          align-items: center;
        }
        .Row__title {
          font-size: 14px !important;
        }
        .Value,
        .ValuePercent {
          width: 100%;
          font-size: 35px;
          @include respond-to(sm) {
            width: 100%;
            align-items: flex-end;
          }
        }
      }
    }

    .Row__title-inner .Row__title.Row__title,
    .Value .Value__value,
    .ValuePercent .ValuePercent__value,
    .TextWithModal__text,
    .TopInfoPanel__no-data,
    .TopInfoPanel__healthFactor .TextWithModal__text {
      font-size: $regular;
      @include respond-to(xl) {
        font-size: $small;
      }
      @include respond-to(lg) {
        font-size: $extraSmall;
      }
      @include respond-to(sm) {
        font-size: $medium;
        width: 100%;
        display: flex;
        justify-content: right;
      }
    }
    .Row__title-inner .Row__title.Row__title,
    .TextWithModal__text,
    .TopInfoPanel__healthFactor .TextWithModal__text {
      @include respond-to(sm) {
        font-size: 16px;
        padding-right: 0;
      }
    }

    .TopInfoPanel__healthFactor {
      @include respond-to(sm) {
        margin-right: 0;
        width: 100%;
        padding: 7px;
        display: flex;
        text-align: start;
        .ValuePercent {
          align-items: center;
          justify-content: center;
        }
      }
    }
    .HealthFactor__percent {
      @include respond-to(sm) {
        margin-left: 0;
      }
    }
  }
`;

export default staticStyles;
