import { useEffect } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { Box, Button, Divider, Drawer, Typography, useMediaQuery } from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { Selector as SelectorIcon } from "../icons/selector";
import { ShoppingBag as ShoppingBagIcon } from "../icons/shopping-bag";
import { XCircle as XCircleIcon } from "../icons/x-circle";
import { Logo } from "./logo";
import { NavItem, RenderNavItemsWithDropDown } from "./nav-item";
import { Home } from "src/icons/home";
import ExtensionIcon from "@mui/icons-material/Extension";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import BarChartIcon from "@mui/icons-material/BarChart";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import DownloadIcon from "@mui/icons-material/Download";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import PaidIcon from "@mui/icons-material/Paid";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { COMPANY_NAME } from "src/utils/company_details";

const items = [
  {
    href: "/",
    icon: <Home fontSize="large" />,
    title: "Dashboard",
    mainTitle: "Dashboard",
  },
  {
    href: "/store",
    icon: <ExtensionIcon fontSize="small" />,
    title: "Store Outlets",
    mainTitle: "Store Outlets",
  },

  {
    icon: <ShoppingBagIcon fontSize="small" />,
    mainTitle: "Products",
    href: "/products",
    title: "Add Products",
    hasdropdown: true,
    title2: "Product Brand",
    href2: "/products/brand",
    title3: "Update Product",
    href3: "/purchase/stock",
  },
    {
    icon: <ShoppingBagIcon fontSize="small" />,
    mainTitle: "Service Management",
    href: "/services",
    title: "Add Service Type",
    hasdropdown: true,
    title2: "Service Category",
    href2: "/services/category",
    title3: "Service Payment",
    href3: "/services/service-payment",
    // title4: "List Of Rendered Services",
    // href4: "/services/rendered-service",
    title5: "Service Payment Deposit",
    href5: "/services/service-deposit",
    title6: "Manage Service Deposits",
    href6: "/services/service-deposit/manage-service-deposit",
  },
  {
    icon: <AccountBalanceWalletIcon fontSize="small" />,
    href: "/payment-method",
    title: "Payment Type",
    mainTitle: "Payment Type",
  },
  {
    href: "/purchase",
    icon: <BarChartIcon fontSize="small" />,
    mainTitle: "Purchases",
    title: "Add Purchases",
    hasdropdown: true,
    title2: "Manage Purchases",
    href2: "/purchase/purchaselists",
    title3: "Balance Stock Level",
    href3: "/purchase/stock",
    // title4: "Add Supplier Ledger",
    // href4: "/addsupplierledger",
    // title5: "Manage Supplier Ledger",
    // href5: "/managesuppliers",
  },

  {
    href: "/sales",
    icon: <TrendingDownIcon fontSize="small" />,
    mainTitle: "Sales",
    title: "Add Sales",
    hasdropdown: true,
    href2: "/sales/manage-sales",
    title2: "Sales List",
  },
  {
    href: "/deposit",
    icon: <DownloadIcon fontSize="small" />,
    mainTitle: "Deposit",
    title: "Add Deposit",
    hasdropdown: true,
    href2: "/deposit/managedeposit",
    title2: "Manage Deposit",
  },
  // {
  //   href: "/transfer",
  //   icon: <ShoppingCartIcon fontSize="small" />,
  //   mainTitle: "Transfer To Outlets",
  //   title: "Add Transfer To Outlets",
  //   hasdropdown: true,
  //   href2: "/transfer/manage-transfer",
  //   title2: "Manage Transfer Log",
  // },
  // {
  //   href: "/subdealer",
  //   icon: <PeopleIcon fontSize="small" />,
  //   mainTitle: "Subdealer",
  //   title: "Add Subdealer",
  //   hasdropdown: true,
  //   href2: "/subdealer/manage-subdealer",
  //   title2: "Manage Subdealer",
  // },

  {
    href: "/suppliers",
    icon: <DirectionsCarIcon fontSize="small" />,
    title: "Supplier",
    mainTitle: "Supplier",
  },
  {
    href: "/expenses",
    icon: <PaidIcon fontSize="small" />,
    mainTitle: "Expenses",
    title: "Add Expenses",
    hasdropdown: true,
    href2: "/expenses/manage-expenses",
    title2: "Manage Expenses",
  },
  {
    href: "/customers",
    icon: <BarChartIcon fontSize="small" />,
    mainTitle: "Customers",
    title: "Add Customer",
    hasdropdown: true,
    title2: "My Customers",
    href2: "/customers/registered-customers",
    // title3: "Update Customer",
    // href3: "/customers/update-customer",
    // title4: "Add Supplier Ledger",
    // href4: "/addsupplierledger",
    // title5: "Manage Supplier Ledger",
    // href5: "/managesuppliers",
  },
  {
    href: "/staff",
    icon: <AssignmentIndIcon fontSize="small" />,
    title: "Staff",
    mainTitle: "Staff",
  },
  {
    href: "/reporting",
    icon: <BarChartIcon fontSize="small" />,
    mainTitle: "Reporting",
    title: "Sales Report",
    hasdropdown: true,
    title2: "Profit/Loss Report",
    href2: "/reporting/report-profit-loss",
    // title3: "Transfer To Outlets",
    href3: "/reporting/sales-print-report",
    title4: "Deposit Report",
    href4: "/reporting/deposit-report",
    title5: "Product Price List",
    href5: "/reporting/product-price-print-report",
    title6: "Stock Level Summary Balance",
    href6: "/reporting/stock-level-balance",
    title7: "Out Of Stock Products",
    href7: "/reporting/report-out-of-stock",
    title8: "Service Report",
    href8: "/reporting/service-report",
  },
  // {
  //   href: "/auth",
  //   icon: <PowerSettingsNewIcon fontSize="small" />,
  //   title: "Logout",
  //   mainTitle: "Logout",
  // },
];

