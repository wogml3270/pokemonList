import React, { useEffect, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import useEvolution from '@/hooks/useEvolution';
import { getPokemonImage } from '@/pages/api/pokemon-api';

import styles from './evolution.module.scss';
import Loading from '../common/Loading';

interface EvolutionRouteProps {
  speciesName: string;
}

interface PokemonImage {
  id: number;
  imageUrl: string;
}

const EvolutionRoute: React.FC<EvolutionRouteProps> = ({ speciesName }) => {
  const { evolutionRoute, isLoading, isError } = useEvolution(speciesName);
  const [pokemonImages, setPokemonImages] = useState<PokemonImage[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      if (evolutionRoute) {
        const imagePromises = evolutionRoute.map(async (pokemon) => {
          const imageUrl = await getPokemonImage(pokemon.id);
          return { id: pokemon.id, imageUrl };
        });

        const images = await Promise.all(imagePromises);
        setPokemonImages(
          images.filter((img): img is PokemonImage => img.imageUrl !== null),
        );
      }
    };

    fetchImages();
  }, [evolutionRoute]);

  console.log(evolutionRoute);

  if (isLoading) return <Loading />;
  if (isError) return <div>Error loading evolution route</div>;

  return (
    <div className={styles.evolutionRoute}>
      <h3>진화루트</h3>
      <div className={styles.evolutionSteps}>
        {evolutionRoute?.map((pokemon) => {
          const image = pokemonImages.find((img) => img.id === pokemon.id);
          return (
            <div key={pokemon.id} className={styles.evolutionStep}>
              {image && (
                <LazyLoadImage
                  src={image.imageUrl}
                  alt={pokemon.name}
                  width={96}
                  height={96}
                />
              )}
              <p>{pokemon.name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EvolutionRoute;
