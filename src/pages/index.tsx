import { useInfiniteQuery, useQuery } from "react-query";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

import { language } from "@/core/recoil/language";
import PokemonEntry from "@/components/pokemonEntry";
import { getPokemonPage } from "@/pages/api/pokemon-api";
import styles from "@/styles/Home.module.scss";
import SearchTab from "@/components/searchTab";
import LanguageSelector from "@/components/common/langSelector";

const Home = () => {
  const [input, setInput] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [lang, setLang] = useRecoilState(language);

  // 포켓몬 리스트 API
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery(
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
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100
      ) {
        if (!isFetchingNextPage && hasNextPage) {
          fetchNextPage();
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isFetchingNextPage, hasNextPage, fetchNextPage]);

  // 검색 필터
  const filteredData =
    data?.pages.map((page) => {
      return page.results.filter(
        (item) =>
          item.name.toLowerCase().includes(search.toLowerCase()) ||
          item.url.split("/").slice(-2, -1)[0].includes(search)
      );
    }) || [];

  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <h1>
          <Link href="/">{lang === "en" ? "POKEMON LIST" : "포켓몬 도감"}</Link>
        </h1>
        <SearchTab input={input} setInput={setInput} setSearch={setSearch} />
        <LanguageSelector />
      </div>
      <ul>
        {filteredData.flatMap((pageResults) =>
          pageResults.map((item) => (
            <li key={item.name}>
              <PokemonEntry
                name={item.name}
                idx={`No. ${parseInt(
                  item.url.split("/").slice(-2, -1)[0],
                  10
                )}`}
              />
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Home;