export const DashboardSidebar = (props) => {
  const { open, onClose } = props;
  const router = useRouter();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"), {
    defaultMatches: true,
    noSsr: false,
  });

  useEffect(
    () => {
      if (!router.isReady) {
        return;
      }

      if (open) {
        onClose?.();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.asPath]
  );

  const content = (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <div>
          <Box sx={{ p: 3 }}>
            <NextLink href="/" passHref>
              <a>
                <Logo
                  sx={{
                    height: 42,
                    width: 42,
                  }}
                />
              </a>
            </NextLink>
          </Box>
          <Box sx={{ px: 2 }}>
            <Box
              sx={{
                alignItems: "center",
                backgroundColor: "rgba(255, 255, 255, 0.04)",
                cursor: "pointer",
                display: "flex",
                justifyContent: "space-between",
                px: 3,
                py: "11px",
                borderRadius: 1,
              }}
            >
              <div>
                <Typography color="inherit" variant="h6">
               {COMPANY_NAME}
                </Typography>
                <Typography color="neutral.400" variant="body2">
                  Available
                </Typography>
              </div>
              <SelectorIcon
                sx={{
                  color: "neutral.500",
                  width: 14,
                  height: 14,
                }}
              />
            </Box>
          </Box>
        </div>
        <Divider
          sx={{
            borderColor: "#2D3748",
            my: 3,
          }}
        />
        <Box sx={{ flexGrow: 1 }}>
          {items.map((item, i) =>
            item.hasdropdown ? (
              <RenderNavItemsWithDropDown
                key={i}
                title={item.title}
                href={item.href}
                icon={item.icon}
                title2={item.title2}
                title3={item.title3}
                title4={item.title4}
                title5={item.title5}
                title6={item.title6}
                title7={item.title7}
                title8={item.title8}
                href2={item.href2}
                href3={item.href3}
                href4={item.href4}
                href5={item.href5}
                href6={item.href6}
                href7={item.href7}
                href8={item.href8}
                mainTitle={item.mainTitle}
              />
            ) : (
              <NavItem
                key={item.title}
                icon={item.icon}
                href={item.href}
                title={item.title}
                item={item}
              />
            )
          )}
        </Box>
        <Divider sx={{ borderColor: "#2D3748" }} />
        {/* <Box
          sx={{
            px: 2,
            py: 3,
          }}
        >
          <Typography color="neutral.100" variant="subtitle2">
            Need more features?
          </Typography>
          <Typography color="neutral.500" variant="body2">
            Check out our Pro solution template.
          </Typography>
          <Box
            sx={{
              display: "flex",
              mt: 2,
              mx: "auto",
              width: "160px",
              "& img": {
                width: "100%",
              },
            }}
          >
            <img alt="Go to pro" src="/static/images/sidebar_pro.png" />
          </Box>
          <NextLink href="https://material-kit-pro-react.devias.io/" passHref>
            <Button
              color="secondary"
              component="a"
              endIcon={<OpenInNewIcon />}
              fullWidth
              sx={{ mt: 2 }}
              variant="contained"
            >
              Pro Live Preview
            </Button>
          </NextLink>
        </Box> */}
      </Box>
    </>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: "neutral.900",
            color: "#FFFFFF",
            width: 280,
          },
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: "neutral.900",
          color: "#FFFFFF",
          width: 280,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

DashboardSidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};