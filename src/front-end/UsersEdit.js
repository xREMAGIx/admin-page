import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";
import Skeleton from "@material-ui/lab/Skeleton";

import { Link } from "react-router-dom";

import CustomDrawer from "./CustomDrawer";

import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../_actions";

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
}));

const roleOption = [
  { title: "Admin", value: "admin" },
  { title: "User", value: "user" },
];

export default function UserEdit(props) {
  const classes = useStyles();

  const [errorOpen, setErrorOpen] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const { name, email, phone, address } = formData;

  useEffect(() => {
    if (users.error && typeof users.error === "string") {
      setErrorOpen(true);
      setErrorMessage(users.error);
    }
  }, [users.error]);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = () => {
    //console.log();
    dispatch(
      userActions.update(props.match.params.id, {
        ...formData,
      })
    );
  };

  const keyPressed = (e) => {
    if (e.key === "Enter") onSubmit(e);
  };

  useEffect(() => {
    dispatch(userActions.getById(props.match.params.id));
  }, [dispatch, props.match.params.id]);

  useEffect(() => {
    setFormData({ ...users.item });
  }, [users.item]);

  return (
    <React.Fragment>
      <div className={classes.root}>
        <CustomDrawer light={props.light} onToggleTheme={props.toggleTheme} />
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="lg" className={classes.container}>
            {users.loading ? (
              <React.Fragment>
                <Grid
                  container
                  direction="column"
                  spacing={5}
                  style={{ marginTop: "45px" }}
                >
                  <Grid item xs={12}>
                    <Skeleton variant="rect" height={56} />
                  </Grid>
                  <Grid item xs={12}>
                    <Skeleton variant="rect" height={56} />
                  </Grid>
                  <Grid item xs={12}>
                    <Skeleton variant="rect" height={56} />
                  </Grid>
                  <Grid item xs={12}>
                    <Skeleton variant="rect" height={56} />
                  </Grid>
                  <Grid item xs={12}>
                    <Skeleton variant="rect" height={56} />
                  </Grid>
                </Grid>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {formData && (
                  <Container maxWidth="lg" className={classes.container}>
                    <Typography variant="h4" gutterBottom>
                      User edit
                    </Typography>
                    {/* Error warning */}
                    <Collapse className={classes.alertContainer} in={errorOpen}>
                      <Alert
                        severity="error"
                        action={
                          <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                              setErrorOpen(false);
                            }}
                          >
                            <CloseIcon fontSize="inherit" />
                          </IconButton>
                        }
                      >
                        <AlertTitle>Error</AlertTitle>
                        {errorMessage}
                      </Alert>
                    </Collapse>
                    {/* Content */}
                    <Grid container direction="column" spacing={2}>
                      <Grid item>
                        <TextField
                          fullWidth
                          label="User name"
                          id="outlined-name"
                          variant="outlined"
                          name="name"
                          value={name || ""}
                          onChange={(e) => onChange(e)}
                          onKeyPress={(e) => keyPressed(e)}
                        />
                      </Grid>
                      <Grid item>
                        <TextField
                          fullWidth
                          label="User email"
                          id="outlined-email"
                          variant="outlined"
                          name="email"
                          value={email || ""}
                          onChange={(e) => onChange(e)}
                          onKeyPress={(e) => keyPressed(e)}
                        />
                      </Grid>
                      <Grid item>
                        <TextField
                          fullWidth
                          label="Phone"
                          id="outlined-phone"
                          variant="outlined"
                          name="phone"
                          value={phone || ""}
                          onChange={(e) => onChange(e)}
                          onKeyPress={(e) => keyPressed(e)}
                        />
                      </Grid>
                      <Grid item>
                        <TextField
                          fullWidth
                          label="Address"
                          id="outlined-address"
                          variant="outlined"
                          name="address"
                          value={address || ""}
                          onChange={(e) => onChange(e)}
                          onKeyPress={(e) => keyPressed(e)}
                        />
                      </Grid>
                      <Grid item>
                        <Autocomplete
                          id="role-combo-box"
                          value={
                            formData.role === "admin"
                              ? roleOption[0]
                              : roleOption[1]
                          }
                          options={roleOption}
                          getOptionLabel={(option) => option.title}
                          onChange={(event, newValue) => {
                            setFormData({ ...formData, role: newValue });
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Role"
                              variant="outlined"
                            />
                          )}
                        />
                      </Grid>
                    </Grid>
                    <Grid
                      style={{ marginTop: "10px" }}
                      container
                      justify="center"
                      spacing={5}
                    >
                      <Grid item>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={(e) => onSubmit(e)}
                        >
                          Update
                        </Button>
                      </Grid>
                      <Grid item>
                        <Button
                          component={Link}
                          to="/users"
                          variant="contained"
                        >
                          Cancel
                        </Button>
                      </Grid>
                    </Grid>
                  </Container>
                )}
              </React.Fragment>
            )}
          </Container>
        </main>
      </div>
    </React.Fragment>
  );
}
