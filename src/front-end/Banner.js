import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import CustomDrawer from "./CustomDrawer";
import Button from "@material-ui/core/Button";
import GridListTile from "@material-ui/core/GridListTile";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  appBarSpacer: theme.mixins.toolbar,
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto"
  },
  uploadRoot: {
    "& > *": {
      margin: theme.spacing(1)
    },
    display: "flex",
    justifyContent: "center"
  },
  input: {
    display: "none"
  },
  gridTile: {
    "& .MuiGridListTile-tile": {
      backgroundColor: "#e0e0e0"
    }
  },
  img: {
    maxHeight: "30vh"
  }
}));

export default function Banner() {
  const classes = useStyles();

  const [onImageChange, setOnImageChange] = React.useState("");

  const handleOnImageChange = event => {
    if (event.target.files && event.target.files[0]) {
      setOnImageChange(URL.createObjectURL(event.target.files[0]));
      //setImage(event.target.files[0]);
    }
  };

  return (
    <React.Fragment>
      <div className={classes.root}>
        <CustomDrawer />
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="lg" className={classes.container}>
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
                <Button variant="contained" color="secondary" component="span">
                  Upload
                </Button>
              </label>
              <Button variant="contained" color="primary" component="span">
                Save
              </Button>
            </div>
            <Typography variant="h6">Current image banner: </Typography>
            <GridListTile className={classes.gridTile} component="image">
              <img className={classes.img} src={onImageChange} alt="" />>
            </GridListTile>
            <Typography style={{ marginTop: "5vh" }} variant="h6">
              Preview new image banner:
            </Typography>
            <GridListTile className={classes.gridTile} component="image">
              <img className={classes.img} src={onImageChange} alt="" />>
            </GridListTile>
          </Container>
        </main>
      </div>
    </React.Fragment>
  );
}
