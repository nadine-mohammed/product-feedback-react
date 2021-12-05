import React, { useEffect, useState } from "react";
import classes from "./roadmap.module.css";
import RoadmapTopbar from "../components/roadmap-topbar";
import { useGlobalContext } from "../context";
import RoadmapItem from "../components/roadmap-item";
const Roadmap = () => {
  const { formattedFeedbacks } = useGlobalContext();
  const [plannedList, setPlannedList] = useState([]);
  const [inProgressList, setInProgressList] = useState([]);
  const [liveList, setLiveList] = useState([]);
  const [plannedCount, setPlannedCount] = useState(0);
  const [inprogressCount, setInprogressCount] = useState(0);
  const [liveCount, setLiveCount] = useState(0);
  const [optionVal, setOptionVal] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    let pList = [];
    let inPList = [];
    let lList = [];
    for (let feedback of formattedFeedbacks) {
      if (feedback.status === "planned") {
        pList.push(feedback);
      }
      if (feedback.status === "in-progress") {
        inPList.push(feedback);
      }
      if (feedback.status === "live") {
        lList.push(feedback);
      }
    }
    setPlannedList(pList);
    setPlannedCount(pList.length);
    setInProgressList(inPList);
    setInprogressCount(inPList.length);
    setLiveList(lList);
    setLiveCount(lList.length);

    // -----------------
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
  const displayDetails = (optionId) => {
    setOptionVal(optionId);
  };
  return (
    <div className={classes.roadmapContainer}>
      <div className={classes.roadmapTopbar}>
        <RoadmapTopbar />
      </div>
      <div className={classes.mobileOptions}>
        <button
          className={classes.mobileOpBtn}
          onClick={() => {
            displayDetails(0);
          }}
        >
          Planned
        </button>
        <button
          className={classes.mobileOpBtn}
          onClick={() => {
            displayDetails(1);
          }}
        >
          In-Progress
        </button>
        <button
          className={`${classes.mobileOpBtn} ${classes.liveOpBtn}`}
          onClick={() => {
            displayDetails(2);
          }}
        >
          Live
        </button>
      </div>
      <div className={classes.roadmapDetails}>
        <div
          className={classes.plannedCont}
          style={{
            display:
              optionVal === 0 && isMobile
                ? "block"
                : !isMobile
                ? "block"
                : "none",
          }}
        >
          <div className={classes.contTitle}>
            <div
              className={classes.contMainTitle}
            >{`Planned (${plannedCount})`}</div>
            <div className={classes.contMoreInfo}>
              Ideas prioritized for research
            </div>
          </div>
          {plannedList.map((pItem, idx) => {
            return <RoadmapItem key={idx} {...pItem} color="orange" />;
          })}
        </div>
        <div
          className={classes.inProgressCont}
          style={{
            display:
              optionVal === 1 && isMobile
                ? "block"
                : !isMobile
                ? "block"
                : "none",
          }}
        >
          <div className={classes.contTitle}>
            <div
              className={classes.contMainTitle}
            >{`In-Progress (${inprogressCount})`}</div>
            <div className={classes.contMoreInfo}>
              Currently being developed
            </div>
          </div>
          {inProgressList.map((InPItem, idx) => {
            return <RoadmapItem key={idx} {...InPItem} color="purple" />;
          })}
        </div>
        <div
          className={classes.liveCont}
          style={{
            display:
              optionVal === 2 && isMobile
                ? "block"
                : !isMobile
                ? "block"
                : "none",
          }}
        >
          <div className={classes.contTitle}>
            <div className={classes.contMainTitle}>{`Live (${liveCount})`}</div>
            <div className={classes.contMoreInfo}>Released features</div>
          </div>
          {liveList.map((LItem, idx) => {
            return <RoadmapItem key={idx} {...LItem} color="blue" />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Roadmap;
