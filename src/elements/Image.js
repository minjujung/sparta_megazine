import React from "react";
import styled from "styled-components";

const Image = (props) => {
  const { src, size, shape } = props;

  const styles = {
    src,
    size,
  };

  if (shape === "circle") {
    return <CircleImage {...styles} />;
  }

  if (shape === "big_square") {
    return <BigSquareImage {...styles}></BigSquareImage>;
  }
};

Image.defaultProps = {
  shape: "circle",
  src: "https://user-images.githubusercontent.com/75834421/124404954-0be05f80-dd78-11eb-8048-0a5517211d3e.jpg",
  size: 40,
};

const CircleImage = styled.img`
  --size: ${(props) => props.size}px;
  width: var(--size);
  height: var(--size);
  min-width: var(--size);
  min-height: var(--size);
  background-image: url(${(props) => props.src});
  background-size: cover;
  border-radius: 50%;
`;

const BigSquareImage = styled.img`
  width: 100%;
  min-width: 250px;
  background-image: url(${(props) => props.src});
  background-size: cover;
`;

export default Image;
