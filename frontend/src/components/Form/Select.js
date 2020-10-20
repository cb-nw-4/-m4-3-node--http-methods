import React from "react";
import styled from "styled-components";

const Select = ({ label, htmlFor, selection, handleChange, options }) => {
  return (
    <Wrapper>
      <label htmlFor={htmlFor}>{label}</label>
      <select
        value={selection}
        onChange={(ev) => handleChange(ev.target.value, htmlFor)}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-bottom: 6px;

  label {
    display: none;
  }

  select {
    background: #fff;
    border: 1px solid #e4e8eb;
    border-radius: 3px;
    color: #433c71;
    font-size: 15px;
    font-weight: 600;
    height: 40px;
    padding: 0 8px;
    width: 100%;
  }
`;

export default Select;
