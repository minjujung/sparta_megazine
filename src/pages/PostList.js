import React from "react";
import styled from "styled-components";
import CreateIcon from "@material-ui/icons/Create";

import Post from "../components/Post";
import Permit from "../shared/Permit";
import { Grid, Button } from "../elements";

import { history } from "../redux/configureStore";
import { useSelector } from "react-redux";

const PostList = (props) => {
  const post_list = useSelector((state) => state.post.list);
  return (
    <Grid relative>
      {post_list.map((post, idx) => (
        <Post key={post.id} {...post} />
      ))}

      <Permit>
        <Button is_circle width="50px" _onClick={() => history.push("/write")}>
          <CreateIcon />
        </Button>
      </Permit>
    </Grid>
  );
};

export default PostList;
