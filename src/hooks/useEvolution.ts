import { useQuery } from 'react-query';

import { getEvolutionPokemon } from '@/pages/api/pokemon-api';

const useEvolution = (id: number) => {
  const {
    data: evolution,
    isLoading,
    isError,
  } = useQuery(['evolutionPokemon', id], () => getEvolutionPokemon(id));

  return {
    evolution,
    evolutionLoading: isLoading,
    evolutionError: isError,
  };
};

export default useEvolution;
