import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

import { firestore } from "../../shared/firebase";
import moment from "moment";

const post_db = firestore.collection("post");
//action
const LOAD_POST = "LOAD_POST";
const ADD_POST = "ADD_POST";
const UPDATE_POST = "UPDATE_POST";
const DELETE_POST = "DELETE_POST";

//action creators
const loadPost = createAction(LOAD_POST, (post_list) => ({ post_list }));
const addPost = createAction(ADD_POST, (post) => ({ post }));
const updatePost = createAction(UPDATE_POST, (post, index) => ({
  post,
  index,
}));
const deletePost = createAction(DELETE_POST, (index) => ({ index }));

//initialstate
const initialState = {
  list: [],
};

const initialPost = {
  //   user_info: {
  //     user_name: "minju",
  //     user_profile:
  //       "https://user-images.githubusercontent.com/75834421/124404954-0be05f80-dd78-11eb-8048-0a5517211d3e.jpg",
  //   },
  //   id: 0,
  image_url:
    "https://user-images.githubusercontent.com/75834421/124404954-0be05f80-dd78-11eb-8048-0a5517211d3e.jpg",
  contents: "안녕! 무민!",
  like_cnt: 0,
  insert_dt: "2021-06-30 10:00:00",
};

//middleware
const loadPostFB = () => {
  return function (dispatch, getState, { history }) {
    post_db.get().then((docs) => {
      let post_list = [];
      docs.forEach((doc) => {
        let _post = doc.data();
        let post = {
          user_info: {
            user_id: _post.user_id,
            user_name: _post.user_name,
            user_profile: _post.user_profile,
          },
          id: doc.id,
          contents: _post.contents,
          like_cnt: _post.like_cnt,
          insert_dt: _post.insert_dt,
        };
        post_list.push(post);
      });
      dispatch(loadPost(post_list));
    });
  };
};

const addPostFB = (contents = "") => {
  return function (dispatch, getState, { history }) {
    const _user = getState().user.user;

    const user_info = {
      user_name: _user.user_name,
      user_id: _user.uid,
      user_profile: _user.user_profile,
    };

    const _post = {
      ...initialPost,
      contents,
      insert_dt: moment().format("YYYY-MM-DD hh:mm:ss"),
    };

    post_db
      .add({ ...user_info, ..._post })
      .then((doc) => {
        let post = { user_info, ..._post, id: doc.id };
        dispatch(addPost(post));
        history.replace("/");
      })
      .catch((err) => {
        console.log("post 작성 실패", err);
      });
  };
};

//reducer
export default handleActions(
  {
    [LOAD_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.post_list;
      }),
    [ADD_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list.unshift(action.payload.post);
      }),
    [UPDATE_POST]: (state, action) => produce(state, (draft) => {}),
    [DELETE_POST]: (state, action) => produce(state, (draft) => {}),
  },
  initialState
);

const actionCreators = {
  loadPostFB,
  addPostFB,
};

export { actionCreators };
