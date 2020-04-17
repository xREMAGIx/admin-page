import React, { useEffect } from "react";
import { Fade, Slide, IconButton } from "@material-ui/core";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  carouselRoot: {
    position: "relative",
  },
  buttonWrapper: {
    position: "absolute",
    height: "calc(100% - 20px - 10px)",
    backgroundColor: "transparent",
    top: 0,
    "&:hover": {
      "&.button": {
        backgroundColor: "black",
        filter: "brightness(120%)",
        opacity: "0.4",
      },
    },
  },
  button: {
    margin: "0 10px",
    position: "relative",
    top: "calc(50% - 20px)",
    backgroundColor: "#494949",
    color: "white",
    opacity: "0.2 !important",
    fontSize: "30px",
    transition: "200ms",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "black",
      opacity: "0.6 !important",
    },
  },
  next: {
    right: 0,
  },
  prev: {
    left: 0,
  },
  indicators: {
    width: "100%",
    marginTop: "10px",
    textAlign: "center",
  },
  inactiveIndicator: {
    cursor: "pointer",
    transition: "200ms",
    color: "#afafaf",

    fontSize: "14px",
    "&:hover, &:active": {
      color: "#1f1f1f",
    },
  },
  activeIndicator: {
    fontSize: "15px",
    color: "#494949",
  },
}));

export default function Carousel(props) {
  const classes = useStyles();

  const [active, setActive] = React.useState(0);
  const [autoPlay, setAutoPlay] = React.useState(
    props.autoPlay !== undefined ? props.autoPlay : true
  );
  const [iInterval, setiInterval] = React.useState(
    props.iInterval !== undefined ? props.iInterval : 4000
  );
  const [timer, setTimer] = React.useState(null);

  const [preAutoPlay, setPreAutoPlay] = React.useState(null);
  const [preiInterval, setPreiInterval] = React.useState(null);

  if (props.autoPlay !== preAutoPlay || iInterval !== preiInterval) {
    setAutoPlay(props.autoPlay);
    if (iInterval !== undefined) setiInterval(4000);
    setPreAutoPlay(autoPlay);
    setPreiInterval(iInterval);
  }

  const reset = () => {
    stop();
    if (autoPlay) {
      start();
    }
  };

  const start = () => {
    if (autoPlay) {
      setTimer(setInterval(next, iInterval));
    }
  };

  const stop = () => {
    if (timer) {
      clearInterval(timer);
      setTimer(null);
    }
  };

  const next = (event) => {
    console.log(active);
    const next = active + 1 > props.children.length - 1 ? 0 : active + 1;
    console.log("next: " + next);
    setActive(next);
    reset();

    if (event) event.stopPropagation();
  };

  const prev = (event) => {
    const prev = active - 1 < 0 ? props.children.length - 1 : active - 1;
    setActive(prev);
    reset();

    if (event) event.stopPropagation();
  };

  const pressIndicator = (index) => {
    setActive(index);
    reset();
  };

  useEffect(() => {
    start();
    // returned function will be called on component unmount
    return () => {
      stop();
    };
  }, []);

  useEffect(() => {
    reset();
  }, [autoPlay, iInterval]);

  const indicators = props.indicators !== undefined ? props.indicators : true;
  const animation = props.animation !== undefined ? props.animation : "fade";

  return (
    <div
      className={classes.carouselRoot}
      onMouseEnter={() => stop()}
      onMouseOut={() => reset()}
    >
      {Array.isArray(props.children) ? (
        props.children.map((child, index) => {
          return (
            <CarouselItem
              key={index}
              active={index === active ? true : false}
              child={child}
              animation={animation}
            />
          );
        })
      ) : (
        <CarouselItem key={0} active={true} child={props.children} />
      )}

      <div className={`${classes.buttonWrapper} ${classes.next}`}>
        <IconButton
          className={`${classes.button} ${classes.next}`}
          onClick={() => next()}
        >
          <NavigateNextIcon />
        </IconButton>
      </div>

      <div className={`${classes.buttonWrapper} ${classes.prev}`}>
        <IconButton
          className={`${classes.button} ${classes.prev}`}
          onClick={() => prev()}
        >
          <NavigateBeforeIcon />
        </IconButton>
      </div>

      {indicators ? (
        <Indicators
          length={props.children.length}
          active={active}
          press={pressIndicator}
        />
      ) : null}
    </div>
  );
}

function CarouselItem(props) {
  return (
    <div className="CarouselItem" hidden={!props.active}>
      {props.animation === "slide" ? (
        <Slide direction="left" in={props.active} timeout={200}>
          <div>{props.child}</div>
        </Slide>
      ) : (
        <Fade in={props.active} timeout={500}>
          <div>{props.child}</div>
        </Fade>
      )}
    </div>
    // ) : null
  );
}

function Indicators(props) {
  const classes = useStyles();
  let indicators = [];
  for (let i = 0; i < props.length; i++) {
    const className =
      i === props.active ? classes.activeIndicator : classes.inactiveIndicator;
    const item = (
      <FiberManualRecordIcon
        key={i}
        size="small"
        className={className}
        onClick={() => {
          props.press(i);
        }}
      />
    );

    indicators.push(item);
  }

  return <div className={classes.indicators}>{indicators}</div>;
}
