export const changeNameLanguage = (language: string, pokemon: any) => {
  switch (language) {
    case 'kor':
      return pokemon?.names.kor;
    case 'eng':
      return pokemon?.names.eng;
    case 'jap':
      return pokemon?.names.jap;
    default:
      return pokemon?.names.kor;
  }
};
