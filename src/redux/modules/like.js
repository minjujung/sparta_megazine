import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { firestore } from "../../shared/firebase";
import moment from "moment";

import firebase from "firebase/app";

import { actionCreators as postActions } from "./post";

const SET_LIKE = "SET_LIKE";
const ADD_LIKE = "ADD_LIKE";
const CANCEL_LIKE = "CANCEL_LIKE";

const setLike = createAction(SET_LIKE, (post_id, user) => ({
  post_id,
  user,
}));
const addLike = createAction(ADD_LIKE, (post_id, user_id) => ({
  post_id,
  user_id,
}));

const initialState = {
  list: {},
};

const getLikeFB = (post_id) => {
  return function (dispatch, getState, { history }) {
    if (!post_id) {
      return;
    }

    const likeDB = firestore.collection("like");

    likeDB
      .where("post_id", "==", post_id)
      .get()
      .then((docs) => {
        let list = [];
        docs.forEach((doc) => {
          list.push(doc.data().user_id);
        });
        console.log(list);

        dispatch(setLike(post_id, list));
      })
      .catch((error) => {
        console.log("좋아요 정보를 가져올 수가 없네요ㅜㅜ", error);
      });
  };
};

const addLikeFB = (post_id) => {
  return function (dispatch, getState, { history }) {
    const likeDB = firestore.collection("like");
    const user_info = getState().user.user;

    let like = {
      post_id: post_id,
      user_id: user_info.uid,
      insert_dt: moment().format("YYYY-MM-DD hh:mm:ss"),
    };
    console.log(like);
    likeDB.add(like).then((doc) => {
      const postDB = firestore.collection("post");

      const post = getState().post.list.find((l) => l.id === post_id);

      const increment = firebase.firestore.FieldValue.increment(1);

      like = { ...like, id: doc.id };

      postDB
        .doc(post_id)
        .update({ like_cnt: increment })
        .then((_post) => {
          dispatch(addLike(post_id, like));
          console.log(like.user_id, post.user_info.user_id);

          if (post) {
            dispatch(
              postActions.editPost(post_id, {
                like_cnt: parseInt(post.like_cnt) + 1,
              })
            );
          }
        });
    });
  };
};

export default handleActions(
  {
    [SET_LIKE]: (state, action) =>
      produce(state, (draft) => {
        draft.list[action.payload.post_id] = action.payload.user;
      }),
    [ADD_LIKE]: (state, action) =>
      produce(state, (draft) => {
        draft.list[action.payload.post_id].unshift(action.payload.like);
      }),
    [CANCEL_LIKE]: (state, action) => produce(state, (draft) => {}),
  },
  initialState
);

const actionCreators = {
  getLikeFB,
  addLikeFB,
};

export { actionCreators };
