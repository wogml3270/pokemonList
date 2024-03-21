import Link from 'next/link';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useRecoilValue } from 'recoil';

import usePokemon from '@/hooks/usePokemon';
import { languageState } from '@/core/atoms';
import { changeNameLanguage } from '@/utils/changeNameLanguage';

import styles from './entry.module.scss';
import Loading from '@/components/common/Loading';
import PokemonType from './PokemonType';

const PokemonEntry = ({ name }: { name: string | number }) => {
  const { pokemon, isLoading } = usePokemon(name);
  const lang = useRecoilValue(languageState);

  return (
    <Link href={`/pokemon/${name}`}>
      <div className={styles.entry}>
        {isLoading && <Loading />}
        {pokemon && (
          <>
            <div className={styles.entryTitle}>
              <h2>No. {pokemon.id}</h2>
              <span>{changeNameLanguage(lang, pokemon)}</span>
            </div>
            <div className={styles.entryImage}>
              <LazyLoadImage
                src={pokemon?.other.list}
                alt={changeNameLanguage(lang, pokemon)}
              />
            </div>
            <PokemonType data={pokemon} />
          </>
        )}
      </div>
    </Link>
  );
};
export default PokemonEntry;
