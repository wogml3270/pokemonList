export interface PokemonPage {
  results: { name: string }[];
  naxt: string | null;
  previous: string | null;
}

export interface Pokemon {
  name: string;
  types: {
    type: {
      name: string;
    };
  }[];
  weight: number;
  height: number;
  sprites: {
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };
  url: string;
}
