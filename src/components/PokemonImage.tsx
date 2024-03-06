import React, { useEffect, useState } from 'react';
import Image from 'next/image';

import { getPokemonImages } from '@/pages/api/pokemon-api';

interface PokemonCardProps {
  id: number;
  name: string;
}

const PokemonImage: React.FC<PokemonCardProps> = ({ id, name }) => {
  const [pokemonImage, setPokemonImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchPokemonImage = async () => {
      try {
        const image = await getPokemonImages(id);
        setPokemonImage(image);
      } catch (error) {
        console.error('포켓몬 이미지를 가져오는데 실패했습니다.', error);
      }
    };
    fetchPokemonImage();
  }, [id]);

  return (
    <div>
      {pokemonImage ? (
        <div>
          <h1>{name}</h1>
          <Image
            src={pokemonImage}
            alt={name}
            style={{ width: '200px', height: '200px' }}
          />
        </div>
      ) : (
        <p>포켓몬 이미지를 불러오는 중입니다...</p>
      )}
    </div>
  );
};

export default PokemonImage;
