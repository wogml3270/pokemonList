import api from '@/pages/api/axiosInstance';
import { Pokemon, PokemonList, Language } from '@/types/pokemon';

// GET) 포켓몬 (한국어 이름과 같이)
export const getPokemon = async (name: string) => {
  const response = await api.get<Pokemon>(`pokemon/${name}`);
  const speciesResponse = await api.get(`pokemon-species/${name}`);
  const koreaName = speciesResponse.data.names.find(
    (result: any) => result.language.name === 'ko',
  );
  return { koreaName: koreaName.name, data: response.data };
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

// GET) 언어 변경
export const getChangeLanguage = async (id: number) => {
  const response = await api.get<Language>(`/language/${id}`);
  return response.data;
};
