"use client";
import Image from "next/image";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faUser } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
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
              <Skeleton className="w-[100px] h-[20px] rounded-full" />
              <FontAwesomeIcon icon={faUser} className="input-icon" />
              <Input
                type="text"
                placeholder="John Doe"
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
                placeholder="johndoe@gmail.com"
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <div className="phone-input-wrapper">
              <PhoneInput
                country="us"
                value={phone}
                onChange={(value) => setPhone(value)}
                inputStyle={{
                  width: "100%",
                  padding: "25px",
                  marginLeft: "30px",
                  borderRadius: "0.25rem",
                  border: "1px solid #444",
                  backgroundColor: "#333",
                  color: "white",
                  fontFamily: "Jost, sans-serif",
                }}
                buttonStyle={{
                  backgroundColor: "#333",
                  border: "1px solid #444",
                }}
                containerStyle={{
                  width: "100%",
                }}
                inputClass="phone-input"
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
