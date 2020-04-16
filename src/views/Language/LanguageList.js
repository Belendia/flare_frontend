import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { useDispatch, useSelector } from "react-redux";

import { LanguagesToolbar, LanguagesTable } from "./components";
import { fetchLanguages } from "../../store/actions";

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

  //redux
  const { error, loading, languages } = useSelector((state) => ({
    error: state.language.error,
    loading: state.language.loading,
    languages: state.language.data,
  }));

  useEffect(() => {
    dispatch(fetchLanguages());
  }, []);

  const dispatch = useDispatch();

  return (
    <div className={classes.root}>
      <LanguagesToolbar />
      <div className={classes.content}>
        <LanguagesTable languages={languages} />
      </div>
    </div>
  );
};

export default LanguageList;
