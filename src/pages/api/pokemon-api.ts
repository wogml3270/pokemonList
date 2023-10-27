import api from "@/pages/api/axiosInstance";
import { Pokemon, PokemonPage } from "@/types/pokemon";

import axios from "axios";

export async function getPokemon(name: string) {
  const delay = Math.random() * 2000;
  await new Promise((r) => setTimeout(r, delay));

  const response = await api.get<Pokemon>("/pokemon/" + name);
  return response.data;
}

export async function getPokemonPage(page: number) {
  const pageSize = 20;
  const response = await api.get<PokemonPage>(
    `/pokemon?limit=${pageSize}&offset=${pageSize * (page - 1)}`
  );
  return response.data;
}

const OFFSET = 20;
export const getPoketmonListAll = async ({ pageParam = 0, search }: any) => {
  let apiUrl = `/pokemon`;
  if (!!search) apiUrl = `/pokemon/${search}`;

  return await axios
    .get(apiUrl, {
      params: { limit: OFFSET, offset: pageParam },
    })
    .then((response) => response.data)
    .then((pokemonAll) => pokemonAll);
};
