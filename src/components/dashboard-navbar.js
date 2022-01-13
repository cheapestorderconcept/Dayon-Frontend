import PropTypes from "prop-types";
import styled from "@emotion/styled";
import {
  AppBar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
  Button,
  Badge,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import NextLink from "next/link";
import { Users as UsersIcon } from "../icons/users";
import { useContext, useState } from "react";
import { makeStyles } from "@mui/styles";
import { useRouter } from "next/router";
import { logoutAction } from "src/statesManagement/store/actions/logout-action";
import { Store } from "src/statesManagement/store/store";

const DashboardNavbarRoot = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3],
}));

const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: "none",
    cursor: "pointer",
  },
}));

export const DashboardNavbar = (props) => {
  const { dispatch, state } = useContext(Store);
  const { cart } = state;

  const classes = useStyles();
  const { onSidebarOpen, ...other } = props;
  // profile dropdown
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const router = useRouter();
  const Logout = () => {
    logoutAction(dispatch, router);
  };
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

          <NextLink className={classes.link} href="/addsales">
            <Typography sx={{ flexGrow: 1 }} variant="h6" color="black">
              Add Sales
            </Typography>
          </NextLink>

          <Box sx={{ flexGrow: 1 }} />
          <NextLink href="/sales/process-sales">
            <Badge badgeContent={cart.cartItems.length} color="success" sx={{ mr: 2 }}>
              <Typography color={"black"} variant="h6">
                Sales
              </Typography>
            </Badge>
          </NextLink>
          <Tooltip title="Daycon">
            <>
              <IconButton sx={{ ml: 1 }} onClick={handleClick}>
                <UsersIcon fontSize="small" />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "bottom",
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
                <MenuItem onClick={handleClose}>
                  <NextLink className={classes.link} href="/account">
                    <Box sx={{ flexGrow: 1 }}>Profile</Box>
                  </NextLink>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  {" "}
                  <Button onClick={Logout}>
                    <Box sx={{ flexGrow: 1 }}> Logout</Box>
                  </Button>
                </MenuItem>
              </Menu>
            </>
          </Tooltip>

          <Tooltip title="Download database">
            <IconButton sx={{ ml: 1 }}>
              <CloudDownloadIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </DashboardNavbarRoot>
    </>
  );
};

DashboardNavbar.propTypes = {
  onSidebarOpen: PropTypes.func,
};
