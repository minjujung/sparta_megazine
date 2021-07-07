import React, { useEffect, useState } from "react";
import { Grid, Image, Text, Button } from "../elements";

import { history } from "../redux/configureStore";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as likeActions } from "../redux/modules/like";
import HeartButton from "./HeartButton";

const Post = (props) => {
  const dispatch = useDispatch();
  const list = useSelector((state) => state.like.list);
  const {
    user_info,
    image_url,
    contents,
    like_cnt,
    insert_dt,
    id,
    layout,
    comment_cnt,
  } = props;

  useEffect(() => {
    dispatch(likeActions.getLikeFB(id));
  }, []);
  return (
    <>
      <Grid padding="16px">
        <Grid is_flex>
          <Grid width="30%" is_flex>
            <Image shape="circle" size="40" src={props.src} />
            <Text bold>{user_info.user_name}</Text>
          </Grid>
          <Grid width="40%" is_flex>
            <Text size="14px">{insert_dt}</Text>
            {props.is_me && (
              <Button
                width="45%"
                font_size="12px"
                padding="0"
                _onClick={() => {
                  history.push(`/write/${id}`);
                }}
              >
                수정
              </Button>
            )}
          </Grid>
        </Grid>
      </Grid>

      {layout === "right" && (
        <Grid>
          <Grid
            is_flex
            _onClick={() => {
              history.push(`/post/${id}`);
            }}
          >
            <Text>{contents}</Text>
            <Image half shape="big_square" src={image_url} />
          </Grid>
          <Grid is_flex padding="5px">
            <Text>좋아요 {like_cnt}개</Text>
            <Text>댓글 {comment_cnt}개</Text>
            <HeartButton post_id={id}></HeartButton>
          </Grid>
        </Grid>
      )}
      {layout === "left" && (
        <Grid>
          <Grid
            is_flex
            _onClick={() => {
              history.push(`/post/${id}`);
            }}
          >
            <Image half shape="big_square" src={image_url} />
            <Text>{contents}</Text>
          </Grid>
          <Grid is_flex padding="5px">
            <Text>좋아요 {like_cnt}개</Text>
            <Text>댓글 {comment_cnt}개</Text>
            <HeartButton post_id={id}></HeartButton>
          </Grid>
        </Grid>
      )}
      {layout === "bottom" && (
        <Grid>
          <Grid
            _onClick={() => {
              history.push(`/post/${id}`);
            }}
          >
            <Text margin="0">{contents}</Text>
            <Image shape="big_square" src={image_url} />
          </Grid>
          <Grid is_flex padding="5px">
            <Text>좋아요 {like_cnt}개</Text>
            <Text>댓글 {comment_cnt}개</Text>
            <HeartButton post_id={id}></HeartButton>
          </Grid>
        </Grid>
      )}
    </>
  );
};

Post.defaultProps = {
  user_info: {
    user_name: "minju",
    user_profile:
      "https://user-images.githubusercontent.com/75834421/124404954-0be05f80-dd78-11eb-8048-0a5517211d3e.jpg",
  },
  image_url:
    "https://user-images.githubusercontent.com/75834421/124404954-0be05f80-dd78-11eb-8048-0a5517211d3e.jpg",
  contents: "안녕! 무민!",
  like_cnt: 0,
  comment_cnt: 0,
  insert_dt: "2021-06-30 10:00:00",
};

export default Post;
