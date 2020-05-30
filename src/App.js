import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Card from './components/Card';
import Search from './components/Search';
import axios from 'axios';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [countriesName, setCountriesName] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getCountriesNames();
  }, []);

  const getCountriesNames = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`https://restcountries.eu/rest/v2/all`);
      setCountriesName(res.data);
      console.log(res.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const onChange = (e) => {
    const inputText = e.target.value;
    setInputValue(inputText);
  };
  const newCountryList = countriesName.filter(
    (c) => c.name.toLowerCase().includes(inputValue.toLowerCase()) || c.name.includes(inputValue)
  );

  return (
    <div>
      <GlobalStyle />
      <Search inputValue={inputValue} onChange={onChange} />
      <CardListStyle>
        {!loading && newCountryList.map((c, index) => <Card key={index} name={c.name} img={c.flag} countryInfo={c} />)}
        {newCountryList.length === 0 && !loading && <p>No country found..</p>}
      </CardListStyle>
    </div>
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
  font-size: 100%;
  }
`;

const CardListStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;

  padding: 2rem 4rem;
  margin: 2rem 4rem;
  border: 2px solid black;
  border-radius: 10px;
`;
export default App;
