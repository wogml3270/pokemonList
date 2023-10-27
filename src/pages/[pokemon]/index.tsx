import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

import styles from "./detail.module.scss";
import usePokemon from "@/hooks/usePokemon";

export default function PokemonDetailPage() {
  const router = useRouter();
  const pokemonName = router.query.pokemon?.toString() || "";

  const { pokemon, pokemonLoading } = usePokemon(pokemonName);

  console.log(pokemon);

  return (
    <>
      <Head>
        {pokemon && <title>{`${pokemon.name} - Pokemon info`}</title>}
      </Head>

      <div className={styles.wrap}>
        <Link href="/" className={styles.back}>
          Back
        </Link>
        {pokemonLoading && <div>Loading...</div>}
        {pokemon === null && <p>Pokemon not found</p>}
        {pokemon && (
          <>
            <h1>{pokemon.name}</h1>
            <Image
              src={pokemon.sprites.other["official-artwork"].front_default}
              alt={pokemon.name}
              width={400}
              height={400}
            />
            <div className={styles.block}>
              <div>
                <strong>Types:</strong>{" "}
                {pokemon.types.map((type) => type.type.name).join(", ")}
              </div>
              <div>
                <strong>Height: </strong>
                {pokemon.height * 10} cm
              </div>
              <div>
                <strong>Weight: </strong>
                {pokemon.weight} kg
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
