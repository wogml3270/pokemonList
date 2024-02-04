/* eslint-disable no-use-before-define */
import api from '@/pages/api/axiosInstance';
import { Pokemon, PokemonList, Evolution, Language } from '@/types/pokemon';

// GET) 포켓몬
export async function getPokemon(name: string) {
  const delay = Math.random() * 2000;
  await new Promise((r) => {
    setTimeout(r, delay);
  });

  const response = await api.get<Pokemon>(`pokemon/${name}`);
  return response.data;
}

// GET) 포켓몬 리스트
export async function getPokemonList(page: number) {
  const offset = 20;
  const response = await api.get<PokemonList>(
    `/pokemon?limit=${offset}&offset=${offset * (page - 1)}`,
  );
  return response.data;
}

// GET) 진화 포켓몬
export async function getEvolutionPokemon(id: number) {
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
}

async function getPokemonImages(name: string | number) {
  const response = await api.get(`pokemon/${name}`);
  return response.data.sprites.other['official-artwork']?.front_default;
}

// GET) 언어 변경
export async function getChangeLanguage(id: number) {
  const response = await api.get<Language>(`/language/${id}`);
  return response.data;
}
