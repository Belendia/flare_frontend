import * as actionTypes from "../actions/actionTypes";

const initialState = {
  isAuthenticated: false,
  userId: null,
  error: null,
  loading: false,
};

const authStart = (state, action) => {
  return {
    ...state,
    error: null,
    loading: true,
  };
};

const authSuccess = (state, action) => {
  return {
    ...state,
    isAuthenticated: true,
    userId: action.userId,
    error: null,
    loading: false,
  };
};

const authFail = (state, action) => {
  return {
    ...state,
    isAuthenticated: false,
    error: action.error,
    loading: false,
  };
};

const authLogout = (state, action) => {
  return {
    ...state,
    isAuthenticated: false,
    userId: null,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state, action);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_FAIL:
      return authFail(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state, action);
    default:
      return state;
  }
};

export default reducer;
