import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { useDispatch, useSelector } from "react-redux";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";
import CircularProgress from "@material-ui/core/CircularProgress";
import Box from "@material-ui/core/Box";
import Snackbar from "@material-ui/core/Snackbar";
import { LanguagesToolbar, LanguagesTable } from "./components";
import { fetchLanguages, resetSaveLanguageSuccess } from "../../store/actions";

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
  const { error, loadingLanguages, languages, saveSuccess } = useSelector(
    (state) => ({
      error: state.language.error,
      loadingLanguages: state.language.loadingLanguages,
      languages: state.language.data,
      saveSuccess: state.language.saveSuccess,
    })
  );

  const handleClose = (event, reason) => {
    // if (reason === "clickaway") {
    //   return;
    // }

    dispatch(resetSaveLanguageSuccess());
  };

  useEffect(() => {
    dispatch(fetchLanguages());
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
  } else if (loadingLanguages) {
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
  } else if (languages) {
    content = (
      <div>
        <LanguagesToolbar />
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
  return (
    <div className={classes.root}>
      {content}
      <Snackbar
        open={saveSuccess}
        autoHideDuration={5000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success">
          Success
        </Alert>
      </Snackbar>
    </div>
  );
};

export default LanguageList;
