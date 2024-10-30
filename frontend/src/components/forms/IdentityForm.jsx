'use client';
import React, { useState } from 'react';
import { ChevronDown, Upload } from 'lucide-react';
import Image from 'next/image';
import '@/sass/Idform.scss';

export default function IdentificationForm({
  data: formState,
  setData: setFormState,
}) {
  // const [formState, setFormState] = useState({
  //   identificationType: '',
  //   identificationNumber: '',
  //   document: null
  // });
  // console.log(props)

  const identificationTypes = [
    'Birth Certificate',
    'Passport',
    "Driver's License",
    'National ID',
  ];

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormState((prev) => ({ ...prev, [id]: value }));
  };

  const handleTypeSelect = (type) => {
    setFormState((prev) => ({ ...prev, identificationType: type }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormState((prev) => ({ ...prev, document: file }));
    }
  };

  return (
    <div className='identification-form'>
      <h2>Identification and Verification</h2>
      <form>
        <div className='form-group'>
          <label htmlFor='identificationType'>Identification type</label>
          <div className='select-wrapper'>
            <select
              id='identificationType'
              value={formState.identificationType}
              onChange={(e) => handleTypeSelect(e.target.value)}
            >
              <option value='' disabled>
                Select identification type
              </option>
              {identificationTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <ChevronDown className='select-icon' />
          </div>
        </div>

        <div className='form-group'>
          <label htmlFor='identificationNumber'>Identification Number</label>
          <input
            type='text'
            id='identificationNumber'
            value={formState.identificationNumber}
            onChange={handleInputChange}
            placeholder='ex: 1234567'
          />
        </div>

        <div className='form-group'>
          <label>Scanned Copy of Identification Document</label>
          <div className='file-upload-wrapper'>
            <input
              type='file'
              id='documentUpload'
              onChange={handleFileUpload}
              accept='image/*,.pdf'
            />
            <label htmlFor='documentUpload' className='file-upload-label'>
              <Upload className='upload-icon' />
              <span>
                {formState.document ? (
                  formState.document.name
                ) : formState.documentURL ? (
                  <Link href={formState.documentURL}>
                    {formState.documentURL}
                  </Link>
                ) : (
                  'Click to upload or drag and drop'
                )}
              </span>
              <span className='file-format'>
                SVG, PNG, JPG or GIF (max. 800x400px)
              </span>
            </label>
          </div>
        </div>
      </form>
    </div>
  );
}
