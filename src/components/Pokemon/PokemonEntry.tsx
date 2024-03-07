import Link from 'next/link';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useRecoilValue } from 'recoil';

import usePokemon from '@/hooks/usePokemon';
import { languageState } from '@/core/atoms';

import styles from './entry.module.scss';
import Loading from '@/components/common/Loading';

const PokemonEntry = ({ name }: { name: string }) => {
  const { pokemon, isLoading } = usePokemon(name);
  const lang = useRecoilValue(languageState);

  return (
    <Link href={`/pokemon/${name}`}>
      <div className={styles.entry}>
        {isLoading && <Loading />}
        {pokemon && (
          <>
            <div className={styles.entryTitle}>
              <h2>No. {pokemon?.data.id}</h2>
              <span>
                {lang === 'en' ? pokemon?.data.name : pokemon?.koreaName}
              </span>
            </div>
            <div className={styles.entryImage}>
              <LazyLoadImage
                src={pokemon?.data.sprites.other.home.front_default}
                alt={pokemon?.data.name}
              />
            </div>
          </>
        )}
      </div>
    </Link>
  );
};
export default PokemonEntry;
