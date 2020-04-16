import * as actionTypes from "../actions/actionTypes";

const initialState = {
  data: [],
  loading: false,
  error: null,
};

const fetchLanguagesStart = (state, action) => {
  return {
    ...state,
    loading: true,
  };
};

const fetchLanguagesSuccess = (state, action) => {
  return {
    ...state,
    data: action.data,
    loading: false,
    error: null,
  };
};

const fetchLanguagesFail = (state, action) => {
  return {
    ...state,
    loading: false,
    error: action.error,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_LANGUAGES_START:
      return fetchLanguagesStart(state, action);
    case actionTypes.FETCH_LANGUAGES_SUCCESS:
      return fetchLanguagesSuccess(state, action);
    case actionTypes.FETCH_LANGUAGES_FAIL:
      return fetchLanguagesFail(state, action);
    default:
      return state;
  }
};

export default reducer;
