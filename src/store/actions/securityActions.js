import jwt_decode from "jwt-decode";

import * as actionTypes from "./actionTypes";
import axios from "../../utils/axiosFlare";
import * as Constants from "../../utils/constants";
import setJWTToken from "../../utils/setJWTToken";
import { fetchMenu } from "./menuActions";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    userId: userId,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("userId");
  setJWTToken(false);

  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const checkAuthTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const login = (username, password) => {
  return (dispatch) => {
    dispatch(authStart());
    const authData = {
      username: username,
      password: password,
      provider: "db",
    };

    axios
      .post("/security/login", authData)
      .then((response) => {
        const expirationDate = new Date(
          new Date().getTime() + Constants.EXPIRES_IN
        );

        localStorage.setItem("token", response.data.access_token);
        localStorage.setItem("expirationDate", expirationDate);

        //set our token in header
        setJWTToken(response.data.access_token);
        //decode token on React
        const userId = jwt_decode(response.data.access_token);
        localStorage.setItem("userId", userId);

        dispatch(authSuccess(userId));
        dispatch(checkAuthTimeout(Constants.EXPIRES_IN));
      })
      .catch((err) => {
        if (err.response === undefined) {
          dispatch(authFail("Unable to communicate with the server."));
        } else {
          dispatch(authFail(err.response.data.message));
        }
      });
  };
};

// export const setAuthRedirectPath = (path) => {
//   return {
//     type: actionTypes.SET_AUTH_REDIRECT_PATH,
//     path: path,
//   };
// };

// this utility action creator is used to restore session when a user refresh the page without logging out.
export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("Token not set - Logout");
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));

      if (expirationDate <= new Date()) {
        console.log("Expiration date is lessthan current date - Logout");
        dispatch(logout());
      } else {
        const userId = localStorage.getItem("userId");
        setJWTToken(token);
        dispatch(authSuccess(userId));
        dispatch(fetchMenu());
        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        ); // the time remaining to lock out.
      }
    }
  };
};
