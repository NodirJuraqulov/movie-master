import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import MainLogo from "@/assets/main-logo.svg";
import DarkMode from "@/components/dark-mode/DarkMode";
import LanguageSelect from "@/components/language/Language";
import type { Lang } from "@/components/language/Language";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";
import {
  HomeOutlined,
  VideoCameraOutlined,
  SaveOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux";

const linkBase =
  "flex flex-col items-center justify-center gap-1 transition-colors";

const navLinks = [
  { to: "/", label: "Home", icon: <HomeOutlined /> },
  { to: "/movies", label: "Movies", icon: <VideoCameraOutlined /> },
  { to: "/saved", label: "Saved", icon: <SaveOutlined /> },
  { to: "/search", label: "Search", icon: <SearchOutlined /> },
];

const Header = () => {
  const [lang, setLang] = useState<Lang>("uz");

  const [menuOpen, setMenuOpen] = useState(false);

  const [shrink, setShrink] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShrink(window.scrollY > 50);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navigate = useNavigate()

  const saved = useSelector((state: RootState) => state.saved.value);

  return (
    <header
      className={`w-full flex items-center justify-center shadow fixed top-0 inset-x-0 z-10 bg-white dark:bg-black transition-all duration-300 ease-in-out
                    ${shrink ? "h-[50px]" : "h-[80px]"}`}
    >
      <div className="flex items-center justify-between container">
        <div>
          <NavLink to={"/"}>
            <img src={MainLogo} alt="Main Logo" />
          </NavLink>
        </div>

        <div className="hidden md:flex items-center gap-10">
          {navLinks.map(({ to, label, icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `${linkBase} ${isActive ? "text-[#C61F1F]" : "dark:text-white text-black"
                } relative`
              }
            >
              <div>
                {icon}

                {to === "/saved" && saved.length > 0 && (
                  <span className="absolute -top-1 -right-1 text-[12px] w-5 h-5 bg-red-600 text-white rounded-full flex items-center justify-center">
                    {saved.length}
                  </span>
                )}
              </div>
              <span className="text-[14px] font-medium">{label}</span>
            </NavLink>
          ))}
        </div>

        <button
          onClick={() => setMenuOpen(true)}
          className="md:hidden p-2 rounded hover:bg-slate-200 dark:hover:bg-gray-900"
          aria-label="Open menu"
        >
          <MenuOutlined style={{ fontSize: "22px" }} />
        </button>

        <div className="flex items-center gap-5">
          <button onClick={() => navigate("/signin")} className="text-[16px] font-medium cursor-pointer line-clamp-1 text-white bg-[#C61F1F] lg:px-4 md:px-3 sm:px-2 px-1 py-1 rounded-[6px]">
            Sign in
          </button>
          <DarkMode />
          <LanguageSelect value={lang} onChange={setLang} />
        </div>
      </div>

      <div>
        {menuOpen && (
          <div
            className="fixed inset-0 bg-black/20 z-50"
            onClick={() => setMenuOpen(false)}
          >
            <div
              className="absolute left-1/2 -translate-x-1/2 top-[70px] w-56 bg-slate-200 dark:bg-[#111111] rounded-lg shadow-lg p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setMenuOpen(false)}
                className="absolute top-3 right-3 p-1"
                aria-label="Close menu"
              >
                <CloseOutlined size={24} />
              </button>

              <nav className="flex flex-col gap-4 mt-6 text-center">
                {["Home", "Movies", "Saved", "Search"].map((t) => (
                  <NavLink
                    key={t}
                    to={t === "Home" ? "/" : `/${t.toLowerCase()}`}
                    onClick={() => setMenuOpen(false)}
                    className="text-lg font-medium rounded-md py-1 text-black dark:text-white hover:text-[#C61F1F] hover:bg-slate-300 dark:hover:bg-gray-900 transition"
                  >
                    {t}
                  </NavLink>
                ))}
              </nav>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
export type { Lang };
