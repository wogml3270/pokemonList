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
  pokemonList: {} as Record<number, PokemonList>,
  pokemonImages: {} as Record<number, string>,
  evolutionChains: {} as Record<number, EvolutionChain>,
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
  pokemonNameOrId: string | number,
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
 * @returns 페이지네이션된 포켓몬 목록 또는 더 이상 포켓몬이 없을 경우 null
 * @throws API 요청 실패 시 오류 발생
 */
export const getPokemonList = async (
  page: number,
): Promise<PokemonList | null> => {
  // 전역 캐시에서 데이터 확인
  if (globalCache.pokemonList[page]) {
    return globalCache.pokemonList[page];
  }

  try {
    const offset = 20;
    const totalPokemons = 251;
    const startIndex = offset * (page - 1);
    const limit = Math.min(offset, totalPokemons - startIndex);

    if (limit <= 0) {
      return null;
    }

    const response = await api.get<PokemonList>(
      `/pokemon?limit=${limit}&offset=${startIndex}`,
    );

    // 결과를 전역 캐시에 저장
    globalCache.pokemonList[page] = response.data;
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
    // 이미지만 필요하므로 필요한 데이터만 요청하도록 최적화
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
 * @param speciesId - 포켓몬 종 ID
 * @returns 포켓몬의 진화 체인 정보
 * @throws API 요청 실패 시 오류 발생
 */
export const getPokemonEvolutionChain = async (
  speciesId: number,
): Promise<EvolutionChain> => {
  // 전역 캐시에서 데이터 확인
  if (globalCache.evolutionChains[speciesId]) {
    return globalCache.evolutionChains[speciesId];
  }

  try {
    // 포켓몬 종 정보를 가져와서 진화 체인 URL 추출
    const speciesResponse = await api.get<PokemonSpecies>(
      `pokemon-species/${speciesId}`,
    );
    const evolutionChainUrl = speciesResponse.data.evolution_chain.url;

    // 진화 체인 정보 요청
    const evolutionResponse = await api.get<EvolutionChain>(evolutionChainUrl);

    // 결과를 전역 캐시에 저장
    globalCache.evolutionChains[speciesId] = evolutionResponse.data;
    return evolutionResponse.data;
  } catch (error) {
    throw new Error(
      `포켓몬 진화 체인 가져오기 실패: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
};
