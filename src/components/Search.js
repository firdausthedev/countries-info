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
  margin-top: 2rem;

  input {
    width: 40%;
    height: 3rem;
    border-radius: 10px;
    border: 1px solid black;
    padding-left: 2rem;
    font-size: 1.2rem;
    font-family: 'Manrope', sans-serif;
    outline: none;
  }
`;
export default Search;
