import React from "react";
import { Grid, Text, Button } from "../elements";

import { history } from "../redux/configureStore";

const Caution = (props) => {
  return (
    <Grid margin="100px 0px" padding="16px" center>
      <Text size="32px" bold>
        앗 잠깐!
      </Text>
      <Text size="16px">로그인 후에만 이용 할 수 있어요!</Text>
      <Button
        _onClick={() => {
          history.replace("/login");
        }}
      >
        로그인 하러 가기!
      </Button>
    </Grid>
  );
};

export default Caution;
