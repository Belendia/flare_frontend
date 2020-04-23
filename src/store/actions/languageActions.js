import * as actionTypes from "./actionTypes";
import axios from "../../utils/axiosFlare";

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

        res.data.forEach((lang, index) => languages.push({ ...lang }));

        dispatch(fetchLanguagesSuccess(languages));
      })
      .catch((err) => {
        if (err.response === undefined) {
          dispatch(fetchLanguagesFail(err.message));
        } else {
          dispatch(fetchLanguagesFail(err.response.data.message));
        }
      });
  };
};

export const saveDelLanguageSuccess = () => {
  return {
    type: actionTypes.SAVE_LANGUAGE_SUCCESS,
  };
};

export const resetSaveLanguageSuccess = () => {
  return {
    type: actionTypes.RESET_SAVE_LANGUAGE_SUCCESS,
  };
};

export const addLanguage = (lang, history, errorCallback) => {
  return (dispatch) => {
    axios
      .post("/languages/", lang)
      .then((res) => {
        dispatch(saveDelLanguageSuccess());
        history.push("/language");
      })
      .catch((err) => {
        if (err.response === undefined) {
          errorCallback(err.message);
        } else {
          errorCallback(err.response.data.message);
        }
      });
  };
};

export const fetchLanguageSuccess = (language) => {
  return {
    type: actionTypes.FETCH_LANGUAGE_SUCCESS,
    language: language,
  };
};

export const fetchLanguageStart = () => {
  return {
    type: actionTypes.FETCH_LANGUAGE_START,
  };
};

export const fetchLanguage = (langId, history) => {
  return (dispatch) => {
    dispatch(fetchLanguageStart());

    axios
      .get(`/languages/${langId}`)
      .then((res) => {
        const language = {
          code: res.data.code,
          name: res.data.name,
        };

        dispatch(fetchLanguageSuccess(language));
      })
      .catch((err) => {
        if (err.response === undefined) {
          dispatch(fetchLanguagesFail(err.message));
        } else {
          dispatch(fetchLanguagesFail(err.response.data.message));
        }
        history.push("/language/");
      });
  };
};

export const editLanguage = (lang, langId, history, errorCallback) => {
  return (dispatch) => {
    axios
      .put(`/languages/${langId}/`, lang)
      .then((res) => {
        dispatch(saveDelLanguageSuccess());
        history.push("/language");
      })
      .catch((err) => {
        if (err.response === undefined) {
          errorCallback(err.message);
        } else {
          errorCallback(err.response.data.message);
        }
      });
  };
};

export const removeLanguageFromList = (langId) => {
  return {
    type: actionTypes.REMOVE_LANGUAGE,
    langId: langId,
  };
};

export const deleteLanguage = (langId, history) => {
  return (dispatch) => {
    axios
      .delete(`/languages/${langId}/`)
      .then((res) => {
        dispatch(saveDelLanguageSuccess());
        dispatch(removeLanguageFromList(langId));
      })
      .catch((err) => {
        if (err.response === undefined) {
          dispatch(fetchLanguagesFail(err.message));
        } else {
          dispatch(fetchLanguagesFail(err.response.data.message));
        }
      });
  };
};
