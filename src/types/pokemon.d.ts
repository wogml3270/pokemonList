// 포켓몬 리스트 타입 정의
export interface PokemonList {
  results: { name: string; url: string }[];
  next: string | null;
  previous: string | null;
}

// 포켓몬 상세 페이지 타입 정의
export interface Pokemon {
  id: number;
  name: string;
  ko: string;
  en: string;
  ja: string;
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
        back_default: string;
      };
      showdown: {
        front_default: string;
      };
    };
  };
}
