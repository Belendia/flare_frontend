import React, { useState, useEffect } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { Divider, Drawer } from "@material-ui/core";
import DashboardIcon from "@material-ui/icons/Dashboard";
import MessageIcon from "@material-ui/icons/Message";
import NoteIcon from "@material-ui/icons/Note";
import PeopleIcon from "@material-ui/icons/People";
import LanguageIcon from "@material-ui/icons/Language";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useSelector } from "react-redux";
import Alert from "@material-ui/lab/Alert";
import { Profile, SidebarNav } from "./components";

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: 240,
    [theme.breakpoints.up("lg")]: {
      marginTop: 64,
      height: "calc(100% - 64px)",
    },
  },
  root: {
    backgroundColor: theme.palette.white,
    display: "flex",
    flexDirection: "column",
    height: "100%",
    padding: theme.spacing(2),
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
  nav: {
    marginBottom: theme.spacing(2),
  },
}));

const pagesToInclude = [
  {
    title: "Message",
    href: "/message",
    icon: <MessageIcon />,
  },
  {
    title: "Survey",
    href: "/survey",
    icon: <NoteIcon />,
  },
  {
    title: "Subscribers",
    href: "/subscriber",
    icon: <PeopleIcon />,
  },
  {
    title: "Language",
    href: "/language",
    icon: <LanguageIcon />,
  },
];

const Sidebar = (props) => {
  const { open, variant, onClose, className, ...rest } = props;
  const classes = useStyles();

  const { error, loading, menus } = useSelector((state) => ({
    error: state.menu.error,
    loading: state.menu.loading,
    menus: state.menu.data,
  }));

  const [pages, setPages] = useState([
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: <DashboardIcon />,
    },
  ]);

  useEffect(() => {
    pagesToInclude.forEach((menu, i) => {
      if (menus !== undefined && menus.includes(menu.title)) {
        setPages([...pages, menu]);
      }
    });
  }, [menus]);

  return (
    <Drawer
      anchor="left"
      classes={{ paper: classes.drawer }}
      onClose={onClose}
      open={open}
      variant={variant}
    >
      <div {...rest} className={clsx(classes.root, className)}>
        <Profile />
        <Divider className={classes.divider} />
        {loading ? (
          <CircularProgress />
        ) : (
          <SidebarNav className={classes.nav} pages={pages} />
        )}
        {error && <Alert severity="error">{error}</Alert>}
      </div>
    </Drawer>
  );
};

Sidebar.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
  variant: PropTypes.string.isRequired,
};

export default Sidebar;
