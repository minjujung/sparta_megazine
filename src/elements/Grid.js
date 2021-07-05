import React from "react";
import styled from "styled-components";

const Grid = (props) => {
  const { children, is_flex, width, padding, margin, bg } = props;

  const styles = {
    is_flex,
    width,
    margin,
    padding,
    bg,
  };
  return <GridContainer {...styles}>{children}</GridContainer>;
};

Grid.defaultProps = {
  children: null,
  is_flex: false,
  width: "100%",
  padding: false,
  margin: false,
  bg: false,
  _onClick: () => {},
};

const GridContainer = styled.div`
  width: ${(props) => props.width};
  height: 100%;
  box-sizing: border-box;
  ${(props) =>
    props.is_flex
      ? `display: flex; justify-content: space-between; align-items: center;`
      : ""};
  ${(props) => (props.padding ? `padding: ${props.padding};` : "")};
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")};
  ${(props) => (props.bg ? `background-color: ${props.bg};` : "")};
`;
export default Grid;
