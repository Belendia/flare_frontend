import * as actionTypes from "../actions/actionTypes";

const initialState = {
  data: [],
  permissions: [],
  loadingLanguages: false,
  loadingPermissions: false,
  saveSuccess: false,
  error: null,
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

const fetchPermissionsStart = (state) => {
  return {
    ...state,
    error: null,
    loadingPermissions: true,
  };
};

const fetchPermissionsSuccess = (state, action) => {
  return {
    ...state,
    permissions: action.permissions,
    loadingPermissions: false,
    error: null,
  };
};

const fetchPermissionsFail = (state, action) => {
  return {
    ...state,
    loadingPermissions: false,
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

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_LANGUAGES_START:
      return fetchLanguagesStart(state);
    case actionTypes.FETCH_LANGUAGES_SUCCESS:
      return fetchLanguagesSuccess(state, action);
    case actionTypes.FETCH_LANGUAGES_FAIL:
      return fetchLanguagesFail(state, action);
    case actionTypes.FETCH_LANGUAGE_PERMISSIONS_START:
      return fetchPermissionsStart(state, action);
    case actionTypes.FETCH_LANGUAGE_PERMISSIONS_SUCCESS:
      return fetchPermissionsSuccess(state, action);
    case actionTypes.FETCH_LANGUAGE_PERMISSIONS_FAIL:
      return fetchPermissionsFail(state, action);
    case actionTypes.SAVE_LANGUAGE_SUCCESS:
      return saveLanguageSuccess(state);
    case actionTypes.RESET_SAVE_LANGUAGE_SUCCESS:
      return resetSaveLanguageSuccess(state);

    default:
      return state;
  }
};

export default reducer;
