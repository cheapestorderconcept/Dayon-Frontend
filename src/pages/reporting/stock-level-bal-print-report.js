import Head from "next/head";
import { Box, Button, Container } from "@mui/material";
import { DashboardLayout } from "../../components/dashboard-layout";

import dynamic from "next/dynamic";
import PrintingHeader from "src/components/printingPage/printing-header";
import DenseTable from "src/components/printingPage/sales-report-table";
import { withRouter } from "next/router";
import { useContext, useRef } from "react";
import { Store } from "src/statesManagement/store/store";
import BasicTable from "src/components/printingPage/stock-level-report-table";

import ReactToPrint from "react-to-print";
import { COMPANY_NAME } from "src/utils/company_details";

const DynamicComponentWithNoSSR = dynamic(() => import("src/components/navbar-branch-indicator"), {
  ssr: false,
});

const StockLevelPrintReport = (props) => {
  const { state } = useContext(Store);
  const { stockLevel } = state;
  const printRef = useRef();
  const { router } = props;

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
          <PrintingHeader title={`Stock Level Balance  at ${router.query.branch}`} />
          <BasicTable stockLevel={stockLevel} />
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

StockLevelPrintReport.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default withRouter(StockLevelPrintReport);
