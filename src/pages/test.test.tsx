// import React, { useRef, useCallback } from 'react';
// import { useInfiniteQuery } from 'react-query';

// import { getPokemonList } from './api/pokemon-api';

// const PokemonPage: React.FC = () => {
//   const fetchPokemons = ({ pageParam = 1 }) => getPokemonList(pageParam);

//   const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
//     useInfiniteQuery('pokemons', fetchPokemons, {
//       getNextPageParam: (lastPage, pages) => pages.length + 1,
//     });

//   const observer = useRef<IntersectionObserver | null>(null);
//   const lastPokemonElementRef = useCallback(
//     (node: HTMLDivElement | null) => {
//       if (isFetchingNextPage) return;
//       if (observer.current) observer.current.disconnect();
//       observer.current = new IntersectionObserver((entries) => {
//         if (entries[0].isIntersecting && hasNextPage) {
//           fetchNextPage();
//         }
//       });
//       if (node) observer.current.observe(node);
//     },
//     [isFetchingNextPage, hasNextPage, fetchNextPage],
//   );

//   if (status === 'loading') {
//     return <p>Loading...</p>;
//   }

//   if (status === 'error') {
//     return <p>Error : </p>;
//   }

//   return (
//     <div>
//       {data &&
//         data.pages.map((group, i) => (
//           // eslint-disable-next-line react/no-array-index-key
//           <React.Fragment key={i}>
//             {group.results.map((pokemon, index) => {
//               const id = pokemon.url.split('/')[6];
//               if (
//                 data.pages.length === i + 1 &&
//                 index === group.results.length - 1
//               ) {
//                 return (
//                   <div ref={lastPokemonElementRef} key={pokemon.name}>
//                     <PokemonKoreaName id={Number(id)} />
//                   </div>
//                 );
//               }
//               return (
//                 <div key={pokemon.name}>
//                   <PokemonKoreaName id={Number(id)} />
//                 </div>
//               );
//             })}
//           </React.Fragment>
//         ))}
//       <div>{isFetchingNextPage ? 'Loading more...' : null}</div>
//     </div>
//   );
// };

// export default PokemonPage;
