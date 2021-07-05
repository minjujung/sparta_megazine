import React from "react";
import styled from "styled-components";

const Button = (props) => {
  const {
    children,
    width,
    bg,
    margin,
    padding,
    font_size,
    _disabled,
    _onClick,
  } = props;

  const styles = {
    width,
    bg,
    margin,
    padding,
    font_size,
  };
  return (
    <Btn {...styles} disabled={_disabled} onClick={_onClick}>
      {children}
    </Btn>
  );
};

Button.defaultProps = {
  children: null,
  width: "100%",
  bg: "#1B9CFC",
  margin: false,
  padding: false,
  disabled: false,
  _onClick: () => {},
};

const Btn = styled.button`
  box-sizing: border-box;
  width: ${(props) => props.width};
  height: 40px;
  background-color: ${(props) => (props.disabled ? "#1b9cfc8c" : "#1B9CFC")};
  border: none;
  border-radius: 3px;
  color: white;
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")};
  ${(props) => (props.padding ? `padding: ${props.padding};` : "")};
  ${(props) => (props.font_size ? `font-size: ${props.font_size};` : "")};
`;

export default Button;
