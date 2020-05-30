import React from 'react';
import styled from 'styled-components';

const Search = ({ inputValue, onChange }) => {
  return (
    <InputStyle>
      <input type='text' name='name' value={inputValue} onChange={onChange} placeholder='Enter a name...' />
    </InputStyle>
  );
};
const InputStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;

  input {
    width: 60%;
    height: 3rem;
    border-radius: 10px;
    border: none;
    padding-left: 1rem;
    font-family: 'Manrope', sans-serif;
    outline: none;
    background-color: #f8f4e0;
  }
`;
export default Search;
