import React from 'react';
import { useRecoilState } from 'recoil';

import { languageState } from '@/core/recoil/atoms';

import styles from './search.module.scss';

interface Props {
  input: string | undefined;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  setSearch: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const SearchInput = ({ input, setInput, setSearch }: Props) => {
  const [lang, setLang] = useRecoilState(languageState);

  const placeholder = () => {
    if (lang === 'en') {
      return 'Seach Pokemon With Name or Id';
    }
    if (lang === 'ko') {
      return '포켓몬 이름 또는 아이디를 입력해주세요';
    }
  };

  const write = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const search = () => {
    setSearch(input);
  };

  const reset = () => {
    setSearch('');
    setInput('');
  };

  return (
    <div className={styles.search}>
      <input type='text' onChange={write} placeholder={placeholder()} />
      <button onClick={search}>{lang === 'en' ? 'search' : '검색'}</button>
      <button onClick={reset}>{lang === 'en' ? 'reset' : '초기화'}</button>
    </div>
  );
};

export default SearchInput;
