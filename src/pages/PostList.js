import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CreateIcon from "@material-ui/icons/Create";

import Post from "../components/Post";
import Permit from "../shared/Permit";
import { Grid, Button } from "../elements";

import { history } from "../redux/configureStore";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
import { actionCreators as likeActions } from "../redux/modules/like";
import InfinityScroll from "../shared/InfinityScroll";

const PostList = (props) => {
  const dispatch = useDispatch();
  const { list, is_loading, paging } = useSelector((state) => state.post);
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    if (list.length < 2) {
      dispatch(postActions.loadPostFB());
    }
  }, []);
  return (
    <Grid relative>
      <InfinityScroll
        callNext={() => {
          dispatch(postActions.loadPostFB(paging.next));
        }}
        is_next={paging.next ? true : false}
        loading={is_loading}
      >
        {list.map((post, idx) => {
          //로그인 했을 때만 체크하기 위해 optional chaining(user?.uid)사용
          if (post.user_info.user_id === user?.uid) {
            return <Post key={post.id} {...post} is_me />;
          } else {
            return <Post key={post.id} {...post} />;
          }
        })}
      </InfinityScroll>
      <Permit>
        <Button is_circle width="50px" _onClick={() => history.push("/write")}>
          <CreateIcon />
        </Button>
      </Permit>
    </Grid>
  );
};

export default PostList;
