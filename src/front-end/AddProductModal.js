import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import GridListTile from "@material-ui/core/GridListTile";
import GridList from "@material-ui/core/GridList";
import GridListTileBar from "@material-ui/core/GridListTileBar";

import { useDispatch } from "react-redux";
import { productActions } from "../_actions";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  uploadRoot: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: "none",
  },
  img: {
    height: "100px",
    width: "100px",
  },
  gridList: {
    height: "60vh",
  },
}));

export default function TransitionsModal() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const [image, setImage] = React.useState("");
  //const user = useSelector(state => state.authentication.user);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    sku: "a",
    productName: "b",
    category: "c",
    description: "d",
    price: 1,
    discount: 2,
    size: 3,
  });

  const {
    sku,
    productName,
    category,
    description,
    price,
    discount,
    size,
  } = formData;

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

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
    <div>
      <Tooltip title="Add new">
        <IconButton aria-label="add-new" onClick={handleOpen}>
          <AddCircleIcon />
        </IconButton>
      </Tooltip>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <Container maxWidth="md" className={classes.container}>
              <Typography variant="h4" gutterBottom>
                Add new product
              </Typography>
              <Grid container direction="row" spacing={4}>
                <Grid container item xs={6} spacing={4}>
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
                    <TextField
                      fullWidth
                      label="Category"
                      id="outlined-category"
                      variant="outlined"
                      name="category"
                      value={category}
                      onChange={(e) => onChange(e)}
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
                        onChange={(e) => onChange(e)}
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
                        onClick={(e) => onSubmit(e)}
                      >
                        Add
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button variant="contained" onClick={handleClose}>
                        Cancel
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid
                  container
                  item
                  xs={6}
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
            </Container>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
