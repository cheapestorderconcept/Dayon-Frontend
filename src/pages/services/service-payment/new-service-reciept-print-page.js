import { Box, Button, Container } from "@mui/material";
import dynamic from "next/dynamic";
import Head from "next/head";
import { withRouter } from "next/router";
import { useContext, useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { DashboardLayout } from "src/components/dashboard-layout";
import ServiceRecieptTemplate from "src/components/printingPage/new-service-reciept-print";
import { Store } from "src/statesManagement/store/store";
import { COMPANY_NAME } from "src/utils/company_details";

// import PrintingHeader from "src/components/printingPage/printing-header";

const DynamicComponentWithNoSSR = dynamic(() => import("src/components/navbar-branch-indicator"), {
  ssr: false,
});

const ReceiptPrintReport = (props) => {
  const { state } = useContext(Store);
  const { branch, serviceRecieptBody } = state;
  const printRef = useRef();
  const { router } = props;
  const [serviceReciept, setserviceReciept] = useState({});
  useEffect(() => {
    setserviceReciept(JSON.parse(router.query.service));
  }, []);
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

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
        {/* <PrintingHeader title={`Service Reciept at ${COMPANY_NAME}`} /> */}
        <ServiceRecieptTemplate
          serviceReciept={serviceReciept}
          serviceRecieptBody={serviceRecieptBody}
          ref={printRef}
        />
        {/* <ServiceCollapsibleTable serviceReciept={serviceReciept} serviceRecieptBody={serviceRecieptBody} /> */}

        <Container
          sx={{
            display: "flex",
            mt: 4,
            justifyContent: "flex-end",
          }}
        >
          <Button onClick={handlePrint} variant="contained" color="primary">
            Print Reciept
          </Button>
        </Container>
      </Box>
    </>
  );
};

ReceiptPrintReport.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default withRouter(ReceiptPrintReport);
