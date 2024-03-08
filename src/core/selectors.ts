import { selector } from 'recoil';

import axiosInstance from '@/pages/api/axiosInstance';

export const FULL_POKEMONS = 251;

export const pokemonIdList = Array.from(
  { length: FULL_POKEMONS },
  (_, i) => i + 1,
);

export const pokemonNamesState = selector({
  key: 'pokemonNames',
  get: () => {
    return Promise.all(
      pokemonIdList.map((pokemonId: number) =>
        axiosInstance.get(`pokemon-species/${pokemonId}`).then((res) => ({
          ko: res.data.names[2].name,
          en: res.data.name,
          ja: res.data.names[9].name,
        })),
      ),
    );
  },
});

export const pokemonListState = selector({
  key: 'pokemonList',
  get: ({ get }) => {
    const pokemonNames = get(pokemonNamesState);

    return Promise.all(
      pokemonIdList.map((pokemonId) =>
        axiosInstance.get(`pokemon/${pokemonId}`).then((res) => ({
          ...res,
          names: pokemonNames[pokemonId - 1],
        })),
      ),
    );
  },
});
