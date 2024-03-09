type Language = 'ko' | 'en' | 'ja' | string;
type Text = 'types' | 'height' | 'weight' | 'placeholder';

export const changeOptions = (language: Language, text: Text) => {
  const translations: Record<Language, Record<Text, string>> = {
    ko: {
      types: '타입',
      height: '신장',
      weight: '체중',
      placeholder: '포켓몬 이름 또는 아이디를 입력해주세요',
    },
    en: {
      types: 'Types',
      height: 'Height',
      weight: 'Weight',
      placeholder: 'Search Pokemon With Name or Id',
    },
    ja: {
      types: 'タイプ',
      height: '身長',
      weight: '体重',
      placeholder: 'ポケモンの名前またはID入力',
    },
  };

  return translations[language][text];
};
