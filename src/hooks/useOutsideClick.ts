import { useEffect, RefObject } from 'react';

// 커스텀 훅에 사용될 타입 선언
type CallbackFunction = (event: MouseEvent) => void;

// useRef를 사용한 의존성을 추가해서 ref 이외의 요소를 클릭 시 isOpen의 상태 false로 변경해주는 기능
const useOutsideClick = (
  ref: RefObject<HTMLElement>,
  callback: CallbackFunction,
) => {
  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      callback(event);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, callback]);
};

export default useOutsideClick;
