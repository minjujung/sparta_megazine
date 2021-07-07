import React, { useEffect, useRef, useState } from "react";
import { Grid, Title, Input, Button, Image, Text } from "../elements";
import Upload from "../components/Upload";

import { history } from "../redux/configureStore";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
import { actionCreators as imageActions } from "../redux/modules/image";

const WritePost = (props) => {
  const dispatch = useDispatch();
  const is_login = useSelector((state) => state.user.is_login);
  const preview = useSelector((state) => state.image.preview);
  const post_list = useSelector((state) => state.post.list);

  const post_id = props.match.params.id;
  const is_edit = post_id ? true : false;
  const _post = is_edit ? post_list.find((p) => p.id === post_id) : null;
  const [layout, setLayout] = useState(_post ? _post.layout : "");
  const [input, setInput] = useState(_post ? _post.contents : "");

  useEffect(() => {
    //수정 페이지에서 새로고침을 하면 rerendering이 되면서 reducer의
    // store안의 내용물이 사라진다..그래서 주소창에 post의 id값은 있지만(is_edit)
    // post는 없는 경우가 되므로 그때는 그냥 강제뒤로가기! 그러고 나서 끝나야 되므로
    // return! (여기서 return 안하면 밑에 것도 수행되면서 is_edit은 있고 post는 없는데
    //image_url 찾는다면서 오류발생!)
    if (is_edit && !_post) {
      console.log("포스트 정보가 없어요! ㅜㅜ");
      history.goBack();

      return;
    }

    if (is_edit) {
      dispatch(imageActions.setPreview(_post.image_url));
    }
  }, []);

  const addPost = () => {
    dispatch(postActions.addPostFB(input, layout));
  };

  const editPost = () => {
    dispatch(postActions.updatePostFB(post_id, { contents: input, layout }));
  };

  const is_checked = (e) => {
    if (e.target.checked) {
      setLayout(e.target.value);
    }
  };

  if (!is_login) {
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
  }

  return (
    <>
      <Grid padding="0 16px">
        <Title>{is_edit ? "게시물 수정" : "게시글 작성"}</Title>
        <Upload />
        <Text bold size="20px" margin="10px 0">
          레이아웃 고르기
        </Text>
      </Grid>

      <Grid>
        <input
          type="radio"
          name="layout"
          value="right"
          id="right"
          onChange={is_checked}
          checked={is_edit && layout === "right"}
        />
        <label htmlFor="right">오른쪽에 이미지 왼쪽에 텍스트</label>
      </Grid>
      <Grid is_flex>
        <Text>{input}</Text>
        <Image
          half
          shape="big_square"
          src={
            preview
              ? preview
              : "https://user-images.githubusercontent.com/75834421/124501682-fb25fd00-ddfc-11eb-93ec-c0330dff399b.jpg"
          }
        />
      </Grid>
      <Grid>
        <input
          type="radio"
          name="layout"
          value="left"
          id="left"
          onChange={is_checked}
          checked={is_edit && layout === "left"}
        />
        <label htmlFor="left">왼쪽에 이미지 오른쪽에 텍스트</label>
      </Grid>
      <Grid is_flex>
        <Image
          half
          shape="big_square"
          src={
            preview
              ? preview
              : "https://user-images.githubusercontent.com/75834421/124501682-fb25fd00-ddfc-11eb-93ec-c0330dff399b.jpg"
          }
        />
        <Text>{input}</Text>
      </Grid>
      <Grid>
        <input
          type="radio"
          name="layout"
          value="bottom"
          id="bottom"
          onChange={is_checked}
          checked={is_edit && layout === "bottom"}
        />
        <label htmlFor="bottom">하단에 이미지 상단에 텍스트</label>
      </Grid>
      <Grid>
        <Text>{input}</Text>
        <Image
          shape="big_square"
          src={
            preview
              ? preview
              : "https://user-images.githubusercontent.com/75834421/124501682-fb25fd00-ddfc-11eb-93ec-c0330dff399b.jpg"
          }
        />
      </Grid>

      <Grid padding="16px">
        <Input
          textarea
          value={input}
          label="게시물 내용"
          placeholder="게시글 작성"
          _onChange={(e) => {
            setInput(e.target.value);
          }}
        />
        {is_edit ? (
          <Button
            _onClick={editPost}
            _disabled={!preview || input === "" ? true : false}
          >
            게시글 수정
          </Button>
        ) : (
          <Button
            _onClick={addPost}
            _disabled={!preview || input === "" ? true : false}
          >
            게시글 작성
          </Button>
        )}
      </Grid>
    </>
  );
};

export default WritePost;
