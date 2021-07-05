import styled from "styled-components";
import { Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { useEffect } from "react";

import { history } from "../redux/configureStore";
import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { actionCreators as postActions } from "../redux/modules/post";

import PostList from "../pages/PostList";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Header from "../components/Header";
import WritePost from "../pages/WritePost";
import { Grid } from "../elements";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userActions.loginCheckFB());
    dispatch(postActions.loadPostFB());
  });

  return (
    <div className="App">
      <Grid>
        <ConnectedRouter history={history}>
          <Header />
          <Route exact path="/" component={PostList} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/write" component={WritePost} />
        </ConnectedRouter>
      </Grid>
    </div>
  );
}

export default App;
