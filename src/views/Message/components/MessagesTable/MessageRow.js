import React from "react";
import { TableCell, TableRow, Typography, Chip } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  root: {},
  menu: {
    minWidth: 40,
  },

  blue: {
    borderColor: "#3f51b5",
    color: "#3f51b5",
  },

  orange: {
    borderColor: "#FF8A3C",
    color: "#FF8A3C",
  },

  red: {
    borderColor: "#e53935",
    color: "#e53935",
  },
}));

const MessageRow = (props) => {
  const { message } = props;
  const classes = useStyles();

  const { languageLookup, channelLookup } = useSelector((state) => ({
    languageLookup: state.language.lookup,
    channelLookup: state.channel.lookup,
  }));

  let c = classes.blue;
  if (message.status === "started") {
    c = classes.orange;
  } else if (message.status === "error") {
    c = classes.red;
  }

  const { languages } = props.message;
  const langs = [];

  if (languages) {
    languages.forEach((lang) => {
      languageLookup.forEach((l) => {
        if (lang === l.value) {
          langs.push(<div key={l.value}>{l.label}</div>);
        }
      });
    });
  }

  const { channels } = props.message;
  const chnls = [];

  if (channels) {
    channels.forEach((channel) => {
      channelLookup.forEach((c) => {
        if (channel === c.value) {
          chnls.push(<div key={c.value}>{c.label}</div>);
        }
      });
    });
  }

  return (
    <TableRow className={classes.tableRow} hover key={message.id} size="small">
      <TableCell>
        <div className={classes.nameContainer}>
          <Typography variant="body1">{message.content}</Typography>
        </div>
      </TableCell>
      <TableCell>{langs}</TableCell>
      <TableCell>{chnls}</TableCell>
      <TableCell>
        {message.status && (
          <Chip label={message.status} variant="outlined" className={c} />
        )}
      </TableCell>
    </TableRow>
  );
};

MessageRow.propTypes = {
  message: PropTypes.object.isRequired,
};

export default MessageRow;
