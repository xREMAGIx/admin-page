import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import CustomDrawer from "./CustomDrawer";
import Button from "@material-ui/core/Button";
import GridListTile from "@material-ui/core/GridListTile";
import Typography from "@material-ui/core/Typography";
import CardMedia from "@material-ui/core/CardMedia";
import GridList from "@material-ui/core/GridList";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import Paper from "@material-ui/core/Paper";

import { useDispatch, useSelector } from "react-redux";
import { bannerActions } from "../_actions";
import backendUrl from "../_constants";

import Carousel from "./components/Carousel";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBarSpacer: theme.mixins.toolbar,
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  uploadRoot: {
    "& > *": {
      margin: theme.spacing(1),
    },
    display: "flex",
    justifyContent: "center",
  },
  input: {
    display: "none",
  },
  gridTile: {
    "& .MuiGridListTile-tile": {
      backgroundColor: "#e0e0e0",
      //maxHeight: "30vh",
    },
    "& .MuiGridListTile-imgFullWidth": {
      transform: "translateY(0%) translateX(20%)",
      width: "auto",
    },
    "& .MuiGridListTile-imgFullHeight": {},
  },
  img: {
    height: "400px",
  },
  banner: {
    height: "400px",
    position: "relative",
  },
  bannerGrid: {
    height: "100%",
  },
  media: {
    backgroundColor: "white",
    height: "100%",
    overflow: "hidden",
    position: "relative",
    transition: "300ms",
    cursor: "pointer",
    "&:hover": {
      filter: "brightness(115%)",
    },
  },
  mediaCaption: {
    textOverflow: "ellipsis",
    position: "absolute",
    bottom: "0",
    padding: "15px",
    backgroundColor: "black",
    color: "white",
    opacity: "0.6",
    width: "100%",
    height: "10%",
    fontSize: "$header-font-size",
    fontWeight: "200",
    transition: "300ms",
    cursor: "pointer",
    "&:hover": {
      opacity: "0.8",
    },
  },
  cardContent: {
    color: "white",
    backgroundColor: "black",
    height: "100%",
    cursor: "pointer",
    padding: "30px",
    transition: "300ms",
    "&:hover, &:active": {
      backgroundColor: "dark-red-active",
    },
  },
  cardTitle: {
    fontSize: "$huge-font-size",
    fontWeight: "500",
  },
  cardCaption: {
    marginTop: "10px",
    fontSize: "$bigger-font-size",
  },
  viewButton: {
    marginTop: "40px",
    color: "white",
    fontSize: "$header-font-size",
    border: "3px solid white",
    textTransform: "capitalize",
    transition: "200ms",
  },
  gridList: {
    flexWrap: "nowrap",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)",
  },
  imageBanner: {
    width: "500px",
  },
  imagePaper: {
    position: "relative",
    height: "500px",
    overflow: "hidden",
    // padding: "20px",
    color: "white",
  },
  bannerCheckBtn: {
    marginTop: "40px",
    color: "white",
    fontSize: "$header-font-size",
    border: "3px solid white",
    textTransform: "capitalize",
  },
}));

function Project(props) {
  const classes = useStyles();
  return (
    <Paper className={classes.imagePaper} elevation={10}>
      {props.item.path && (
        <CardMedia
          className={classes.media}
          image={`${backendUrl}/uploads/` + props.item.path}
          // title={props.item.name}
        />
      )}
      {props.item.img && (
        <CardMedia
          className={classes.media}
          image={URL.createObjectURL(props.item.img)}
          // title={props.item.name}
        />
      )}
      {/* <Button className={classes.bannerCheckBtn}>Check it out!</Button> */}
    </Paper>
  );
}

export default function Banner() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const autoPlay = false;
  const timer = 500;
  const animation = "fade";
  const indicators = true;

  const [image, setImage] = React.useState([]);
  const [previewBanners, setPreviewBanners] = React.useState([]);
  const [delImage, setDelImage] = React.useState([]);

  const [formData, setFormData] = React.useState([]);

  const banners = useSelector((state) => state.banners);

  useEffect(() => {
    dispatch(bannerActions.getAll());
  }, [dispatch]);

  useEffect(() => {
    // /console.log(banners.items);
    setFormData(banners.items);
  }, [banners.items]);

  useEffect(() => {
    if (formData !== undefined) setPreviewBanners(formData.concat(image));
  }, [formData, image]);

  const onDeleteBtn = (e) => {
    setDelImage((delImage) => [...delImage, e.target.id]);
    let imgFilter = formData.filter((_image) => _image._id !== e.target.id);
    setFormData(imgFilter);
  };

  const onDeleteNew = (e) => {
    let newImg = image.filter((_image) => _image.id !== e.target.id * 1);
    //console.log(newImg);
    setImage(newImg);
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

  const onSave = () => {
    dispatch(bannerActions.add_delete(image, delImage));
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
              <Button
                variant="contained"
                color="primary"
                component="span"
                onClick={() => onSave()}
              >
                Save
              </Button>
            </div>
            <Typography variant="h6">Current list image banners: </Typography>
            <GridList cellHeight={300} cols={2.5} className={classes.gridList}>
              {formData !== undefined &&
                formData.map((item) => (
                  <GridListTile key={item._id}>
                    <img
                      src={`${backendUrl}/uploads/` + item.path}
                      alt={"No data"}
                    />
                    <GridListTileBar
                      title={item.path}
                      actionIcon={
                        <Button
                          id={item._id}
                          style={{ color: "red" }}
                          onClick={(e) => onDeleteBtn(e)}
                        >
                          <Typography id={item._id}>Del</Typography>
                        </Button>
                      }
                    />
                  </GridListTile>
                ))}
              {image &&
                image.map((item) => (
                  <GridListTile key={item.id}>
                    <img src={URL.createObjectURL(item.img)} alt={"No data"} />
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

            <Typography style={{ marginTop: "5vh" }} variant="h6">
              Preview banners carousel:
            </Typography>

            {/* Normal Carousel */}
            {previewBanners !== undefined && (
              <Carousel
                className={classes.imageBanner}
                autoPlay={autoPlay}
                timer={timer}
                animation={animation}
                indicators={indicators}
              >
                {previewBanners.map((item, index) => {
                  return <Project item={item} key={index} />;
                })}
              </Carousel>
            )}
          </Container>
        </main>
      </div>
    </React.Fragment>
  );
}
