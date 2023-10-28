import api from "@/pages/api/axiosInstance";
import { Pokemon, PokemonPage, Language } from "@/types/pokemon";

export async function getPokemon(name: string) {
  const delay = Math.random() * 2000;
  await new Promise((r) => setTimeout(r, delay));

  const response = await api.get<Pokemon>(`/pokemon/${name}`);
  return response.data;
}

export async function getPokemonPage(page: number) {
  const offset = 20;
  const response = await api.get<PokemonPage>(
    `/pokemon?limit=${offset}&offset=${offset * (page - 1)}`
  );
  return response.data;
}

export async function getChangeLanguage(num: number) {
  const response = await api.get<Language>(`/language/${num}`);
  return response.data;
}
