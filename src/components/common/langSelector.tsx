import React from "react";
import { useRecoilState } from "recoil";
import { languageState } from "@/core/recoil/atoms";

function LanguageSelector() {
  const [selectedLanguage, setSelectedLanguage] = useRecoilState(languageState);

  const handleLanguageChange = (newLanguage: string) => {
    setSelectedLanguage(newLanguage);
  };

  return (
    <div>
      <button onClick={() => handleLanguageChange("en")}>ENG</button>
      <button onClick={() => handleLanguageChange("ko")}>KOR</button>
    </div>
  );
}

export default LanguageSelector;
