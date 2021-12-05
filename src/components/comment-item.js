import React, { useState } from "react";
import classes from "./comment-item.module.css";
import ReplyItem from "./reply-item";
import ReplyAdd from "./reply-add";

const CommentItem = ({ id, content, user, replies, idx, length }) => {
  let imgName = user.image.substring(21);
  let userImageUrl = require("../assets/images/user-images/" + imgName).default;
  const [isUserRep, setIsUserRep] = useState(false);

  return (
    <div className={classes.commentWithLine}>
      <div className={classes.commentCont}>
        <div className={classes.userImage}>
          <img
            src={userImageUrl}
            alt={user.name}
            className={classes.imageUrl}
          />
        </div>
        <div className={classes.userNameCommentCont}>
          <div className={classes.userNameCont}>
            <div>
              <div className={classes.uName}>{user.name}</div>
              <div className={classes.username}>@{user.username}</div>
            </div>
            <button
              className={classes.replyBtn}
              onClick={() => {
                setIsUserRep((val) => {
                  let newVal = !val;
                  return newVal;
                });
              }}
            >
              Reply
            </button>
          </div>
          <div className={classes.userCommentCont}>
            <div className={classes.comment}>{content}</div>
            {isUserRep ? (
              <ReplyAdd
                commentId={id}
                replyTo={user.username}
                setIsUserRep={setIsUserRep}
              />
            ) : (
              ""
            )}
            {replies && replies.length > 0 ? (
              <div className={classes.repliesCont}>
                {replies.map((rep, indx) => {
                  return <ReplyItem key={indx} {...rep} commentId={id} />;
                })}
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
      <div className={classes.userCommentContMobile}>
        <div className={classes.comment}>{content}</div>
        {isUserRep ? (
          <ReplyAdd
            commentId={id}
            replyTo={user.username}
            setIsUserRep={setIsUserRep}
          />
        ) : (
          ""
        )}
        {replies && replies.length > 0 ? (
          <div className={classes.repliesCont}>
            {replies.map((rep, indx) => {
              return <ReplyItem key={indx} {...rep} commentId={id} />;
            })}
          </div>
        ) : (
          ""
        )}
      </div>
      <div
        className={classes.line}
        style={{ display: idx === length - 1 ? "none" : "block" }}
      ></div>
    </div>
  );
};

export default CommentItem;
