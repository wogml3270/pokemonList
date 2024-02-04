import Link from 'next/link';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import usePokemon from '@/hooks/usePokemon';

import styles from './entry.module.scss';
import Loading from '@/components/common/Loading';

const PokemonEntry = ({ name }: { name: string }) => {
  const { pokemon, isLoading } = usePokemon(name);

  return (
    <Link href={`/pokemon/${name}`}>
      <div className={styles.entry}>
        {isLoading && <Loading />}
        {pokemon && (
          <>
            <div className={styles.entryTitle}>
              <h2>No. {pokemon?.id}</h2>
              <span>{pokemon?.name}</span>
            </div>
            <div className={styles.entryImage}>
              <LazyLoadImage
                src={pokemon?.sprites.other['official-artwork'].front_default}
                alt={pokemon?.name}
              />
            </div>
          </>
        )}
      </div>
    </Link>
  );
};
export default PokemonEntry;
