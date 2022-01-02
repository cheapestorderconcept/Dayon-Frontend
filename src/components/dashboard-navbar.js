import PropTypes from "prop-types";
import styled from "@emotion/styled";
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import BarChartIcon from "@mui/icons-material/BarChart";
import { Bell as BellIcon } from "../icons/bell";
import { UserCircle as UserCircleIcon } from "../icons/user-circle";
import { Users as UsersIcon } from "../icons/users";
import { makeStyles } from "@mui/styles";
import NextLink from "next/link";
import { useState } from "react";

// const useStyles = makeStyles({
//   linkContainer: {
//     display: "flex",
//   },
//   navlink: {
//     marginRight: "30px",
//     display: "flex",
//   },
//   navicon: {
//     color: "#65748B",
//     marginRight: "10px",
//   },
// });

const DashboardNavbarRoot = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3],
}));

export const DashboardNavbar = (props) => {
  const { onSidebarOpen, ...other } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // const classes = useStyles();

  return (
    <>
      <DashboardNavbarRoot
        sx={{
          left: {
            lg: 280,
          },
          width: {
            lg: "calc(100% - 280px)",
          },
        }}
        {...other}
      >
        <Toolbar
          disableGutters
          sx={{
            minHeight: 64,
            left: 0,
            px: 2,
          }}
        >
          <IconButton
            onClick={onSidebarOpen}
            sx={{
              display: {
                xs: "inline-flex",
                lg: "none",
              },
            }}
          >
            <MenuIcon fontSize="small" />
          </IconButton>

          {/* <div className={classes.linkContainer}>
            <div className={classes.navlink}>
              <span className={classes.navicon}>
                <BarChartIcon color="error" />
              </span>
              <Typography color="text.secondary" variant="subtitle1">
                Sales
              </Typography>
            </div>
            <div className={classes.navlink}>
              <span className={classes.navicon}>
                <AccountBalanceWalletIcon color="error" />
              </span>
              <Typography color="text.secondary" variant="subtitle1">
                Deposit
              </Typography>
            </div>
          </div> */}

          <Box sx={{ flexGrow: 1 }} />
          <Tooltip title="Daycon">
            <>
              <IconButton sx={{ ml: 1 }} onClick={handleClick}>
                <UsersIcon fontSize="small" />
              </IconButton>
            </>
          </Tooltip>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
          </Menu>
          <Tooltip title="Notifications">
            <IconButton sx={{ ml: 1 }}>
              <Badge badgeContent={4} color="primary" variant="dot">
                <BellIcon fontSize="small" />
              </Badge>
            </IconButton>
          </Tooltip>
          <Avatar
            sx={{
              height: 40,
              width: 40,
              ml: 1,
            }}
            src="/static/images/avatars/avatar_1.png"
          >
            <UserCircleIcon fontSize="small" />
          </Avatar>
        </Toolbar>
      </DashboardNavbarRoot>
    </>
  );
};

DashboardNavbar.propTypes = {
  onSidebarOpen: PropTypes.func,
};
