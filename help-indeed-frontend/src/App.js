import React from "react"
import { BrowserRouter as Router, Routes, Route, Navigate, } from "react-router-dom";

import './App.css';
import Header from "./components/Header/header"
import LoginMode from "./components/Login/login-mode"
import SignUpMode from "./components/Login/signup-mode"
import HomePage from "./components/HomePage/homePage"
import MainPage from "./components/MainPage/mainPage"

function App() {
  return (
    <>
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/main" />} />
          <Route path="/main" element={ <MainPage /> } />
          <Route path="/login" element={ <LoginMode /> } />
          <Route path="/signup" element={ <SignUpMode /> } />
          <Route path="/homepage" element={ <HomePage /> } />
        </Routes>
      </Router>
    </>
  );
}

export default App;
