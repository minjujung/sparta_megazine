import React from "react";
import { Grid, Title, Input, Button } from "../elements";

const Login = (props) => {
  return (
    <Grid padding="16px">
      <Title>로그인</Title>
      <Input label="아이디" placeholder="아이디를 입력해주세용!" />
      <Input label="비밀번호" placeholder="비밀번호를 입력해주세용!" />
      <Button margin="30px 0">로그인하기</Button>
    </Grid>
  );
};

export default Login;
