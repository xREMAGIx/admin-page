import React from "react";
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

const useStyles = makeStyles(theme => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  },
  uploadRoot: {
    "& > *": {
      margin: theme.spacing(1)
    }
  },
  input: {
    display: "none"
  },
  img: {
    height: "100px",
    width: "100px"
  },
  gridList: {
    "&..MuiGridListTile-root ,& .MuiGridListTile-imgFullWidth": {
      width: "100%"
    }
  }
}));

export default function TransitionsModal() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const [onImageChange, setOnImageChange] = React.useState("");

  const handleOnImageChange = event => {
    if (event.target.files && event.target.files[0]) {
      //   let reader = new FileReader();
      //   reader.onload = e => {
      //     setOnImageChange({ image: e.target.result });
      //   };
      //   reader.readAsDataURL(event.target.files[0]);
      setOnImageChange(URL.createObjectURL(event.target.files[0]));
      console.log(onImageChange);
    }
  };

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

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
          timeout: 500
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <Container maxWidth="md" className={classes.container}>
              <Typography variant="h4" gutterBottom>
                Add new product
              </Typography>
              <Grid container direction="row" spacing={1}>
                <Grid container item xs={6} spacing={4}>
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
                        Add
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button variant="contained">Cancel</Button>
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
                    <GridList className={classes.gri}>
                      <GridListTile style={{ width: "100%" }} component="image">
                        <img src={onImageChange} alt="broken" />>
                      </GridListTile>
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
