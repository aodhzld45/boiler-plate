import './App.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LandingPage from "./components/view/LandingPage/LandingPage"
import LoginPage from "./components/view/LoginPage/LoginPage"
import RegisterPage from "./components/view/RegisterPage/RegisterPage"
import Auth from "./hoc/auth";

function App() {
  return (
    <div className="App">
    <Router>
      <Routes>
        {/* exact = 정의한 경로가 주어진 URL과 정확하게 일치해야 해당 라우트가 활성화 */}
        {/* <Route exact path="/" element = { Auth(LandingPage , null)  } /> 
        <Route path="/login" element = { Auth (LoginPage, false) } />
        <Route path="/register" element = { Auth (RegisterPage ,false) } /> */}
        <Route exact path="/" element = { <LandingPage />  } /> 
        <Route path="/login" element = { <LoginPage /> } />
        <Route path="/register" element = { <RegisterPage /> } />

      </Routes>
    </Router>
  </div>


  );
}

export default App;
