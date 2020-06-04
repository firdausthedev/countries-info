/* eslint-disable no-labels */
import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { connect } from 'react-redux';
import Card from './components/Card';
import Search from './components/Search';
import axios from 'axios';
import _ from 'lodash';
import { setSearchField, setLoading } from './actions';
import Pagination from './components/Pagination';

const mapStateToProps = (state) => {
  return {
    searchField: state.searchField,
    loading: state.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onChange: (e) => dispatch(setSearchField(e.target.value)),
    setLoading: (isLoading) => dispatch(setLoading(isLoading)),
  };
};

function App({ searchField, onChange, setLoading, loading }) {
  const [countriesList, setCountriesName] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_SIZE = 50;

  useEffect(() => {
    getCountriesNames();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const filteredCountriesName = countriesList.filter(
    (c) => c.name.toLowerCase().includes(searchField.toLowerCase()) || c.name.includes(searchField) // filtered whether user typed with lowercase or uppercase
  );

  const numOfCountries = filteredCountriesName.length;
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const newCountriesList = _(filteredCountriesName).slice(startIndex).take(PAGE_SIZE).value();

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <AppStyle>
      <GlobalStyle />
      <h1>Countries Info</h1>
      <Search inputValue={searchField} onChange={onChange} />
      <CardListStyle>
        {!loading ? newCountriesList.map((c, index) => <Card key={index} countryInfo={c} />) : <h2>Loading...</h2>}
        {!newCountriesList.length && !loading && <p>No country found..</p>}
      </CardListStyle>
      <Pagination
        length={numOfCountries}
        pageSize={PAGE_SIZE}
        onPageChange={handlePageChange}
        currentPage={currentPage}
      />
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
  line-height: 1.2;
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
export default connect(mapStateToProps, mapDispatchToProps)(App);
