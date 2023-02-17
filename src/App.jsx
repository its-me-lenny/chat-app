import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import "./style.scss";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import VerifyEmail from "./pages/VerifyEmail";

function App() {
  const { currentUser } = useContext(AuthContext);

  const ProtectedRouteHome = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    } else if (currentUser.emailVerified === false) {
      return <Navigate to="/verifyemail" />;
    }

    return children;
  };

  const ProtectedRouteForms = ({ children }) => {
    if (currentUser && currentUser.emailVerified === true) {
      return <Navigate to="/" />;
    } else if (currentUser && currentUser.emailVerified === false) {
      return <Navigate to="/verifyemail" />;
    }

    return children;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route
            index
            element={
              <ProtectedRouteHome>
                <Home />
              </ProtectedRouteHome>
            }
          />
          <Route
            path="login"
            element={
              <ProtectedRouteForms>
                <Login />
              </ProtectedRouteForms>
            }
          />
          <Route
            path="register"
            element={
              <ProtectedRouteForms>
                <Register />
              </ProtectedRouteForms>
            }
          />
          <Route path="verifyemail" element={<VerifyEmail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
