import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { addDays, subDays } from "date-fns";
//   import { getSalesReport } from "src/statesManagement/store/actions/reportingActions/sales-report-action";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useContext, useState } from "react";
import { getServiceDepositReports } from "src/statesManagement/store/actions/reportingActions/service-report-action ";
import { Store } from "src/statesManagement/store/store";
import { Download as DownloadIcon } from "../../icons/download";
import { Upload as UploadIcon } from "../../icons/upload";
import ReactDatePicker from "../dateslibrary/react-date-range";

export const ServicesDepositReportForm = (props) => {
  const { dispatch, state } = useContext(Store);
  const { loading } = state;
  const { enqueueSnackbar } = useSnackbar();
  const Router = useRouter();
  const [formvalues, setformvalues] = useState({
    startDate: null,
    endDate: null,
  });

  const [selectionValue, setselectionValue] = useState([
    {
      startDate: subDays(new Date(), 7),
      endDate: addDays(new Date(), 1),
      key: "selection",
    },
  ]);

  // updates date range on change
  const handleSelect = (ranges) => {
    const { selection } = ranges;

    setselectionValue([selection]);
    const startdate = selectionValue[0].startDate;
    const enddate = selectionValue[0].endDate;

    setformvalues({ ...formvalues, endDate: enddate, startDate: startdate });
  };

  //handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    getServiceDepositReports({
      dispatch,
      enqueueSnackbar,
      from: selectionValue[0].startDate,
      to: selectionValue[0].endDate,
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
            Service Deposit Report
          </Button>
          {/* <Button color="primary" variant="contained">
              Add Sales
            </Button> */}
        </Box>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Card>
          <CardHeader title="Service Deposit Report" />
          <Divider />
          <CardContent>
            <Box sx={{ maxWidth: 800 }}>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sx={{ mb: 4 }}>
                    <Typography variant="h6" sx={{ mb: 4 }}>
                      {" "}
                      Select Date Range
                    </Typography>
                    <ReactDatePicker
                      showSelectionPreview={true}
                      selectionRange={selectionValue}
                      handleSelect={handleSelect}
                    />
                  </Grid>

                  {/* <Grid item xs={6} sx={{ mb: 4 }}>
                    <TextField
                      select={true}
                      fullWidth={true}
                      name="store"
                      label="Select Store"
                      required
                      value={formvalues.store}
                      onChange={(e) => setformvalues({ ...formvalues, store: e.target.value })}
                    >
                      {branch.map((option) => {
                        return (
                          <MenuItem key={option.id} value={option.branch_name}>
                            {option.branch_name}
                          </MenuItem>
                        );
                      })}
                    </TextField>
                  </Grid> */}

                  {/* <Grid item xs={6} sx={{ mb: 4 }}>
                      <TextField
                        required
                        select={true}
                        fullWidth={true}
                        name="product"
                        label="Select Product"
                        value={formvalues.product}
                        onChange={(e) => setformvalues({ ...formvalues, product: e.target.value })}
                      >
                        {products.map((option) => {
                          return (
                            <MenuItem key={option.id} value={option.product_name}>
                              {option.product_name}
                            </MenuItem>
                          );
                        })}
                      </TextField>
                    </Grid> */}

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
