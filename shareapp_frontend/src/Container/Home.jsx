import React, { useState, useRef, useEffect } from "react";
import { HiMenu } from "react-icons/hi";
import { AiFillCloseCircle } from "react-icons/ai";
import { Link, Route, Routes } from "react-router-dom";

import Sidebar from "../Component/Sidebar";
import UserProfile from "../Component/UserProfile";
import { client } from "../client";
import logo from "../assets/logo.png";
import Pins from "./Pins";
import { userQuery } from "../utils/data";
import { fetchUser } from '../utils/fetchUser';

const Home = () => {
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [user, setUser] = useState(null);
  const scrollRef = useRef(null);
  const userInfo = fetchUser();

  useEffect(() => {
    if (userInfo?.sub) {
      const query = userQuery(userInfo.sub);
      client.fetch(query).then((data) => {
        console.log("Fetched user from Sanity:", data[0]);
        setUser(data[0]);
      });
    } else {
      console.warn("No valid googleId in localStorage:", userInfo);
    }
  }, []);

  useEffect(() => {
    scrollRef.current.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex bg-gray-50 h-screen transition-height duration-75 ease-out">
      {/* Sidebar (desktop) */}
      <div className="hidden md:flex h-screen">
        <Sidebar user={user} />
      </div>

      {/* Sidebar (mobile) */}
      <div className="flex md:hidden flex-col w-full">
        <div className="p-2 w-full flex flex-row justify-between items-center shadow-md">
          <HiMenu
            fontSize={40}
            className="cursor-pointer"
            onClick={() => setToggleSidebar(true)}
          />
          <Link to="/">
            <img src={logo} alt="logo" className="w-28" />
          </Link>
          <Link to={`user-profile/${user?._id}`}>
            <img src={user?.image} alt={user?.userName} className="w-28 rounded-full" />
          </Link>
        </div>
        {toggleSidebar && (
          <div className="fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in">
            <div className="absolute w-full flex justify-end items-center p-2">
              <AiFillCloseCircle
                fontSize={30}
                className="cursor-pointer"
                onClick={() => setToggleSidebar(false)}
              />
            </div>
            <Sidebar user={user} closeToggle={setToggleSidebar} />
          </div>
        )}
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-y-auto" ref={scrollRef}>
        <Routes>
          <Route path="user-profile/:userId" element={<UserProfile />} />
          <Route path="/*" element={<Pins user={user} />} />
        </Routes>
      </div>
    </div>
  );
};

export default Home;

