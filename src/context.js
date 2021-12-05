import { useContext, createContext, useState, useEffect } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [allFeedbacks, setAllFeedbacks] = useState([]);
  const [formattedFeedbacks, setFormattedFeedbacks] = useState([]);
  //
  const [allStatus, setAllStatus] = useState([]);
  const [formattedStatus, setFormattedStatus] = useState([]);
  //
  const [categoryList, setCategoryList] = useState([]);
  const [sortByList, setSortByList] = useState([]);
  //
  const [suggestionCount, setSuggestionCount] = useState(0);
  //
  const [selectedCatId, setSelectedCatId] = useState(0);
  const [selectedSortById, setSelectedSortById] = useState(1);
  //
  const [selectedFeedback, setSelectedFeedback] = useState({});
  const [commentsAndRep, setCommentsAndRep] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [lastCommentIdx, setLastCommentIdx] = useState(0);

  useEffect(() => {
    if (performance.navigation.type === performance.navigation.TYPE_RELOAD) {
      window.location.href = "/";
    }
  }, []);

  //
  useEffect(() => {
    getFeedbacks();
    getStatus();
    getCategories();
    getSortBy();
  }, []);

  useEffect(() => {
    (async function () {
      await setFeedbacks();
      await setStatus();
    })();
  }, [allFeedbacks]);

  const getFeedbacks = () => {
    try {
      const response = require("./assets/data.json");
      let feedbacks = response.productRequests;
      let cUser = response.currentUser;
      let suggestionFeedbacks = feedbacks.filter((s) => {
        return s.status === "suggestion";
      });
      //
      setCurrentUser(cUser);
      setAllFeedbacks(feedbacks);
      setSuggestionCount(suggestionFeedbacks.length);
    } catch (e) {
      console.log(e.message);
    }
  };
  const setFeedbacks = async (category, sortBy) => {
    let formattedList = [];
    formattedList = allFeedbacks.map((feedbackItem) => {
      let id = feedbackItem.id;
      let title = feedbackItem.title;
      let category = feedbackItem.category;
      let upvotes = feedbackItem.upvotes;
      let status = feedbackItem.status;
      let description = feedbackItem.description;
      let commentsCount = 0;
      if (feedbackItem.comments) {
        commentsCount = feedbackItem.comments.length;
      }
      return {
        id,
        title,
        category,
        upvotes,
        status,
        description,
        commentsCount,
      };
    });
    // category & sortby
    category = !category ? 0 : category;
    sortBy = !sortBy ? 1 : sortBy;
    setSelectedSortById(sortBy);
    setSelectedCatId(category);
    // -------------------------------------

    //filter
    let categoryItem = categoryList.filter((cat) => {
      return cat.id === category;
    });
    //--------------------------------------------------
    if (formattedList && formattedList.length > 0) {
      let filteredList = formattedList;
      if (categoryItem[0].id !== 0) {
        filteredList = formattedList.filter((feedback) => {
          return (
            feedback.category.toLowerCase() ===
            categoryItem[0].value.toLowerCase()
          );
        });
      }

      //-----------------------------------------------

      //sort
      if (sortBy === 1) {
        //most upvotes
        filteredList.sort(
          (a, b) => parseFloat(b.upvotes) - parseFloat(a.upvotes)
        );
      } else if (sortBy === 2) {
        //least upvotes
        filteredList.sort(
          (a, b) => parseFloat(a.upvotes) - parseFloat(b.upvotes)
        );
      } else if (sortBy === 3) {
        //most comments
        filteredList.sort(
          (a, b) => parseFloat(b.commentsCount) - parseFloat(a.commentsCount)
        );
      } else if (sortBy === 4) {
        //least comments
        filteredList.sort(
          (a, b) => parseFloat(a.commentsCount) - parseFloat(b.commentsCount)
        );
      }
      await setFormattedFeedbacks(filteredList);
    } else {
      await setFormattedFeedbacks([]);
    }
  };

  const getStatus = () => {
    try {
      const response = require("./assets/status.json");
      const statusList = response.status;
      setAllStatus(statusList);
    } catch (e) {
      console.log(e.message);
    }
  };

  const setStatus = () => {
    let plannedCount = 0;
    let inProgressCount = 0;
    let liveCount = 0;
    for (let feedback of allFeedbacks) {
      if (feedback.status === "planned") {
        plannedCount++;
      } else if (feedback.status === "in-progress") {
        inProgressCount++;
      } else if (feedback.status === "live") {
        liveCount++;
      }
    }
    //
    let countList = [];
    countList.push(plannedCount);
    countList.push(inProgressCount);
    countList.push(liveCount);
    //

    let filteredList = allStatus.filter((statusItem) => {
      return statusItem.value !== "suggestion";
    });
    let formattedList = filteredList.map((statusItem, idx) => {
      return { ...statusItem, count: countList[idx] };
    });
    setFormattedStatus(formattedList);
  };

  const getCategories = () => {
    try {
      const response = require("./assets/category.json");
      const categoryList = response.category;
      setCategoryList(categoryList);
    } catch (e) {
      console.log(e.message);
    }
  };
  const getSortBy = async () => {
    try {
      const response = require("./assets/sortBy.json");
      const sortBy = response.sortBy;
      setSortByList(sortBy);
    } catch (e) {
      console.log(e.message);
    }
  };
  const getFeedbackAndComments = async (feedbackId) => {
    let id = parseInt(feedbackId);
    let feedback = formattedFeedbacks.find((f) => {
      return parseInt(f.id) === id;
    });
    await setSelectedFeedback(feedback);
    // -----------------comments-------------------
    let comments = [];
    if (allFeedbacks && allFeedbacks.length > 0) {
      let feedback = allFeedbacks.find((f) => {
        return f.id === id;
      });
      comments = feedback.comments;
      if (comments && comments.length) {
        await setCommentsAndRep(comments);
        setLastCommentIdx(comments[comments.length - 1].id);
      } else {
        await setCommentsAndRep([]);
      }
    } else {
      window.location.href = "/";
    }
  };
  //---------------------------------------------------------

  const addComment = async (feedbackId, comment) => {
    let fId = parseInt(feedbackId);
    let totalFeedbacks = allFeedbacks.map((feedback) => {
      if (feedback.id === fId) {
        if (!feedback.comments) {
          feedback.comments = [];
        }
        feedback.comments.push(comment);
      }
      return feedback;
    });
    await setAllFeedbacks(totalFeedbacks);
    await setLastCommentIdx(comment.id);
  };
  const addReply = async (feedbackId, commentId, reply) => {
    let fId = parseInt(feedbackId);
    let cId = parseInt(commentId);

    //-------------------------------------------------
    let newFeedbacks = allFeedbacks.map((feedback) => {
      let newComments = [];
      if (feedback.id === fId) {
        newComments = feedback.comments.map((comment) => {
          if (comment.id === cId) {
            if (!comment.replies) {
              comment.replies = [];
            }
            comment.replies.push(reply);
          }
          return comment;
        });
        feedback.comments = newComments;
      }
      return feedback;
    });
    await setAllFeedbacks(newFeedbacks);
  };

  const addFeedback = async (newFeedback) => {
    let allNewFeedbacks = [...allFeedbacks, newFeedback];
    await setAllFeedbacks(allNewFeedbacks);
    checkSuggestionCount(allNewFeedbacks);
  };

  const editFeedback = async (idx, editedFeedback) => {
    let allNewFeedbacks = allFeedbacks.map((f) => {
      if (parseInt(f.id) === parseInt(idx)) {
        let edited = {
          ...f,
          title: editedFeedback.title,
          category: editedFeedback.category,
          status: editedFeedback.status,
          description: editedFeedback.description,
        };
        return edited;
      }
      return f;
    });
    await setAllFeedbacks(allNewFeedbacks);
    checkSuggestionCount(allNewFeedbacks);
  };
  const deleteFeedback = async (idx) => {
    let idxNum = parseInt(idx);
    let newFeedbacks = allFeedbacks.filter((f) => {
      return f.id !== idxNum;
    });
    await setAllFeedbacks(newFeedbacks);
    checkSuggestionCount(newFeedbacks);
  };
  const checkSuggestionCount = async (f) => {
    let suggestionFeedbacks = f.filter((f) => {
      return f.status === "suggestion";
    });
    let len = suggestionFeedbacks.length;
    await setSuggestionCount(len);
  };
  return (
    <AppContext.Provider
      value={{
        allFeedbacks,
        formattedFeedbacks,
        formattedStatus,
        allStatus,
        categoryList,
        sortByList,
        suggestionCount,
        setFeedbacks,
        selectedCatId,
        selectedSortById,
        getFeedbackAndComments,
        selectedFeedback,
        commentsAndRep,
        lastCommentIdx,
        addComment,
        addReply,
        currentUser,
        addFeedback,
        editFeedback,
        deleteFeedback,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
export const useGlobalContext = () => {
  return useContext(AppContext);
};
