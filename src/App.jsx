import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./Pages/MainPage";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Header from "./components/Header";
import LandingPage from "./Pages/LandingPage";
import MyPosts from "./components/MyPosts";
import MyProfile from "./components/MyProfile";
import EditMyProfile from "./components/EditMyProfile";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <>
      <Router>
        <Header />
        <Routes>
          {isLoggedIn ? (
            <>
              <Route path="/" element={<MainPage />} />
              <Route path="/signup" element={<Signup />} />
            </>
          ) : (
            <>
              <Route path="/" element={<LandingPage />} />
            </>
          )}
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/edit-my-profile" element={<EditMyProfile />} />
          
          <Route
            path="/my-posts"
            element={
              <>
                <div className="flex-1 space-y-4 mx-4 mt-20">
                  <MyProfile/>
                  <MyPosts />
                </div>
              </>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
