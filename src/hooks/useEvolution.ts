import { useQuery } from 'react-query';

import { getPokemonEvolutionRoute } from '@/pages/api/pokemon-api';

const useEvolution = (speciesName: string) => {
  const {
    data: evolutionRoute,
    isLoading,
    isError,
  } = useQuery(['evolution', speciesName], () =>
    getPokemonEvolutionRoute(speciesName),
  );

  return {
    evolutionRoute,
    isLoading,
    isError,
  };
};

export default useEvolution;
