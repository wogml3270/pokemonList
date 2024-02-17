import api from '@/pages/api/axiosInstance';
import {
  Pokemon,
  PokemonName,
  PokemonList,
  Evolution,
  Language,
} from '@/types/pokemon';

// GET) 포켓몬
export const getPokemon = async (name: string) => {
  const delay = Math.random() * 2000;
  await new Promise((r) => {
    setTimeout(r, delay);
  });

  const response = await api.get<Pokemon>(`pokemon/${name}`);
  return response.data;
};

// GET) 포켓몬 한국어
export const getPokemonName = async (id: number) => {
  const response = await api.get<PokemonName>(`pokemon/${id}`);
  const speciesResponse = await api.get(`pokemon-species/${id}`);
  const koreanName = speciesResponse.data.names.find(
    (name: any) => name.language.name === 'ko',
  );
  return { name: response.data.name, korean_name: koreanName.name };
};

// GET) 포켓몬 리스트
export const getPokemonList = async (page: number) => {
  const offset = 20;
  const response = await api.get<PokemonList>(
    `/pokemon?limit=${offset}&offset=${offset * (page - 1)}`,
  );
  return response.data;
};

// 포켓몬 이미지 불러오기 함수
const getPokemonImages = async (name: string | number) => {
  const response = await api.get(`pokemon/${name}`);
  return response.data.sprites.other['official-artwork']?.front_default;
};

// GET) 진화 포켓몬
export const getEvolutionPokemon = async (id: number) => {
  const response = await api.get<Evolution>(`evolution-chain/${id}/`);
  const pokemonEvoArray: [string, string][] = [];

  const addPokemonInfo = async (species: { name: string }) => {
    const { name } = species;
    const img = await getPokemonImages(name);
    pokemonEvoArray.push([name, img]);
  };

  const { chain } = response.data;
  const firstEvo = chain.evolves_to[0];

  await addPokemonInfo(chain.species);

  if (chain.evolves_to.length > 0) {
    await addPokemonInfo(firstEvo.species);

    if (firstEvo.evolves_to.length > 0) {
      await addPokemonInfo(firstEvo.evolves_to[0].species);
    }
  }

  return pokemonEvoArray;
};

// GET) 언어 변경
export const getChangeLanguage = async (id: number) => {
  const response = await api.get<Language>(`/language/${id}`);
  return response.data;
};
