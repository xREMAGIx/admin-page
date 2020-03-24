import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import CustomDrawer from "./CustomDrawer";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto"
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
  uploadRoot: {
    "& > *": {
      margin: theme.spacing(1)
    }
  },
  input: {
    display: "none"
  }
}));

export default function Dashboard() {
  const classes = useStyles();

  const [values, setValues] = React.useState({
    sku: "",
    name: "",
    category: "",
    price: 0,
    size: 30,
    discount: 0,
    description: " "
  });

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
  };

  return (
    <React.Fragment>
      <div className={classes.root}>
        <CustomDrawer />
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="lg" className={classes.container}>
            <Typography variant="h4" gutterBottom>
              Product Edit
            </Typography>
            <Grid container direction="row" spacing={1}>
              <Grid container item xs={6} spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="SKU"
                    id="outlined-sku"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Product Name"
                    id="outlined-product-name"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Category"
                    id="outlined-category"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="outlined-multiline-description"
                    label="Description"
                    multiline
                    rows="4"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} container spacing={2}>
                  <Grid item sm={12} md={6}>
                    <FormControl
                      fullWidth
                      className={classes.margin}
                      variant="outlined"
                    >
                      <InputLabel htmlFor="outlined-adornment-price">
                        Price
                      </InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-price"
                        value={values.price}
                        onChange={handleChange("price")}
                        startAdornment={
                          <InputAdornment position="start">$</InputAdornment>
                        }
                        labelWidth={40}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item sm={12} md={6}>
                    <FormControl
                      fullWidth
                      className={classes.margin}
                      variant="outlined"
                    >
                      <InputLabel htmlFor="outlined-adornment-discount">
                        Discount
                      </InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-discount"
                        value={values.discount}
                        onChange={handleChange("discount")}
                        startAdornment={
                          <InputAdornment position="start">%</InputAdornment>
                        }
                        labelWidth={60}
                      />
                    </FormControl>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <FormControl
                    fullWidth
                    className={classes.margin}
                    variant="outlined"
                  >
                    <InputLabel htmlFor="outlined-adornment-amount">
                      Size
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-amount"
                      value={values.discount}
                      onChange={handleChange("discount")}
                      startAdornment={
                        <InputAdornment position="start">Kg</InputAdornment>
                      }
                      labelWidth={30}
                    />
                  </FormControl>
                </Grid>
                <Grid item container spacing={5}>
                  <Grid item>
                    <Button variant="contained" color="primary">
                      Save
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button variant="contained">Cancel</Button>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <div className={classes.uploadRoot}>
                  <input
                    accept="image/*"
                    className={classes.input}
                    id="contained-button-file"
                    multiple
                    type="file"
                  />
                  <label htmlFor="contained-button-file">
                    <Button
                      variant="contained"
                      color="primary"
                      component="span"
                    >
                      Upload
                    </Button>
                  </label>
                </div>
              </Grid>
            </Grid>
          </Container>
        </main>
      </div>
    </React.Fragment>
  );
}
