import {
  CHANGE_SEARCH_FIELD,
  CHANGE_PAGE_NUMBER,
  REQUEST_COUNTRIES_PENDING,
  REQUEST_COUNTRIES_SUCCESS,
  REQUEST_COUNTRIES_FAILED,
} from './components/constants';

const initialStateSearch = {
  searchField: '',
};

export const searchCountries = (state = initialStateSearch, action = {}) => {
  switch (action.type) {
    case CHANGE_SEARCH_FIELD:
      return { ...state, searchField: action.payload };
    default:
      return state;
  }
};

const initialStatePage = {
  pageNumber: 1,
};

export const changePageNumber = (state = initialStatePage, action = {}) => {
  switch (action.type) {
    case CHANGE_PAGE_NUMBER:
      return { ...state, pageNumber: action.payload };
    default:
      return state;
  }
};

const initialStateCountries = {
  isPending: false,
  countries: [],
  error: '',
};

export const requestCountries = (state = initialStateCountries, action = {}) => {
  switch (action.type) {
    case REQUEST_COUNTRIES_PENDING:
      return { ...state, isPending: true };
    case REQUEST_COUNTRIES_SUCCESS:
      return { ...state, countries: action.payload, isPending: false };
    case REQUEST_COUNTRIES_FAILED:
      return { ...state, error: action.payload, isPending: false };
    default:
      return state;
  }
};
