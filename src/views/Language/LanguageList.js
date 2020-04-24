import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { useDispatch, useSelector } from "react-redux";
import Alert from "@material-ui/lab/Alert";
import CircularProgress from "@material-ui/core/CircularProgress";
import Box from "@material-ui/core/Box";
import Snackbar from "@material-ui/core/Snackbar";
import { LanguagesToolbar, LanguagesTable } from "./components";
import { fetchLanguages, resetSaveLanguageSuccess } from "../../store/actions";
import * as Constants from "../../utils/constants";

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
  const [limit, setLimit] = useState(Constants.PAGE_SIZE); //limit
  const [offset, setOffset] = useState(0); // page

  //redux
  const {
    error,
    loadingLanguages,
    languages,
    count,
    saveSuccess,
  } = useSelector((state) => ({
    error: state.language.error,
    loadingLanguages: state.language.loadingLanguages,
    languages: state.language.data,
    count: state.language.count,
    saveSuccess: state.language.saveSuccess,
  }));

  const handleClose = (event, reason) => {
    dispatch(resetSaveLanguageSuccess());
  };

  useEffect(() => {
    dispatch(fetchLanguages(limit, offset * limit)); //rowPerPage, page
  }, [dispatch, limit, offset]);

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
  } else {
    content = (
      <div>
        <LanguagesToolbar />
        <div className={classes.content}>
          <LanguagesTable
            languages={languages}
            count={count}
            limit={limit}
            offset={offset}
            setlimit={setLimit}
            setoffset={setOffset}
          />
        </div>
      </div>
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
