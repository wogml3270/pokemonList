import { useQuery } from "react-query";
import { getChangeLanguage } from "@/pages/api/pokemon-api";

export default function useLanguage(langCode: number) {
  const { data, isLoading } = useQuery(["language", langCode], async () => {
    const languageData = await getChangeLanguage(langCode);

    return languageData;
  });

  return {
    languageData: data,
    languageLoading: isLoading,
  };
}
