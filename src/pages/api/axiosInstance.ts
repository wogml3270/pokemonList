import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://pokeapi.co/api/v2",
  timeout: 10000,
});

export const fetchPokemonList = async () => {
  try {
    const response = await axiosInstance.get("/pokemon");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch Pokémon list:", error);
    throw error;
  }
};

export default axiosInstance;
