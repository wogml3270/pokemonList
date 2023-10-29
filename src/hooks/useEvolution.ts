import { useQuery } from "react-query";
import { getEvolutionPokemon } from "@/pages/api/pokemon-api";
import { AxiosError } from "axios";

export default function useEvolution(id: number) {
  const { data, isLoading } = useQuery(["evolutionPokemon", id], async () => {
    try {
      return await getEvolutionPokemon(id);
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 404) {
        return null;
      } else {
        throw error;
      }
    }
  });
  return {
    evolution: data,
    evolutionLoading: isLoading,
  };
}
