import Image from 'next/image';
import Link from 'next/link';

import styles from './header.module.scss';
import LanguageSelector from '../Language/LangSelector';
import pokemonLogo from '@/assets/pokemonLogo.png';
import SearchInput from './Search/SearchInput';

const Header = () => {
  return (
    <header className={styles.headerWrap}>
      <nav className={styles.header}>
        <h1>
          <Link href='/'>
            <Image src={pokemonLogo} alt='logo' />
          </Link>
        </h1>
        <SearchInput />
        <LanguageSelector />
      </nav>
    </header>
  );
};

export default Header;
