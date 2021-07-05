import React, { useState } from "react";
import { Grid, Title, Input, Button, Image, Text } from "../elements";

import { useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";

const WritePost = (props) => {
  const dispatch = useDispatch();
  const [file, setFile] = useState("");
  const [input, setInput] = useState("");
  return (
    <>
      <Grid padding="16px">
        <Title>게시글 작성</Title>
        <Grid is_flex>
          <Input type="text" placeholder="사진을 선택해주세용!" value={file} />
          <Input
            type="file"
            _onChange={(e) => {
              setFile(e.target.value.split("\\")[2]);
            }}
            is_upload
          />
        </Grid>
        <Text bold size="20px" margin="0">
          미리보기
        </Text>
      </Grid>
      <Image shape="big_square" />
      <Grid padding="16px">
        <Input
          textarea
          value={input}
          label="게시물 내용"
          placeholder="게시글 작성"
          _onChange={(e) => {
            setInput(e.target.value);
          }}
        />
        <Button
          _onClick={() => {
            dispatch(postActions.addPostFB(input));
          }}
        >
          게시글 작성
        </Button>
      </Grid>
    </>
  );
};

export default WritePost;
