import api from '@/pages/api/axiosInstance';
import { Pokemon, PokemonList, PokemonEvolution } from '@/types/pokemon';

interface EvolutionChain {
  species: { name: string };
}

// GET) 한국어, 영어, 일본어 이름, 포켓몬 정보 불러오기
export const getPokemon = async (pokemonName: string | number) => {
  const response = await api.get<Pokemon>(`pokemon/${pokemonName}`);
  const speciesResponse = await api.get(`pokemon-species/${pokemonName}`);

  // 언어별 이름 찾기
  const findNameByLang = (lang: string) =>
    speciesResponse.data.names.find((name: any) => name.language.name === lang)
      ?.name;

  return {
    id: response.data.id,
    names: {
      kor: findNameByLang('ko'),
      eng: findNameByLang('en'),
      jap: findNameByLang('ja'),
    },
    types: response.data.types,
    weight: response.data.weight,
    height: response.data.height,
    back_icon: response.data.sprites.back_default,
    front_icon: response.data.sprites.front_default,
    other: {
      list: response.data.sprites.other['official-artwork'].front_default,
      detail: response.data.sprites.other.home.front_default,
    },
  };
};

// GET) 포켓몬 리스트
export const getPokemonList = async (page: number) => {
  const offset = 20;
  const totalPokemons = 251;
  const limit = Math.min(offset, totalPokemons - offset * (page - 1));

  if (limit > 0) {
    const response = await api.get<PokemonList>(
      `/pokemon?limit=${limit}&offset=${offset * (page - 1)}`,
    );
    return response.data;
  }
  return null;
};

// 포켓몬 이미지 불러오기 함수
export const getPokemonImages = async (id: number) => {
  const response = await api.get(`pokemon/${id}`);
  return response.data.sprites.other.home?.front_default;
};

// GET) 포켓몬 진화루트
export const getPokemonEvolution = async (
  pokemonName: string | number,
): Promise<EvolutionChain[] | null> => {
  const response = await api.get<Pokemon>(`pokemon-species/${pokemonName}`);

  if (!response.data.evolution_chain || !response.data.evolution_chain.url) {
    return null;
  }

  const evolutionResponse = await api.get<PokemonEvolution>(
    response.data.evolution_chain.url,
  );

  if (!evolutionResponse.data.chain) {
    return null;
  }

  // 포켓몬의 진화 체인을 추출하는 재귀 함수
  const extractEvolutionChain = (
    chain: any,
    evolutionChain: EvolutionChain[],
  ) => {
    if (!chain) return;

    evolutionChain.push({ species: { name: chain.species.name } });

    if (chain.evolves_to && chain.evolves_to.length > 0) {
      chain.evolves_to.forEach((evolution: any) => {
        extractEvolutionChain(evolution, evolutionChain);
      });
    }
  };

  const evolutionChain: EvolutionChain[] = [];
  extractEvolutionChain(evolutionResponse.data.chain, evolutionChain);

  return evolutionChain.length ? evolutionChain : null;
};
