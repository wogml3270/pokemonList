import { languageState } from "@/core/recoil/atoms";
import { PokemonLanguage } from "@/types/pokemon";
import { useRecoilState } from "recoil";

export const convertLanguage = (context: []) => {
  const [lang, setLang] = useRecoilState(languageState);
  let data: any[] = [];

  data = context?.filter(
    (data: PokemonLanguage) => data.language.name === lang
  );
  return data;
};
