import React, { useState } from "react";
import classes from "./home-topbar.module.css";
import { useGlobalContext } from "../context";
import { Link } from "react-router-dom";
const HomeTopbar = () => {
  const {
    sortByList,
    suggestionCount,
    setFeedbacks,
    selectedCatId,
    selectedSortById,
  } = useGlobalContext();
  let topbarIconUrl =
    require("../assets/images/suggestions/icon-suggestions.svg").default;
  let dropdownCheckIcoUrl =
    require("../assets/images/shared/icon-check.svg").default;
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [selectedOpTxt, setSelectedOpTxt] = useState("Most Upvotes");
  return (
    <div className={classes.topbarCont}>
      <div className={classes.txtCont}>
        <div className={classes.topbarIco}>
          <img src={topbarIconUrl} />
        </div>
        <div className={classes.topbarTitle}>
          {`${suggestionCount} Suggestions`}
        </div>
        <div className={classes.topbarLabelAndDpBtn}>
          <div className={classes.dropdownLabel}>Sort by :</div>
          <div className={classes.dropdownBtnAndOpt}>
            <button
              className={classes.dropdownBtn}
              onClick={() => {
                setIsOptionsOpen((val) => {
                  let newVal = !val;
                  return newVal;
                });
              }}
            >
              <div className={classes.dpVal}>{selectedOpTxt}</div>
              <div className={classes.dropdownIcon}>
                <span className={`material-icons ${classes.dpIcoUrl}`}>
                  keyboard_arrow_down
                </span>
              </div>
            </button>
            <div
              className={classes.options}
              style={{ display: isOptionsOpen ? "block" : "none" }}
            >
              {sortByList.map((option) => {
                return (
                  <div
                    key={option.id}
                    className={classes.optionCont}
                    onClick={() => {
                      setFeedbacks(selectedCatId, option.id);
                      setSelectedOpTxt(option.value);
                      setIsOptionsOpen((val) => {
                        let newVal = !val;
                        return newVal;
                      });
                    }}
                  >
                    <div className={classes.optionVal}>{option.value}</div>
                    <div
                      className={classes.optionIcon}
                      style={{
                        display:
                          option.id === selectedSortById ? "block" : "none",
                      }}
                    >
                      <img src={dropdownCheckIcoUrl} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <Link to="/new" className={classes.btnCont}>
        <div className={classes.btnIco}>
          <span className={`material-icons ${classes.btnIcoUrl}`}>add</span>
        </div>
        <div className={classes.btnTxt}>Add Feedback</div>
      </Link>
    </div>
  );
};

export default HomeTopbar;
