import React, { useState } from "react";
import { TableCell, TableRow, Typography, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useHistory } from "react-router-dom";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import PropTypes from "prop-types";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles((theme) => ({
  root: {},
  menu: {
    minWidth: 40,
  },
}));

const SubscriberRow = (props) => {
  const { subscriber, language } = props;

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  let history = useHistory();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = (id) => {
    setAnchorEl(null);
    props.openDialog(id);
  };

  const handleEdit = () => {
    history.push(`/subscriber/edit/${subscriber.id}`);
  };

  return (
    <TableRow
      className={classes.tableRow}
      hover
      key={subscriber.id}
      size="small"
    >
      <TableCell>
        <Typography variant="body1">{subscriber.phone_number}</Typography>
      </TableCell>
      <TableCell>{language}</TableCell>
      <TableCell>
        <IconButton
          aria-label="more"
          aria-controls="action-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="action-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleEdit}>
            <ListItemIcon className={classes.menu}>
              <EditIcon fontSize="small" />
            </ListItemIcon>
            Edit
          </MenuItem>

          <MenuItem onClick={() => handleDelete(subscriber.id)}>
            <ListItemIcon className={classes.menu}>
              <DeleteIcon fontSize="small" />
            </ListItemIcon>
            Delete
          </MenuItem>
        </Menu>
      </TableCell>
    </TableRow>
  );
};

SubscriberRow.propTypes = {
  subscriber: PropTypes.object.isRequired,
  openDialog: PropTypes.func.isRequired,
  language: PropTypes.string.isRequired,
};

export default SubscriberRow;
