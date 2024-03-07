import Image from 'next/image';
import Link from 'next/link';

import styles from './header.module.scss';
import LanguageSelector from '../Language/LangSelector';
import pokemonLogo from '@/assets/pokemonLogo.png';
import SearchInput from './Search/SearchInput';

const Header = () => {
  return (
    <header className={styles.headerWrap}>
      <div className={styles.header}>
        <h1>
          <Link href='/'>
            <Image src={pokemonLogo} alt='logo' width={150} />
          </Link>
        </h1>
        <SearchInput />
        <LanguageSelector />
      </div>
    </header>
  );
};

export default Header;
