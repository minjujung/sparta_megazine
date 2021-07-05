import styled from "styled-components";
import { BrowserRouter, Route } from "react-router-dom";

import PostList from "../pages/PostList";
import Login from "../pages/Login";
import Signup from "../pages/Signup";

function App() {
  return (
    <div className="App">
      <Container>
        <BrowserRouter>
          <Route exact path="/" component={PostList} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
        </BrowserRouter>
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
