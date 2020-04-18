import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { useDispatch, useSelector } from "react-redux";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";
import CircularProgress from "@material-ui/core/CircularProgress";
import Box from "@material-ui/core/Box";
import { LanguagesToolbar, LanguagesTable } from "./components";
import { fetchLanguagePermissions } from "../../store/actions";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
  content: {
    marginTop: theme.spacing(2),
  },
}));

const LanguageList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  //redux
  const {
    error,
    loadingLanguages,
    languages,
    loadingPermissions,
    permissions,
  } = useSelector((state) => ({
    error: state.language.error,
    loadingLanguages: state.language.loadingLanguages,
    languages: state.language.data,
    loadingPermissions: state.language.loadingPermissions,
    permissions: state.language.permissions,
  }));

  useEffect(() => {
    dispatch(fetchLanguagePermissions());
  }, [dispatch]);

  let content = null;
  if (error) {
    content = (
      <Box
        display="flex"
        justifyContent="center"
        m={1}
        p={1}
        bgcolor="background.paper"
      >
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  } else if (loadingLanguages || loadingPermissions) {
    content = (
      <Box
        display="flex"
        justifyContent="center"
        m={1}
        p={1}
        bgcolor="background.paper"
      >
        <CircularProgress size={100} thickness={1.5} />
      </Box>
    );
  } else if (permissions.includes("can_get")) {
    content = (
      <div>
        <LanguagesToolbar addpermission={permissions.includes("can_post")} />
        <div className={classes.content}>
          <LanguagesTable languages={languages} />
        </div>
      </div>
    );
  } else {
    content = (
      <Box
        display="flex"
        justifyContent="center"
        m={1}
        p={1}
        bgcolor="background.paper"
      >
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          Error: Oops something went wrong. Please contact your administrator.
        </Alert>
      </Box>
    );
  }
  return <div className={classes.root}>{content}</div>;
};

export default LanguageList;
