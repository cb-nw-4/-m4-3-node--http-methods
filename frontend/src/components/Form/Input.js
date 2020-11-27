import React from "react";
import styled, { css } from "styled-components";

const Input = ({ name, type, placeholder, handleChange, error }) => {
  return (
    <Wrapper error={error}>
      <label htmlFor={name}>{placeholder}</label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={(ev) => handleChange(ev.target.value, name)}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-bottom: 6px;
  width: 100%;
  position: relative;

  label {
    display: none;
  }

  input {
    border-radius: 3px;
    border: 1px solid #e4e8eb;
    box-sizing: border-box;
    color: #464a5c;
    font-size: 15px;
    font-weight: 300;
    height: 36px;
    padding: 8px 12px 10px 12px;
    width: 100%;
    ${(props) => {
      return (
        props.error &&
        css`
          border: 1px solid red;
        `
      );
    }}
    &::placeholder {
      color: #999;
    }
  }
`;

export default Input;
