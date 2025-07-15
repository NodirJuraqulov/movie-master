import React, { useState, useEffect } from "react";
import { BulbOutlined, MoonOutlined } from "@ant-design/icons";
import { Button } from "antd";

const KEY = "theme";

const DarkMode: React.FC = () => {
  const getInitial = () => {
    const saved = localStorage.getItem(KEY);
    if (saved === "dark" || saved === "light") return saved === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  };

  const [dark, setDark] = useState<boolean>(getInitial);

  useEffect(() => {
    const root = document.documentElement;
    if (dark) root.classList.add("dark");
    else root.classList.remove("dark");
    localStorage.setItem(KEY, dark ? "dark" : "light");
  }, [dark]);

  const toggleTheme = () => setDark(!dark);

  return (
    <Button
      type="default"
      shape="round"
      icon={dark ? <BulbOutlined /> : <MoonOutlined />}
      onClick={toggleTheme}
      className="
    !font-medium
    !transition-colors
    !bg-[#C61F1F]
    dark:!bg-white
    !text-white
    dark:!text-black
    !border-none
    !rounded-[6px]
  "
    >
      {dark ? "Light" : "Dark"}
    </Button>
  );
};

export default React.memo(DarkMode);
