import React from 'react';
import { useRecoilState } from 'recoil';

import { languageState } from '@/core/recoil/atoms';

const LanguageSelector = () => {
  const [selectedLanguage, setSelectedLanguage] = useRecoilState(languageState);

  const handleLanguageChange = (e: any) => {
    setSelectedLanguage(e.target.value);
  };

  return (
    <div>
      <select
        name='language'
        id='language'
        value={selectedLanguage}
        onChange={handleLanguageChange}
      >
        <option disabled value=''>
          Language
        </option>
        <option value='ko'>KOR</option>
        <option value='en'>ENG</option>
      </select>
    </div>
  );
};

export default LanguageSelector;
