import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useRecoilState } from 'recoil';
import { useEffect } from 'react';

import { pokemonIdState, languageState } from '@/core/recoil/atoms';
import usePokemon from '@/hooks/usePokemon';
import useEvolution from '@/hooks/useEvolution';

import styles from './detail.module.scss';

const PokemonDetailPage = () => {
  const router = useRouter();
  const pokemonName = router.query.pokemon?.toString() || '';

  const [lang, setLang] = useRecoilState(languageState);
  const [id, setId] = useRecoilState(pokemonIdState);

  const { pokemon, isLoading } = usePokemon(pokemonName);

  const { evolution, evolutionLoading } = useEvolution(id);

  useEffect(() => {
    if (pokemon) {
      setId(pokemon?.id);
    }
  }, [pokemon]);

  return (
    <>
      <Head>
        {pokemon && <title>{`${pokemon.name} - Pokemon info`}</title>}
      </Head>

      <Link href='/' className={styles.pre}>
        Back
      </Link>
      <div className={styles.wrap}>
        {isLoading && <div>{lang === 'en' ? 'Loading...' : '로딩중...'}</div>}
        {pokemon ? (
          <>
            <div className={styles.title}>
              <span>No. {pokemon.id}</span>
              <h1>{pokemon.name}</h1>
            </div>
            <div className={styles.specWrap}>
              <Image
                src={pokemon.sprites.other['official-artwork'].front_default}
                alt={pokemon.name}
                width={250}
                height={250}
              />
              {/* 포켓몬 정보 */}
              <div className={styles.spec}>
                <div>
                  <strong>{lang === 'en' ? 'Types: ' : '타입: '}</strong>
                  {pokemon.types.map((type) => type.type.name).join(', ')}
                </div>
                <div>
                  <strong>{lang === 'en' ? 'Height: ' : '신장: '}</strong>
                  {pokemon.height * 10} cm
                </div>
                <div>
                  <strong>{lang === 'en' ? 'weight: ' : '체중: '}</strong>
                  {pokemon.weight / 10} kg
                </div>
              </div>
            </div>
            {/* 진화 루트 */}
            <div className={styles.evolution}>
              <h1>{lang === 'en' ? 'evolution' : '진화 루트'}</h1>
              {evolutionLoading && (
                <div>{lang === 'en' ? 'Loading...' : '로딩중...'}</div>
              )}
              <div className={styles.evolutionList}>
                {evolution?.map((evo) => {
                  return (
                    <div key={evo[0]}>
                      <p>{evo[0]}</p>
                      <Image src={evo[1]} alt='' width={150} height={150} />
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        ) : (
          <p>
            {lang === 'en' ? 'Pokemon not found' : '포켓몬을 찾을 수 없습니다'}
          </p>
        )}
      </div>
    </>
  );
};

export default PokemonDetailPage;
