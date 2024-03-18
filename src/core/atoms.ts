import { atom } from 'recoil';

import { Pokemon } from '@/types/pokemon';

export const pokemonDataState = atom<Pokemon | null>({
  key: 'pokemonData',
  default: null,
});

export const pokemonIdState = atom<number>({
  key: 'pokemonId',
  default: 1,
});

export const scrollPositionState = atom<number>({
  key: 'scrollPosition',
  default: 0,
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

export const queryState = atom<string>({
  key: 'query',
  default: '',
});

export const typeState = atom<string[]>({
  key: 'type',
  default: [],
});

export const sortState = atom<string>({
  key: 'sort',
  default: '',
});

export const languageState = atom<string>({
  key: 'language',
  default: 'kor',
});
