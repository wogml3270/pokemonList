import Link from "next/link";
import Image from "next/image";

import usePokemon from "@/hooks/usePokemon";
import styles from "@/styles/poke.module.scss";

const PokemonEntry = ({
  name,
  idx,
}: {
  name: string;
  idx: number | string;
}) => {
  const { pokemon, pokemonLoading } = usePokemon(name);

  return (
    <Link href={"/" + name}>
      {pokemonLoading && <div>Loading...</div>}
      {pokemon && (
        <>
          <div className={styles.entry}>
            <span>{idx}</span>
            <h2>{pokemon.name}</h2>
          </div>
          <Image
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
