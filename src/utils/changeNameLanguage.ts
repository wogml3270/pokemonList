export const changeNameLanguage = (language: string, pokemon: any) => {
  switch (language) {
    case 'ko':
      return pokemon?.names.ko;
    case 'en':
      return pokemon?.names.en;
    case 'ja':
      return pokemon?.names.ja;
    default:
      return pokemon?.names.ko;
  }
};
