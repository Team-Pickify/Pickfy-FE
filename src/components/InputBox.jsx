import React from "react";
import styled from "styled-components";


const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  background-color: #fff;
  border-radius: 4.75rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 0.9375rem 2.125rem;
`;

const InputField = styled.input`
  flex: 1;
  border: none;
  outline: none;
  font-size: 0.875rem;
  color: #000;
  background: transparent;
  &::-webkit-input-placeholder {
    color: #e6e6e6; 
  }
`;

const Icon = styled.div`
  display: flex; 
  align-items: center; 
  justify-content: center;
  cursor: pointer;
  color: #E6E6E6;
`;


const InputBox = ({ type = "text", placeholder, value, onChange, icon, onIconClick }) => {
  return (
    <Container>
      <InputField 
        type={type} 
        placeholder={placeholder}
        value={value} 
        onChange={onChange} />
      {icon && <Icon onClick={onIconClick}>{icon}</Icon>}
    </Container>
  );
};

export default InputBox;