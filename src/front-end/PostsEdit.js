import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import CustomDrawer from "./CustomDrawer";
import TextEditor from "./TextEditor";
import Button from "@material-ui/core/Button";

import { useDispatch, useSelector } from "react-redux";

import { postActions } from "../_actions";

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
  },
  postBtn: {
    display: "flex",
    margin: theme.spacing(2),
    justifyContent: "flex-end"
  }
}));

export default function PostEdit(props) {
  const classes = useStyles();

  //   const [image, setImage] = React.useState(null);

  const [formData, setFormData] = useState({
    title: "a",
    content: "b"
  });

  const posts = useSelector(state => state.posts);
  //const user = useSelector(state => state.authentication.user);
  const dispatch = useDispatch();

  //const { title, content } = formData;

  //   useEffect(() => {
  //     function fetchData() {
  //       dispatch(postActions.getAll(props.match.params.id));
  //     }
  //     //setFormData(result.data);
  //     fetchData();
  //   }, [dispatch, props.match.params.id]);

  //   const handleOnImageChange = event => {
  //     if (event.target.files && event.target.files[0]) {
  //       setImage(event.target.files[0]);
  //     }
  //   };

  const [postContent, setPostContent] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [image, setImage] = React.useState("");

  //   useEffect(() => {
  //     setFormData({ title: title, content: postContent });
  //     //setOnImageChange({ ...formData.image });
  //   }, [title, postContent]);

  useEffect(() => {
    function fetchData() {
      dispatch(postActions.getById(props.match.params.id));
    }
    //setFormData(result.data);
    fetchData();
  }, [dispatch, props.match.params.id]);

  useEffect(() => {
    //setFormData({ ...posts.items });
    // //setOnImageChange({ ...formData.image });
    if (posts.items !== undefined) {
      setTitle(posts.items.title);
      setPostContent(posts.items.content);
    }
    // console.log(formData);
    //setTitle({ ...props.items });
    //setLoaded(true);
  }, [posts.items]);

  useEffect(() => {
    setFormData({ title: title, content: postContent });
    //setOnImageChange({ ...formData.image });
  }, [title, postContent]);

  const handleLog = () => {
    console.log(title);
    console.log(postContent);
    console.log(formData);
    console.log(posts.items);
  };

  const onSave = () => {
    //setFormData({ title: title, content: postContent });
    console.log(formData);
    dispatch(postActions.update(props.match.params.id, formData, image));
  };

  return (
    <React.Fragment>
      <div className={classes.root}>
        <CustomDrawer />
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          {posts.items !== null && (
            <Container maxWidth="lg" className={classes.container}>
              <Typography variant="h4" gutterBottom>
                Post Edit
              </Typography>
              <TextEditor
                onTitleChange={e => setTitle(e)}
                content={postContent}
                title={title}
                onChange={e => setPostContent(e)}
              />
              <div className={classes.postBtn}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleLog()}
                >
                  ConsoleLog
                </Button>
              </div>
              <div className={classes.postBtn}>
                <Button
                  variant="contained"
                  color="primary"
                  component="span"
                  onClick={() => onSave()}
                >
                  Post
                </Button>
              </div>
            </Container>
          )}
        </main>
      </div>
    </React.Fragment>
  );
}
