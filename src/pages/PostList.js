import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CreateIcon from "@material-ui/icons/Create";

import Post from "../components/Post";
import Permit from "../shared/Permit";
import { Grid, Button } from "../elements";

import { history } from "../redux/configureStore";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";

const PostList = (props) => {
  const dispatch = useDispatch();
  const post_list = useSelector((state) => state.post.list);
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    // if (post_list.length < 2) {
    dispatch(postActions.loadPostFB());
    // }
  }, []);
  return (
    <Grid relative>
      {post_list.map((post, idx) => {
        //로그인 했을 때만 체크하기 위해 optional chaining(user?.uid)사용
        if (post.user_info.user_id === user?.uid) {
          return (
            <Grid
              bg="#ffffff"
              margin="8px 0px"
              key={post.id}
              _onClick={() => {
                history.push(`/post/${post.id}`);
              }}
            >
              <Post key={post.id} {...post} is_me />
            </Grid>
          );
        } else {
          return (
            <Grid
              bg="#ffffff"
              margin="8px 0px"
              key={post.id}
              _onClick={() => {
                history.push(`/post/${post.id}`);
              }}
            >
              <Post key={post.id} {...post} />
            </Grid>
          );
        }
      })}

      <Permit>
        <Button is_circle width="50px" _onClick={() => history.push("/write")}>
          <CreateIcon />
        </Button>
      </Permit>
    </Grid>
  );
};

export default PostList;
