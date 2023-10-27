import { useRouter } from "next/router";
import { useQuery } from "react-query";
import Link from "next/link";

import * as PokemonApi from "@/pages/api/pokemon-api";
import PokemonEntry from "@/components/pokemonEntry";
import styles from "@/styles/Home.module.scss";

const Home = () => {
  const router = useRouter();

  const page = parseInt(router.query.page?.toString() || "1");

  const { data, isLoading, isError } = useQuery(["getPokemonPage", page], () =>
    PokemonApi.getPokemonPage(page)
  );

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>Error while fetching data...</div>;

  return (
    <div className={styles.main}>
      <h1>
        <Link href="/">POKEMON LIST</Link>
      </h1>
      <ul>
        {data?.results?.map((item: any) => (
          <li key={item.name}>
            <PokemonEntry name={item.name} />
          </li>
        ))}
      </ul>
      <div className={styles.btn}>
        {data?.previous && (
          <button
            onClick={() =>
              router.push({ query: { ...router.query, page: page - 1 } })
            }
          >
            PREVIOUS
          </button>
        )}
        {data?.next && (
          <button
            onClick={() =>
              router.push({ query: { ...router.query, page: page + 1 } })
            }
          >
            NEXT
          </button>
        )}
      </div>
    </div>
  );
};

export default Home;
