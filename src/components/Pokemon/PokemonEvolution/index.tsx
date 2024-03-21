import React from 'react';

import useEvolution from '@/hooks/useEvolution';

const Evolution = ({ name }: { name: string | number }) => {
  const { evolution } = useEvolution(name);

  console.log(evolution);

  return (
    <div>
      <div>evolution</div>
    </div>
  );
};

export default Evolution;
