import React from "react";
import styled from "styled-components";

const Grid = (props) => {
  const { children } = props;
  return <GridContainer>{children}</GridContainer>;
};

const GridContainer = styled.div`
  max-width: 350px;
  min-height: 80vh;
  background-color: #fff;
  padding: 16px;
  margin: 20px auto;
  border-radius: 5px;
  border: 1px solid #ddd;
`;
export default Grid;
