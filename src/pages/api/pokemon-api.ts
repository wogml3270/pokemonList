import api from '@/pages/api/axiosInstance';
import { Pokemon, PokemonList } from '@/types/pokemon';

// GET) 한국어, 영어, 일본어 이름, 포켓몬 정보 불러오기
export const getPokemon = async (id: string) => {
  const response = await api.get<Pokemon>(`pokemon/${id}`);
  const speciesResponse = await api.get(`pokemon-species/${id}`);

  // 언어별 이름 찾기
  const findNameByLang = (lang: string) =>
    speciesResponse.data.names.find((name: any) => name.language.name === lang)
      ?.name;

  return {
    names: {
      ko: findNameByLang('ko'),
      en: findNameByLang('en'),
      ja: findNameByLang('ja'),
    },
    data: response.data,
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
