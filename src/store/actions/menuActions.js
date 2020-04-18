import * as actionTypes from "./actionTypes";
import axios from "../../utils/axiosFlare";

export const fetchMenuSuccess = (menus) => {
  return {
    type: actionTypes.FETCH_MENU_SUCCESS,
    data: menus,
  };
};

export const fetchMenuFail = (error) => {
  return {
    type: actionTypes.FETCH_MENU_FAIL,
    error: error,
  };
};

export const fetchMenuStart = () => {
  return {
    type: actionTypes.FETCH_MENU_START,
  };
};

export const fetchMenu = () => {
  return (dispatch) => {
    dispatch(fetchMenuStart());

    axios
      .get("/menu/")
      .then((res) => {
        const menus = [];

        res.data.result.forEach((listOfMenus, i) => {
          listOfMenus.childs.forEach((menu, j) => {
            menus.push(menu.name);
          });
        });

        dispatch(fetchMenuSuccess(menus));
      })
      .catch((err) => {
        dispatch(fetchMenuFail(err.response.data.message));
      });
  };
};
