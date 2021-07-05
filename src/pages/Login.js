import React, { useState } from "react";
import { Grid, Title, Input, Button } from "../elements";
import { emailCheck } from "../shared/check";

import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";

const Login = (props) => {
  const dispatch = useDispatch();

  const [id, setId] = useState("");
  const [pwd, setPwd] = useState("");

  const login = () => {
    if (!emailCheck(id)) {
      window.alert("이메일 형식이 올바르지 않습니다!");
    }

    dispatch(userActions.loginFB(id, pwd));
  };

  return (
    <Grid padding="16px">
      <Title>로그인</Title>
      <Input
        value={id}
        label="아이디"
        placeholder="아이디를 입력해주세용!"
        _onChange={(e) => {
          setId(e.target.value);
        }}
      />
      <Input
        value={pwd}
        type="password"
        label="비밀번호"
        placeholder="비밀번호를 입력해주세용!"
        _onChange={(e) => {
          setPwd(e.target.value);
        }}
        is_submit
        _onSubmit={login}
      />
      <Button
        margin="30px 0"
        _onClick={login}
        _disabled={id === "" || pwd === "" ? true : false}
      >
        로그인하기
      </Button>
    </Grid>
  );
};

export default Login;
