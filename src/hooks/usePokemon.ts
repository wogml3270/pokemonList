import { useQuery } from 'react-query';

import { getPokemon } from '@/pages/api/pokemon-api';

const usePokemon = (name: string | number) => {
  const {
    data: pokemon,
    isLoading,
    isError,
  } = useQuery(['pokemon', name], () => getPokemon(name));

  return {
    pokemon,
    isLoading,
    isError,
  };
};

export default usePokemon;
