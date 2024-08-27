import React from 'react';
import PersonalInfo from '../../components/forms/PersonalInfo';
import "../../sass/data.scss";
import Image from 'next/image';
import MedicalForm from '../../components/forms/MedicalForm';

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
        <div className="medical-info">
          <h2>Medical Information</h2>
          <p>
            Please provide your medical information so we can tailor your experience to your needs.
            This information will be used to help you find the best healthcare providers and resources.
          </p>
          <MedicalForm />
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