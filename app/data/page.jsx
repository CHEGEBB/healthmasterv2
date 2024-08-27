import React from 'react';
import PersonalInfo from '../../components/forms/PersonalInfo';
import "../../sass/data.scss";
import Image from 'next/image';

export default function Page() {
  return (
    <div className="container">
      <div className="info-container">
        <h2>Welcome 👋</h2>
        <p>
          Hello and welcome to health master, help us know about you by filling out the form below
        </p>
        <div className="personal-info">
          <h2>Personal Information</h2>
          <p>Please fill out your personal information below</p>
          <PersonalInfo />
        </div>
      </div>
      <div className="image-container">
        <Image
          src="/assets/images/register.png"
          alt="Pattern"
          layout="fill"
          objectFit="cover"
          quality={100}
        />
      </div>
    </div>
  );
}