// 포켓몬 리스트 타입 정의
export interface PokemonPage {
  results: { name: string; url: string }[];
  next: string | null;
  previous: string | null;
}

// 포켓몬 상세 페이지 타입 정의
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

// 언어 타입 정의
export interface Language {
  name: string;
  url: string;
}
