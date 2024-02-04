import React from 'react';
import Image from 'next/image';

import spinner from '@/assets/spinner.svg';
import styles from './loading.module.scss';

const Loading = () => {
  return (
    <div className={styles.loading}>
      <Image src={spinner} alt='spinner' />
    </div>
  );
};

export default Loading;
