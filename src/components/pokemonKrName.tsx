import React, { FC, useEffect, useState } from 'react';

import { getPokemonName } from '@/pages/api/pokemon-api';

import Loading from '@/components/common/Loading';

interface PokemonData {
  name: string;
  korean_name: string;
}

interface Props {
  pokemonData: PokemonData[];
  setPokemonData: any;
}

const PokemonKrName: FC<Props> = ({ pokemonData, setPokemonData }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [offset, setOffset] = useState(0); // 불러온 포켓몬 데이터의 개수

  const fetchData = async () => {
    if (!isLoading) {
      setIsLoading(true);
      const promises: Promise<PokemonData | null>[] = [];
      const limit = 10; // 한 번에 불러올 포켓몬 개수
      for (let i = offset + 1; i <= offset + limit; i++) {
        promises.push(getPokemonName(i));
      }
      const newPokemonData = await Promise.all(promises);
      const filteredData = newPokemonData.filter(
        (data): data is PokemonData => data !== null,
      );
      setPokemonData((prevData: any) => [...prevData, ...filteredData]);
      setOffset((prevOffset) => prevOffset + filteredData.length);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
        fetchData();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [offset]); // offset 값이 변경될 때마다 스크롤 이벤트를 감지

  return (
    <div>
      {isLoading && <Loading />}
      {pokemonData.map((pokemon: PokemonData) => (
        <div key={pokemon.name}>
          <p>{pokemon.korean_name}</p>
        </div>
      ))}
    </div>
  );
};

export default PokemonKrName;
