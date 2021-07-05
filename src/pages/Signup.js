import React from "react";
import { Grid, Title, Input, Button } from "../elements";

const Signup = (props) => {
  return (
    <Grid padding="16px">
      <Title>회원가입</Title>
      <Input label="아이디" placeholder="아이디를 입력해주세용!" />
      <Input label="닉네임" placeholder="닉네임를 입력해주세용!" />
      <Input label="비밀번호" placeholder="비밀번호를 입력해주세용!" />
      <Input label="비밀번호" placeholder="비밀번호를 다시 입력해주세용!" />
      <Button margin="30px 0">회원가입하기</Button>
    </Grid>
  );
};

export default Signup;
