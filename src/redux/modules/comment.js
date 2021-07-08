import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import firebase from "firebase/app";
import { firestore, realtime } from "../../shared/firebase";
import moment from "moment";
import { actionCreators as postActions } from "./post";

//action
const SET_COMMENT = "SET_COMMENT";
const ADD_COMMENT = "ADD_COMMENT";

//action creators
const setComment = createAction(SET_COMMENT, (post_id, comment_list) => ({
  post_id,
  comment_list,
}));
const addComment = createAction(ADD_COMMENT, (post_id, comment) => ({
  post_id,
  comment,
}));

//initialState
const initialState = {
  list: {},
};

//middleware
const addCommentFB = (post_id, comment) => {
  return function (dispatch, getState, { history }) {
    const commentDB = firestore.collection("comment");

    const user_info = getState().user.user;

    let new_comment = {
      post_id,
      user_name: user_info.user_name,
      user_id: user_info.uid,
      user_profie: user_info.user_profile,
      comment,
      insert_dt: moment().format("YYYY-MM-DD hh:mm:ss"),
    };

    commentDB.add(new_comment).then((doc) => {
      const postDB = firestore.collection("post");

      const post = getState().post.list.find((p) => p.id === post_id);

      const increment = firebase.firestore.FieldValue.increment(1);

      new_comment = { ...new_comment, id: doc.id };

      postDB
        .doc(post_id)
        .update({ comment_cnt: increment })
        .then((_post) => {
          dispatch(addComment(post_id, new_comment));

          if (post) {
            dispatch(
              postActions.updatePost(post_id, {
                comment_cnt: parseInt(post.comment_cnt) + 1,
              })
            );

            const _noti_item = realtime
              .ref(`noti/${post.user_info.user_id}/list`)
              .push();
            _noti_item.set(
              {
                post_id: post.id,
                user_name: new_comment.user_name,
                image_url: post.image_url,
                insert_dt: new_comment.insert_dt,
              },
              (err) => {
                if (err) {
                  console.log("알림 저장에 실패했어요 8ㅛ8");
                } else {
                  const notiDB = realtime.ref(`noti/${post.user_info.user_id}`);
                  if (comment.user_id !== post.user_info.user_id) {
                    notiDB.update({ read: false });
                  }
                }
              }
            );
          }
        });
    });
  };
};

const getCommentFB = (post_id) => {
  return function (dispatch, getState, { history }) {
    if (!post_id) {
      return;
    }

    const commentDB = firestore.collection("comment");

    commentDB
      .where("post_id", "==", post_id)
      .orderBy("insert_dt", "desc")
      .get()
      .then((docs) => {
        let list = [];
        docs.forEach((doc) => {
          list.push({ ...doc.data(), id: doc.id });
        });
        dispatch(setComment(post_id, list));
      })
      .catch((error) => {
        console.log("댓글 정보를 가지고 올수가 없어요ㅠㅠ", error);
      });
  };
};

//reducer
export default handleActions(
  {
    [SET_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        draft.list[action.payload.post_id] = action.payload.comment_list;
      }),
    [ADD_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        draft.list[action.payload.post_id].unshift(action.payload.comment);
      }),
  },
  initialState
);

const actionCreators = {
  setComment,
  addComment,
  getCommentFB,
  addCommentFB,
};

export { actionCreators };
