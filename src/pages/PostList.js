import React from "react";
import styled from "styled-components";

import Post from "../components/Post";
import { Grid, Title } from "../elements";

const PostList = (props) => {
  return (
    <Grid>
      <Post />
    </Grid>
  );
};

export default PostList;
