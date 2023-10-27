import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";

const baseURL = "https://pokeapi.co/api/v2";

const fetchPokemonList = async (pageParam: any) => {
  const response = await axios.get(
    `${baseURL}/pokemon?limit=20&offset=${pageParam * 20}`
  );
  return response.data;
};

const PokemonList = () => {
  const [data, setData] = useState<PokemonData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number | null>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const fetchNextPage = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    const newData = await fetchPokemonList(page);
    setPage(page + 1);
    setLoading(false);

    if (newData.results.length === 0) {
      setHasMore(false);
    }

    setData((prevData) => [...prevData, ...newData.results]);
  }, [page, loading, hasMore]);

  useEffect(() => {
    fetchNextPage();
  }, [fetchNextPage]);

  return (
    <div>
      <h1>Pokémon List</h1>
      <ul>
        {data.map((pokemon, index) => (
          <li key={index}>{pokemon.name}</li>
        ))}
      </ul>
      {loading && <div>Loading more...</div>}
      {!loading && hasMore && (
        <button onClick={fetchNextPage}>Load more</button>
      )}
      {!loading && !hasMore && <div>No more Pokémon to load.</div>}
    </div>
  );
};

export default PokemonList;
