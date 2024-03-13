import Link from 'next/link';
import { useRecoilValue } from 'recoil';

import { changeOptions } from '@/utils/changeOptions';
import { languageState } from '@/core/atoms';

import styles from './header.module.scss';
import LanguageSelector from '../Language/LangSelector';
import SearchInput from './Search/SearchInput';

const Header = () => {
  const lang = useRecoilValue(languageState);

  return (
    <header className={styles.headerWrap}>
      <nav className={styles.header}>
        <h1>
          <Link href='/'>{changeOptions(lang, 'logo')}</Link>
        </h1>
        <SearchInput />
        <LanguageSelector />
      </nav>
    </header>
  );
};

export default Header;
