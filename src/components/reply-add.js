import React, { useRef } from "react";
import classes from "./reply-add.module.css";
import { useParams } from "react-router";
import { useGlobalContext } from "../context";
const ReplyAdd = ({ commentId, replyTo, setIsUserRep }) => {
  const { currentUser, addReply } = useGlobalContext();
  const { id } = useParams();
  let repRef = useRef();

  const onReplyAdd = () => {
    if (repRef.current.value && repRef.current.value.length > 0) {
      //------------------------------------------
      //close inputs
      //--------------------------------------------
      let reply = {
        content: repRef.current.value,
        user: currentUser,
        replyingTo: replyTo,
      };
      addReply(id, commentId, reply);
      repRef.current.value = "";
      setIsUserRep((val) => {
        let newVal = !val;
        return newVal;
      });
    }
  };
  return (
    <div className={classes.addRepCont}>
      <textarea
        className={classes.replyInput}
        rows="3"
        placeholder="Type your reply here"
        maxLength="250"
        ref={repRef}
      ></textarea>
      <button
        className={classes.postRepBtn}
        onClick={() => {
          onReplyAdd();
        }}
      >
        Post Reply
      </button>
    </div>
  );
};

export default ReplyAdd;
