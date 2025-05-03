import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import Signup from "./screens/signUpPage";
import Login from "./screens/loginPage";
import Boards from "./screens/boardsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/user/login" element={<Login />} />
        <Route path="/user/signup" element={<Signup />} />
        <Route path="/board/my-boards" element={<Boards />} />
        <Route path="/" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
