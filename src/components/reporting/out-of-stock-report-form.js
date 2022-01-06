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

import { useState } from "react";
import { stores } from "src/__mocks__/stores";

export const Out_Of_Report_Form = (props) => {
  const [formvalues, setformvalues] = useState({
    store: "",
  });

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
            Out Of Stock Report
          </Button>
          {/* <Button color="primary" variant="contained">
                    Add Sales
                  </Button> */}
        </Box>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Card>
          <CardHeader title="Out Of Stock Report" />
          <Divider />
          <CardContent>
            <Box sx={{ maxWidth: 800 }}>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
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
                      {stores.map((option) => {
                        return (
                          <MenuItem key={option.id} value={option.name}>
                            {option.name}
                          </MenuItem>
                        );
                      })}
                    </TextField>
                  </Grid>

                  <Grid item xs={6}>
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
