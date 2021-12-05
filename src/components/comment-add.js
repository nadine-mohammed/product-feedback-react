import React, { useRef, useState } from "react";
import { useGlobalContext } from "../context";
import classes from "./comment-add.module.css";
import { useParams } from "react-router";
//comment add
const CommentAdd = () => {
  const { id } = useParams();
  const { addComment, currentUser, lastCommentIdx } = useGlobalContext();
  const [countChar, setCountChar] = useState(250);
  const maxChar = 250;
  let commentRef = useRef();
  //
  const calculateRemain = () => {
    let remain = maxChar - commentRef.current.value.length;
    setCountChar(remain);
  };
  const addNewComment = () => {
    if (commentRef.current.value && commentRef.current.value.length > 0) {
      let comment = {
        id: lastCommentIdx + 1,
        content: commentRef.current.value,
        user: currentUser,
      };
      addComment(id, comment);
      setCountChar(250);
      commentRef.current.value = "";
    }
  };
  return (
    <div className={classes.addComment}>
      <div className={classes.addCommentTitle}>Add Comment</div>
      <textarea
        className={classes.commentInput}
        rows="3"
        placeholder="Type your comment here"
        maxLength={maxChar}
        ref={commentRef}
        onChange={() => {
          calculateRemain();
        }}
      ></textarea>

      <div className={classes.addCMoreInfo}>
        <div
          className={classes.counterTxt}
        >{`${countChar} Characters left`}</div>
        <button
          className={classes.postCommentBtn}
          onClick={() => {
            addNewComment();
          }}
        >
          Post Comment
        </button>
      </div>
    </div>
  );
};

export default CommentAdd;
