import React, { useEffect } from "react";
import classes from "./feedback-details.module.css";
import { useParams } from "react-router-dom";
import { useGlobalContext } from "../context";
import FeedbackItem from "../components/feedback-item";
import CommentsList from "../components/comments-list";
import CommentAdd from "../components/comment-add";
import { Link } from "react-router-dom";
const FeedbackDetails = () => {
  const { id } = useParams();
  const { selectedFeedback, getFeedbackAndComments, formattedFeedbacks } =
    useGlobalContext();
  let arrowBackUrl =
    require("../assets/images/shared/icon-arrow-left.svg").default;
  useEffect(() => {
    (async function () {
      await getFeedbackAndComments(id);
    })();
  }, [formattedFeedbacks]);
  return (
    <div className={classes.detailsCont}>
      <div className={classes.fDetails}>
        <div className={classes.dActions}>
          <Link className={classes.backBtn} to="/">
            <img
              src={arrowBackUrl}
              alt="arrow back"
              className={classes.arrowUrl}
            />
            <div className={classes.backTxt}>Go Back</div>
          </Link>
          <Link to={`/edit/${id}`} className={classes.editFbtn}>
            Edit Feedback
          </Link>
        </div>
        <div className={classes.dFItem}>
          <FeedbackItem {...selectedFeedback} />
        </div>
        <div className={classes.dCommentsReplies}>
          <CommentsList />
        </div>
        <div className={classes.dAddComment}>
          <CommentAdd />
        </div>
      </div>
    </div>
  );
};

export default FeedbackDetails;
