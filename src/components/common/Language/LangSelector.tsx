import React, { useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import Image from 'next/image';

import { languageState } from '@/core/atoms';

import styles from './selectBox.module.scss';
import { kor, eng, jap } from '@/assets/flags';

const LanguageSelector = () => {
  const [selectedLanguage, setSelectedLanguage] = useRecoilState(languageState);
  const [isOpen, setIsOpen] = useState<Boolean>(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

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

  // useRef를 사용한 의존성을 추가해서 selectBox 이외의 요소를 클릭 시 isOpen의 상태 false로 변경해주는 기능
  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [wrapperRef]);

  return (
    <div className={styles.selectBox} ref={wrapperRef}>
      <div
        className={styles.selectedLanguage}
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedLanguage === 'ko' && <Image src={kor} alt='Flag_KOR' />}
        {selectedLanguage === 'en' && <Image src={eng} alt='Flag_ENG' />}
        {selectedLanguage === 'ja' && <Image src={jap} alt='Flag_JAP' />}
        <span>{selectedLanguage}</span>
      </div>
      {isOpen && (
        <div className={styles.dropdown}>
          <div onClick={() => handleLanguageChange('ko')}>
            <Image src={kor} alt='Flag_KOR' />
            <span>KOR</span>
          </div>
          <div onClick={() => handleLanguageChange('en')}>
            <Image src={eng} alt='Flag_ENG' />
            <span>ENG</span>
          </div>
          <div onClick={() => handleLanguageChange('ja')}>
            <Image src={jap} alt='Flag_JAP' />
            <span>JAP</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
