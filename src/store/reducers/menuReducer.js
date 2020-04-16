import * as actionTypes from "../actions/actionTypes";

const initialState = {
  data: [],
  loading: false,
  error: null,
};

const fetchMenuStart = (state, action) => {
  return {
    ...state,
    loading: true,
  };
};

const fetchMenuSuccess = (state, action) => {
  return {
    ...state,
    data: action.data,
    loading: false,
    error: null,
  };
};

const fetchMenuFail = (state, action) => {
  return {
    ...state,
    loading: false,
    error: action.error,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_MENU_START:
      return fetchMenuStart(state, action);
    case actionTypes.FETCH_MENU_SUCCESS:
      return fetchMenuSuccess(state, action);
    case actionTypes.FETCH_MENU_FAIL:
      return fetchMenuFail(state, action);
    default:
      return state;
  }
};

export default reducer;
