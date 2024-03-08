import { useRecoilValue } from 'recoil';

import { pokemonNamesState } from '@/core/selectors';

const TestPage = () => {
  const pokemonNames = useRecoilValue(pokemonNamesState);

  return (
    <div>
      {pokemonNames.map((pokemon) => (
        <p key={pokemon.en}>
          {pokemon.ko} / {pokemon.en} / {pokemon.ja}
        </p>
      ))}
    </div>
  );
};

export default TestPage;
