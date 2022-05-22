import Head from "next/head";
import { Box, Button, Container } from "@mui/material";
import { DashboardLayout } from "../../components/dashboard-layout";
import { formatDate } from "src/utils/helpers";
import dynamic from "next/dynamic";
import PrintingHeader from "src/components/printingPage/printing-header";
import DenseTable from "src/components/printingPage/sales-report-table";
import { withRouter } from "next/router";
import { useContext, useRef } from "react";
import { Store } from "src/statesManagement/store/store";
import CollapsibleTable from "src/components/printingPage/service-payment-by-category-print-table";
import ReactToPrint from "react-to-print";
import { COMPANY_NAME } from "src/utils/company_details";

// import PrintingHeader from "src/components/printingPage/printing-header";

const DynamicComponentWithNoSSR = dynamic(() => import("src/components/navbar-branch-indicator"), {
  ssr: false,
});

const ServicePaymentByCategoryPrintReport = (props) => {
  const { state } = useContext(Store);
  const { paymentByCatReport } = state;
  const printRef = useRef();
  const { router } = props;

  console.log(paymentByCatReport);

  const from_date = formatDate(router.query.from);
  const to_date = formatDate(router.query.to);

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
          <PrintingHeader
            title={`Service Payment by Category Report at ${router.query.branch} Between "${from_date}" and "${to_date}"`}
          />
          <CollapsibleTable paymentByCatReport={paymentByCatReport} />
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

ServicePaymentByCategoryPrintReport.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default withRouter(ServicePaymentByCategoryPrintReport);
