import { useRouter } from 'next/router';
import Head from 'next/head';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useRecoilValue } from 'recoil';
import Image from 'next/image';
import { useEffect } from 'react';

import { languageState } from '@/core/atoms';
import usePokemon from '@/hooks/usePokemon';
import { changeNameLanguage } from '@/utils/changeNameLanguage';
import { changeOptions } from '@/utils/changeOptions';
import useEvolution from '@/hooks/useEvolution';

import styles from './detail.module.scss';
import Loading from '@/components/common/Loading';
import Header from '@/components/common/Header';
import PokemonType from '@/components/Pokemon/PokemonType';
import rollback from '@/assets/rollback.svg';

const PokemonDetailPage = () => {
  const router = useRouter();
  const pokemonName = router.query.pokemon?.toString() || '';

  const lang = useRecoilValue(languageState);

  const { pokemon, isLoading } = usePokemon(pokemonName);

  const { evolution } = useEvolution(pokemonName);

  return (
    <>
      <Head>
        <title>{`${changeNameLanguage(lang, pokemon)} - Pokemon info`}</title>
      </Head>
      <Header />
      <section className={styles.pokemonDetail}>
        <button
          type='button'
          onClick={() => router.back()}
          className={styles.previous}
        >
          <Image src={rollback} alt='back' />
        </button>
        <div className={styles.wrap}>
          {isLoading && <Loading />}
          {pokemon && (
            <>
              <div className={styles.title}>
                <span>No. {pokemon.id}</span>
                <h1>{changeNameLanguage(lang, pokemon)}</h1>
              </div>
              <div className={styles.specWrap}>
                <LazyLoadImage
                  src={pokemon.other.detail}
                  alt={changeNameLanguage(lang, pokemon)}
                  width={200}
                  height={200}
                />
                <div className={styles.gameImage}>
                  <LazyLoadImage
                    src={pokemon.front_icon}
                    alt={changeNameLanguage(lang, pokemon)}
                    width={100}
                    height={100}
                  />
                  <LazyLoadImage
                    src={pokemon.back_icon}
                    alt={changeNameLanguage(lang, pokemon)}
                    width={100}
                    height={100}
                  />
                </div>
                {/* 포켓몬 정보 */}
                <div className={styles.spec}>
                  <div className={styles.types}>
                    <strong>{changeOptions(lang, 'types')}</strong>
                    <PokemonType data={pokemon} />
                  </div>
                  <div className={styles.height}>
                    <strong>{changeOptions(lang, 'height')}</strong>
                    <span>{pokemon.height * 10}cm</span>
                  </div>
                  <div className={styles.weight}>
                    <strong>{changeOptions(lang, 'weight')}</strong>
                    <span>{pokemon.weight / 10}kg</span>
                  </div>
                </div>
              </div>
              {/* 포켓몬 진화 루트 */}
              <div className={styles.evolution}>
                {evolution?.map((item) => {
                  return <div key={item.species.name}>{item.species.name}</div>;
                })}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default PokemonDetailPage;
