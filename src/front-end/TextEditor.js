import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Editor,
  EditorState,
  RichUtils,
  convertFromRaw,
  convertToRaw
} from "draft-js";
import clsx from "clsx";
import TextField from "@material-ui/core/TextField";

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
  titleInput: {
    width: "100%",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
    backgroundColor: "#fff"
  },
  editorRoot: {
    background: "#fff",
    border: "1px solid #ddd",
    fontFamily: "Georgia, serif",
    fontSize: "14px",
    padding: "15px"
  },
  editor: {
    borderTop: "1px solid #ddd",
    cursor: "text",
    fontSize: "16px",
    marginTop: "10px",

    "& .public-DraftEditorPlaceholder-root, & .public-DraftEditor-content": {
      margin: "0 -15px -15px",
      padding: "15px"
    },

    "& .public-DraftEditor-content": {
      minHeight: "100px"
    },

    "& .public-DraftStyleDefault-pre": {
      backgroundColor: "rgba(0, 0, 0, 0.05)",
      fontFamily: "Inconsolata, Menlo, Consolas, monospace",
      fontSize: "16px",
      padding: "20px"
    },

    "& blockquote": {
      borderLeft: "5px solid #eee",
      color: "#666",
      fontFamily: "Hoefler Text, Georgia, serif",
      fontStyle: "italic",
      margin: "16px 0",
      padding: "10px 20px"
    }
  },
  hidePlaceholder: {
    display: "none"
  },
  styleButton: {
    color: "#999",
    cursor: "pointer",
    marginRight: "16px",
    padding: "2px 0",
    display: "inline-block"
  },
  activeButton: {
    color: "#5890ff"
  },
  controls: {
    fontFamily: "Helvetica, sans-serif",
    fontSize: "14px",
    marginBottom: "5px",
    userSelect: "none"
  },
  postBtn: {
    display: "flex",
    margin: theme.spacing(2),
    justifyContent: "flex-end"
  }
}));

const styleMap = {
  CODE: {
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2
  }
};

function getBlockStyle(block) {
  switch (block.getType()) {
    case "blockquote":
      return "RichEditor-blockquote";
    default:
      return null;
  }
}

function StyleButton(props) {
  const classes = useStyles();

  const onToggle = () => {
    props.onToggle(props.style);
  };

  return (
    <span
      className={clsx(classes.styleButton, {
        [classes.activeButton]: props.active
      })}
      onMouseDown={onToggle}
    >
      {props.label}
    </span>
  );
}

const BLOCK_TYPES = [
  { label: "H1", style: "header-one" },
  { label: "H2", style: "header-two" },
  { label: "H3", style: "header-three" },
  { label: "H4", style: "header-four" },
  { label: "H5", style: "header-five" },
  { label: "H6", style: "header-six" },
  { label: "Blockquote", style: "blockquote" },
  { label: "UL", style: "unordered-list-item" },
  { label: "OL", style: "ordered-list-item" },
  { label: "Code Block", style: "code-block" }
];

const BlockStyleControls = props => {
  const classes = useStyles();
  const { editorState } = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <div className={classes.controls}>
      {BLOCK_TYPES.map(type => (
        <StyleButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};

var INLINE_STYLES = [
  { label: "Bold", style: "BOLD" },
  { label: "Italic", style: "ITALIC" },
  { label: "Underline", style: "UNDERLINE" },
  { label: "Monospace", style: "CODE" }
];

const InlineStyleControls = props => {
  const classes = useStyles();
  var currentStyle = props.editorState.getCurrentInlineStyle();
  return (
    <div className={classes.controls}>
      {INLINE_STYLES.map(type => (
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};

//const editorStateAsJSONString = `{"entityMap":{},"blocks":[{"key":"1qh1g","text":"Header","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"fthtl","text":"text text text","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}]}`;

export default function TextEditor(props) {
  const classes = useStyles();
  const [editorState, setEditorState] = React.useState(
    EditorState.createEmpty()
  );
  const [title, setTitle] = React.useState("");

  const editor = React.useRef(null);

  function focusEditor() {
    editor.current.focus();
  }

  React.useEffect(() => {
    if (props.content !== undefined && props.content !== "") {
      setEditorState(
        EditorState.createWithContent(convertFromRaw(JSON.parse(props.content)))
      );
    }
    //setContentJsonString(props.content);
    focusEditor();
  }, [props.content]);

  // React.useEffect(() => {
  //   console.log(contentJsonString);
  //   if (contentJsonString !== "") {
  //     setEditorState(
  //       EditorState.createWithContent(
  //         convertFromRaw(JSON.parse(contentJsonString))
  //       )
  //     );
  //   }
  //   //setContentJsonString(props.content);
  // }, [contentJsonString]);

  const onChange = editorState => {
    setEditorState(editorState);
    props.onChange(
      JSON.stringify(convertToRaw(editorState.getCurrentContent()))
    );
    //props.onChange(convertToRaw(editorState.getCurrentContent()));
  };

  const onTitleChange = newValue => {
    setTitle(newValue);
    props.onTitleChange(newValue);
  };

  const _handleKeyCommand = command => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      onChange(newState);
      return true;
    }
    return false;
  };

  const _onTab = e => {
    const maxDepth = 4;
    onChange(RichUtils.onTab(e, editorState, maxDepth));
  };

  const _toggleBlockType = blockType => {
    onChange(RichUtils.toggleBlockType(editorState, blockType));
  };

  const _toggleInlineStyle = inlineStyle => {
    onChange(RichUtils.toggleInlineStyle(editorState, inlineStyle));
  };

  const _handleButtonClick = () => {
    console.log(JSON.stringify(convertToRaw(editorState.getCurrentContent())));
    console.log(title);
  };

  return (
    <React.Fragment>
      <TextField
        className={classes.titleInput}
        required
        id="title-required"
        label="Title"
        variant="outlined"
        onChange={e => onTitleChange(e.target.value)}
        value={props.title}
      />
      <div className={classes.editorRoot}>
        <button onClick={_handleButtonClick}>Log editor state</button>
        <BlockStyleControls
          editorState={editorState}
          onToggle={_toggleBlockType}
        />
        <InlineStyleControls
          editorState={editorState}
          onToggle={_toggleInlineStyle}
        />
        <div
          className={clsx(classes.editor, {
            [classes.hidePlaceholder]:
              !editorState.getCurrentContent().hasText() &&
              editorState
                .getCurrentContent()
                .getBlockMap()
                .first()
                .getType() !== "unstyled"
          })}
          onClick={focusEditor}
        >
          <Editor
            blockStyleFn={getBlockStyle}
            customStyleMap={styleMap}
            editorState={editorState}
            handleKeyCommand={_handleKeyCommand}
            onChange={editorState => onChange(editorState)}
            onTab={_onTab}
            placeholder="Write something..."
            ref={editor}
            spellCheck={true}
          />
        </div>
      </div>
    </React.Fragment>
  );
}
