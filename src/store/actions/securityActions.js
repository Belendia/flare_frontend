import * as actionTypes from "./actionTypes";
import axios from "../../utils/axiosFlare";
import * as Constants from "../../utils/constants";
import setToken from "../../utils/setToken";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (user) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    user: user,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const logout = () => {
  return (dispatch) => {
    axios
      .post("/auth/logout")
      .then((response) => {
        localStorage.removeItem("token");
        localStorage.removeItem("expirationDate");
        localStorage.removeItem("userId");
        localStorage.removeItem("userName");
        localStorage.removeItem("email");
        setToken(false);
        dispatch({
          type: actionTypes.AUTH_LOGOUT,
        });
      })
      .catch((err) => {
        console.log("Unable to logout");
        console.log(err);
      });
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
    };

    axios
      .post("/auth/login", authData)
      .then((response) => {
        const expirationDate = new Date(
          new Date().getTime() + Constants.EXPIRES_IN
        );

        localStorage.setItem("token", response.data.token);
        localStorage.setItem("expirationDate", expirationDate);

        //set our token in header
        setToken(response.data.token);
        localStorage.setItem("userId", response.data.user.id);
        localStorage.setItem("username", response.data.user.username);
        localStorage.setItem("email", response.data.user.email);

        dispatch(authSuccess(response.data.user));
        dispatch(checkAuthTimeout(Constants.EXPIRES_IN));
      })
      .catch((err) => {
        if (err.response === undefined) {
          dispatch(authFail("Unable to communicate with the server."));
        } else {
          dispatch(authFail(err.response.data.non_field_errors[0]));
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
        const user = {
          id: localStorage.getItem("userId"),
          username: localStorage.getItem("username"),
          email: localStorage.getItem("email"),
        };
        setToken(token);
        dispatch(authSuccess(user));

        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        ); // the time remaining to lock out.
      }
    }
  };
};
