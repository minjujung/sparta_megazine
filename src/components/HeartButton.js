import React, { useEffect, useState } from "react";
import { Text, Grid, Button } from "../elements";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

import { history } from "../redux/configureStore";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as likeActions } from "../redux/modules/like";

const HeartButton = (props) => {
  const dispatch = useDispatch();
  const like_list = useSelector((state) => state.like.list);
  const user_info = useSelector((state) => state.user.user);

  const { post_id } = props;
  useEffect(() => {
    if (like_list[post_id]?.includes(user_info?.uid)) {
      setToggle(true);
    } else {
      setToggle(false);
    }
  });

  const [toggle, setToggle] = useState(false);
  const updateHeart = () => {
    if (!user_info) {
      return (
        <Grid margin="100px 0px" padding="16px" center>
          <Text size="32px" bold>
            앗 잠깐!
          </Text>
          <Text size="16px">로그인 후에만 글을 쓸 수 있어요!</Text>
          <Button
            _onClick={() => {
              history.replace("/login");
            }}
          >
            로그인 하러 가기!
          </Button>
        </Grid>
      );
    } else if (!like_list[post_id]?.includes(user_info.uid)) {
      dispatch(likeActions.addLikeFB(post_id));
    } else if (like_list[post_id]?.includes(user_info.uid)) {
      dispatch(likeActions.cancelLikeFB(post_id));
    }
  };
  return (
    <>
      <Text _onClick={updateHeart}>
        {toggle ? <FavoriteIcon /> : <FavoriteBorderIcon />}
      </Text>
    </>
  );
};

export default HeartButton;
