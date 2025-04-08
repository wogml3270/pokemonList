type Language = 'kor' | 'eng' | 'jap' | string;
type Text =
  | 'logo'
  | 'types'
  | 'height'
  | 'weight'
  | 'placeholder'
  | 'evolution';

export const changeOptions = (language: Language, text: Text) => {
  const translations: Record<Language, Record<Text, string>> = {
    kor: {
      logo: '포켓몬 도감',
      types: '타입',
      height: '신장',
      weight: '체중',
      placeholder: '포켓몬 이름 또는 아이디를 입력해주세요',
      evolution: '진화루트',
    },
    eng: {
      logo: 'Pokedex',
      types: 'Types',
      height: 'Height',
      weight: 'Weight',
      placeholder: 'Search Pokemon With Name or Id',
      evolution: 'evolutionary route',
    },
    jap: {
      logo: 'ポケモン図鑑',
      types: 'タイプ',
      height: '身長',
      weight: '体重',
      placeholder: 'ポケモンの名前またはID入力',
      evolution: '進化ルート',
    },
  };

  return translations[language][text];
};
