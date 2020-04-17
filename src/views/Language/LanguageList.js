import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { useDispatch, useSelector } from "react-redux";

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
  const { error, loadingLanguages, languages, permissions } = useSelector(
    (state) => ({
      error: state.language.error,
      loadingLanguages: state.language.loadingLanguages,
      languages: state.language.data,
      permissions: state.language.permissions,
    })
  );

  useEffect(() => {
    dispatch(fetchLanguagePermissions());
  }, [dispatch]);

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
