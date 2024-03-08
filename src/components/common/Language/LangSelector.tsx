import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';

import { languageState } from '@/core/atoms';

const LanguageSelector = () => {
  const [selectedLanguage, setSelectedLanguage] = useRecoilState(languageState);

  // 언어 변경 핸들러, localStorage 저장
  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
    if (typeof window !== 'undefined') {
      localStorage.setItem('Language', language);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedLanguage = localStorage.getItem('Language');
      if (storedLanguage) {
        handleLanguageChange(storedLanguage);
      }
    }
  }, [selectedLanguage]);

  return (
    <div>
      <select
        name='language'
        id='language'
        value={selectedLanguage}
        onChange={(e) => handleLanguageChange(e.target.value)}
      >
        <option disabled value=''>
          Language
        </option>
        <option value='ko'>KOR</option>
        <option value='en'>ENG</option>
        <option value='ja'>JAP</option>
      </select>
    </div>
  );
};

export default LanguageSelector;
