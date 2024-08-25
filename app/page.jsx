"use client";
import Image from "next/image";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faUser } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CustomPhoneInput from "@/components/ui/PhoneInput";
import "../sass/auth.scss";

export default function Home() {
  const [focusedInput, setFocusedInput] = useState(null);
  const [phone, setPhone] = useState("");

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
          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <CustomPhoneInput
              value={phone}
              onChange={(phone) => setPhone(phone)}
            />
          </div>
          <div className="form-group">
            <Button type="submit" className="btn btn-primary">
              Sign Up
            </Button>
          </div>
        </form>
        <div className="form-group">
          <p>
            Already have an account? <a href="/login">Login</a>
          </p>
        </div>
      </div>
      <div className="container-image">
        <Image src="/assets/images/background-1.webp" width={1000} height={1000} alt="Background" />
      </div>
    </div>
  );
}