import { useEffect, useState } from 'react';

import { getPokemonName } from './api/pokemon-api';

interface PokemonData {
  name: string;
  korean_name: string;
}

const Test = () => {
  const [pokemonData, setPokemonData] = useState<PokemonData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const promises: Promise<PokemonData | null>[] = [];
      for (let i = 1; i <= 151; i++) {
        promises.push(getPokemonName(i));
      }
      const allPokemonData = await Promise.all(promises);
      setPokemonData(
        allPokemonData.filter((data): data is PokemonData => data !== null),
      );
    };
    fetchData();
  }, []);

  return (
    <div>
      {pokemonData.map((pokemon: any) => (
        <div key={pokemon.name}>
          <p>{pokemon.korean_name}</p>
        </div>
      ))}
    </div>
  );
};

export default Test;
