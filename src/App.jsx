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
import Page_Not_Found from "./Pages/Page_Not_Found";
import Notifications from "./Pages/Notifications";
import PostPage from "./Pages/PostPage";
import Messaging from "./Pages/Messaging";
import { ProfileRefreshProvider } from "./context/ProfileRefreshContext";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  return (
    <ProfileRefreshProvider>
      <Router>
        <Header />
        <Routes>
          {isLoggedIn ? (
            <>
              <Route path="/" element={<MainPage />} />
            </>
          ) : (
            <>
              <Route path="/" element={<LandingPage />} />
            </>
          )}

          {/* Public routes */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          {/* Protected routes */}
          <Route path="/edit-my-profile" element={<EditMyProfile />} />
          <Route path="/messaging" element={<Messaging />} />
          <Route path="/notification" element={<Notifications />} />
          <Route path="/post/:postId" element={<PostPage />} />

          {/* My Posts with MyProfile sidebar */}
          <Route
            path="/my-posts"
            element={
              <div className="flex mt-20 mx-4 space-x-4">
                <MyProfile />
                <div className="flex-1">
                  <MyPosts />
                </div>
              </div>
            }
          />

          {/* Fallback */}
          <Route path="/*" element={<Page_Not_Found />} />
        </Routes>
      </Router>
    </ProfileRefreshProvider>
  );
}

export default App;
