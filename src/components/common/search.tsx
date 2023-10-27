import { language } from "@/core/recoil/language";
import { useRecoilState } from "recoil";

interface Props {
  input: string | undefined;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  setSearch: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const SearchInput = ({ input, setInput, setSearch }: Props) => {
  const [lang, setLang] = useRecoilState(language);

  const placehoder = () => {
    if (lang.lang === "en") return "Seach Pokemon With Name or Id!";
    else if (lang.lang === "ko")
      return "포켓몬 이름 또는 아이디를 입력해주세요!";
  };

  const write = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const search = () => {
    setSearch(input);
  };

  return (
    <div>
      <input type="text" onChange={write} placeholder={placehoder()} />
      <button onClick={search}>검색</button>
    </div>
  );
};

export default SearchInput;
