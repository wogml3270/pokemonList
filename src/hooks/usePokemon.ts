import { useQuery } from "react-query";
import * as PokemonApi from "@/pages/api/pokemon-api";
import { AxiosError } from "axios";

export default function usePokemon(name: string) {
  const { data, isLoading } = useQuery(["pokemon", name], async () => {
    try {
      return await PokemonApi.getPokemon(name);
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 404) {
        return null;
      } else {
        throw error;
      }
    }
  });

  return {
    pokemon: data,
    pokemonLoading: isLoading,
  };
}
