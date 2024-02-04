import { ReactNode, useEffect } from 'react';

interface CardComponentProps {
  children: ReactNode;
}

const CardComponent = ({ children }: CardComponentProps) => {
  useEffect(() => {
    const handleMouseMove = (e: any) => {
      const card = e.currentTarget as HTMLElement;
      if (!card) return;

      const x = e.offsetX || 0;
      const y = e.offsetY || 0;

      const rotateX = (4 / 30) * y - 20;
      const rotateY = (-1 / 5) * x + 20;

      card.style.transform = `perspective(350px) rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
    };

    const handleMouseLeave = (e: any) => {
      const card = e.currentTarget as HTMLElement;
      if (!card) return;

      card.style.transform = 'rotateY(0deg)';
    };

    const cards = document.querySelectorAll('.card');
    cards.forEach((card) => {
      card.addEventListener('mousemove', handleMouseMove);
      card.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      cards.forEach((card) => {
        card.removeEventListener('mousemove', handleMouseMove);
        card.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return <div className='card'>{children}</div>;
};

export default CardComponent;
