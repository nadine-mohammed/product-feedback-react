import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import classes from "./feedback-manage.module.css";
import { Link, useHistory } from "react-router-dom";
import { useGlobalContext } from "../context";
const FeedbackManage = () => {
  let arrowBackUrl =
    require("../assets/images/shared/icon-arrow-left.svg").default;
  let arrowDownUrl =
    require("../assets/images/shared/icon-arrow-down.svg").default;
  let checkIconUrl = require("../assets/images/shared/icon-check.svg").default;
  let editIcon =
    require("../assets/images/shared/icon-edit-feedback.svg").default;
  let addIcon =
    require("../assets/images/shared/icon-new-feedback.svg").default;
  // ----------------------------------------------
  const { id } = useParams();
  const {
    allFeedbacks,
    allStatus,
    categoryList,
    selectedFeedback,
    addFeedback,
    editFeedback,
    deleteFeedback,
  } = useGlobalContext();
  const history = useHistory();
  const [pathTo, setPathTo] = useState("/");
  const [isEdit, setIsEdit] = useState(false);
  const [formIcon, setFormIcon] = useState(addIcon);
  const [formTitle, setFormTitle] = useState("Create New Feedback");
  const [btnSaveOrAddTxt, setBtnSaveOrAddTxt] = useState("Add Feedback");
  // -----------------------------------------
  const feedbackTitle = useRef();
  const feedbackDetails = useRef();
  const [isEmptyTitle, setIsEmptyTitle] = useState(false);
  const [isEmptyDetails, setIsEmptyDetails] = useState(false);
  const [category, setCategory] = useState("feature");
  const [status, setStatus] = useState("suggestion");
  const [isCategoryOpVisible, setIsCategoryOpVisible] = useState(false);
  const [isStatusOpVisible, setIsStatusOpVisible] = useState(false);
  useEffect(() => {
    if (!isNaN(id)) {
      let path = `/feedbacks/${id}`;
      setPathTo(path);
      setIsEdit(true);
      setFormIcon(editIcon);
      setFormTitle(`Editing '${selectedFeedback.title}'`);
      setBtnSaveOrAddTxt("Save Changes");
      // ------------------
      feedbackTitle.current.value = selectedFeedback.title;
      feedbackDetails.current.value = selectedFeedback.description;
      setCategory(selectedFeedback.category);
      setStatus(selectedFeedback.status);
      // -------------------
    }
  }, []);

  const onSaveFeeback = (e) => {
    e.preventDefault();
    let title = feedbackTitle.current.value;
    let details = feedbackDetails.current.value;
    if (title.length > 0 && category.length > 0 && details.length > 0) {
      let fId = isEdit ? id : allFeedbacks.length + 1;
      let f = {
        id: fId,
        title: title,
        category: category,
        status: status,
        description: details,
      };
      if (isEdit) {
        editFeedback(fId, f);
        history.replace(pathTo);
      } else {
        addFeedback({ ...f, upvotes: 0 });
        history.replace(pathTo);
      }
    } else {
      checkTitle();
      checkDetails();
    }
  };
  const checkTitle = () => {
    let title = feedbackTitle.current.value;
    if (title.length === 0) {
      setIsEmptyTitle(true);
    } else {
      setIsEmptyTitle(false);
    }
  };
  const checkDetails = () => {
    let details = feedbackDetails.current.value;
    if (details.length === 0) {
      setIsEmptyDetails(true);
    } else {
      setIsEmptyDetails(false);
    }
  };
  const onDeleteFeedback = () => {
    deleteFeedback(id);
    history.replace("/");
  };
  return (
    <div className={classes.manageCont}>
      <div className={classes.manage}>
        <div className={classes.manageActions}>
          <Link className={classes.backBtn} to={pathTo}>
            <img
              src={arrowBackUrl}
              alt="arrow back"
              className={classes.arrowUrl}
            />
            <span className={classes.backTxt}>Go Back</span>
          </Link>
        </div>
        <form className={classes.manageForm}>
          <div className={classes.formIco}>
            <img
              className={classes.formIcoUrl}
              src={formIcon}
              alt="form icon"
            />
          </div>
          <div className={classes.formTitleTxt}>{formTitle}</div>
          <div className={classes.mainInputs}>
            <div className={classes.fFeedbackTitle}>
              <div className={classes.title}>
                <div className={classes.mainTitle}>Feedback Title</div>
                <div className={classes.moreInfo}>
                  Add a short,description headline
                </div>
              </div>
              <textarea
                rows="2"
                className={classes.inp}
                ref={feedbackTitle}
                onChange={() => {
                  checkTitle();
                }}
              ></textarea>
              {isEmptyTitle ? (
                <div className={classes.emptyError}>Can't be empty</div>
              ) : (
                ""
              )}
            </div>
            <div className={classes.fFeedbackCategory}>
              <div className={classes.title}>
                <div className={classes.mainTitle}>Category</div>
                <div className={classes.moreInfo}>
                  Choose a category for your feedback
                </div>
              </div>
              <button
                className={classes.optionsBtn}
                type="button"
                onClick={() => {
                  setIsCategoryOpVisible((oldVal) => {
                    let newVal = !oldVal;
                    return newVal;
                  });
                }}
              >
                <div>{category}</div>
                <img src={arrowDownUrl} />
              </button>
              <div
                className={classes.optionList}
                style={{
                  display: isCategoryOpVisible ? "block" : "none",
                  zIndex: "4",
                }}
              >
                {categoryList.map((cat, cIdx) => {
                  //skip (all) option item
                  if (cIdx !== 0) {
                    return (
                      <button
                        key={cIdx}
                        className={classes.optionItem}
                        type="button"
                        onClick={() => {
                          setCategory(cat.value);
                          setIsCategoryOpVisible((oldVal) => {
                            let newVal = !oldVal;
                            return newVal;
                          });
                        }}
                      >
                        <div>{cat.value}</div>
                        {cat.value.toLowerCase() === category.toLowerCase() ? (
                          <img src={checkIconUrl} alt="check icon" />
                        ) : (
                          ""
                        )}
                      </button>
                    );
                  }
                })}
              </div>
            </div>
            {isEdit ? (
              <div className={classes.fFeedbackStatus}>
                <div className={classes.title}>
                  <div className={classes.mainTitle}>Update Status</div>
                  <div className={classes.moreInfo}>Change feedback state</div>
                </div>
                <button
                  className={classes.optionsBtn}
                  type="button"
                  onClick={() => {
                    setIsStatusOpVisible((oldVal) => {
                      let newVal = !oldVal;
                      return newVal;
                    });
                  }}
                >
                  <div>{status}</div>
                  <img src={arrowDownUrl} />
                </button>
                <div
                  className={classes.optionList}
                  style={{ display: isStatusOpVisible ? "block" : "none" }}
                >
                  {allStatus.map((st, sIdx) => {
                    return (
                      <button
                        key={sIdx}
                        className={classes.optionItem}
                        type="button"
                        onClick={() => {
                          setStatus(st.value);
                          setIsStatusOpVisible((oldVal) => {
                            let newVal = !oldVal;
                            return newVal;
                          });
                        }}
                      >
                        <div>{st.value}</div>
                        {st.value.toLowerCase() === status.toLowerCase() ? (
                          <img src={checkIconUrl} alt="check icon" />
                        ) : (
                          ""
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : (
              ""
            )}
            <div className={classes.fFeedbackDetails}>
              <div className={classes.title}>
                <div className={classes.mainTitle}>Feedback Detail</div>
                <div className={classes.moreInfo}>
                  Include any specific comments on what should be
                  improved,added,etc
                </div>
              </div>
              <textarea
                rows="2"
                className={classes.inp}
                ref={feedbackDetails}
                onChange={() => {
                  checkDetails();
                }}
              ></textarea>
              {isEmptyDetails ? (
                <div className={classes.emptyError}>Can't be empty</div>
              ) : (
                ""
              )}
            </div>
          </div>
          <div
            className={classes.formActions}
            style={{ justifyContent: isEdit ? "space-between" : "flex-end" }}
          >
            <button
              style={{ display: isEdit ? "block" : "none" }}
              type="button"
              className={classes.formDeleteBtn}
              onClick={() => {
                onDeleteFeedback();
              }}
            >
              Delete
            </button>
            <div className={classes.cancelAndSave}>
              <Link to={pathTo} className={classes.formCancelBtn}>
                Cancel
              </Link>
              <button
                className={classes.formAddBtn}
                type="submit"
                onClick={onSaveFeeback}
              >
                {btnSaveOrAddTxt}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FeedbackManage;
