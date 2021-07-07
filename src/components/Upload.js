import React, { useRef, useState } from "react";
import { Input, Grid, Button } from "../elements";

import { useDispatch, useSelector } from "react-redux";
import { actionCreators as imageActions } from "../redux/modules/image";

const Upload = (props) => {
  const dispatch = useDispatch();
  const uploading = useSelector((state) => state.image.uploading);
  const fileInput = useRef();
  const [fileName, setFileName] = useState("");

  const selectFile = (e) => {
    const reader = new FileReader();
    const file = fileInput.current.files[0];

    // 파일 내용을 읽어옵니다.
    reader.readAsDataURL(file);

    // 읽기가 끝나면 발생하는 이벤트 핸들러예요! :)
    reader.onloadend = () => {
      // reader.result는 파일의 컨텐츠(내용물)입니다!
      dispatch(imageActions.setPreview(reader.result));
    };
    setFileName(e.target.value.split("\\")[2]);
  };

  return (
    <>
      <Grid is_flex>
        <Input
          width="80%"
          type="text"
          placeholder="사진을 선택해주세용!"
          value={fileName}
          margin="0"
          disabled
        />
        <Button width="20%">
          <label htmlFor="file">파일 찾기</label>
        </Button>
        <input
          id="file"
          ref={fileInput}
          type="file"
          style={{ display: "none" }}
          disabled={uploading}
          onChange={selectFile}
        />
      </Grid>
    </>
  );
};

export default Upload;
