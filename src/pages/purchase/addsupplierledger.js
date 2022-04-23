import Head from "next/head";
import { Box, Container, Grid, Pagination } from "@mui/material";

import { DashboardLayout } from "../../components/dashboard-layout";
import PaymentMethodList from "src/components/paymentmethod/payment-method-list";
import { AddPurchase } from "src/components/purchases/add-purchase";
import { AddSupplierLedger } from "src/components/purchases/add-supplier-ledger";
import dynamic from "next/dynamic";
import { COMPANY_NAME } from "src/utils/company_details";

const DynamicComponentWithNoSSR = dynamic(() => import("src/components/navbar-branch-indicator"), {
  ssr: false,
});
const AddSupplierLedgerPage = () => (
  <>
    <Head>
      <title>Add Supplier Ledger| {COMPANY_NAME}</title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 2,
      }}
    >
      <DynamicComponentWithNoSSR />
      <Container maxWidth={true}>
        <AddSupplierLedger />
      </Container>
    </Box>
  </>
);

AddSupplierLedgerPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default AddSupplierLedgerPage;
