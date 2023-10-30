import { languageState } from "@/core/recoil/atoms";
import { Language } from "@/types/pokemon";
import { useRecoilState } from "recoil";

export const convertLanguage = (context: []) => {
  const [lang, setLang] = useRecoilState(languageState);
  let dataset: any[] = [];

  dataset = context?.filter(
    (data: Language) => data.names[0].language.name === lang
  );
  return dataset;
};
