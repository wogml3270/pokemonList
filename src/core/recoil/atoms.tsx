import { atom } from 'recoil';

import { Pokemon } from '@/types/pokemon';

export const pokemonDataState = atom<Pokemon | null>({
  key: 'pokemonDataState',
  default: null,
});

export const filterDataState = atom<string | object | void>({
  key: 'filterDataState',
  default: {
    searchKeyword: '',
    typeFilter: 'all',
  },
});

export const pokemonIdState = atom<number>({
  key: 'pokemonIdState',
  default: 1,
});

export const languageState = atom<string>({
  key: 'languageState',
  default: 'en',
});

export const koreanNamesState = atom<string[]>({
  key: 'koreanNamesState',
  default: [],
});
