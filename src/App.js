import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import FeedbackHome from "./pages/feedback-home";
import FeedbackDetails from "./pages/feedback-details";
import FeedbackManage from "./pages/feedback-manage";
import Roadmap from "./pages/roadmap";
import ErrorPage from "./pages/error-page";
function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <FeedbackHome />
        </Route>
        <Route path="/feedbacks/:id">
          <FeedbackDetails />
        </Route>
        <Route path="/new">
          <FeedbackManage />
        </Route>
        <Route path="/edit/:id">
          <FeedbackManage />
        </Route>
        <Route path="/roadmap">
          <Roadmap />
        </Route>
        <Route path="*">
          <ErrorPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
