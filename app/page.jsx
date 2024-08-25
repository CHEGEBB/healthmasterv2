"use client";
import Image from "next/image";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import "../sass/auth.scss";

export default function Home() {
  const [focusedInput, setFocusedInput] = useState(null);

  return (
    <div className="container">
      <div className="form-container">
        <div className="form-title">
          <h1>Sign Up</h1>
        </div>
        <form>
          <div className={`form-group ${focusedInput === 'name' ? 'focused' : ''}`}>
            <label htmlFor="name">Full Name</label>
            <div className="input-wrapper">
              <FontAwesomeIcon icon={faUser} className="input-icon" />
              <Input
                type="text"
                id="name"
                required
                onFocus={() => setFocusedInput('name')}
                onBlur={() => setFocusedInput(null)}
              />
            </div>
          </div>

          <div className={`form-group ${focusedInput === 'email' ? 'focused' : ''}`}>
            <label htmlFor="email">Email</label>
            <div className="input-wrapper">
              <FontAwesomeIcon icon={faEnvelope} className="input-icon" />
              <Input
                type="email"
                id="email"
                required
                onFocus={() => setFocusedInput('email')}
                onBlur={() => setFocusedInput(null)}
              />
            </div>
          </div>

          <div className={`form-group ${focusedInput === 'password' ? 'focused' : ''}`}>
            <label htmlFor="password">Password</label>
            <div className="input-wrapper">
              <FontAwesomeIcon icon={faLock} className="input-icon" />
              <Input
                type="password"
                id="password"
                required
                onFocus={() => setFocusedInput('password')}
                onBlur={() => setFocusedInput(null)}
              />
            </div>
          </div>

          <div className={`form-group ${focusedInput === 'confirmPassword' ? 'focused' : ''}`}>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className="input-wrapper">
              <FontAwesomeIcon icon={faLock} className="input-icon" />
              <Input
                type="password"
                id="confirmPassword"
                required
                onFocus={() => setFocusedInput('confirmPassword')}
                onBlur={() => setFocusedInput(null)}
              />
            </div>
          </div>

          <div className="form-group">
            <Button type="submit" className="btn btn-primary">
              Sign Up
            </Button>
          </div>
        </form>

        <div className="form-group">
          <p>Already have an account? <a href="/login">Login</a></p>
        </div>
      </div>

      <div className="container-image">
        <Image
          src="/assets/images/background-1.webp"
          width={1000}
          height={1000}
          alt="Background"
        />
      </div>
    </div>
  );
}
