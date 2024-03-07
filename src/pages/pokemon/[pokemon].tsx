import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useEffect } from 'react';

import { pokemonIdState, languageState } from '@/core/atoms';
import usePokemon from '@/hooks/usePokemon';

import styles from './detail.module.scss';
import Loading from '@/components/common/Loading';
import Header from '@/components/common/Header';

const PokemonDetailPage = () => {
  const router = useRouter();
  const pokemonName = router.query.pokemon?.toString() || '';

  const lang = useRecoilValue(languageState);
  const [id, setId] = useRecoilState(pokemonIdState);

  const { pokemon, isLoading } = usePokemon(pokemonName);

  useEffect(() => {
    if (pokemon) {
      setId(pokemon.data?.id);
    }
  }, [pokemon]);

  return (
    <>
      <Head>
        <title>{`${lang === 'en' ? pokemon?.data.name : pokemon?.koreaName} - Pokemon info`}</title>
      </Head>
      <Header />
      <section className={styles.pokemonDetail}>
        <button
          type='button'
          onClick={() => router.back()}
          className={styles.previous}
        >
          BACK
        </button>
        <div className={styles.wrap}>
          {isLoading && <Loading />}
          {pokemon && (
            <>
              <div className={styles.title}>
                <span>No. {id}</span>
                <h1>{lang === 'en' ? pokemon.data.name : pokemon.koreaName}</h1>
              </div>
              <div className={styles.specWrap}>
                <Image
                  src={pokemon.data.sprites.other.home.front_default}
                  alt={pokemon.data.name}
                  width={200}
                  height={200}
                />
                <Image
                  src={pokemon.data.sprites.front_default}
                  alt={pokemon.data.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.data.sprites.back_default}
                  alt={pokemon.data.name}
                  width={100}
                  height={100}
                />
                {/* 포켓몬 정보 */}
                <div className={styles.spec}>
                  <div>
                    <strong>{lang === 'en' ? 'Types: ' : '타입: '}</strong>
                    {pokemon.data.types
                      .map((item) => item.type.name)
                      .join(', ')}
                  </div>
                  <div>
                    <strong>{lang === 'en' ? 'Height: ' : '신장: '}</strong>
                    {pokemon.data.height * 10} cm
                  </div>
                  <div>
                    <strong>{lang === 'en' ? 'weight: ' : '체중: '}</strong>
                    {pokemon.data.weight / 10} kg
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default PokemonDetailPage;
