import { useInfiniteQuery } from 'react-query';
import React, { useCallback, useRef, useState, useEffect } from 'react';

import { getPokemonList } from '@/pages/api/pokemon-api';
import styles from '@/styles/Home.module.scss';

import Header from '@/components/common/Header';
import Loading from '@/components/common/Loading';
import PokemonCard from '@/components/Pokemon/PokemonCard';
import PokemonEntry from '@/components/Pokemon/PokemonEntry';

const ITEMS_PER_PAGE = 20;

const Home = () => {
  // 첫 페이지만 로드되었는지 확인하는 상태
  const [isFirstPageOnly, setIsFirstPageOnly] = useState(true);

  // fetchPokemons 함수를 수정하여 첫 페이지일 때만 데이터를 가져오도록 함
  const fetchPokemons = async ({ pageParam = 1 }) => {
    // 첫 페이지가 아니고 아직 첫 페이지만 로드하고 있다면 null 반환
    if (pageParam > 1 && isFirstPageOnly) {
      return null;
    }
    return getPokemonList(pageParam, ITEMS_PER_PAGE);
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery(
      ['pokemonList', isFirstPageOnly], // isFirstPageOnly가 변경될 때 쿼리를 다시 실행
      fetchPokemons,
      {
        getNextPageParam: (lastPage, pages) => {
          if (lastPage === null) return undefined;
          return pages.length + 1;
        },
        // ⚠️ 중요: 첫 페이지만 로드하는 동안에는 자동으로 다음 페이지를 가져오지 않도록 설정
        enabled: true,
        staleTime: 5 * 60 * 1000, // 5분
      },
    );

  const observer = useRef<IntersectionObserver | null>(null);
  const lastPokemonElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      // 첫 페이지만 로드된 상태라면 스크롤 감지 비활성화
      if (isFetchingNextPage || isFirstPageOnly) return;

      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });
      if (node) observer.current.observe(node);
    },
    [isFetchingNextPage, hasNextPage, fetchNextPage, isFirstPageOnly],
  );

  // 사용자 인터랙션(스크롤) 이후에만 추가 페이지 로드 허용
  useEffect(() => {
    const handleScroll = () => {
      if (isFirstPageOnly) {
        setIsFirstPageOnly(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { once: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isFirstPageOnly]);

  if (status === 'loading') {
    return <Loading />;
  }

  if (status === 'error') {
    return <p>에러가 발생했습니다.</p>;
  }

  return (
    <div className={styles.app}>
      <Header />
      <main>
        {data &&
          data.pages.map((group) => {
            if (group === null) return null;

            return (
              <>
                {group.results.map((pokemon, index) => {
                  const isLastItem =
                    data.pages[data.pages.length - 1] === group &&
                    index === group.results.length - 1;

                  return (
                    <PokemonCard key={`pokemon-${pokemon.name}`}>
                      <div
                        className={styles.listItem}
                        ref={isLastItem ? lastPokemonElementRef : null}
                      >
                        <PokemonEntry name={pokemon.name} />
                      </div>
                    </PokemonCard>
                  );
                })}
              </>
            );
          })}
      </main>
      {isFetchingNextPage && <Loading />}
    </div>
  );
};

export default Home;
