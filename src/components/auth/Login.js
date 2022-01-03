import { React } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import HomeIcon from "@mui/icons-material/Home";
import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import { CustomTextField } from "../basicInputs";
import { CustomSelect } from "../basicInputs";
import { Form, Formik } from "formik";
import { CustomButton } from "../basicInputs";
import * as yup from "yup";
import { stores } from "src/__mocks__/stores";

// copyright
function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {"Copyright © "}
      <Link color="inherit" href="#">
        Dayon Nigeria Ltd
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  left: {
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
  wrapper: {
    display: "flex",
    flexDirection: "column",
  },
  text: {
    color: "#fff",
    marginBottom: "10px",
  },
  title: {
    color: "#4C4C6C",
    marginBottom: "15px",
  },
  icon: {
    color: "#fff",
    marginRight: "10px",
  },
  details: {
    display: "flex",
    alignItems: "left",
    justifyContent: "left",
  },
  form: {
    marginBottom: "30px",
  },
}));

// main render funtion
export default function Login() {
  const classes = useStyles();

  //   formik initial values
  const INITIAL_FORM_vALUES = {
    username: "",
    password: "",
    branch: "",
  };

  // yup validations
  const VALIDATIONS = yup.object().shape({
    username: yup.string().required("please enter your username"),
    password: yup.string().required("Please provide password"),
    branch: yup.string().required("Please provide password"),
  });
  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundColor: "#ED5567",
          backgroundSize: "cover",
          backgroundPosition: "center",
          flexDirection: "column",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        className={classes.left}
      >
        <div className={classes.wrapper}>
          <Typography variant="h4" className={classes.title}>
            18A Nigeria Limited
          </Typography>

          <div className={classes.details}>
            <HomeIcon className={classes.icon} />
            <Typography variant="subtitle1" className={classes.text}>
              Parakin Junction, Ile-Ife, Osun State
            </Typography>
          </div>
          <div className={classes.details}>
            <CallIcon className={classes.icon} />
            <Typography variant="subtitle1" className={classes.text}>
              08023456789
            </Typography>
          </div>
          <div className={classes.details}>
            <EmailIcon className={classes.icon} />
            <Typography variant="subtitle1" className={classes.text}>
              18alimited@gmail.com
            </Typography>
          </div>
        </div>
      </Grid>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <PersonIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Formik
            initialValues={{ ...INITIAL_FORM_vALUES }}
            onSubmit={(values) => console.log(values)}
            validationSchema={VALIDATIONS}
          >
            <Form>
              <CustomTextField className={classes.form} name="username" label="Username" />

              <CustomTextField
                className={classes.form}
                name="password"
                label="password"
                type="password"
              />

              <CustomSelect
                className={classes.form}
                name="branch"
                options={stores}
                label="Select Branch"
              />

              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <CustomButton type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Sign In
              </CustomButton>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Form>
          </Formik>
        </Box>
      </Grid>
    </Grid>
  );
}
