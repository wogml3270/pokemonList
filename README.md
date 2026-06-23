# Pokemon Pokedex

회사 입사 전, AI 도구 없이 직접 만든 포켓몬 도감 웹앱입니다.  
[PokéAPI](https://pokeapi.co)를 기반으로 목록 탐색, 상세 조회, 진화 루트 확인까지 한 흐름으로 구현했습니다.

## 프로젝트 요약
- 목적: 공개 API를 활용해 실사용 가능한 도감 UX 구현
- 성격: 개인 사이드 프로젝트
- 구현 범위: 목록 페이지, 상세 페이지, 진화 루트, 다국어 UI, 스크롤 복원

## 주요 기능
- 포켓몬 목록 무한 스크롤 (`react-query` + `IntersectionObserver`)
- 포켓몬 상세 페이지 동적 라우팅 (`/pokemon/[pokemon]`)
- 진화 루트 조회 및 단계별 이미지 렌더링
- 다국어 지원 (KOR / ENG / JAP)
- 언어 선택값 `localStorage` 저장
- 페이지 이동 후 뒤로가기 시 스크롤 위치 복원
- Lazy 이미지 로딩 및 로딩 컴포넌트 처리

## 기술 스택
- Framework: Next.js 14 (Pages Router)
- Language: TypeScript
- UI: React 18, SCSS Modules
- Server State: React Query v3
- Client State: Recoil
- HTTP Client: Axios
- Data Source: PokéAPI

## 구현 포인트
### 1) 데이터 요청 구조
- `src/pages/api/pokemon-api.ts`에 API 호출 로직을 모아 공통화
- 목록/상세/이미지/진화 데이터를 전역 캐시 객체(`globalCache`)로 메모리 캐싱
- 반복 이동 시 불필요한 재요청을 줄여 체감 성능 개선

### 2) 무한 스크롤 UX
- `useInfiniteQuery`로 페이지 단위 목록 요청
- 마지막 카드 감지(`IntersectionObserver`)로 다음 페이지 자동 로드
- 초기 진입 시 첫 페이지 우선 로딩 후 스크롤 시 추가 로딩 허용

### 3) 다국어 처리
- Recoil 전역 상태(`languageState`)로 현재 언어 관리
- 포켓몬 이름(`changeNameLanguage`)과 타입 라벨(`pokemonTypes`)을 언어별 매핑
- 헤더 옵션 텍스트(`changeOptions`)도 언어별 분기

### 4) 상세 페이지 정보 밀도
- 기본 스프라이트 + 공식 이미지 + 타입/키/몸무게 표시
- 종(species) → 진화체인(evolution_chain) API를 따라 진화 루트 렌더링

### 5) 네비게이션 디테일
- 사용자 이탈을 줄이기 위해 라우팅 시 스크롤 위치 저장/복원 구현

## 화면 미리보기 (Portfolio)
> 실제 캡처 이미지는 `docs/screenshots`에 추가하면 README에서 자동으로 보입니다.

| Home List | Pokemon Detail | Evolution Route |
|---|---|---|
| ![Home List](./docs/screenshots/home-list.png) | ![Pokemon Detail](./docs/screenshots/pokemon-detail.png) | ![Evolution Route](./docs/screenshots/evolution-route.png) |

스크린샷 가이드: [`docs/screenshots/README.md`](./docs/screenshots/README.md)

## 실행 방법
### 1) 의존성 설치
```bash
npm install
```

### 2) 개발 서버
```bash
npm run dev
```

- 접속: `http://localhost:3000`

### 3) 프로덕션 빌드/실행
```bash
npm run build
npm run start
```

## 스크립트
- `npm run dev` - 개발 서버 실행
- `npm run build` - 프로덕션 빌드
- `npm run start` - 프로덕션 서버 실행
- `npm run lint` - ESLint 검사
- `npm run test` - Jest 실행 (테스트 환경 설정 보완 필요)

## 주요 라우트
- `/` - 포켓몬 목록
- `/pokemon/[pokemon]` - 포켓몬 상세
- `/testPokemon` - 테스트용 목록 페이지

## 디렉터리 구조
```text
src
├─ pages
│  ├─ index.tsx                     # 메인 목록
│  ├─ pokemon/[pokemon].tsx         # 상세 페이지
│  └─ api
│     ├─ axiosInstance.ts           # Axios 인스턴스
│     └─ pokemon-api.ts             # PokéAPI 호출 모듈
├─ components
│  ├─ common                        # Header, Search, Language, Loading
│  └─ Pokemon                       # Card, Entry, Type, EvolutionRoute
├─ hooks                            # usePokemon, useEvolution, useOutsideClick, useScrollRestoration
├─ core                             # Recoil atoms/selectors
├─ utils                            # 언어/텍스트/타입 변환 유틸
├─ styles                           # 전역/페이지 스타일
└─ types                            # 타입 정의
```

## 회고
- 공개 API를 단순 출력하는 수준이 아니라, 실제 탐색 흐름(목록→상세→진화)을 완성하는 데 집중했습니다.
- 성능과 UX(무한 스크롤, 캐싱, 스크롤 복원, 다국어)를 함께 챙기는 연습이 된 프로젝트였습니다.
- 회사 입사 전 프로젝트로, “직접 구조를 설계하고 끝까지 구현한 경험”이라는 점에서 의미가 컸습니다.

## 향후 개선 아이디어
- 검색 UI와 실제 목록 필터 연동 완성
- 테스트 코드(Jest + RTL) 추가
- 접근성/SEO 메타 강화
- 다국어 확장(추가 언어, i18n 라이브러리 도입)

