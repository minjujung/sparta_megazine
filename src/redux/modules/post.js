import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

import { actionCreators as imageActions } from "./image";
import { firestore, storage } from "../../shared/firebase";
import moment from "moment";

const post_db = firestore.collection("post");
//action
const LOAD_POST = "LOAD_POST";
const ADD_POST = "ADD_POST";
const UPDATE_POST = "UPDATE_POST";
const DELETE_POST = "DELETE_POST";

//action creators
const loadPost = createAction(LOAD_POST, (post_list) => ({ post_list }));
const addPost = createAction(ADD_POST, (post, layout) => ({ post, layout }));
const updatePost = createAction(UPDATE_POST, (new_post, post_id) => ({
  new_post,
  post_id,
}));
const deletePost = createAction(DELETE_POST, (post_id) => ({ post_id }));

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
  image_url: "",
  contents: "안녕! 무민!",
  like_cnt: 0,
  insert_dt: "2021-06-30 10:00:00",
  layout: "bottom",
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
          image_url: _post.image_url,
          contents: _post.contents,
          like_cnt: _post.like_cnt,
          insert_dt: _post.insert_dt,
          layout: _post.layout,
        };
        console.log(post);
        post_list.push(post);
      });
      dispatch(loadPost(post_list));
    });
  };
};

const loadOnePostFB = (id) => {
  return function (dispatch, getState, { history }) {
    const postDB = firestore.collection("post");
    postDB
      .doc(id)
      .get()
      .then((doc) => {
        console.log(doc);
        console.log(doc.data());

        let _post = doc.data();
        // firebase에서 가져온걸 바로 쓸려면 우리가 원하는 형태로 바꿔주고 사용
        let post = Object.keys(_post).reduce(
          (acc, cur) => {
            if (cur.indexOf("user_") !== -1) {
              return {
                ...acc,
                user_info: { ...acc.user_info, [cur]: _post[cur] },
              };
            }
            return { ...acc, [cur]: _post[cur] };
          },
          { id: doc.id, user_info: {} }
        );
        dispatch(loadPost([post]));
      });
  };
};

const addPostFB = (contents = "", layout = "bottom") => {
  return function (dispatch, getState, { history }) {
    const _user = getState().user.user;

    const user_info = {
      user_name: _user.user_name,
      user_id: _user.uid,
      user_profile: _user.user_profile,
    };

    const _post = {
      ...initialPost,
      layout,
      contents,
      insert_dt: moment().format("YYYY-MM-DD hh:mm:ss"),
    };

    const _image = getState().image.preview;

    const _upload = storage
      .ref(`images/${user_info.user_id}_${new Date().getTime()}`)
      .putString(_image, "data_url");

    //원시 문자열, base64, base64url 또는
    //data_url로 인코딩된 문자열을 Cloud Storage에 추가할 수 있습니다.
    _upload
      .then((snapshot) => {
        snapshot.ref
          .getDownloadURL()
          .then((url) => {
            dispatch(imageActions.uploadImage(url));
            return url;
          })
          .then((url) => {
            post_db
              .add({ ...user_info, ..._post, image_url: url })
              .then((doc) => {
                let post = { user_info, ..._post, id: doc.id, image_url: url };
                dispatch(addPost(post));
                history.replace("/");
                dispatch(imageActions.setPreview(null));
              })
              .catch((err) => {
                window.alert("앗! 포스터 작성에 문제가 있어요!");
                console.log("post 작성에 실패했어요ㅜㅜ", err);
              });
          });
      })
      .catch((err) => {
        window.alert("앗! 이미지 업로드에 문제가 있어요!");
        console.log("앗! 이미지 업로드에 문제가 있어요!", err);
      });
  };
};

const updatePostFB = (new_post = {}, post_id = null) => {
  return function (dispatch, getState, { history }) {
    if (!post_id) {
      console.log("게시물 정보가 없습니다ㅜㅜ");
      return;
    }
    const _image = getState().image.preview;

    const _user = getState().user.user;

    const post_idx = getState().post.list.findIndex((p) => p.id === post_id);
    const _post = getState().post.list[post_idx];

    if (_image === _post.image_url) {
      post_db
        .doc(post_id)
        .update(new_post)
        .then((doc) => {
          dispatch(updatePost({ ...new_post }, post_id));
          history.replace("/");
          dispatch(imageActions.setPreview(null));
          console.log("같다");
        });
    } else {
      const _upload = storage
        .ref(`images/${_user.uid}_${new Date().getTime()}`)
        .putString(_image, "data_url");

      //원시 문자열, base64, base64url 또는
      //data_url로 인코딩된 문자열을 Cloud Storage에 추가할 수 있습니다.
      _upload
        .then((snapshot) => {
          snapshot.ref
            .getDownloadURL()
            .then((url) => {
              dispatch(imageActions.uploadImage(url));
              return url;
            })
            .then((url) => {
              post_db
                .doc(post_id)
                .update({ ...new_post, image_url: url })
                .then((doc) => {
                  dispatch(
                    updatePost(post_id, { ...new_post, image_url: url })
                  );
                  console.log("다르다");
                  history.replace("/");
                  dispatch(imageActions.setPreview(null));
                })
                .catch((err) => {
                  window.alert("앗! 포스터 작성에 문제가 있어요!");
                  console.log("post 작성에 실패했어요ㅜㅜ", err);
                });
            });
        })
        .catch((err) => {
          window.alert("앗! 이미지 업로드에 문제가 있어요!");
          console.log("앗! 이미지 업로드에 문제가 있어요!", err);
        });
    }
  };
};

const deletePostFB = (post_id) => {
  return function (dispatch, getState, { history }) {
    post_db
      .doc(post_id)
      .delete()
      .then(() => {
        history.replace("/");
        dispatch(deletePost(post_id));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

//reducer
export default handleActions(
  {
    [LOAD_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.post_list;
        //   draft.list.push(...action.payload.post_list);

        //   draft.list = draft.list.reduce((acc, cur) => {
        //     if (acc.findIndex((a) => a.id === cur.id) === -1) {
        //       return [...acc, cur];
        //     } else {
        //       acc[acc.findIndex((a) => a.id === cur.id)] = cur;
        //       return acc;
        //     }
        //   }, []);
      }),
    [ADD_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list.unshift(action.payload.post);
      }),
    [UPDATE_POST]: (state, action) =>
      produce(state, (draft) => {
        let idx = draft.list.findIndex((l) => l.id === action.payload.post_id);

        draft.list[idx] = { ...draft.list[idx], ...action.payload.new_post };
      }),
    [DELETE_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list = draft.list.filter((l) => l.id !== action.payload.post_id);
      }),
  },
  initialState
);

const actionCreators = {
  loadPostFB,
  addPostFB,
  loadOnePostFB,
  updatePostFB,
  deletePostFB,
};

export { actionCreators };
