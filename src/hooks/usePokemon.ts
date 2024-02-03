import { useQuery } from "react-query";
import { getPokemon } from "@/pages/api/pokemon-api";

export default function usePokemon(name: string) {
  const {
    data: pokemon,
    isLoading,
    isError,
  } = useQuery(["pokemon", name], () => getPokemon(name));

  return {
    pokemon,
    isLoading,
    isError,
  };
}
