import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Copyright from "../Layout/Copyright";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";

import styles from "../../assets/jss/style/components/loginStyle";

const useStyles = makeStyles(styles);

function Login(props) {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs" className={classes.root}>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar
          className={classes.avatar}
          src={require("../../assets/img/flare.png")}
        ></Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

// Login.propTypes = {
//   login: PropTypes.func.isRequired,
//   security: PropTypes.object.isRequired,
//   errors: PropTypes.object.isRequired
// };

// const mapStateToProps = state => {
//   return {
//     security: state.security,
//     errors: state.errors
//   };
// };

// const mapDispatchToProps = dispatch => {
//   return {
//     login: loginRequest => dispatch(login(loginRequest))
//   };
// };

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(Login);

export default Login;
