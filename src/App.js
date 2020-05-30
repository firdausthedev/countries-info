import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Card from './components/Card';
import Search from './components/Search';
import axios from 'axios';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [countriesName, setCountriesName] = useState([]);
  const [loading, setLoading] = useState(false);
  console.log('1');

  useEffect(() => {
    getCountriesNames();
    console.log('2');
  }, []);

  const getCountriesNames = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`https://restcountries.eu/rest/v2/all`);
      setCountriesName(res.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const onChange = (e) => {
    const inputText = e.target.value;
    setInputValue(inputText);
  };
  const filteredCountriesName = countriesName.filter(
    (c) => c.name.toLowerCase().includes(inputValue.toLowerCase()) || c.name.includes(inputValue) // filtered whether user typed with lowercase or uppercase
  );

  return (
    <AppStyle>
      {console.log('3')}
      <GlobalStyle />
      <h1>Countries Name</h1>
      <Search inputValue={inputValue} onChange={onChange} />
      <CardListStyle>
        {!loading ? filteredCountriesName.map((c, index) => <Card key={index} countryInfo={c} />) : <h2>Loading...</h2>}
        {!filteredCountriesName.length && !loading && <p>No country found..</p>}
      </CardListStyle>
    </AppStyle>
  );
}

const GlobalStyle = createGlobalStyle`
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
 }

body {
  font-family: 'Manrope', sans-serif;
  background-color: #e5c0a1;
}
`;

const AppStyle = styled.div`
  h1 {
    text-align: center;
    margin-top: 1rem;
    color: #df3459;
  }
`;

const CardListStyle = styled.div`
  background: #f0e9c9;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  padding: 2rem 2rem;
  margin: 1rem 2rem;
  border-radius: 10px;
`;
export default App;
