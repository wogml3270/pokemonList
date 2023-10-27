import { useInfiniteQuery } from "react-query";
import Link from "next/link";
import { useEffect, useState } from "react";

import PokemonEntry from "@/components/pokemonEntry";
import styles from "@/styles/Home.module.scss";
import { useInView } from "react-intersection-observer";
import { getPokemonPage } from "@/pages/api/pokemon-api";

const Home = () => {
  const [ref, isView] = useInView();
  const [input, setInput] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [hasLoaded, setHasLoaded] = useState<Boolean>(false);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isFetching } =
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

  return (
    <div className={styles.main}>
      <h1>
        <Link href="/">POKEMON LIST</Link>
      </h1>
      <ul>
        {data?.pages.map((page) =>
          page.results.map((item) => (
            <li key={item.name}>
              <PokemonEntry
                name={item.name}
                idx={parseInt(item.url.split("/").slice(-2, -1)[0], 10)}
              />
            </li>
          ))
        )}
      </ul>

      <div ref={ref}></div>
    </div>
  );
};

export default Home;
