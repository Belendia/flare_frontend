import * as actionTypes from "../actions/actionTypes";

const initialState = {
  data: [],
  loadingLanguages: false,
  saveSuccess: false,
  error: null,
  language: { name: "", code: "" },
  loadingLanguage: false,
};

const fetchLanguagesStart = (state) => {
  return {
    ...state,
    error: null,
    loadingLanguages: true,
  };
};

const fetchLanguagesSuccess = (state, action) => {
  return {
    ...state,
    data: action.data,
    loadingLanguages: false,
    error: null,
  };
};

const fetchLanguagesFail = (state, action) => {
  return {
    ...state,
    loadingLanguages: false,
    error: action.error,
  };
};

const saveLanguageSuccess = (state) => {
  return {
    ...state,
    saveSuccess: true,
  };
};

const resetSaveLanguageSuccess = (state, action) => {
  return {
    ...state,
    saveSuccess: false,
  };
};

const fetchLanguageStart = (state) => {
  return {
    ...state,
    error: null,
    loadingLanguage: true,
  };
};

const fetchLanguageSuccess = (state, action) => {
  return {
    ...state,
    language: action.language,
    loadingLanguage: false,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_LANGUAGES_START:
      return fetchLanguagesStart(state);
    case actionTypes.FETCH_LANGUAGES_SUCCESS:
      return fetchLanguagesSuccess(state, action);
    case actionTypes.FETCH_LANGUAGES_FAIL:
      return fetchLanguagesFail(state, action);
    case actionTypes.SAVE_LANGUAGE_SUCCESS:
      return saveLanguageSuccess(state);
    case actionTypes.RESET_SAVE_LANGUAGE_SUCCESS:
      return resetSaveLanguageSuccess(state);
    case actionTypes.FETCH_LANGUAGE_START:
      return fetchLanguageStart(state);
    case actionTypes.FETCH_LANGUAGE_SUCCESS:
      return fetchLanguageSuccess(state, action);
    default:
      return state;
  }
};

export default reducer;
