import * as actionTypes from "../actions/actionTypes";

const initialState = {
  data: [],
  permissions: [],
  loadingLanguages: false,
  loadingPermissions: false,
  error: null,
};

const fetchLanguagesStart = (state, action) => {
  return {
    ...state,
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

const fetchPermissionsStart = (state, action) => {
  return {
    ...state,
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

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_LANGUAGES_START:
      return fetchLanguagesStart(state, action);
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
    default:
      return state;
  }
};

export default reducer;
