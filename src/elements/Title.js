import React from "react";
import styled from "styled-components";

const Title = (props) => {
  const { children } = props;
  return <TitleText>{children}</TitleText>;
};

Title.defaultProps = {
  children: null,
};

const TitleText = styled.h1`
  margin: 20px 0;
  padding: 0;
`;

export default Title;
