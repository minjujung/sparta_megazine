import React from "react";
import { Grid, Button, Text } from "../elements";

import { history } from "../redux/configureStore";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { apiKey } from "../shared/firebase";

const Header = (props) => {
  const dispatch = useDispatch();
  const is_login = useSelector((state) => state.user.user);

  const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;
  const is_session = sessionStorage.getItem(_session_key) ? true : false;

  if (is_session && is_login) {
    return (
      <Grid is_flex padding="16px">
        <Text
          _onClick={() => {
            window.location.replace("/");
          }}
          is_click
        >
          Cloud
        </Text>
        <Grid is_flex width="70%">
          <Button margin="0 10px 0 0">내정보</Button>
          <Button margin="0 10px 0 0">알림</Button>
          <Button
            _onClick={() => {
              dispatch(userActions.logoutFB());
              window.location.reload();
            }}
          >
            로그아웃
          </Button>
        </Grid>
      </Grid>
    );
  }
  return (
    <Grid is_flex padding="16px">
      <Text
        _onClick={() => {
          history.push("/");
        }}
        is_click
      >
        Cloud
      </Text>
      <Grid is_flex width="50%">
        <Button
          margin="0 10px 0 0"
          _onClick={() => {
            history.push("/signup");
          }}
        >
          회원가입
        </Button>
        <Button
          _onClick={() => {
            history.push("/login");
          }}
        >
          로그인
        </Button>
      </Grid>
    </Grid>
  );
};

export default Header;
