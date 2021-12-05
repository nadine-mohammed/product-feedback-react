import React from "react";
import classes from "./roadmap-item.module.css";
const RoadmapItem = ({
  id,
  title,
  category,
  upvotes,
  status,
  description,
  commentsCount,
  color,
}) => {
  let upvotesIco = require("../assets/images/shared/icon-arrow-up.svg").default;
  let commentsIco =
    require("../assets/images/shared/icon-comments.svg").default;
  return (
    <div className={classes.roadmapFeedbackItem}>
      <div className={`${color} ${classes.itemBorder}`}></div>
      <div className={classes.statusItem}>
        <div className={`${color} ${classes.statusColor}`}></div>
        <div className={classes.statusTxt}>{status}</div>
      </div>
      <div className={classes.roadfeedbackCont}>
        <div className={classes.feedbackTitleAndDescCont}>
          <div className={classes.fTitle}>{title}</div>
          <div className={classes.fDesc}>{description}</div>
          <div className={classes.fCategory}>{category}</div>
        </div>
        <div className={classes.feedbackUpvotesAndCommentsCont}>
          <div className={classes.fUpvotes}>
            <div className={classes.upvotesIcon}>
              <img src={upvotesIco} />
            </div>
            <div className={classes.upvotesCount}>{upvotes}</div>
          </div>
          <div className={classes.fComments}>
            <div className={classes.commentsIcon}>
              <img src={commentsIco} />
            </div>
            <div className={classes.fCommentsCount}>{commentsCount}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoadmapItem;
