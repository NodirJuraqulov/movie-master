import React from "react";
import { Select } from "antd";

export type Lang = "uz" | "ru" | "en";

interface LanguageSelectProps {
  value: Lang;
  onChange: (lang: Lang) => void;
  size?: "small" | "middle" | "large";
}

const FLAGS: Record<Lang, string> = {
  uz: "https://flagcdn.com/w20/uz.png",
  ru: "https://flagcdn.com/w20/ru.png",
  en: "https://flagcdn.com/w20/gb.png",
};

const chip = (k: Lang) => (
  <div className="flex items-center gap-1">
    <img
      src={FLAGS[k]}
      alt={`${k} flag`}
      className="w-5 h-5 rounded-full object-cover"
    />
    <span className="uppercase font-semibold">{k}</span>
  </div>
);

const LanguageSelect: React.FC<LanguageSelectProps> = ({ value, onChange, size = "middle" }) => {
  const options = (Object.keys(FLAGS) as Lang[]).map((k) => ({ value: k, label: chip(k) }));

  return (
    <Select
      value={value}
      onChange={onChange as (val: string) => void}
      options={options}
      size={size}
      className="min-w-[72px] rounded-[12px]"
    />
  );
};

export default React.memo(LanguageSelect);
