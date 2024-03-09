import { useInfiniteQuery } from 'react-query';
import React, { useCallback, useRef } from 'react';

import { getPokemonList } from '@/pages/api/pokemon-api';
import styles from '@/styles/Home.module.scss';

import PokemonEntry from '@/components/Pokemon/PokemonEntry';
import Loading from '@/components/common/Loading';
import PokemonCard from '@/components/Pokemon/PokemonCard';
import Header from '@/components/common/Header';

const Home = () => {
  const fetchPokemons = ({ pageParam = 1 }) => getPokemonList(pageParam);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery('pokemons', fetchPokemons, {
      getNextPageParam: (lastPage, pages) => pages.length + 1,
    });

  const observer = useRef<IntersectionObserver | null>(null);
  const lastPokemonElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isFetchingNextPage) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });
      if (node) observer.current.observe(node);
    },
    [isFetchingNextPage, hasNextPage, fetchNextPage],
  );

  if (status === 'loading') {
    return <Loading />;
  }

  if (status === 'error') {
    return <p>Error : </p>;
  }

  return (
    <div className={styles.app}>
      <Header />
      <main>
        <section>
          {data &&
            data.pages.map((group, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <React.Fragment key={i}>
                {group?.results.map((pokemon, index) => {
                  if (
                    data.pages.length === i + 1 &&
                    index === group.results.length - 1
                  ) {
                    return (
                      <div ref={lastPokemonElementRef} key={pokemon.name}>
                        <PokemonCard key={pokemon.name}>
                          <div className={styles.listItem}>
                            <PokemonEntry name={pokemon.name} />
                          </div>
                        </PokemonCard>
                      </div>
                    );
                  }
                  return (
                    <PokemonCard key={pokemon.name}>
                      <div className={styles.listItem}>
                        <PokemonEntry name={pokemon.name} />
                      </div>
                    </PokemonCard>
                  );
                })}
              </React.Fragment>
            ))}
        </section>
      </main>
      <div>{isFetchingNextPage ? 'Loading more...' : null}</div>
    </div>
  );
};

export default Home;
