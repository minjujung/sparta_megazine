import React, { useEffect } from "react";
import { Grid, Image, Text } from "../elements";

import { useDispatch, useSelector } from "react-redux";
import { actionCreators as commentActions } from "../redux/modules/comment";

const CommentList = (props) => {
  const dispatch = useDispatch();
  const comment_list = useSelector((state) => state.comment.list);

  const { post_id } = props;

  useEffect(() => {
    if (!comment_list[post_id]) {
      dispatch(commentActions.getCommentFB(post_id));
    }
  }, []);

  //post_id를 props로 받아오고 그 post_id도 database에서 가져오므로
  //post_id가 없는 순간이 생기면서 comment_list[post_id]에 아무 것도 없게 된다
  //또는 달린 댓글이 없을때도 map함수를 돌리면 오류가 나므로 이 조건 추가해야함!
  if (!comment_list[post_id] || !post_id) {
    return null;
  }

  return (
    <>
      {comment_list[post_id].map((comment) => {
        return <CommentItem key={comment.id} {...comment} />;
      })}
    </>
  );
};

const CommentItem = (props) => {
  const { user_name, comment, user_profile, insert_dt } = props;
  return (
    <Grid is_flex padding="16px">
      <Image shape="circle" src={user_profile} />
      <Text>{user_name}</Text>
      <Text>{comment}</Text>
      <Text>{insert_dt}</Text>
    </Grid>
  );
};

export default CommentList;
