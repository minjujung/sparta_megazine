import styled from "styled-components";
import { Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { useEffect } from "react";

import { history } from "../redux/configureStore";
import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";

import PostList from "../pages/PostList";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Header from "../components/Header";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userActions.loginCheckFB());
  });

  return (
    <div className="App">
      <Container>
        <ConnectedRouter history={history}>
          <Header />
          <Route exact path="/" component={PostList} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
        </ConnectedRouter>
      </Container>
    </div>
  );
}

const Container = styled.div`
  max-width: 350px;
  min-height: 90vh;
  background-color: #fff;
  margin: 20px auto;
  border-radius: 5px;
  border: 1px solid #ddd;
`;

export default App;
