import { useInfiniteQuery } from 'react-query';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';

import { languageState } from '@/core/recoil/atoms';
import { getPokemonList } from '@/pages/api/pokemon-api';
import styles from '@/styles/Home.module.scss';

import PokemonEntry from '@/components/pokemonEntry';
import SearchTab from '@/components/searchTab';
import LanguageSelector from '@/components/common/langSelector';
import Loading from '@/components/common/Loading';
import pokemonLogo from '@/assets/pokemonLogo.png';
import CardComponent from '@/components/pokemonCard';

const Home = () => {
  const [input, setInput] = useState<string>('');
  const [search, setSearch] = useState<string>('');
  const [lang, setLang] = useRecoilState(languageState);
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

  // 검색 필터
  const filteredData =
    data?.pages.map((page) => {
      return page.results.filter(
        (item) =>
          item.name.toLowerCase().includes(search.toLowerCase()) ||
          item.url.split('/').slice(-2, -1)[0].includes(search),
      );
    }) || [];

  return (
    <div className={styles.main}>
      <div className={styles.headerWrap}>
        <div className={styles.header}>
          <h1>
            <Link href='/'>
              <Image src={pokemonLogo} alt='logo' width={150} />
            </Link>
          </h1>
          <SearchTab input={input} setInput={setInput} setSearch={setSearch} />
          <LanguageSelector />
        </div>
      </div>
      {isError ? (
        <p style={{ textAlign: 'center', padding: '30px' }}>
          {lang === 'en'
            ? 'Error loading data.'
            : '데이터를 불러오지 못했습니다.'}
        </p>
      ) : (
        <div>
          <ul>
            {filteredData.flatMap((pageResults) =>
              pageResults.map((item) => (
                <CardComponent key={item.name}>
                  <li>
                    <PokemonEntry name={item.name} />
                  </li>
                </CardComponent>
              )),
            )}
          </ul>
        </div>
      )}
      {isFetching && <Loading />}
      <div ref={ref} />
    </div>
  );
};

export default Home;
