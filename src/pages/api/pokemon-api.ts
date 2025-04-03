import api from '@/pages/api/axiosInstance';
import {
  Pokemon,
  PokemonList,
  PokemonSpecies,
  EvolutionChain,
} from '@/types/pokemon';

// 전역 캐시 객체 생성
const globalCache = {
  pokemonDetails: {} as Record<string, any>,
  pokemonList: {} as Record<string, PokemonList>,
  pokemonImages: {} as Record<number, string>,
  evolutionChains: {} as Record<string, EvolutionChain>,
};

interface PokemonNames {
  kor: string | undefined;
  eng: string | undefined;
  jap: string | undefined;
}

interface PokemonDetails {
  names: PokemonNames;
  data: Pokemon;
}

/**
 * 특정 포켓몬의 상세 정보와 다양한 언어로 된 이름을 가져오기
 * @param pokemonNameOrId - 포켓몬의 이름 또는 ID
 * @returns 한국어, 영어, 일본어로 된 이름과 포켓몬 상세 정보
 * @throws API 요청 실패 시 오류 발생
 */
export const getPokemon = async (
  pokemonNameOrId: string,
): Promise<PokemonDetails> => {
  const cacheKey = String(pokemonNameOrId);

  // 전역 캐시에서 데이터 확인
  if (globalCache.pokemonDetails[cacheKey]) {
    return globalCache.pokemonDetails[cacheKey];
  }

  try {
    const pokemonResponse = await api.get<Pokemon>(
      `pokemon/${pokemonNameOrId}`,
    );
    const speciesUrl = pokemonResponse.data.species.url;
    const speciesResponse = await api.get<PokemonSpecies>(speciesUrl);

    // 언어별 이름 찾기
    const findNameByLang = (lang: string): string | undefined =>
      speciesResponse.data.names.find(
        (name: any) => name.language.name === lang,
      )?.name;

    const result = {
      names: {
        kor: findNameByLang('ko'),
        eng: findNameByLang('en'),
        jap: findNameByLang('ja'),
      },
      data: pokemonResponse.data,
    };

    // 결과를 전역 캐시에 저장
    globalCache.pokemonDetails[cacheKey] = result;
    return result;
  } catch (error) {
    throw new Error(
      `포켓몬 상세 정보 가져오기 실패: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
};

/**
 * 페이지네이션된 포켓몬 목록을 가져오기
 * @param page - 페이지 번호 (1부터 시작)
 * @param itemsPerPage - 페이지당 아이템 수 (기본값: 20)
 * @returns 페이지네이션된 포켓몬 목록
 * @throws API 요청 실패 시 오류 발생
 */
export const getPokemonList = async (
  page: number,
  itemsPerPage: number = 20,
): Promise<PokemonList> => {
  const cacheKey = `${page}_${itemsPerPage}`;

  // 전역 캐시에서 데이터 확인
  if (globalCache.pokemonList[cacheKey]) {
    return globalCache.pokemonList[cacheKey];
  }

  try {
    const offset = (page - 1) * itemsPerPage;
    const response = await api.get<PokemonList>(
      `/pokemon?limit=${itemsPerPage}&offset=${offset}`,
    );

    // 결과를 전역 캐시에 저장
    globalCache.pokemonList[cacheKey] = response.data;
    return response.data;
  } catch (error) {
    throw new Error(
      `포켓몬 목록 가져오기 실패: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
};

// 페이지 이동 시 미리 다음 페이지 데이터를 로드하는 함수 추가
export const prefetchNextPage = async (currentPage: number): Promise<void> => {
  try {
    const nextPage = currentPage + 1;
    if (!globalCache.pokemonList[nextPage]) {
      getPokemonList(nextPage).catch(() => {
        // 조용히 실패 처리 - 사용자에게 오류 표시하지 않음
      });
    }
  } catch {
    // 프리페치는 실패해도 무시
  }
};

/**
 * 특정 포켓몬의 고품질 이미지를 가져오기
 * @param id - 포켓몬 ID
 * @returns 포켓몬의 고품질 이미지 URL 또는 없을 경우 null
 * @throws API 요청 실패 시 오류 발생
 */
export const getPokemonImage = async (id: number): Promise<string | null> => {
  // 전역 캐시에서 이미지 확인
  if (globalCache.pokemonImages[id]) {
    return globalCache.pokemonImages[id];
  }

  try {
    const response = await api.get<Pokemon>(`pokemon/${id}`);
    const imageUrl = response.data.sprites.other.home?.front_default || null;

    // 결과를 전역 캐시에 저장
    if (imageUrl) {
      globalCache.pokemonImages[id] = imageUrl;
    }

    return imageUrl;
  } catch (error) {
    throw new Error(
      `포켓몬 이미지 가져오기 실패: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
};

/**
 * 포켓몬의 진화 체인 정보를 가져오기
 * @param speciesName - 포켓몬 종 ID
 * @returns 포켓몬의 진화 체인 정보
 * @throws API 요청 실패 시 오류 발생
 */
export const getPokemonEvolutionChain = async (
  speciesName: string,
): Promise<EvolutionChain> => {
  // 전역 캐시에서 데이터 확인
  if (globalCache.evolutionChains[speciesName]) {
    return globalCache.evolutionChains[speciesName];
  }

  try {
    const speciesResponse = await api.get<PokemonSpecies>(
      `pokemon-species/${speciesName}`,
    );
    const evolutionChainUrl = speciesResponse.data.evolution_chain.url;
    const evolutionResponse = await api.get<EvolutionChain>(evolutionChainUrl);

    // 결과를 전역 캐시에 저장
    globalCache.evolutionChains[speciesName] = evolutionResponse.data;
    return evolutionResponse.data;
  } catch (error) {
    throw new Error(
      `포켓몬 진화 체인 가져오기 실패: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
};

/**
 * 포켓몬의 진화 루트를 가져오기
 * @param speciesName - 포켓몬 종 이름
 * @returns 포켓몬의 진화 루트 배열 (각 단계의 정보와 조건 포함)
 * @throws API 요청 실패 시 오류 발생
 */
export const getPokemonEvolutionRoute = async (
  speciesName: string,
): Promise<Array<{ name: string; id: number; condition?: string }>> => {
  try {
    // 포켓몬 종 정보를 가져와서 진화 체인 URL 추출
    const speciesResponse = await api.get<PokemonSpecies>(
      `pokemon-species/${speciesName}`,
    );
    const evolutionChainUrl = speciesResponse.data.evolution_chain.url;

    // 진화 체인 정보 요청
    const evolutionResponse = await api.get<EvolutionChain>(evolutionChainUrl);
    const evolutionChain = evolutionResponse.data;

    const evolutionRoute: Array<{
      name: string;
      id: number;
      condition?: string;
    }> = [];

    const extractEvolution = (chain: any) => {
      const pokemonId = chain.species.url.split('/').slice(-2, -1)[0];

      evolutionRoute.push({
        name: chain.species.name,
        id: parseInt(pokemonId, 10),
      });

      if (chain.evolves_to.length > 0) {
        chain.evolves_to.forEach((evolution: any) =>
          extractEvolution(evolution),
        );
      }
    };

    extractEvolution(evolutionChain.chain);
    return evolutionRoute;
  } catch (error) {
    throw new Error(
      `포켓몬 진화 루트 가져오기 실패: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
};

// GET) 포켓몬 진화루트
export const getPokemonEvolution = async (
  pokemonName: string | number,
): Promise<EvolutionChain[] | null> => {
  const response = await api.get<Pokemon>(`pokemon-species/${pokemonName}`);

  if (!response.data.evolution_chain || !response.data.evolution_chain.url) {
    return null;
  }

  const evolutionResponse = await api.get<PokemonEvolution>(
    response.data.evolution_chain.url,
  );

  if (!evolutionResponse.data.chain) {
    return null;
  }

  // 포켓몬의 진화 체인을 추출하는 재귀 함수
  const extractEvolutionChain = (
    chain: any,
    evolutionChain: EvolutionChain[],
  ) => {
    if (!chain) return;

    evolutionChain.push({ species: { name: chain.species.name } });

    if (chain.evolves_to && chain.evolves_to.length > 0) {
      chain.evolves_to.forEach((evolution: any) => {
        extractEvolutionChain(evolution, evolutionChain);
      });
    }
  };

  const evolutionChain: EvolutionChain[] = [];
  extractEvolutionChain(evolutionResponse.data.chain, evolutionChain);

  return evolutionChain.length ? evolutionChain : null;
};
