"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Mail, Lock } from "lucide-react";
import { toast } from "react-hot-toast";

import "../../sass/auth.scss";

export default function Login() {
  const [focusedInput, setFocusedInput] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(
        "https://healthmasterv2-2.onrender.com/api/auth/login",
        formData
      );
      const { token, isNewUser } = response.data;

      // Store the token in localStorage or sessionStorage based on user preference
      if (keepLoggedIn) {
        localStorage.setItem("token", token);
      } else {
        sessionStorage.setItem("token", token);
      }

      toast.success("Login successful!");

      // Redirect based on whether the user is new or returning
      if (isNewUser) {
        router.push("/data"); // Redirect to data page for new users
      } else {
        router.push("/dashboard"); // Redirect to dashboard for returning users
      }
    } catch (error) {
      console.error("Login error:", error.response?.data?.message || error.message);
      toast.error(error.response?.data?.message || "An error occurred during login");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <div className="form-logo">
          <Image src="/assets/icons/new.jpg" alt="HealthMaster logo" width={100} height={100} />
          <h2>Health master</h2>
        </div>
        <div className="form-title">
          <h1>Welcome Back👋</h1>
          <p>Log in to your HealthMaster account to access your health dashboard.</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className={`form-group ${focusedInput === "email" ? "focused" : ""}`}>
            <label htmlFor="email">Email</label>
            <div className="input-wrapper">
              <Mail className="input-icon" />
              <Input
                type="email"
                id="email"
                required
                onFocus={() => setFocusedInput("email")}
                onBlur={() => setFocusedInput(null)}
                placeholder="johndoe@gmail.com"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className={`form-group ${focusedInput === "password" ? "focused" : ""}`}>
            <label htmlFor="password">Password</label>
            <div className="input-wrapper">
              <Lock className="input-icon" />
              <Input
                type="password"
                id="password"
                required
                onFocus={() => setFocusedInput("password")}
                onBlur={() => setFocusedInput(null)}
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="flex-row form-group custom-checkbox-container">
            <input
              type="checkbox"
              name="keepLoggedIn"
              id="keepLoggedIn"
              className="custom-checkbox"
              checked={keepLoggedIn}
              onChange={(e) => setKeepLoggedIn(e.target.checked)}
            />
            <label htmlFor="keepLoggedIn">Keep me logged in</label>
          </div>
          <div className="form-group">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Log In"}
            </Button>
          </div>
        </form>
        <div className="form-group">
          <p>
            Have no account? <a href="/signup">Sign up</a>
          </p>
        </div>
        <div className="form-group">
          <p className="text-sm">
            Forgot your password? <a href="/forgot-password">Reset it</a>
          </p>
        </div>
        <div className="form-group">
          <p>© 2024 HealthMaster. All rights reserved.</p>
        </div>
      </div>
      <div className="container-image">
        <Image src="/assets/images/back1.webp" width={1000} height={1000} alt="Background" />
      </div>
    </div>
  );
}
