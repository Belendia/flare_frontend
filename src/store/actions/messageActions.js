import * as actionTypes from "./actionTypes";
import axios from "../../utils/axiosFlare";
import mapResponseErrors from "../../utils/mapResponseErrors";
import { logout } from "./securityActions";
import { fetchLanguagesLookup } from "./languageActions";

export const fetchMessagesSuccess = (messages, count) => {
  return {
    type: actionTypes.FETCH_MESSAGES_SUCCESS,
    data: messages,
    count: count,
  };
};

export const fetchMessagesFail = (error) => {
  return {
    type: actionTypes.FETCH_MESSAGES_FAIL,
    error: error,
  };
};

export const fetchMessagesStart = () => {
  return {
    type: actionTypes.FETCH_MESSAGES_START,
  };
};

export const fetchMessages = (limit, offset, searchTerm) => {
  return (dispatch) => {
    dispatch(fetchMessagesStart());

    axios
      .get(`/messages/?limit=${limit}&offset=${offset}&search=${searchTerm}`)
      .then((res) => {
        dispatch(fetchLanguagesLookup());

        const messages = [];
        const count = res.data.count;

        res.data.results.forEach((msg, index) => messages.push({ ...msg }));

        dispatch(fetchMessagesSuccess(messages, count));
      })
      .catch((err) => {
        if (err.response === undefined) {
          dispatch(fetchMessagesFail(err.message));
        } else {
          if (err.response.status === 401 || err.response.status === 403) {
            dispatch(logout());
          } else {
            dispatch(fetchMessagesFail(err.response.data.message));
          }
        }
      });
  };
};

export const saveDelMessageSuccess = () => {
  return {
    type: actionTypes.SAVE_MESSAGE_SUCCESS,
  };
};

export const resetSaveMessageSuccess = () => {
  return {
    type: actionTypes.RESET_SAVE_MESSAGE_SUCCESS,
  };
};

export const updateMessageFail = (error) => {
  return {
    type: actionTypes.UPDATE_MESSAGE_FAIL,
    error: error,
  };
};

export const addMessage = (msg, history, errorCallback) => {
  return (dispatch) => {
    const languages = [];
    msg.languages.forEach((lang, index) => languages.push(lang.value));
    const message = { ...msg, languages };

    axios
      .post("/messages/", message)
      .then((res) => {
        dispatch(saveDelMessageSuccess());
        history.push("/message");
      })
      .catch((err) => {
        if (err.response === undefined) {
          dispatch(updateMessageFail(err.message));
          errorCallback(err.message);
        } else {
          const errors = mapResponseErrors(err.response.data);
          errorCallback(errors);
        }
      });
  };
};

export const fetchMessageSuccess = (message) => {
  return {
    type: actionTypes.FETCH_MESSAGE_SUCCESS,
    message: message,
  };
};

export const fetchMessageStart = () => {
  return {
    type: actionTypes.FETCH_MESSAGE_START,
  };
};

export const fetchMessage = (msgId, history) => {
  return (dispatch) => {
    dispatch(fetchMessageStart());

    axios
      .get(`/messages/${msgId}`)
      .then((res) => {
        const message = {
          code: res.data.code,
          name: res.data.name,
        };

        dispatch(fetchMessageSuccess(message));
      })
      .catch((err) => {
        if (err.response === undefined) {
          dispatch(fetchMessagesFail(err.message));
        } else {
          dispatch(fetchMessagesFail(err.response.data.message));
        }
        history.push("/message/");
      });
  };
};

export const editMessage = (msg, msgId, history, errorCallback) => {
  return (dispatch) => {
    axios
      .put(`/messages/${msgId}/`, msg)
      .then((res) => {
        dispatch(saveDelMessageSuccess());
        history.push("/message");
      })
      .catch((err) => {
        if (err.response === undefined) {
          dispatch(updateMessageFail(err.message));
          errorCallback(err.message);
        } else {
          const errors = mapResponseErrors(err.response.data);
          errorCallback(errors);
        }
      });
  };
};

export const removeMessageFromList = (msgId) => {
  return {
    type: actionTypes.REMOVE_MESSAGE,
    msgId: msgId,
  };
};

export const deleteMessage = (msgId, history) => {
  return (dispatch) => {
    axios
      .delete(`/messages/${msgId}/`)
      .then((res) => {
        dispatch(saveDelMessageSuccess());
        dispatch(removeMessageFromList(msgId));
      })
      .catch((err) => {
        if (err.response === undefined) {
          dispatch(fetchMessagesFail(err.message));
        } else {
          dispatch(fetchMessagesFail(err.response.data.message));
        }
      });
  };
};
