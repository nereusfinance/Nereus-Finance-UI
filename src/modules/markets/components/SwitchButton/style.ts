import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';
  .container {
    text-align: right;
  }
  .toggle-switch {
    position: relative;
    width: 60px;
    display: inline-block;
    text-align: left;
    top: 8px;
  }
  .checkbox {
    display: none;
  }
  .label {
    display: block;
    overflow: hidden;
    cursor: pointer;
    border: 0 solid #bbb;
    border-radius: 20px;
  }
  .inner {
    display: block;
    width: 200%;
    margin-left: -100%;
    transition: margin 0.3s ease-in 0s;
  }
  .inner:before,
  .inner:after {
    float: left;
    width: 50%;
    height: 25px;
    font-size: 14px;
    line-height: 27px;
    color: #fff;
    font-weight: bold;
    box-sizing: border-box;
  }
  .inner:before {
    content: 'ON';
    padding-left: 4px;
    background-color: rgb(231, 252, 110);
    color: black;
  }
  .inner:after {
    content: 'OFF';
    padding-right: 3px;
    background-color: #4d4aec;
    color: black;
    text-align: right;
  }
  .switch {
    display: block;
    width: 24px;
    margin: 5px;
    background: black;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 28px;
    border: 0 solid #bbb;
    border-radius: 20px;
    transition: all 0.3s ease-in 0s;
  }
  .checkbox:checked + .label .inner {
    margin-left: 0;
  }
  .checkbox:checked + .label .switch {
    right: 0px;
  }
`;

export default staticStyles;
