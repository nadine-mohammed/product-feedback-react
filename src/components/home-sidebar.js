import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../context";
import classes from "./home-sidebar.module.css";
import { Link } from "react-router-dom";
const HomeSidebar = () => {
  const {
    formattedStatus,
    categoryList,
    setFeedbacks,
    selectedCatId,
    selectedSortById,
  } = useGlobalContext();
  const logoUrl =
    require("../assets/images/suggestions/desktop/background-header.png").default;
  const logoTabletUrl =
    require("../assets/images/suggestions/tablet/background-header.png").default;
  const logoMobileUrl =
    require("../assets/images/suggestions/mobile/background-header.png").default;
  const hamburgerIcoUrl =
    require("../assets/images/shared/mobile/icon-hamburger.svg").default;
  const closeIcoURL =
    require("../assets/images/shared/mobile/icon-close.svg").default;
  const [isMobile, setIsMobile] = useState(false);
  const [displayClose, setDisplayClose] = useState(false);
  const [displayHamburger, setDisplayHamburger] = useState(false);
  const [displayMenu, setDisplayMenu] = useState(true);
  useEffect(() => {
    checkSize();
    window.addEventListener("resize", checkSize);
    return () => {
      window.removeEventListener("resize", checkSize);
    };
  }, []);

  const checkSize = () => {
    if (window.innerWidth <= 767) {
      setIsMobile(true);
      setDisplayHamburger(true);
      setDisplayClose(false);
      setDisplayMenu(false);
    } else {
      setIsMobile(false);
      setDisplayHamburger(false);
      setDisplayClose(false);
      setDisplayMenu(true);
    }
  };
  return (
    <div className={classes.sidebarContent}>
      <div className={classes.content}>
        <div className={classes.logoData}>
          <img className={classes.logo} src={logoUrl} />
          <img className={classes.logoTablet} src={logoTabletUrl} />
          <img className={classes.logoMobile} src={logoMobileUrl} />
          <div className={classes.mobileTopbarData}>
            <div className={classes.titles}>
              <h1 className={classes.title}>frontend glow</h1>
              <p className={classes.moreInfo}>feedback board</p>
            </div>
            <div
              className={classes.mobileSideIcon}
              style={{ display: isMobile ? "inline-block" : "none" }}
              onClick={() => {
                setDisplayHamburger((val) => {
                  return !val;
                });
                setDisplayClose((val) => {
                  return !val;
                });
                setDisplayMenu((val) => {
                  return !val;
                });
              }}
            >
              <img
                src={hamburgerIcoUrl}
                className={classes.hamburgerIcoUrl}
                style={{ display: displayHamburger ? "block" : "none" }}
              />
              <img
                src={closeIcoURL}
                className={classes.closeIcoUrl}
                style={{ display: displayClose ? "block" : "none" }}
              />
            </div>
          </div>
        </div>
        <div
          className={classes.categoriesAndStatus}
          style={{
            display: displayMenu ? "flex" : "none",
          }}
        >
          <div className={classes.categories}>
            {categoryList.map((category) => {
              return (
                <button
                  key={category.id}
                  className={classes.category}
                  tabIndex={category.id}
                  onClick={() => {
                    setFeedbacks(category.id, selectedSortById);
                  }}
                >
                  {category.value}
                </button>
              );
            })}
          </div>
          <div className={classes.status}>
            <div className={classes.titleCont}>
              <h1 className={classes.titleTxt}>Roadmap</h1>
              <Link to="/roadmap" className={classes.viewLink}>
                View
              </Link>
            </div>
            <div className={classes.statusList}>
              {formattedStatus.map((status) => {
                return (
                  <div key={status.id} className={classes.statusItem}>
                    <div className={classes.colorAndText}>
                      <div
                        className={`${status.color} ${classes.statusColor}`}
                      ></div>
                      <div className={classes.statusTxt}>{status.value}</div>
                    </div>
                    <div className={classes.statusCount}>{status.count}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeSidebar;
