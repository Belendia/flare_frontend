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

        res.data.result.map((lang, index) =>
          languages.push({ ...lang, id: res.data.ids[index] })
        );

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

export const fetchPermissionsSuccess = (permissions) => {
  return {
    type: actionTypes.FETCH_LANGUAGE_PERMISSIONS_SUCCESS,
    permissions: permissions,
  };
};

export const fetchPermissionsFail = (error) => {
  return {
    type: actionTypes.FETCH_LANGUAGE_PERMISSIONS_FAIL,
    error: error,
  };
};

export const fetchPermissionsStart = () => {
  return {
    type: actionTypes.FETCH_LANGUAGE_PERMISSIONS_START,
  };
};

export const fetchLanguagePermissions = () => {
  return (dispatch) => {
    dispatch(fetchPermissionsStart());

    axios
      .get("/languages/_info?q=(keys:!(permissions))")
      .then((res) => {
        const permissions = [];

        res.data.permissions.forEach((p, index) => permissions.push(p));
        dispatch(fetchPermissionsSuccess(permissions));
        if (permissions.includes("can_get")) {
          dispatch(fetchLanguages());
        } else {
          dispatch(
            fetchPermissionsFail(
              "You don't have permission to access this page."
            )
          );
        }
      })
      .catch((err) => {
        dispatch(fetchPermissionsFail(err.message));
      });
  };
};

export const saveLanguageSuccess = () => {
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
        dispatch(saveLanguageSuccess());
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
      .get(`/languages/${langId}?q=(columns:!(name,code))`)
      .then((res) => {
        const language = {
          code: res.data.result.code,
          name: res.data.result.name,
        };

        dispatch(fetchLanguageSuccess(language));
      })
      .catch((err) => {
        history.push("/language/");
      });
  };
};

export const editLanguage = (lang, langId, history, errorCallback) => {
  return (dispatch) => {
    axios
      .put(`/languages/${langId}`, lang)
      .then((res) => {
        dispatch(saveLanguageSuccess());
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
