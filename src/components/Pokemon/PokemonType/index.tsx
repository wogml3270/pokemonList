import React from 'react';
import { useRecoilValue } from 'recoil';

import { pokemonTypes } from '@/utils/pokemonTypes';
import { languageState } from '@/core/atoms';

import styles from './type.module.scss';

const PokemonType = ({ data }: { data: any }) => {
  const lang = useRecoilValue(languageState);

  return (
    <div className={styles.type}>
      {data?.types.map((type: any) => (
        <span key={type?.type.name} className={styles[type?.type.name]}>
          {pokemonTypes[lang][type?.type.name]}
        </span>
      ))}
    </div>
  );
};

export default PokemonType;
