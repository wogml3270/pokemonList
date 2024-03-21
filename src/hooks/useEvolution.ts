import { useQuery } from 'react-query';

import { getPokemonEvolution } from '@/pages/api/pokemon-api';

const useEvolution = (name: string | number) => {
  const {
    data: evolution,
    isLoading: evolutionLoading,
    isError: evolutionError,
  } = useQuery(['evolution', name], () => getPokemonEvolution(name));

  return {
    evolution,
    evolutionLoading,
    evolutionError,
  };
};

export default useEvolution;
