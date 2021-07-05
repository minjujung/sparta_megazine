import React from "react";
import styled from "styled-components";

import Post from "../components/Post";
import { Grid, Title } from "../elements";

const PostList = (props) => {
  return (
    <Grid>
      <Title>게시글 목록</Title>
      <Post />
    </Grid>
  );
};

export default PostList;
