import React from "react";
import styled from "styled-components";
import { Text } from "../elements";

const Input = (props) => {
  const { label, type, placeholder, value, _onChange, is_submit, _onSubmit } =
    props;
  return (
    <>
      {is_submit ? (
        <label>
          <Text>{label}</Text>
          <InputField
            id="input_field"
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
      ) : (
        <label>
          <Text margin="5px 0">{label}</Text>
          <InputField
            id="input_field"
            type={type}
            value={value}
            placeholder={placeholder}
            onChange={_onChange}
          />
        </label>
      )}
    </>
  );
};

Input.defaultProps = {
  label: false,
  type: "text",
  placeholder: "입력해주세용!",
  value: "",
  is_submit: false,
  _onChange: () => {},
  _onSubmit: () => {},
};

const InputField = styled.input`
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
