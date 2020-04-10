import hexToRgb from "./hexToRgb";

const loginPageStyle = (theme) => ({
  root: {
    boxShadow:
      "0 2px 2px 0 rgba(" +
      hexToRgb("#7d7c7c") +
      ", 0.18), 0 3px 1px -2px rgba(" +
      hexToRgb("#7d7c7c") +
      ", 0.24), 0 1px 5px 0 rgba(" +
      hexToRgb("#7d7c7c") +
      ", 0.16)",
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    width: theme.spacing(16),
    height: theme.spacing(16),
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

export default loginPageStyle;
