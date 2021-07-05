import React from "react";
import styled from "styled-components";

const Text = (props) => {
  const { children, size, margin, bold } = props;

  const styles = {
    size,
    children,
    margin,
    bold,
  };
  return <P {...styles}>{children}</P>;
};

Text.defaultProps = {
  children: null,
  size: "14px",
  margin: false,
  bold: false,
};

const P = styled.p`
  font-size: ${(props) => props.size};
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")};
  font-weight: ${(props) => (props.bold ? 700 : 400)};
`;

export default Text;
