import React from "react";
import classes from "./roadmap-topbar.module.css";
import { Link } from "react-router-dom";
const RoadmapTopbar = () => {
  return (
    <div className={classes.topbar}>
      <div className={classes.titleAndBack}>
        <Link className={classes.backBtn} to="/">
          <span className={`material-icons ${classes.arrowUrl}`}>
            keyboard_arrow_left
          </span>
          <span className={classes.backTxt}>Go Back</span>
        </Link>
        <div className={classes.roadmapTitle}>Roadmap</div>
      </div>
      <Link to="/new" className={classes.btnCont}>
        <div className={classes.btnIco}>
          <span className={`material-icons ${classes.btnIcoUrl}`}>add</span>
        </div>
        <div className={classes.btnTxt}>Add Feedback</div>
      </Link>
    </div>
  );
};

export default RoadmapTopbar;
