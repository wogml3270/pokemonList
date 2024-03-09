import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import Image from 'next/image';

import {
  keywordsState,
  languageState,
  searchDataState,
  searchInputState,
} from '@/core/atoms';
import { changeOptions } from '@/utils/changeOptions';

import styles from './search.module.scss';
import searchIcon from '@/assets/searchIcon.svg';

const SearchInput = () => {
  const lang = useRecoilValue(languageState);
  const setSearch = useSetRecoilState(searchDataState);
  const [input, setInput] = useRecoilState(searchInputState);
  const [keywords, setKeywords] = useRecoilState(keywordsState);

  useEffect(() => {
    if (input) {
      setKeywords([input]);
    } else {
      setKeywords([]);
    }
  }, [input]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const searchResult = () => {
    setSearch(input);
    setKeywords([]);
  };

  return (
    <div className={styles.search}>
      <input
        type='text'
        value={input}
        onChange={handleChange}
        placeholder={changeOptions(lang, 'placeholder')}
      />
      <button className={styles.searchButton} onClick={searchResult}>
        <Image src={searchIcon} alt='searchIcon' />
      </button>
      {keywords.length > 0 && (
        <div className={styles.keywords}>
          {keywords.map((keyword) => (
            <p key={keyword}>{keyword}</p>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchInput;
