import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css`
  @import 'src/_mixins/vars';

  .SwitcherStaking {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transform: rotate(90deg);
    transition: 0.3s;
  }
  .SwitcherStaking__active {
    transform: rotate(270deg);
    transition: 0.3s;
  }
`;

export default staticStyles;
