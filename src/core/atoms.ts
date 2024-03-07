import { atom } from 'recoil';

import { Pokemon } from '@/types/pokemon';

export const pokemonDataState = atom<Pokemon | null>({
  key: 'pokemonData',
  default: null,
});

export const searchDataState = atom<string>({
  key: 'searchData',
  default: '',
});

export const searchInputState = atom<string>({
  key: 'serachInput',
  default: '',
});

export const keywordsState = atom<string[]>({
  key: 'keywords',
  default: [],
});

export const pokemonIdState = atom<number>({
  key: 'pokemonId',
  default: 1,
});

export const languageState = atom<string>({
  key: 'language',
  default: 'ko',
});
