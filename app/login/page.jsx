"use client";
import Image from "next/image";
import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import "../../sass/auth.scss";
import { Mail, Lock } from "lucide-react";

export default function Login() {
  const [focusedInput, setFocusedInput] = useState(null);

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
        <form onSubmit={(e) => e.preventDefault()}>
          <div className={`form-group ${focusedInput === 'email' ? 'focused' : ''}`}>
            <label htmlFor="email">Email</label>
            <div className="input-wrapper">
              <Mail className="input-icon" />
              <Input
                type="email"
                id="email"
                required
                onFocus={() => setFocusedInput('email')}
                onBlur={() => setFocusedInput(null)}
                placeholder="johndoe@gmail.com"
              />
            </div>
          </div>
          <div className={`form-group ${focusedInput === 'password' ? 'focused' : ''}`}>
            <label htmlFor="password">Password</label>
            <div className="input-wrapper">
              <Lock className="input-icon" />
              <Input
                type="password"
                id="password"
                required
                onFocus={() => setFocusedInput('password')}
                onBlur={() => setFocusedInput(null)}
                placeholder="Enter your password"
              />
            </div>
          </div>
          <div className="flex-row form-group custom-checkbox-container">
            <input type="checkbox" name='terms' id='terms' required className="custom-checkbox" />
            <label htmlFor="terms">
            Keep me logged in ?
            </label>
            </div>
          <div className="form-group">
            <Button type="submit">Log In</Button>
          </div>
        </form>
        <div className="form-group">
          <p>Have no account? <a href="/signup">Sign up</a></p>
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
