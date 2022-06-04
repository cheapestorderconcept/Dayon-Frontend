import Head from "next/head";
import { Box, Button, Container } from "@mui/material";
import { DashboardLayout } from "../../components/dashboard-layout";

import dynamic from "next/dynamic";
import PrintingHeader from "src/components/printingPage/printing-header";
import DenseTable from "src/components/printingPage/sales-report-table";
import { withRouter } from "next/router";
import { useContext, useRef, useState, useEffect } from "react";
import { Store } from "src/statesManagement/store/store";
import ReactToPrint from "react-to-print";
import { COMPANY_NAME } from "src/utils/company_details";
import {CollapsibleTable} from "src/components/printingPage/reciept-print-table";
import RecieptTemplate from "src/components/printingPage/new-reciept-print";

// import PrintingHeader from "src/components/printingPage/printing-header";

const DynamicComponentWithNoSSR = dynamic(() => import("src/components/navbar-branch-indicator"), {
  ssr: false,
});

const ReceiptPrintReport = (props) => {
  const { state } = useContext(Store);
  const printRef = useRef();
  const { router } = props;
  const [salesReciept, setsalesReciept] = useState({});
  useEffect(() => {
    setsalesReciept(JSON.parse(router.query.sales));
  }, []);

  console.log(salesReciept);

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
          {/* <PrintingHeader title={`Sales Reciept at ${salesReciept?.branch}`} /> */}
        <RecieptTemplate salesReciept={salesReciept}/>
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
