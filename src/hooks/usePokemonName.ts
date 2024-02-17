import { useQuery } from 'react-query';

import { getPokemonName } from '@/pages/api/pokemon-api';

const usePokemonName = (id: number) => {
  const { data, isLoading, isError } = useQuery(['pokemonName', id], () =>
    getPokemonName(id),
  );

  return { data, isLoading, isError };
};

export default usePokemonName;
