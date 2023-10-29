import { useInfiniteQuery } from "react-query";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { useInView } from "react-intersection-observer";

import { languageState, pokemonDataState } from "@/core/recoil/atoms";
import PokemonEntry from "@/components/pokemonEntry";
import { getPokemonPage } from "@/pages/api/pokemon-api";
import styles from "@/styles/Home.module.scss";
import SearchTab from "@/components/searchTab";
import LanguageSelector from "@/components/common/langSelector";

const Home = () => {
  const [input, setInput] = useState<string>("");
  const [search, setSearch] = useState<string>("");

  // const [pokemonList, setPokemonList] = useRecoilState(pokemonDataState);
  const [lang, setLang] = useRecoilState(languageState);

  const [ref, isView] = useInView();

  // 포켓몬 리스트 API
  const { data, fetchNextPage, hasNextPage, isError } = useInfiniteQuery(
    "getPokemonPage",
    ({ pageParam = 1 }) => getPokemonPage(pageParam),
    {
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage.results.length === 20) {
          return allPages.length + 1;
        }
        return undefined;
      },
    }
  );

  // 무한 스크롤
  useEffect(() => {
    if (isView && hasNextPage) fetchNextPage();
  }, [isView]);

  // 검색 필터
  const filteredData =
    data?.pages.map((page) => {
      return page.results.filter(
        (item) =>
          item.name.toLowerCase().includes(search.toLowerCase()) ||
          item.url.split("/").slice(-2, -1)[0].includes(search)
      );
    }) || [];

  if (isError) {
    return <div className={styles.main}>Error loading data.</div>;
  }

  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <h1>
          <Link href="/">{lang === "en" ? "POKEDEX" : "포켓몬도감"}</Link>
        </h1>
        <SearchTab input={input} setInput={setInput} setSearch={setSearch} />
        <LanguageSelector />
      </div>
      <ul>
        {filteredData.flatMap((pageResults) =>
          pageResults.map((item) => (
            <li key={item.name}>
              <PokemonEntry name={item.name} />
            </li>
          ))
        )}
      </ul>
      <div ref={ref}></div>
    </div>
  );
};

export default Home;
