import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
  Grid,
  MenuItem,
  TextField,
} from "@mui/material";
import { Download as DownloadIcon } from "../../icons/download";

import { Upload as UploadIcon } from "../../icons/upload";

import { useContext, useState } from "react";
import ReactDatePicker from "../dateslibrary/react-date-range";

import { addDays, subDays } from "date-fns";
import { getDepositReport } from "src/statesManagement/store/actions/reportingActions/deposit-repoort-action";
import { Store } from "src/statesManagement/store/store";
import { useSnackbar } from "notistack";
import { useRouter } from "next/router";

export const Deposit_Report_Form = (props) => {
  const { dispatch, state } = useContext(Store);
  const { loading, branch } = state;
  const { enqueueSnackbar } = useSnackbar();
  const Router = useRouter();
  const [formvalues, setformvalues] = useState({
    startDate: null,
    endDate: null,
    store: "",
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

    console.log(enddate);
    setformvalues({ ...formvalues, endDate: enddate, startDate: startdate });
  };

  //handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    getDepositReport({
      dispatch: dispatch,
      enqueueSnackbar: enqueueSnackbar,
      from: selectionValue[0].startDate,
      to: selectionValue[0].endDate,
      Router: Router,
      branch: formvalues.store,
    });
    console.log(formvalues);
  };

  return (
    <Box {...props} end={selectionValue[0].endDate}>
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
            Deposit Report
          </Button>
          {/* <Button color="primary" variant="contained">
                  Add Sales
                </Button> */}
        </Box>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Card>
          <CardHeader title="Deposit Report" />
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
                  <Grid item xs={6} sx={{ mb: 4 }}>
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