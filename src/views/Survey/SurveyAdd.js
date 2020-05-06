import React, { useState } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { useHistory } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  CircularProgress,
  Snackbar,
  IconButton,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import { TextField } from "../../components";
import { Formik, Field, Form } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { addSurvey } from "../../store/actions";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(4),
  },
  saving: {
    color: "#FFF",
    marginRight: "5px",
  },
}));

const validationSchema = yup.object({
  title: yup.string().required(),
  journeys: yup.string().required(),
});

const SurveyAdd = (props) => {
  const { className, staticContext, ...rest } = props;

  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const { error } = useSelector((state) => ({
    error: state.survey.error,
  }));
  const [showError, setShowError] = useState(false);
  const [journey, setJourney] = useState(null);

  const handleCancel = () => {
    history.push("/survey");
  };

  const handleClose = () => {
    setShowError(false);
  };

  return (
    <React.Fragment>
      <Formik
        validateOnChange={true}
        initialValues={{
          title: "",
          journeys: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(data, { setSubmitting, setErrors }) => {
          setSubmitting(true);

          // dispatch(
          //   addSurvey(data, history, (err) => {
          //     if (typeof err === "string") {
          //       setShowError(true);
          //     } else {
          //       setErrors(err);
          //     }

          //     setSubmitting(false);
          //   })
          // );

          let formData = new FormData();

          formData.append("journeys", journey, journey.name);
          formData.append("title", data.title);
          //formData.append("content", journey.content);

          dispatch(
            addSurvey(formData, history, (err) => {
              if (typeof err === "string") {
                setShowError(true);
              } else {
                setErrors(err);
              }

              setSubmitting(false);
            })
          );
        }}
      >
        {({ values, errors, isSubmitting, setFieldValue }) => (
          <Card {...rest} className={clsx(classes.root, className)}>
            <Form autoComplete="off">
              <CardHeader subheader="Add a survey" title="Survey" />
              <Divider />
              <CardContent>
                <Grid container spacing={3}>
                  <Grid item md={12} xs={12}>
                    <Field
                      placeholder="Title"
                      name="title"
                      type="input"
                      variant="outlined"
                      label="Title"
                      margin="dense"
                      as={TextField}
                    />
                  </Grid>
                  <Grid item md={12} xs={12}>
                    {errors.journeys && (
                      <Alert variant="filled" severity="error">
                        {errors.journeys}
                      </Alert>
                    )}
                    <input
                      accept="text/vnd.yaml"
                      className={classes.input}
                      id="journeys"
                      name="journeys"
                      type="file"
                      style={{ display: "none" }}
                      onChange={(e) => {
                        e.persist();
                        const file = e.target.files[0];
                        if (file) {
                          setFieldValue("journeys", file.name);
                          setJourney(file);
                        }
                      }}
                    />
                    <label htmlFor="journeys">
                      <Button variant="contained" component="span" size="large">
                        Upload File
                      </Button>
                      &nbsp;{values.journeys}
                    </label>
                  </Grid>
                </Grid>
              </CardContent>
              <Divider />
              <CardActions>
                <Button
                  color="primary"
                  variant="contained"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting && (
                    <CircularProgress
                      variant="indeterminate"
                      disableShrink
                      className={classes.saving}
                      size={14}
                      thickness={4}
                    />
                  )}
                  Save
                </Button>
                <Button
                  color="primary"
                  variant="text"
                  onClick={handleCancel}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
              </CardActions>
            </Form>
          </Card>
        )}
      </Formik>

      <Snackbar open={showError} autoHideDuration={5000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          {error}
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
};

SurveyAdd.propTypes = {
  className: PropTypes.string,
};

export default SurveyAdd;
