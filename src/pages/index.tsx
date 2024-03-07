import { useInfiniteQuery } from 'react-query';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { useInView } from 'react-intersection-observer';

import { languageState, searchDataState } from '@/core/atoms';
import { getPokemonList } from '@/pages/api/pokemon-api';
import styles from '@/styles/Home.module.scss';
import filterData from '@/utils/filterData';

import PokemonEntry from '@/components/Pokemon/PokemonEntry';
import Loading from '@/components/common/Loading';
import PokemonCard from '@/components/Pokemon/PokemonCard';
import Header from '@/components/common/Header';

const Home = () => {
  const lang = useRecoilValue(languageState);
  const search = useRecoilValue(searchDataState);
  const [ref, isView] = useInView();
  const [isFetching, setIsFetching] = useState<Boolean>(false);

  // 포켓몬 리스트 API
  const { data, fetchNextPage, hasNextPage, isError } = useInfiniteQuery(
    'getPokemonPage',
    ({ pageParam = 1 }) => getPokemonList(pageParam),
    {
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage.results.length === 20) {
          return allPages.length + 1;
        }
        return undefined;
      },
    },
  );

  // 무한 스크롤
  useEffect(() => {
    if (isView && hasNextPage && !isFetching) {
      setIsFetching(true);
      fetchNextPage().then(() => setIsFetching(false));
    }
  }, [isView, isFetching]);

  const filteredData = filterData({ data, search });

  return (
    <div className={styles.app}>
      <Header />
      {isError ? (
        <p style={{ textAlign: 'center', padding: '30px' }}>
          {lang === 'en'
            ? 'Error loading data.'
            : '데이터를 불러오지 못했습니다.'}
        </p>
      ) : (
        <main>
          <section>
            {filteredData.flatMap((pageResults) =>
              pageResults.map((item) => (
                <PokemonCard key={item.name}>
                  <div className={styles.listItem}>
                    <PokemonEntry name={item.name} />
                  </div>
                </PokemonCard>
              )),
            )}
          </section>
        </main>
      )}
      {isFetching && <Loading />}
      <div ref={ref} />
    </div>
  );
};

export default Home;
