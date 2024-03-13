import { ReactNode, useEffect, useState } from 'react';

interface CardComponentProps {
  children: ReactNode;
}

const PokemonCard = ({ children }: CardComponentProps) => {
  // 디바이스 width 475px 미만 상태 관리
  const [isWideScreen, setIsWideScreen] = useState<boolean>(
    window.innerWidth >= 475,
  );

  useEffect(() => {
    const handleResize = () => {
      setIsWideScreen(window.innerWidth >= 475);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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

    if (isWideScreen) {
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
    }
  }, [isWideScreen]);

  return isWideScreen ? (
    <div className='card'>{children}</div>
  ) : (
    <div>{children}</div>
  );
};

export default PokemonCard;
