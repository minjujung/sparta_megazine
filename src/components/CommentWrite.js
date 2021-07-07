import React, { useState } from "react";
import { Grid, Input, Button } from "../elements";

import { useDispatch, useSelector } from "react-redux";
import { actionCreators as commentActions } from "../redux/modules/comment";

const CommentWrite = (props) => {
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");

  const { post_id } = props;

  const writeComment = (e) => {
    setComment(e.target.value);
  };

  const addComment = () => {
    dispatch(commentActions.addCommentFB(post_id, comment));
    setComment("");
  };
  return (
    <Grid is_flex padding="16px">
      <Input
        type="text"
        margin="0"
        placeholder="댓글 내용을 입력하세요 :)"
        value={comment}
        _onChange={writeComment}
        is_submit
        _onSubmit={addComment}
      />
      <Button _onClick={addComment}>추가</Button>
    </Grid>
  );
};

export default CommentWrite;
