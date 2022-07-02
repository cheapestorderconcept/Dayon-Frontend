import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
  Grid,
  TextField,
  MenuItem,
} from "@mui/material";
import { Download as DownloadIcon } from "../../icons/download";
import { Upload as UploadIcon } from "../../icons/upload";

import { useContext, useState } from "react";
import ReactDatePicker from "../dateslibrary/react-date-range";
import { addDays, subDays } from "date-fns";
import { Store } from "src/statesManagement/store/store";
import { useSnackbar } from "notistack";
import {
  getReprintReciept,
  getSalesReport,
} from "src/statesManagement/store/actions/reportingActions/sales-report-action";
import { useRouter } from "next/router";
import { CustomTextField } from "../basicInputs";

export const ReceiptReprintForm = (props) => {
  const { dispatch, state } = useContext(Store);
  const { branch, loading } = state;
  const { enqueueSnackbar } = useSnackbar();
  const Router = useRouter();
  const [invoiceNum, setinvoiceNum] = useState("");

  //handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(invoiceNum);
    getReprintReciept({
      dispatch: dispatch,
      enqueueSnackbar: enqueueSnackbar,
      invoice_num: invoiceNum,
      Router: Router,
    });
  };

  return (
    <Box {...props}>
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          m: -1,
        }}
      >
        <Typography sx={{ m: 1 }} variant="h4">
          Reporting
        </Typography>
        <Box sx={{ m: 1 }}>
          <Button startIcon={<UploadIcon fontSize="small" />} sx={{ mr: 1 }}>
            Home
          </Button>
          <Button startIcon={<DownloadIcon fontSize="small" />} sx={{ mr: 1 }}>
            Reprint Receipt
          </Button>
          {/* <Button color="primary" variant="contained">
            Add Sales
          </Button> */}
        </Box>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Card>
          <CardHeader title="Receipt Reprint " />
          <Divider />
          <CardContent>
            <Box sx={{ maxWidth: 800 }}>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sx={{ mb: 4 }}>
                    <TextField
                      fullWidth={true}
                      name="invoice_num"
                      label="Enter invoice number "
                      required
                      value={invoiceNum}
                      onChange={(e) => setinvoiceNum(e.target.value)}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Button
                      disabled={loading ? true : false}
                      type="submit"
                      fullWidth={true}
                      variant="contained"
                    >
                      View now
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};
