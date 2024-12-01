import { FormEvent, useState } from "react";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import sprite from "../../assets/SVGsprite.svg";

type KeywordSearchProps = {
  keyword: string;

  onKeywordChange: React.Dispatch<React.SetStateAction<string>>;
} & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export default function KeywordSearch({
  keyword,
  onKeywordChange,
  placeholder = "검색어를 입력하세요",
  ...props
}: KeywordSearchProps) {
  const [inputValue, setInputValue] = useState("");

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    onKeywordChange(inputValue);
    setInputValue("");
  };

  return (
    <form className="flex items-center gap-[10px]" onSubmit={onSubmit}>
      {keyword && (
        <KeywordLabel
          keyword={keyword}
          onDelete={() => {
            onKeywordChange("");
          }}
        />
      )}
      <div className="flex items-center gap-[10px]">
        <Input
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
          placeholder={placeholder}
          {...props}
        />
        <button>
          <svg width={30} height={30}>
            <use href={`${sprite}#search`}></use>
          </svg>
        </button>
      </div>
    </form>
  );
}

type KeywordLabelProps = {
  keyword: string;
  onDelete: () => void;
};

function KeywordLabel({ keyword, onDelete }: KeywordLabelProps) {
  return (
    <Label className="flex bg-lightGray p-[5px] rounded-[20px]">
      <div className="flex-shrink-0">{keyword}</div>
      <Button variant="secondary" size="xs" onClick={onDelete}>
        X
      </Button>
    </Label>
  );
}
