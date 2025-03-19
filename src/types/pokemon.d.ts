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
  species: {
    url: string;
  };
}

// 포켓몬 종 정보 타입 정의
export interface PokemonSpecies {
  id: number;
  name: string;
  names: {
    name: string;
    language: {
      name: string;
      url: string;
    };
  }[];
  flavor_text_entries: {
    flavor_text: string;
    language: {
      name: string;
      url: string;
    };
    version: {
      name: string;
      url: string;
    };
  }[];
  genera: {
    genus: string;
    language: {
      name: string;
      url: string;
    };
  }[];
  evolution_chain: {
    url: string;
  };
  color: {
    name: string;
    url: string;
  };
  habitat: {
    name: string;
    url: string;
  } | null;
  generation: {
    name: string;
    url: string;
  };
}

export interface EvolutionDetail {
  species: {
    name: string;
    url: string;
  };
  evolves_to: EvolutionDetail[]; // 재귀적 타입 정의
}

export interface EvolutionChain {
  id: number;
  chain: EvolutionDetail;
}

export interface EvolutionDetailWithImages {
  species: {
    name: string;
    url: string;
    image: string | null; // 포켓몬 이미지 URL 추가
  };
  evolves_to: EvolutionDetailWithImages[]; // 재귀적 타입 정의
}

// 포켓몬 진화 루트 정보를 포함한 타입
export interface EvolutionChainWithImages {
  id: number;
  chain: EvolutionDetailWithImages;
}
