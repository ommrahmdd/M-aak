import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Nav from "./components/nav/Nav";
import ProtectedRoute from "./components/ProtectedRoute";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Footer from "./components/footer/Footer";
import PrivateRoute from "./components/PrivateRoute";
const Home = lazy(() => import("./pages/home/Home"));
const Case = lazy(() => import("./pages/case/Case"));
const Cases = lazy(() => import("./pages/cases/Cases"));
const Contact = lazy(() => import("./pages/contact/Contact"));
const Payment = lazy(() => import("./pages/payment/Payment"));
const Login = lazy(() => import("./pages/login/Login"));
const Signup = lazy(() => import("./pages/signup/Signup"));
const Projects = lazy(() => import("./pages/projects/Projects"));
const Profile = lazy(() => import("./pages/profile/Profile"));
const EditProfile = lazy(() => import("./pages/editProfile/EditProfile"));
const EditPassword = lazy(() => import("./pages/EditPassword/EditPassword"));
const Donations = lazy(() => import("./pages/donations/Donations"));
let stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);
function App() {
  return (
    <Elements stripe={stripePromise}>
      <div className="App" dir="rtl">
        <Suspense fallback={<div>Please Wait !</div>}>
          <Router>
            <Nav />
            <Switch>
              <Route path="/cases" exact component={Cases} />
              <Route path="/cases/:caseID" exact component={Case} />
              <Route path="/payment/:caseID" exact component={Payment} />
              <ProtectedRoute path="/signup" exact component={Signup} />
              <ProtectedRoute path="/login" exact component={Login} />
              <Route path="/projects" exact component={Projects} />
              <Route path="/contact" exact component={Contact} />
              <Route path="/profile" exact component={Profile} />
              <PrivateRoute
                path="/profile/edit/:userId"
                exact
                component={EditProfile}
              />
              <PrivateRoute
                path="/profile/password/:userId"
                exact
                component={EditPassword}
              />
              <PrivateRoute
                path="/donations/:userId"
                exact
                component={Donations}
              />
              <Route path="/" exact component={Home} />
            </Switch>
            <Footer />
          </Router>
        </Suspense>
      </div>
    </Elements>
  );
}

export default App;
