import Head from "next/head";
import { Box, Button, Container } from "@mui/material";
import { DashboardLayout } from "../../components/dashboard-layout";

import dynamic from "next/dynamic";
import PrintingHeader from "src/components/printingPage/printing-header";
import DenseTable from "src/components/printingPage/sales-report-table";
import { withRouter } from "next/router";
import { useContext, useRef, useState, useEffect } from "react";
import { Store } from "src/statesManagement/store/store";
import { useReactToPrint } from "react-to-print";
import CollapsibleTable from "src/components/printingPage/reciept-print-table";
import { COMPANY_NAME } from "src/utils/company_details";
import RecieptTemplate from "src/components/printingPage/reciept-print-table";

// import PrintingHeader from "src/components/printingPage/printing-header";

const DynamicComponentWithNoSSR = dynamic(() => import("src/components/navbar-branch-indicator"), {
  ssr: false,
});

const ReceiptReprint = (props) => {
  const { state } = useContext(Store);
  const printRef = useRef();
  const { router } = props;
  const [receipts, setreceipts] = useState([]);
  useEffect(() => {
    setreceipts(JSON.parse(router.query.receipts));
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
        <PrintingHeader title={`Reprint Sales Receipt`} />
        <RecieptTemplate ref={printRef} receipts={receipts} />

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

ReceiptReprint.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default withRouter(ReceiptReprint);
