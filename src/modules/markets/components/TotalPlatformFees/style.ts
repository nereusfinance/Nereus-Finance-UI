import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .TotalMarketsSize {
    padding-right: 10px;
    @include respond-to(md) {
      padding-right: 0;
      margin-bottom: 10px;
    }
    @include respond-to(sm) {
      margin-bottom: 0;
      display: flex;
      align-items: start;
      justify-content: center;
      flex-direction: column;
      text-align: center;
      padding: 5px 10px;
      width: 100%;
      position: relative;
      left: -10px;
      font-size: 20px;
    }
    p {
      font-size: $large;
      margin-bottom: 5px;
      @include respond-to(xl) {
        font-size: $regular;
        margin-bottom: 3px;
      }
      @include respond-to(lg) {
        font-size: $medium;
      }
      @include respond-to(sm) {
        font-weight: 300;
        margin-bottom: 8px;
        font-size: $regular;
      }
    }
    h2 {
      white-space: nowrap;
      font-size: 30px;
      @include respond-to(xl) {
        font-size: 20px;
      }
      @include respond-to(md) {
        font-size: $regular;
      }
      @include respond-to(sm) {
        font-size: 20px;
      }
    }
  }
  .LiquidityMiningAPYLine__tooltip {
    max-width: 550px;
    display: block;
    padding: 7px 10px;
    border-radius: $borderRadius;
    box-shadow: $boxShadow;
    @include respond-to(xl) {
      max-width: 380px;
    }
  }
`;

export default staticStyles;
