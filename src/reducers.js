const initialState = {
  searchField: '',
  loading: false,
};

export const searchCountries = (state = initialState, action = {}) => {
  switch (action.type) {
    case 'CHANGE_SEARCH_FIELD':
      return { ...state, searchField: action.payload };
    case 'CHANGE_LOADING':
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};
