import React from "react";
import styled from "styled-components";

const Text = (props) => {
  const { children, size, margin, bold, _onClick, is_click } = props;

  const styles = {
    size,
    children,
    margin,
    bold,
    is_click,
  };
  return (
    <P {...styles} onClick={_onClick}>
      {children}
    </P>
  );
};

Text.defaultProps = {
  children: null,
  size: "14px",
  margin: false,
  bold: false,
  _onClick: () => {},
  is_click: false,
};

const P = styled.p`
  ${(props) => (props.is_click ? `cursor: pointer;` : "")}
  font-size: ${(props) => props.size};
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")};
  font-weight: ${(props) => (props.bold ? 700 : 400)};
`;

export default Text;
