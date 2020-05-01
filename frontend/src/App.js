import React from 'react';
import './App.css';
import Login from "./components/Login";
import Home from "./components/Home";
import ProtectedRoute from "./components/ProtectedRoute";

import { BrowserRouter as Router,
   Route,
 } from "react-router-dom";

function App(props) {
  const { isAuthenticated, isVerifying } = props;
  return (
    <div className="App">
    <Router>
      <ProtectedRoute
        exact
        path="/"
        component={Home}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />
      <Route path="/login" component={Login} />
    </Router>
    </div>
  );
}

export default App;
