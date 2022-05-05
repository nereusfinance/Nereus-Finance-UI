import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .HelpCard {
    @include respond-to(sm) {
      height: 200px;
      display: flex;
      flex-direction: column;
      margin-top: 15px;
    }
    .LinkDiscord {
      color: #fff;
      &:hover {
        cursour: pointer;
      }
    }
    &__title {
      padding: 16px 24px;
      p {
        font-size: 16px;
        line-height: 20px;
      }
    }

    &__content {
      padding: 16px 24px;
      p {
        font-size: 16px;
        line-height: 24px;
      }
      display: flex;
    }
    .ButtonDocs {
      @include respond-to(sm) {
        width: 100%;
        align-self: center;
        display: flex;
        justify-content: center;
      }
    }

    .DocsBtn {
      width: 116px;
      margin-left: 20px;
      @include respond-to(sm) {
        width: 296px;
        height: 48px;
        margin: 0;
      }
    }
  }

  .HelpCardLink {
    height: fit-content;
  }
`;

export default staticStyles;
