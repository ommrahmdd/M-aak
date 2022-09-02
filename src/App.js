import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Nav from "./components/nav/Nav";
import ProtectedRoute from "./components/ProtectedRoute";
import Case from "./pages/case/Case";
import Cases from "./pages/cases/Cases";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Payment from "./pages/payment/Payment";
import Signup from "./pages/signup/Signup";
function App() {
  return (
    <div className="App">
      <Router>
        <Nav />
        <Switch>
          <Route path="/cases" exact component={Cases} />
          <Route path="/cases/:caseID" exact component={Case} />
          <Route path="/payment/:caseID" exact component={Payment} />
          <ProtectedRoute path="/signup" exact component={Signup} />
          <ProtectedRoute path="/login" exact component={Login} />
          <Route path="/" exact component={Home} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
