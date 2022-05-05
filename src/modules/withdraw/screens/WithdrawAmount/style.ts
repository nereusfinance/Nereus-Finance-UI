import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  .Button {
    font-size: 14px;
    border-radius: 100px;
    padding: 6px 16px;
    &:hover:after {
      opacity: 0;
    }
  }
`;

export default staticStyles;
