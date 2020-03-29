import React from "react";
import CustomDrawer from "./CustomDrawer";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import BlockStyleToolbar, {
  getBlockStyle
} from "./block-styles/BlockStyleToolbar";

import { Editor, EditorState, RichUtils } from "draft-js";

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
  mainContainer: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    backgroundColor: "#ffffff"
  },
  editorContainer: {
    padding: "1em",
    margin: "1em"
  },
  editors: {
    border: "1px blue solid",
    padding: " 1em",
    margin: " 1em",
    fontFamily: "Open Sans"
  }
}));

export default function TextEditor() {
  const classes = useStyles();

  const [editorState, setEditorState] = React.useState(
    EditorState.createEmpty()
  );

  const handleKeyCommand = command => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return "handled";
    }
    return "not-handled";
  };

  const handleUnderlineClick = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, "UNDERLINE"));
  };

  const handleBoldClick = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, "BOLD"));
  };

  const handleItalicClick = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, "ITALIC"));
  };

  const toggleBlockType = blockType => {
    setEditorState(RichUtils.toggleBlockType(editorState, blockType));
  };

  return (
    <React.Fragment>
      <div className={classes.root}>
        <CustomDrawer />
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="lg" className={classes.mainContainer}>
            <div className="toolbar">
              <BlockStyleToolbar
                editorState={editorState}
                onToggle={toggleBlockType}
              />
              <Button onClick={handleUnderlineClick}>U</Button>
              <Button onClick={handleBoldClick}>
                <b>B</b>
              </Button>
              <Button onClick={handleItalicClick}>
                <em>I</em>
              </Button>
            </div>
            <div className={classes.editors}>
              <Editor
                blockStyleFn={getBlockStyle}
                editorState={editorState}
                onChange={setEditorState}
                handleKeyCommand={handleKeyCommand}
              />
            </div>
          </Container>
        </main>
      </div>
    </React.Fragment>
  );
}
