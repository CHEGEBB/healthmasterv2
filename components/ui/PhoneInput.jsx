import React from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import styles from './phoneInput.module.css';

const CustomPhoneInput = ({ value, onChange }) => {
  return (
    <div className={styles.customPhoneInput}>
      <PhoneInput
        country={'us'}
        value={value}
        onChange={onChange}
        inputClass={styles.phoneInput}
        containerClass={styles.phoneInputContainer}
        dropdownClass={styles.phoneDropdown}
        buttonClass={styles.phoneButton}
        searchClass={styles.phoneSearch}
      />
    </div>
  );
};

export default CustomPhoneInput;