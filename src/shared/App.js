import { Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { useEffect } from "react";
import styled from "styled-components";

import { history } from "../redux/configureStore";
import { apiKey } from "./firebase";
import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";

import PostList from "../pages/PostList";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Header from "../components/Header";
import WritePost from "../pages/WritePost";
import { Grid } from "../elements";
import PostDetail from "../pages/PostDetail";
import Caution from "../pages/Caution";
import NotiDetail from "../pages/NotiDetail";

function App() {
  const dispatch = useDispatch();

  const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;
  const is_session = sessionStorage.getItem(_session_key) ? true : false;

  useEffect(() => {
    if (is_session) {
      dispatch(userActions.loginCheckFB());
    }
  }, []);

  return (
    <div className="App">
      <Container>
        <Grid>
          <ConnectedRouter history={history}>
            <Header />
            <Route exact path="/" component={PostList} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/write" component={WritePost} />
            <Route exact path="/write/:id" component={WritePost} />
            <Route exact path="/post/:id" component={PostDetail} />
            <Route exact path="/noti" component={NotiDetail} />
            <Route exact path="/caution" component={Caution} />
          </ConnectedRouter>
        </Grid>
      </Container>
    </div>
  );
}

const Container = styled.div`
  width: 1000px;
  margin: 0 auto;
`;

export default App;
