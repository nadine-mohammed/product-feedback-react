import React from "react";
import classes from "./comment-list.module.css";
import CommentItem from "../components/comment-item";
import { useGlobalContext } from "../context";

const CommentsList = () => {
  const { commentsAndRep } = useGlobalContext();

  return (
    <div className={classes.commentsRep}>
      <div
        className={classes.cTitle}
      >{`${commentsAndRep.length} Comments`}</div>

      {commentsAndRep && commentsAndRep.length > 0 ? (
        <div className={classes.commentList}>
          {commentsAndRep.map((commentRep, idx) => {
            return (
              <CommentItem
                key={commentRep.id}
                {...commentRep}
                idx={idx}
                length={commentsAndRep.length}
              />
            );
          })}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default CommentsList;
