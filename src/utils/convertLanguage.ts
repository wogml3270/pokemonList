import { useRecoilState } from "recoil";

import { languageState } from "@/core/recoil/atoms";
import { Language } from "@/types/pokemon";

export const convertLanguage = (context: []) => {
  const [lang, setLang] = useRecoilState(languageState);
  let dataset: any[] = [];

  dataset = context?.filter(
    (data: Language) => data.names[0].language.name === lang
  );
  return dataset;
};
