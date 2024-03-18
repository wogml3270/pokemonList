import React, { useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import Image from 'next/image';

import { languageState } from '@/core/atoms';
import useOutsideClick from '@/hooks/useOutsideClick';

import styles from './selectBox.module.scss';
import { KOR, USA, JAP } from '@/assets/flags';

const LanguageSelector = () => {
  const [selectedLanguage, setSelectedLanguage] = useRecoilState(languageState);
  const [isOpen, setIsOpen] = useState<Boolean>(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  // 언어 변경 핸들러, localStorage 저장
  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
    if (typeof window !== 'undefined') {
      localStorage.setItem('Language', language);
    }
    setIsOpen(false);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedLanguage = localStorage.getItem('Language');
      if (storedLanguage) {
        handleLanguageChange(storedLanguage);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLanguage]);

  useOutsideClick(wrapperRef, () => {
    setIsOpen(false);
  });

  return (
    <div className={styles.selectBox} ref={wrapperRef}>
      <div
        className={styles.selectedLanguage}
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedLanguage === 'kor' && <Image src={KOR} alt='KOR_FLAG_ICON' />}
        {selectedLanguage === 'eng' && <Image src={USA} alt='ENG_FLAG_ICON' />}
        {selectedLanguage === 'jap' && <Image src={JAP} alt='JAP_FLAG_ICON' />}
        <span>{selectedLanguage}</span>
      </div>
      {isOpen && (
        <div className={styles.dropdown}>
          <div onClick={() => handleLanguageChange('kor')}>
            <Image src={KOR} alt='KOR_FLAG_ICON' />
            <span>KOR</span>
          </div>
          <div onClick={() => handleLanguageChange('eng')}>
            <Image src={USA} alt='ENG_FLAG_ICON' />
            <span>ENG</span>
          </div>
          <div onClick={() => handleLanguageChange('jap')}>
            <Image src={JAP} alt='JAP_FLAG_ICON' />
            <span>JAP</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
