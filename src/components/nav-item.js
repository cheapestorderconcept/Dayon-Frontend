import NextLink from "next/link";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { Box, Button, ListItem, MenuItem, Menu } from "@mui/material";
import { useState } from "react";

export const RenderNavItemsWithDropDown = ({
  title,
  icon,
  href,
  href2,
  href3,
  href4,
  href5,
  href6,
  href7,
  href8,
  title2,
  title3,
  title4,
  title5,
  title6,
  title7,
  title8,
  mainTitle,
  ...others
}) => {
  const router = useRouter();
  const active = href ? router.pathname === href : false;
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <ListItem
      disableGutters
      sx={{
        display: "flex",
        mb: 0.5,
        py: 0,
        px: 2,
      }}
      {...others}
    >
      <Button
        component="a"
        startIcon={icon}
        disableRipple
        sx={{
          backgroundColor: active && "rgba(255,255,255, 0.08)",
          borderRadius: 1,
          color: active ? "secondary.main" : "neutral.300",
          fontWeight: active && "fontWeightBold",
          justifyContent: "flex-start",
          px: 3,
          textAlign: "left",
          textTransform: "none",
          width: "100%",
          "& .MuiButton-startIcon": {
            color: active ? "secondary.main" : "neutral.400",
          },
          "&:hover": {
            backgroundColor: "rgba(255,255,255, 0.08)",
          },
        }}
        onClick={handleClick}
      >
        {mainTitle}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleClose}>
          <NextLink href={href}>
            <Box sx={{ flexGrow: 1 }}>{title}</Box>
          </NextLink>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <NextLink href={href2}>
            <Box sx={{ flexGrow: 1 }}>{title2}</Box>
          </NextLink>
        </MenuItem>
        {href3 != null && (
          <MenuItem onClick={handleClose}>
            <NextLink href={href3}>
              <Box sx={{ flexGrow: 1 }}>{title3}</Box>
            </NextLink>
          </MenuItem>
        )}
        {href4 != null && (
          <MenuItem onClick={handleClose}>
            <NextLink href={href4}>
              <Box sx={{ flexGrow: 1 }}>{title4}</Box>
            </NextLink>
          </MenuItem>
        )}
        {href5 != null && (
          <MenuItem onClick={handleClose}>
            <NextLink href={href5}>
              <Box sx={{ flexGrow: 1 }}>{title5}</Box>
            </NextLink>
          </MenuItem>
        )}
        {href6 != null && (
          <MenuItem onClick={handleClose}>
            <NextLink href={href6}>
              <Box sx={{ flexGrow: 1 }}>{title6}</Box>
            </NextLink>
          </MenuItem>
        )}
        {href7 != null && (
          <MenuItem onClick={handleClose}>
            <NextLink href={href7}>
              <Box sx={{ flexGrow: 1 }}>{title7}</Box>
            </NextLink>
          </MenuItem>
        )}
        {href8 != null && (
          <MenuItem onClick={handleClose}>
            <NextLink href={href8}>
              <Box sx={{ flexGrow: 1 }}>{title8}</Box>
            </NextLink>
          </MenuItem>
        )}
      </Menu>
    </ListItem>
  );
};

export const NavItem = (props) => {
  const { href, icon, title, ...others } = props;
  const router = useRouter();
  const active = href ? router.pathname === href : false;

  return (
    <ListItem
      disableGutters
      sx={{
        display: "flex",
        mb: 0.5,
        py: 0,
        px: 2,
      }}
      {...others}
    >
      <Button
        component="a"
        startIcon={icon}
        disableRipple
        sx={{
          backgroundColor: active && "rgba(255,255,255, 0.08)",
          borderRadius: 1,
          color: active ? "secondary.main" : "neutral.300",
          fontWeight: active && "fontWeightBold",
          justifyContent: "flex-start",
          px: 3,
          textAlign: "left",
          textTransform: "none",
          width: "100%",
          "& .MuiButton-startIcon": {
            color: active ? "secondary.main" : "neutral.400",
          },
          "&:hover": {
            backgroundColor: "rgba(255,255,255, 0.08)",
          },
        }}
      >
        <NextLink href={href} passHref>
          <Box sx={{ flexGrow: 1 }}>{title}</Box>
        </NextLink>
      </Button>
    </ListItem>
  );
};

NavItem.propTypes = {
  href: PropTypes.string,
  icon: PropTypes.node,
  title: PropTypes.string,
};
