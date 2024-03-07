import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import {
  keywordsState,
  languageState,
  searchDataState,
  searchInputState,
} from '@/core/atoms';

import styles from './search.module.scss';

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

  const placeholder = () => {
    if (lang === 'en') {
      return 'Seach Pokemon With Name or Id';
    }
    if (lang === 'ko') {
      return '포켓몬 이름 또는 아이디를 입력해주세요';
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const searchResult = () => {
    setSearch(input);
  };

  const reset = () => {
    setSearch('');
    setInput('');
  };

  return (
    <div className={styles.search}>
      <input
        type='text'
        value={input}
        onChange={handleChange}
        placeholder={placeholder()}
      />
      <button className={styles.searchButton} onClick={searchResult} />
      {/* <button onClick={reset}>{lang === 'en' ? 'reset' : '초기화'}</button> */}
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
