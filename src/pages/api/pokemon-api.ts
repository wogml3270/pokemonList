import api from "@/pages/api/axiosInstance";
import { Pokemon, PokemonPage } from "@/types/pokemon";

export async function getPokemon(name: string) {
  const delay = Math.random() * 2000;
  await new Promise((r) => setTimeout(r, delay));

  const response = await api.get<Pokemon>("/pokemon/" + name);
  return response.data;
}

export async function getPokemonPage(page: number) {
  const pageSize = 12;
  const response = await api.get<Pokemon>(
    `/pokemon?limit=${pageSize}&offset=${pageSize * (page - 1)}`
  );
  return response.data;
}

export async function setNickname(pokemon: Pokemon, nickname: string) {
  return { ...pokemon, name: nickname };
}
