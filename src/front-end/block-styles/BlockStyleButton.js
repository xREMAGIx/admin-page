// import React from "react";

// import clsx from "clsx";
// import Button from "@material-ui/core/Button";
// import { makeStyles } from "@material-ui/core/styles";

// const useStyles = makeStyles(theme => ({}));

// export default function BlockStyleButton(props) {
//   const classes = useStyles();
//   const [toggle, setToggle] = React.useState(props);

//   const handleToggle = () => {
//     setToggle(props.style);
//   };

//   return (
//     <Button
//       //   className={clsx(classes.styleBtn, { [classes.activeBtn]: toggle.active })}
//       onClick={handleToggle}
//     >
//       {props.label}
//     </Button>
//   );
// }
import React from "react";
import { Button } from "@material-ui/core";

class BlockStyleButton extends React.Component {
  onToggle = e => {
    e.preventDefault();
    this.props.onToggle(this.props.style);
  };

  render() {
    let className = "RichEditor-styleButton";
    if (this.props.active) {
      className += " RichEditor-activeButton";
    }

    return (
      <Button className={className} onClick={this.onToggle}>
        {this.props.label}
      </Button>
    );
  }
}

export default BlockStyleButton;
