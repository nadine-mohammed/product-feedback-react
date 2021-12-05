import React, { useState, useEffect } from "react";
import HomeTopbar from "../components/home-topbar";
import HomeSidebar from "../components/home-sidebar";
import FeedbackItem from "../components/feedback-item";
import classes from "./feedback-home.module.css";
import { useGlobalContext } from "../context";
import { Link } from "react-router-dom";
const FeedbackHome = () => {
  const { formattedFeedbacks } = useGlobalContext();
  const [isListImpty, setIsListImpty] = useState(false);
  let emptyImgUrl =
    require("../assets/images/suggestions/illustration-empty.svg").default;
  useEffect(() => {
    formattedFeedbacks.length > 0
      ? setIsListImpty(false)
      : setIsListImpty(true);
  }, [formattedFeedbacks]);
  return (
    <div className={classes.homePage}>
      <div className={classes.sidebar}>
        <HomeSidebar />
      </div>
      <div className={classes.pageContent}>
        <div className={classes.topbar}>
          <HomeTopbar />
        </div>
        {!isListImpty ? (
          <div className={classes.feedbackList}>
            {formattedFeedbacks.map((feedback) => {
              return <FeedbackItem key={feedback.id} {...feedback} />;
            })}
          </div>
        ) : (
          <div className={classes.empty}>
            <img src={emptyImgUrl} className={classes.emptyUrl} />
            <h1 className={classes.emptyTitle}>There is no feedbacks yet</h1>
            <p className={classes.emptyInfo}>
              Got a suggestion ? Found a bug that needs to be squashed? <br />
              We love hearing about new ideas to improve our app
            </p>

            <Link to="/new" className={classes.btnCont}>
              <div className={classes.btnIco}>
                <span className={`material-icons ${classes.btnIcoUrl}`}>
                  add
                </span>
              </div>
              <div className={classes.btnTxt}>Add Feedback</div>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedbackHome;
