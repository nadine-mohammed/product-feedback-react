import React, { useEffect, useState } from "react";
import classes from "./feedback-item.module.css";
import { Link } from "react-router-dom";
const FeedbackItem = ({
  id,
  title,
  category,
  upvotes,
  status,
  description,
  commentsCount,
}) => {
  let upvotesIco = require("../assets/images/shared/icon-arrow-up.svg").default;
  let commentsIco =
    require("../assets/images/shared/icon-comments.svg").default;
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    checkSize();
    window.addEventListener("resize", checkSize);
    return () => {
      window.removeEventListener("resize", checkSize);
    };
  }, []);
  const checkSize = () => {
    if (window.innerWidth <= 767) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };
  return !isMobile ? (
    <Link to={`/feedbacks/${id}`} className={classes.feedbackItemCont}>
      <div className={classes.fUpvotesCont}>
        <div className={classes.fUpvotes}>
          <div className={classes.upvotesIcon}>
            <img src={upvotesIco} />
          </div>
          <div className={classes.upvotesCount}>{upvotes}</div>
        </div>
      </div>
      <div className={classes.fTitleDescCatCont}>
        <div className={classes.fTitle}>{title}</div>
        <div className={classes.fDesc}>{description}</div>
        <div className={classes.fCategory}>{category}</div>
      </div>
      <div className={classes.fCommentsCont}>
        <div className={classes.fComments}>
          <div className={classes.commentsIcon}>
            <img src={commentsIco} />
          </div>
          <div className={classes.fCommentsCount}>{commentsCount}</div>
        </div>
      </div>
    </Link>
  ) : (
    <Link to={`/feedbacks/${id}`} className={classes.feedbackItemContMob}>
      <div className={classes.mobTitleDescCatCont}>
        <div className={classes.fTitle}>{title}</div>
        <div className={classes.fDesc}>{description}</div>
        <div className={classes.fCategory}>{category}</div>
      </div>
      <div className={classes.mobUpvotesCommentsCont}>
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
    </Link>
  );
};

export default FeedbackItem;
