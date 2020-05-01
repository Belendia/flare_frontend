import React from "react";
import { TableCell, TableRow, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  root: {},
  menu: {
    minWidth: 40,
  },

  buttonRound: {
    textDecoration: "none",
    color: "#ffffff",
    fontSize: 14,
    padding: 5,
    height: "auto",
    display: "inlineBlock",
    textAlign: "center",
    backgroundColor: "#3f51b5",
    borderRadius: 3,
  },

  orange: {
    backgroundColor: "#FF8A3C",
  },

  red: {
    backgroundColor: "#e53935",
  },
}));

const MessageRow = (props) => {
  const { message } = props;
  const classes = useStyles();

  let c = classes.buttonRound;

  if (message.status === "started") {
    c += " " + classes.orange;
  } else if (message.status === "error") {
    c += " " + classes.red;
  }
  return (
    <TableRow className={classes.tableRow} hover key={message.id} size="small">
      <TableCell>
        <Typography variant="body1">{message.content}</Typography>
      </TableCell>
      <TableCell>{message.languages}</TableCell>
      <TableCell>
        {message.status && <span className={c}>{message.status}</span>}
      </TableCell>
    </TableRow>
  );
};

MessageRow.propTypes = {
  message: PropTypes.object.isRequired,
};

export default MessageRow;
