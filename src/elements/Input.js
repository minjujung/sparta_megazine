import React from "react";
import styled from "styled-components";
import { Text } from "../elements";

const Input = (props) => {
  const {
    label,
    type,
    placeholder,
    value,
    _onChange,
    is_submit,
    _onSubmit,
    textarea,
    margin,
    width,
  } = props;

  if (is_submit) {
    return (
      <label>
        <Text margin="5px 0">{label}</Text>
        <InputField
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={_onChange}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              _onSubmit(e);
            }
          }}
        />
      </label>
    );
  } else if (textarea) {
    return (
      <label>
        <Text margin="5px 0">{label}</Text>
        <TextAreaField
          value={value}
          rows={10}
          placeholder={placeholder}
          onChange={_onChange}
        />
      </label>
    );
  } else {
    return (
      <label>
        <Text margin="5px 0">{label}</Text>
        <InputField
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={_onChange}
          style={{ margin, width }}
        />
      </label>
    );
  }
};

Input.defaultProps = {
  label: false,
  type: "text",
  placeholder: "입력해주세용!",
  value: "",
  is_submit: false,
  is_upload: false,
  _onChange: () => {},
  _onSubmit: () => {},
  margin: false,
  width: false,
};

const InputField = styled.input`
  ${(props) => (props.width ? `width: ${props.width};` : `width: 100%;`)}
  min-width: 230px;
  box-sizing: border-box;
  padding: 10px;
  border: 2px solid #25ccf7;
  border-radius: 3px;
  ${(props) =>
    props.margin ? `margin: ${props.margin};` : `margin-bottom: 20px;`}
  &:focus {
    outline: none;
    border: 2px solid #1b9cfc;
  }

  @media (max-width: 280px) {
    min-width: 150px;
  }
`;

const TextAreaField = styled.textarea`
  ${(props) => (props.is_upload ? `display: none;` : "")}
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  border: 2px solid #25ccf7;
  border-radius: 3px;
  margin-bottom: 20px;
  &:focus {
    outline: none;
    border: 2px solid #1b9cfc;
  }
`;

export default Input;
