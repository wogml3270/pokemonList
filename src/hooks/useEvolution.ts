import { useQuery } from "react-query";
import { getEvolutionPokemon } from "@/pages/api/pokemon-api";

export default function useEvolution(id: number) {
  const {
    data: evolution,
    isLoading,
    isError,
  } = useQuery(["evolutionPokemon", id], () => getEvolutionPokemon(id));

  return {
    evolution,
    evolutionLoading: isLoading,
    evolutionError: isError,
  };
}
