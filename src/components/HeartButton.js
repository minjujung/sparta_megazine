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
      return history.replace("/caution");
    } else if (!like_list[post_id]?.includes(user_info.uid)) {
      dispatch(likeActions.addLikeFB(post_id));
    } else if (like_list[post_id]?.includes(user_info.uid)) {
      dispatch(likeActions.cancelLikeFB(post_id));
    }
  };
  return (
    <>
      <Text _onClick={updateHeart}>
        <FavoriteIcon style={toggle ? { color: "pink" } : { color: "grey" }} />
      </Text>
    </>
  );
};

export default HeartButton;
