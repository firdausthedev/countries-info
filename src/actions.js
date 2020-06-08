import {
  CHANGE_SEARCH_FIELD,
  CHANGE_PAGE_NUMBER,
  REQUEST_COUNTRIES_PENDING,
  REQUEST_COUNTRIES_SUCCESS,
  REQUEST_COUNTRIES_FAILED,
} from './components/constants';
import axios from 'axios';

export const setSearchField = (text) => ({ type: CHANGE_SEARCH_FIELD, payload: text });

export const setPageNumber = (pageNumber) => ({ type: CHANGE_PAGE_NUMBER, payload: pageNumber });

export const requestCountries = () => async (dispatch) => {
  dispatch({ type: REQUEST_COUNTRIES_PENDING });

  try {
    const res = await axios.get(`https://restcountries.eu/rest/v2/all`);
    dispatch({ type: REQUEST_COUNTRIES_SUCCESS, payload: res.data });
  } catch (err) {
    console.log(err);
    dispatch({ type: REQUEST_COUNTRIES_FAILED, payload: err });
  }
};
