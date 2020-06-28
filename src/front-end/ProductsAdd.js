import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import CustomDrawer from "./CustomDrawer";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import { Link } from "react-router-dom";
import Autocomplete from "@material-ui/lab/Autocomplete";

import { useDispatch, useSelector } from "react-redux";

import { productActions, categoryActions, brandActions } from "../_actions";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  uploadRoot: {
    margin: theme.spacing(1),
  },
  input: {
    display: "none",
  },
  gridList: {
    height: "60vh",
  },
  productSection: {
    color: theme.palette.primary.main,
    fontWeight: "bold",
  },
}));

export default function ProductAdd(props) {
  const classes = useStyles();

  const [image, setImage] = React.useState("");
  //const user = useSelector(state => state.authentication.user);
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories);
  const brands = useSelector((state) => state.brands);

  const [formData, setFormData] = useState({
    sku: "a",
    productName: "b",
    category: "",
    brand: "",
    description: "",
    price: 0,
    discount: 0,
  });
  const {
    sku,
    productName,
    description,
    price,
    discount,
    cpu,
    gpu,
    os,
    ram,
    storage,
    newFeature,
    display,
    displayResolution,
    displayScreen,
    camera,
    video,
    wifi,
    bluetooth,
    ports,
    size,
    weight,
    material,
    batteryCapacity,
  } = formData;

  useEffect(() => {
    dispatch(categoryActions.getAll());
    dispatch(brandActions.getAll());
  }, [dispatch]);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOnImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let images = [];
      for (let i = 0; i < event.target.files.length; i++) {
        images.push({ id: i, img: event.target.files[i] });
      }
      setImage(images);
    }
  };

  const handleCategorySelected = (value) => {
    if (value) {
      setFormData({ ...formData, category: value.id });
    }
  };

  const handleBrandSelected = (value) => {
    if (value) {
      setFormData({ ...formData, brand: value.id });
    }
  };

  const onDeleteNew = (e) => {
    let newImg = image.filter((_image) => _image.id !== e.target.id * 1);
    //console.log(newImg);
    setImage(newImg);
  };

  const onSubmit = async () => {
    dispatch(productActions.add(formData, image));
  };

  return (
    <React.Fragment>
      <div className={classes.root}>
        <CustomDrawer />
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />

          <Container maxWidth="lg" className={classes.container}>
            <Typography variant="h4" align="center" gutterBottom>
              Add new product
            </Typography>
            <Grid container direction="row" spacing={4}>
              <Grid container item xs={12} md={6} spacing={4}>
                {/* General */}
                <Typography className={classes.productSection} variant="h6">
                  General
                </Typography>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="SKU"
                    id="outlined-sku"
                    variant="outlined"
                    name="sku"
                    value={sku}
                    onChange={(e) => onChange(e)}
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
                    onChange={(e) => onChange(e)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Autocomplete
                    id="category-cb"
                    options={categories.items || []}
                    getOptionLabel={(options) => options.name}
                    onChange={(e, value) => handleCategorySelected(value)}
                    style={{ width: "100%" }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Category"
                        variant="outlined"
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Autocomplete
                    id="brand-cb"
                    options={brands.items || []}
                    getOptionLabel={(options) => options.name}
                    onChange={(e, value) => handleBrandSelected(value)}
                    style={{ width: "100%" }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Brand"
                        variant="outlined"
                        margin="normal"
                      />
                    )}
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
                    name="description"
                    value={description}
                    onChange={(e) => onChange(e)}
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
                        onChange={(e) => onChange(e)}
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
                        onChange={(e) => onChange(e)}
                        startAdornment={
                          <InputAdornment position="start">%</InputAdornment>
                        }
                        labelWidth={60}
                      />
                    </FormControl>
                  </Grid>
                </Grid>

                {/* Configurations */}
                <Typography className={classes.productSection} variant="h6">
                  Configurations
                </Typography>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="CPU"
                    id="outlined-cpu"
                    variant="outlined"
                    name="cpu"
                    value={cpu}
                    onChange={(e) => onChange(e)}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="GPU"
                    id="outlined-gpu"
                    variant="outlined"
                    name="gpu"
                    value={gpu}
                    onChange={(e) => onChange(e)}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="OS"
                    id="outlined-os"
                    variant="outlined"
                    name="os"
                    value={os}
                    onChange={(e) => onChange(e)}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="RAM"
                    id="outlined-ram"
                    variant="outlined"
                    name="ram"
                    value={ram}
                    onChange={(e) => onChange(e)}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Storage"
                    id="outlined-storage"
                    variant="outlined"
                    name="storage"
                    value={storage}
                    onChange={(e) => onChange(e)}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="New Features"
                    id="outlined-newFeature"
                    variant="outlined"
                    name="newFeature"
                    value={newFeature}
                    onChange={(e) => onChange(e)}
                  />
                </Grid>

                {/* Display */}
                <Typography className={classes.productSection} variant="h6">
                  Display
                </Typography>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Display"
                    id="outlined-display"
                    variant="outlined"
                    name="display"
                    value={display}
                    onChange={(e) => onChange(e)}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Display Resolution"
                    id="outlined-displayResolution"
                    variant="outlined"
                    name="displayResolution"
                    value={displayResolution}
                    onChange={(e) => onChange(e)}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Display Screen"
                    id="outlined-displayScreen"
                    variant="outlined"
                    name="displayScreen"
                    value={displayScreen}
                    onChange={(e) => onChange(e)}
                  />
                </Grid>

                {/* Camera */}
                <Typography className={classes.productSection} variant="h6">
                  Camera
                </Typography>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Camera"
                    id="outlined-camera"
                    variant="outlined"
                    name="camera"
                    value={camera}
                    onChange={(e) => onChange(e)}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Video"
                    id="outlined-video"
                    variant="outlined"
                    name="video"
                    value={video}
                    onChange={(e) => onChange(e)}
                  />
                </Grid>

                {/* Connectivity */}
                <Typography className={classes.productSection} variant="h6">
                  Connectivity
                </Typography>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Wifi"
                    id="outlined-wifi"
                    variant="outlined"
                    name="wifi"
                    value={wifi}
                    onChange={(e) => onChange(e)}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Bluetooth"
                    id="outlined-bluetooth"
                    variant="outlined"
                    name="bluetooth"
                    value={bluetooth}
                    onChange={(e) => onChange(e)}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Ports"
                    id="outlined-ports"
                    variant="outlined"
                    name="ports"
                    value={ports}
                    onChange={(e) => onChange(e)}
                  />
                </Grid>

                {/* Physical details */}
                <Typography className={classes.productSection} variant="h6">
                  Physical details
                </Typography>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Size"
                    id="outlined-size"
                    variant="outlined"
                    name="size"
                    value={size}
                    onChange={(e) => onChange(e)}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Weight"
                    id="outlined-weight"
                    variant="outlined"
                    name="weight"
                    value={weight}
                    onChange={(e) => onChange(e)}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Material"
                    id="outlined-material"
                    variant="outlined"
                    name="material"
                    value={material}
                    onChange={(e) => onChange(e)}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Battery Capacity"
                    id="outlined-batteryCapacity"
                    variant="outlined"
                    name="batteryCapacity"
                    value={batteryCapacity}
                    onChange={(e) => onChange(e)}
                  />
                </Grid>
              </Grid>
              <Grid
                container
                item
                xs={12}
                md={6}
                direction="row"
                alignItems="flex-start"
                justify="center"
              >
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
                  <GridList className={classes.gridList}>
                    {image &&
                      image.map((item) => (
                        <GridListTile key={item.id} style={{ width: "100%" }}>
                          <img
                            src={URL.createObjectURL(item.img)}
                            alt={"No data"}
                          />
                          <GridListTileBar
                            title={item.img.name}
                            actionIcon={
                              <Button
                                id={item.id}
                                style={{ color: "red" }}
                                onClick={(e) => onDeleteNew(e)}
                              >
                                <Typography id={item.id}>Del</Typography>
                              </Button>
                            }
                          />
                        </GridListTile>
                      ))}
                  </GridList>
                </Grid>
              </Grid>
            </Grid>
            {/* Buttons */}
            <Grid container spacing={5} justify="center">
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={(e) => onSubmit(e)}
                >
                  Add
                </Button>
              </Grid>
              <Grid item>
                <Button component={Link} to="/products" variant="contained">
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </Container>
        </main>
      </div>
    </React.Fragment>
  );
}
