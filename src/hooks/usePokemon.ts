import { useQuery } from "react-query";
import { AxiosError } from "axios";
import { getPokemon } from "@/pages/api/pokemon-api";

export default function usePokemon(name: string) {
  const { data, isLoading } = useQuery(["pokemon", name], async () => {
    try {
      return await getPokemon(name);
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
