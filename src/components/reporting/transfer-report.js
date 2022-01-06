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

import { stores } from "../../__mocks__/stores";

import { useState } from "react";
import ReactDatePicker from "../dateslibrary/react-date-range";

import { addDays, subDays } from "date-fns";

export const Transfer_Report_Form = (props) => {
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

    setformvalues({ ...formvalues, endDate: enddate, startDate: startdate });
  };

  //handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formvalues);
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
            Transfer To Outlets
          </Button>
          {/* <Button color="primary" variant="contained">
                Add Sales
              </Button> */}
        </Box>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Card>
          <CardHeader title="Transfer Report" />
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

                  <Grid item xs={12} sx={{ mb: 4 }}>
                    <TextField
                      select={true}
                      fullWidth={true}
                      name="store"
                      label="Select Store"
                      required
                      value={formvalues.store}
                      onChange={(e) => setformvalues({ ...formvalues, store: e.target.value })}
                    >
                      {stores.map((option) => {
                        return (
                          <MenuItem key={option.id} value={option.name}>
                            {option.name}
                          </MenuItem>
                        );
                      })}
                    </TextField>
                  </Grid>

                  <Grid item xs={12}>
                    <Button type="submit" fullWidth={true} variant="contained">
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
