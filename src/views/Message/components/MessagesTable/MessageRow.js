import React from "react";
import { TableCell, TableRow, Typography, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  root: {},
  menu: {
    minWidth: 40,
  },
}));

const MessageRow = (props) => {
  const { message } = props;
  const classes = useStyles();

  return (
    <TableRow className={classes.tableRow} hover key={message.id} size="small">
      <TableCell>
        <Typography variant="body1">{message.content}</Typography>
      </TableCell>
      <TableCell>{message.languages}</TableCell>
      <TableCell>Pending</TableCell>
    </TableRow>
  );
};

MessageRow.propTypes = {
  message: PropTypes.object.isRequired,
};

export default MessageRow;
