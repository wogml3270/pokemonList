import Link from "next/link";
import { LazyLoadImage } from "react-lazy-load-image-component";

import usePokemon from "@/hooks/usePokemon";
import styles from "./entry.module.scss";
import useLanguage from "@/hooks/useLanguage";
import { useRecoilState } from "recoil";
import { languageState } from "@/core/recoil/atoms";

const PokemonEntry = ({ name }: { name: string }) => {
  const { pokemon, pokemonLoading } = usePokemon(name);
  const [lang] = useRecoilState(languageState);

  const { languageData, languageLoading } = useLanguage(lang === "ko" ? 5 : 9);

  if (languageLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Link href={"/" + name}>
      {pokemonLoading && (
        <div>{lang === "en" ? "Loading..." : "로딩중..."}</div>
      )}
      {pokemon && (
        <>
          <div className={styles.entry}>
            <span>No. {pokemon.id}</span>
            <h2>{pokemon.name}</h2>
          </div>
          <LazyLoadImage
            src={pokemon.sprites.other["official-artwork"].front_default}
            alt={pokemon.name}
            width={200}
            height={200}
          />
        </>
      )}
    </Link>
  );
};
export default PokemonEntry;
