// 포켓몬 리스트 타입 정의
export interface PokemonList {
  results: { name: string; url: string }[];
  next: string | null;
  previous: string | null;
}

// 포켓몬 상세 페이지 타입 정의
export interface Pokemon {
  id: number;
  names: {
    language: {
      name: string;
    };
    name: string;
  }[];
  types: {
    type: {
      name: string;
    };
  }[];
  weight: number;
  height: number;
  sprites: {
    back_default: string;
    front_default: string;
    other: {
      'official-artwork': {
        front_default: string;
      };
      home: {
        front_default: string;
      };
    };
  };
  evolution_chain: {
    url: string;
  };
}

// 포켓몬 진화루트 타입 정의
export interface PokemonEvolution {
  id: number;
  name: string;
  chain: {
    evolution_to: {
      species: {
        name: string;
        url: string;
      };
      evolution_to: {
        species: {
          name: string;
          url: string;
        };
      };
    }[];
  };
  species: {
    name: string;
    url: string;
  };
}
