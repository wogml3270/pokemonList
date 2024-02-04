import { useQuery } from 'react-query';

import { getChangeLanguage } from '@/pages/api/pokemon-api';

const useLanguage = (langCode: number) => {
  const { data, isLoading } = useQuery(['language', langCode], async () => {
    const languageData = await getChangeLanguage(langCode);

    return languageData;
  });

  return {
    languageData: data,
    languageLoading: isLoading,
  };
};

export default useLanguage;
