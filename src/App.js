/* eslint-disable no-labels */
import React, { useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { connect } from 'react-redux';
import Card from './components/Card';
import Search from './components/Search';
import _ from 'lodash';
import { setSearchField, setPageNumber, requestCountries } from './actions';
import Pagination from './components/Pagination';

const PAGE_SIZE = 50;

const mapStateToProps = (state) => {
  return {
    searchField: state.searchCountries.searchField,
    isPending: state.requestCountries.isPending,
    countries: state.requestCountries.countries,
    error: state.requestCountries.error,
    pageNumber: state.changePageNumber.pageNumber,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onChange: (e) => dispatch(setSearchField(e.target.value)),
    setCurrentPage: (pageNumber) => dispatch(setPageNumber(pageNumber)),
    onRequestCountries: () => dispatch(requestCountries()),
  };
};

function App(props) {
  const { searchField, onChange, setCurrentPage, pageNumber, onRequestCountries, countries, isPending } = props;
  useEffect(() => {
    onRequestCountries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredCountriesName = countries.filter(
    (c) => c.name.toLowerCase().includes(searchField.toLowerCase()) || c.name.includes(searchField) // filtered whether user typed with lowercase or uppercase
  );

  const numOfCountries = filteredCountriesName.length;
  const startIndex = (pageNumber - 1) * PAGE_SIZE;
  let newCountriesList = _(filteredCountriesName).slice(startIndex).take(PAGE_SIZE).value();
  if (filteredCountriesName.length < 50 && newCountriesList.length < 50) {
    newCountriesList = _(filteredCountriesName).slice(0).take(PAGE_SIZE).value();
  }
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <AppStyle>
      <GlobalStyle />
      <h1>Countries Info</h1>
      <Search inputValue={searchField} onChange={onChange} />
      <CardListStyle>
        {!isPending ? newCountriesList.map((c, index) => <Card key={index} countryInfo={c} />) : <h2>Loading...</h2>}
        {!newCountriesList.length && !isPending && <p>No country found..</p>}
      </CardListStyle>
      <Pagination
        length={numOfCountries}
        pageSize={PAGE_SIZE}
        onPageChange={handlePageChange}
        currentPage={pageNumber}
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
