import api from '@/pages/api/axiosInstance';
import { Pokemon, PokemonList } from '@/types/pokemon';

// GET) 한국어, 영어, 일본어 이름, 포켓몬 정보 불러오기
export const getPokemon = async (name: string) => {
  const response = await api.get<Pokemon>(`pokemon/${name}`);
  const speciesResponse = await api.get(`pokemon-species/${name}`);
  return {
    names: {
      ko: speciesResponse.data.names[2].name,
      en: speciesResponse.data.name,
      ja: speciesResponse.data.names[9].name,
    },
    data: response.data,
  };
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
export const getPokemonImages = async (id: number) => {
  const response = await api.get(`pokemon/${id}`);
  return response.data.sprites.other.home?.front_default;
};
