import React from "react";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";

import shareVideo from "../assets/share.mp4";
import logo from "../assets/ShareaPic2.png";
import { client } from "../client";

const Login = () => {
  const navigate = useNavigate();

  // Google Login Handler
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        // Fetch user info using the access token
        const res = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        });

        const decoded = await res.json();

        if (!decoded?.sub) {
          console.error("Google user info missing 'sub'");
          return;
        }

        console.log("Decoded user info:", decoded);

        // Save user info to local storage
        localStorage.setItem("user", JSON.stringify(decoded));

        const { name: userName, sub: googleId, picture: imageUrl } = decoded;

        // Prepare user document for backend
        const doc = {
          _id: googleId,
          _type: "user",
          userName,
          image: imageUrl,
        };

        // Create user in backend if not already exists
        client.createIfNotExists(doc).then(() => {
          navigate("/", { replace: true });
        });
      } catch (err) {
        console.error("Error fetching user info:", err);
      }
    },
    onError: () => {
      console.error("Login Failed");
    },
    scope: "profile email",
  });

  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className="relative w-full h-full">
        <video
          src={shareVideo}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className="w-full h-full object-cover"
        />
        <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
          <div className="p-5">
            <img src={logo} width="130px" alt="logo" />
          </div>
          <div className="shadow-2xl">
            <button
              type="button"
              onClick={login}
              className="bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none"
            >
              <FcGoogle className="mr-4" />
              Sign in with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
