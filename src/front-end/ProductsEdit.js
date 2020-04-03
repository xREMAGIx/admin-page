import React, { useEffect, useState } from "react";
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
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";

import { useDispatch, useSelector } from "react-redux";

import { productActions } from "../_actions";

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

export default function ProductEdit(props) {
  const classes = useStyles();

  const [image, setImage] = React.useState(null);

  const [formData, setFormData] = useState({
    sku: "",
    productName: "",
    category: "",
    description: "",
    price: 1,
    discount: 2,
    size: 3
    //images: [],
  });

  const products = useSelector(state => state.products);
  //const user = useSelector(state => state.authentication.user);
  const dispatch = useDispatch();

  const {
    sku,
    productName,
    category,
    description,
    price,
    discount,
    size
  } = formData;

  useEffect(() => {
    function fetchData() {
      dispatch(productActions.getById(props.match.params.id));
    }
    //setFormData(result.data);
    fetchData();
  }, [dispatch, props.match.params.id]);

  useEffect(() => {
    setFormData({ ...products.items });
    //setOnImageChange({ ...formData.image });
  }, [products.items]);

  const handleOnImageChange = event => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSave = () => {
    dispatch(productActions.update(props.match.params.id, formData, image));
  };

  return (
    <React.Fragment>
      {products.items && (
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
                  name="sku"
                  value={sku}
                  onChange={e => onChange(e)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Product Name"
                  id="outlined-product-name"
                  variant="outlined"
                  name="productName"
                  value={productName}
                  onChange={e => onChange(e)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Category"
                  id="outlined-category"
                  variant="outlined"
                  name="category"
                  value={category}
                  onChange={e => onChange(e)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="outlined-multiline-description"
                  label="Description"
                  multiline
                  rows="2"
                  variant="outlined"
                  name="description"
                  value={description}
                  onChange={e => onChange(e)}
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
                      name="price"
                      value={price}
                      onChange={e => onChange(e)}
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
                      name="discount"
                      value={discount}
                      onChange={e => onChange(e)}
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
                  <InputLabel htmlFor="outlined-adornment-size">
                    Size
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-size"
                    name="size"
                    value={size}
                    onChange={e => onChange(e)}
                    startAdornment={
                      <InputAdornment position="start">Kg</InputAdornment>
                    }
                    labelWidth={30}
                  />
                </FormControl>
              </Grid>
              <Grid item container spacing={5}>
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => onSave()}
                  >
                    Save
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="contained">Cancel</Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid container item xs={6}>
              <Grid item>
                <div className={classes.uploadRoot}>
                  <input
                    accept="image/*"
                    className={classes.input}
                    id="contained-button-file"
                    multiple
                    type="file"
                    onChange={handleOnImageChange}
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
              <Grid item xs={12}>
                <GridList className={classes.gri}>
                  {formData.images &&
                    formData.images.map(item => (
                      <GridListTile style={{ width: "100%" }} component="image">
                        <img
                          src={"http://localhost:5000/uploads/" + item.path}
                          alt="broken"
                        />
                      </GridListTile>
                    ))}
                  {image && (
                    <GridListTile style={{ width: "100%" }} component="image">
                      <img src={URL.createObjectURL(image)} alt="broken" />
                    </GridListTile>
                  )}
                </GridList>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      )}
    </React.Fragment>
  );
}
