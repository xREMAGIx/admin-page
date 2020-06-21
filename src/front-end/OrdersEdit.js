import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import CustomDrawer from "./CustomDrawer";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Autocomplete from "@material-ui/lab/Autocomplete";

import { useDispatch, useSelector } from "react-redux";

import { productActions, orderActions, userActions } from "../_actions";
import Skeleton from "@material-ui/lab/Skeleton";

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
  marginY: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}

function priceRow(qty, unit) {
  return qty * unit;
}

// function subtotal(items) {
//   return items
//     .map(({ price, amount }) => price * amount)
//     .reduce((sum, i) => sum + i, 0);
// }

const statusOption = [
  { title: "Pending", value: "pending" },
  { title: "Shipping", value: "shipping" },
  { title: "Completed", value: "completed" },
  { title: "Cancelled", value: "cancelled" },
];

export default function OrderEdit(props) {
  const classes = useStyles();

  const [productsInOrder, setProductsInOrder] = React.useState([]);
  const [formData, setFormData] = useState({ status: "pending" });

  const orders = useSelector((state) => state.orders);
  const products = useSelector((state) => state.products);
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(orderActions.getById(props.match.params.id));
    dispatch(productActions.getAll());
  }, [dispatch, props.match.params.id]);

  useEffect(() => {
    if (orders.item) {
      dispatch(userActions.getById(orders.item.user));
      setFormData({ ...orders.item });
    }
  }, [dispatch, orders.item]);

  useEffect(() => {
    setProductsInOrder(
      orders.item && products.items && orders.item.products !== undefined
        ? orders.item.products.map((element) =>
            Object.assign(
              products.items.find((product) => product.id === element.product),
              { amount: element.amount }
            )
          )
        : null
    );
  }, [orders.item, products.items]);

  useEffect(() => {
    console.log(productsInOrder);
    console.log(orders.item);
  }, [productsInOrder, orders.item]);

  const statusToIndex = (status) => {
    switch (status) {
      case "pending":
        return 0;
      case "shipping":
        return 1;
      case "completed":
        return 2;
      case "cancelled":
        return 3;
      default:
        return 0;
    }
  };

  const handleStatusSelected = (value) => {
    console.log(value);
    if (value) {
      setFormData({ ...formData, status: value.value });
    }
  };

  const handleUpdate = () => {
    dispatch(orderActions.update(props.match.params.id, formData));
  };

  return (
    <React.Fragment>
      <div className={classes.root}>
        <CustomDrawer />
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="lg" className={classes.container}>
            {/* Shipping  */}
            {users.item ? (
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography
                    variant="h6"
                    gutterBottom
                    className={classes.title}
                  >
                    Shipping detail
                  </Typography>
                  <Typography gutterBottom>
                    <strong>Name:</strong> {users.item.name}
                  </Typography>
                  <Typography gutterBottom>
                    <strong>Phone:</strong> {users.item.phone}
                  </Typography>
                  <Typography gutterBottom>
                    <strong>Address:</strong> {users.item.address}
                  </Typography>
                  <Typography gutterBottom>
                    <strong>Payment:</strong> {orders.item.payment}
                  </Typography>
                </Grid>
                <Grid item container direction="column" xs={12} sm={6}>
                  <Typography
                    variant="h6"
                    gutterBottom
                    className={classes.title}
                  >
                    Status
                  </Typography>
                  <Grid
                    container
                    direction="column"
                    spacing={2}
                    alignItems="center"
                  >
                    <Grid item style={{ width: "100%" }}>
                      <Autocomplete
                        fullWidth
                        style={{ marginTop: "10px" }}
                        options={statusOption}
                        onChange={(e, value) => handleStatusSelected(value)}
                        value={
                          orders.item
                            ? statusOption[statusToIndex(formData.status)]
                            : ""
                        }
                        getOptionLabel={(option) => option.title}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Status"
                            variant="outlined"
                          />
                        )}
                      />
                    </Grid>
                    <Grid item>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleUpdate()}
                      >
                        Update
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            ) : (
              <React.Fragment>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Skeleton
                      variant="rect"
                      width={"100%"}
                      height={200}
                    ></Skeleton>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Skeleton
                      variant="rect"
                      width={"100%"}
                      height={200}
                    ></Skeleton>
                  </Grid>
                </Grid>
              </React.Fragment>
            )}

            {/* Order table */}

            {orders.item && productsInOrder ? (
              <React.Fragment>
                <Typography
                  className={classes.marginY}
                  variant="h6"
                  gutterBottom
                >
                  Order no <strong>#{orders.item._id}</strong>
                </Typography>
                <TableContainer component={Paper}>
                  <Table className={classes.table} aria-label="spanning table">
                    <TableHead>
                      <TableRow>
                        <TableCell align="center" colSpan={3}>
                          Details
                        </TableCell>
                        <TableCell align="right">Price</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Desc</TableCell>
                        <TableCell align="right">Qty.</TableCell>
                        <TableCell align="right">Price</TableCell>
                        <TableCell align="right">Discount</TableCell>
                        <TableCell align="right">Discount Price</TableCell>
                        <TableCell align="right">Sum</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {productsInOrder.map((product, index) => (
                        <TableRow key={index}>
                          <TableCell>{product.productName}</TableCell>
                          <TableCell align="right">{product.amount}</TableCell>
                          <TableCell align="right">{product.price}</TableCell>
                          <TableCell align="right">
                            {product.discount}%
                          </TableCell>
                          <TableCell align="right">
                            {(product.price * (100 - product.discount)) / 100}
                          </TableCell>
                          <TableCell align="right">
                            {ccyFormat(
                              priceRow(
                                product.amount,
                                (product.price * (100 - product.discount)) / 100
                              )
                            )}
                          </TableCell>
                        </TableRow>
                      ))}

                      <TableRow>
                        <TableCell colSpan={3} />
                        <TableCell colSpan={2}>Total</TableCell>
                        <TableCell align="right">
                          {orders.item.totalPrice}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Skeleton
                  className={classes.marginY}
                  variant="rect"
                  width={"100%"}
                  height={50}
                ></Skeleton>

                <Skeleton variant="rect" width={"100%"} height={200}></Skeleton>
              </React.Fragment>
            )}
          </Container>
        </main>
      </div>
    </React.Fragment>
  );
}
