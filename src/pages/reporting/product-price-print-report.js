import Head from "next/head";
import { Box, Button, Container } from "@mui/material";
import { DashboardLayout } from "../../components/dashboard-layout";

import dynamic from "next/dynamic";
import PrintingHeader from "src/components/printingPage/printing-header";
import DenseTable from "src/components/printingPage/sales-report-table";
import { withRouter } from "next/router";
import { useContext, useEffect, useRef } from "react";
import { Store } from "src/statesManagement/store/store";
import BasicTable from "src/components/printingPage/out-of-stocks-report-table";
import ProductPriceListTable from "src/components/reporting/product-price-list-report";
import { getProductPrice } from "src/statesManagement/store/actions/product-action";
import { useSnackbar } from "notistack";
import ReactToPrint from "react-to-print";
import { COMPANY_NAME } from "src/utils/company_name";

const DynamicComponentWithNoSSR = dynamic(() => import("src/components/navbar-branch-indicator"), {
  ssr: false,
});

const ProductPriceReport = (props) => {
  const { state, dispatch } = useContext(Store);
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    getProductPrice({ dispatch: dispatch, enqueueSnackbar: enqueueSnackbar });
  }, []);

  const { productPrice } = state;

  const printRef = useRef();

  return (
    <>
      <Head>
        <title>Reporting| {COMPANY_NAME}</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 2,
        }}
      >
        <Container ref={printRef} maxWidth={true}>
          <PrintingHeader title={`Product Price List`} />
          <ProductPriceListTable productPrice={productPrice} />
        </Container>
        <Container
          sx={{
            display: "flex",
            mt: 4,
            justifyContent: "flex-end",
          }}
        >
          <ReactToPrint
            trigger={() => (
              <Button variant="contained" color="primary">
                Print Report
              </Button>
            )}
            content={() => printRef.current}
          />
        </Container>
      </Box>
    </>
  );
};

ProductPriceReport.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default ProductPriceReport;
