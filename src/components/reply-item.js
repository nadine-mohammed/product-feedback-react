import React, { useState } from "react";
import classes from "../components/reply-item.module.css";
import ReplyAdd from "./reply-add";

function ReplyItem({ content, replyingTo, user, commentId }) {
  let imgName = user.image.substring(21);
  let repUserImgUrl = require("../assets/images/user-images/" +
    imgName).default;
  const [isUserRepAdd, setIsUserRepAdd] = useState(false);

  return (
    <div className={classes.userItemRep}>
      <div className={classes.replyCont}>
        <div className={classes.repUserImage}>
          <img
            src={repUserImgUrl}
            alt={user.name}
            className={classes.repImageUrl}
          />
        </div>
        <div className={classes.repUserDetails}>
          <div className={classes.repUserNameCont}>
            <div>
              <div className={classes.repName}>{user.name}</div>
              <div className={classes.repuserName}>@{user.username}</div>
            </div>
            <button
              className={classes.repBtn}
              onClick={() => {
                setIsUserRepAdd((val) => {
                  let newVal = !val;
                  return newVal;
                });
              }}
            >
              Reply
            </button>
          </div>
          <div className={classes.repAndRepAdd}>
            <div className={classes.repCommentCont}>
              <span className={classes.repTo}>@{replyingTo} </span>
              <span className={classes.repContent}>{content}</span>
            </div>
            {isUserRepAdd ? (
              <ReplyAdd
                commentId={commentId}
                replyTo={user.username}
                setIsUserRep={setIsUserRepAdd}
              />
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
      <div className={classes.repAndRepAddMobile}>
        <div className={classes.repCommentCont}>
          <span className={classes.repTo}>@{replyingTo} </span>
          <span className={classes.repContent}>{content}</span>
        </div>
        {isUserRepAdd ? (
          <ReplyAdd
            commentId={commentId}
            replyTo={user.username}
            setIsUserRep={setIsUserRepAdd}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default ReplyItem;
