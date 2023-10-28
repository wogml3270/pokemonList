import React from "react";
import { useRecoilState } from "recoil";
import { language } from "@/core/recoil/language";

function LanguageSelector() {
  const [selectedLanguage, setSelectedLanguage] = useRecoilState(language);

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
