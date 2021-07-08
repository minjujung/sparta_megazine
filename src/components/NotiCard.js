import React from "react";
import { Grid, Image, Text } from "../elements";

import { history } from "../redux/configureStore";

const NotiCard = (props) => {
  console.log(props);
  const { image_url, user_name, post_id } = props;
  return (
    <Grid
      _onClick={() => {
        history.push(`/post/${post_id}`);
      }}
      padding="16px"
      is_flex
      bg="#ffffff"
      margin="0 0 10px 0"
    >
      <Grid width="auto" margin="0 8px 0 0">
        <Image size="90" shape="small_square" src={image_url} />
      </Grid>
      <Grid>
        <Text>
          <strong>{user_name}</strong> 님이 게시글에 댓글을 남겼습니다
        </Text>
      </Grid>
    </Grid>
  );
};

NotiCard.defaultProps = {
  image_url: "",
  user_name: "",
  post_id: null,
};

export default NotiCard;
