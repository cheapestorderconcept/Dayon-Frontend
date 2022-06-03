import Head from "next/head";
import { Box, Button, Container } from "@mui/material";
import { DashboardLayout } from "src/components/dashboard-layout";

import dynamic from "next/dynamic";
import PrintingHeader from "src/components/printingPage/printing-header";
import DenseTable from "src/components/printingPage/sales-report-table";
import { withRouter } from "next/router";
import { useContext, useRef, useState, useEffect } from "react";
import { Store } from "src/statesManagement/store/store";
import ReactToPrint from "react-to-print";
import { COMPANY_NAME } from "src/utils/company_details";
import { ServiceCollapsibleTable } from "src/components/printingPage/reciept-print-table";

// import PrintingHeader from "src/components/printingPage/printing-header";

const DynamicComponentWithNoSSR = dynamic(() => import("src/components/navbar-branch-indicator"), {
  ssr: false,
});

const ReceiptPrintReport = (props) => {
  const { state } = useContext(Store);
  const {branch, serviceRecieptBody} = state
  const printRef = useRef();
  const { router } = props;
  const [serviceReciept, setserviceReciept] = useState({});
  useEffect(() => {
    setserviceReciept(JSON.parse(router.query.service));
  }, []);

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
          <PrintingHeader title={`Service Reciept at ${COMPANY_NAME}`} />
          <ServiceCollapsibleTable serviceReciept={serviceReciept} serviceRecieptBody={serviceRecieptBody} />
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
                Print Reciept
              </Button>
            )}
            content={() => printRef.current}
          />
        </Container>
      </Box>
    </>
  );
};

ReceiptPrintReport.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default withRouter(ReceiptPrintReport);
