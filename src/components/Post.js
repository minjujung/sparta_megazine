import React from "react";
import { Grid, Image, Text, Button } from "../elements";

const Post = (props) => {
  const { user_info, image_url, contents, like_cnt, insert_dt } = props;
  return (
    <>
      <Grid padding="16px">
        <Grid is_flex>
          <Grid width="30%" is_flex>
            <Image shape="circle" size="40" src={image_url} />
            <Text bold>{user_info.user_name}</Text>
          </Grid>
          <Grid width="40%" is_flex>
            <Text size="14px">{insert_dt}</Text>
            <Button width="45%" font_size="12px" padding="0px">
              수정
            </Button>
          </Grid>
        </Grid>
        <Text margin="0">{contents}</Text>
      </Grid>
      <Image shape="big_square" src={image_url} />
      <Grid is_flex padding="5px">
        <Text>좋아요 0개</Text>
        <Text>🤍</Text>
      </Grid>
    </>
  );
};

Post.defaultProps = {
  user_info: {
    user_name: "minju",
    user_profile:
      "https://user-images.githubusercontent.com/75834421/124404954-0be05f80-dd78-11eb-8048-0a5517211d3e.jpg",
  },
  image_url:
    "https://user-images.githubusercontent.com/75834421/124404954-0be05f80-dd78-11eb-8048-0a5517211d3e.jpg",
  contents: "안녕! 무민!",
  like_cnt: 0,
  insert_dt: "2021-06-30 10:00:00",
};

export default Post;
