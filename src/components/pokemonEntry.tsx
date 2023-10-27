import Link from "next/link";
import Image from "next/image";

import usePokemon from "@/hooks/usePokemon";

const PokemonEntry = ({ name }: { name: string }) => {
  const { pokemon, pokemonLoading } = usePokemon(name);
  return (
    <Link href={"/" + name}>
      {pokemonLoading && <div>Loading...</div>}
      {pokemon && (
        <>
          <h2>{pokemon.name}</h2>
          <Image
            src={pokemon.sprites.other["official-artwork"].front_default}
            alt={"Pokemon: " + pokemon.name}
            width={200}
            height={200}
          />
        </>
      )}
    </Link>
  );
};
export default PokemonEntry;
