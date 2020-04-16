import * as actionTypes from "./actionTypes";
import axios from "../../utils/axiosFlare";
import { logout } from "./securityActions";

export const fetchLanguagesSuccess = (languages) => {
  return {
    type: actionTypes.FETCH_LANGUAGES_SUCCESS,
    data: languages,
  };
};

export const fetchLanguagesFail = (error) => {
  return {
    type: actionTypes.FETCH_LANGUAGES_FAIL,
    error: error,
  };
};

export const fetchLanguagesStart = () => {
  return {
    type: actionTypes.FETCH_LANGUAGES_START,
  };
};

export const fetchLanguages = () => {
  return (dispatch) => {
    dispatch(fetchLanguagesStart());

    axios
      .get("/languages/")
      .then((res) => {
        const languages = [];

        res.data.result.map((lang, index) =>
          languages.push({ ...lang, id: res.data.ids[index] })
        );

        dispatch(fetchLanguagesSuccess(languages));
      })
      .catch((err) => {
        if ((err.status = 401)) {
          dispatch(logout());
        } else {
          dispatch(fetchLanguagesFail(err));
        }
      });
  };
};
