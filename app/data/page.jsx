import React from 'react';
import PersonalInfo from '../../components/forms/PersonalInfo';
import "../../sass/data.scss";
import Image from 'next/image';
import MedicalForm from '../../components/forms/MedicalForm';
import IdentificationForm from '../../components/forms/IdentityForm';
import { Button } from '../../components/ui/button';

export default function Page() {
  return (
    <div className="container">
      <div className="info-container">
      <div className="flex-row form-logo">
          <Image src="/assets/icons/new.jpg" alt="HealthMaster logo" width={100} height={100} />
          <h2 className="items-center text-xl font-bold">Health master</h2>
        </div>
        <h2>Welcome 👋</h2>
        <p>Help us know about you by filling out the form below</p>
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
        <div className="identification-form">
          <h2>Identification</h2>
          <p>
            Please provide your identification so we can verify your identity and access your healthcare records.
            This information will be used to help you find the best healthcare providers and resources.
          </p>
          <IdentificationForm/>
        </div>
        <div className="terms-and-conditions">
          <h2>Consent and Privacy</h2>
          <div className="consent-form">
            <div className="consent-item">
              <input type="checkbox" name='terms' id='terms' required />
              <label htmlFor="terms">I agree to the Terms and Conditions</label>
            </div>
            <div className="consent-item">
              <input type="checkbox" name='privacy' id='privacy' required />
              <label htmlFor="privacy">I agree to the Privacy Policy</label>
            </div>
            <div className="consent-item">
              <input type="checkbox" name='data-collection' id='data-collection' required />
              <label htmlFor="data-collection">I consent to data collection and use</label>
            </div>
          </div>
        </div>
        <div className="submit-button">
          <button type="submit" className="btn btn-primary">Submit</button>
          <p>By submitting this form, you agree to the HealthMaster Terms and Conditions and Privacy Policy.</p>
          <p className="text-[#3db7e3] copyright">
            © 2024 HealthMaster. All rights reserved.
          </p>
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