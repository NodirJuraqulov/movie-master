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
import { useAuth } from "@/context/AuthContext";
import { auth } from "@/firebase/firebase";
import { UserOutlined } from "@ant-design/icons";

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

  const navigate = useNavigate();

  const { user } = useAuth();

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

          <div className="flex items-center gap-5">
            {user ? (
              <div className="flex items-center gap-3">
                {/* Profil rasmi */}
                {
                  user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt="User avatar"
                      className="w-8 h-8 rounded-full border border-gray-300"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center bg-gray-200 dark:bg-gray-800">
                      <UserOutlined style={{ fontSize: 18, color: "#555" }} />
                    </div>
                  )
                }

                {/* Ismi yoki emaili */}
                <span className="text-sm font-medium text-black dark:text-white">
                  {user.displayName || user.email}
                </span>

                {/* Logout tugmasi */}
                <button
                  onClick={() => auth.signOut()}
                  className="text-xs text-red-600 hover:underline"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => navigate("/signin")}
                className="text-[16px] font-medium cursor-pointer line-clamp-1 text-white bg-[#C61F1F] lg:px-4 md:px-3 sm:px-2 px-1 py-1 rounded-[6px]"
              >
                Sign in
              </button>
            )}


            <DarkMode />
            <LanguageSelect value={lang} onChange={setLang} />
          </div>
        </div>

        <button
          onClick={() => setMenuOpen(true)}
          className="md:hidden p-2 rounded hover:bg-slate-200 dark:hover:bg-gray-900"
          aria-label="Open menu"
        >
          <MenuOutlined style={{ fontSize: "22px" }} />
        </button>
      </div>

      <div>
        {menuOpen && (
          <div
            className="fixed inset-0 bg-black/30 z-50"
            onClick={() => setMenuOpen(false)}
          >
            <div
              className="absolute left-1/2 -translate-x-1/2 top-[70px] w-64 bg-slate-100 dark:bg-[#111111] rounded-2xl shadow-xl p-6 flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setMenuOpen(false)}
                className="absolute top-3 right-3 p-2 rounded-full hover:bg-gray-300 dark:hover:bg-gray-800 transition"
                aria-label="Close menu"
              >
                <CloseOutlined size={22} className="text-black dark:text-white" />
              </button>

              {/* User Info Section */}
              <div className="flex flex-col items-center gap-3 mt-2 mb-6">
                {user ? (
                  <>
                    {/* Profil rasmi */}
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt="User avatar"
                        className="w-14 h-14 rounded-full border border-gray-300 shadow-sm"
                      />
                    ) : (
                      <div className="w-14 h-14 rounded-full border border-gray-300 flex items-center justify-center bg-gray-200 dark:bg-gray-800">
                        <UserOutlined style={{ fontSize: 28, color: "#555" }} />
                      </div>
                    )}

                    {/* Ismi yoki emaili */}
                    <span className="text-base font-semibold text-black dark:text-white">
                      {user.displayName || user.email}
                    </span>

                    {/* Logout tugmasi */}
                    <button
                      onClick={() => auth.signOut()}
                      className="text-sm text-red-600 hover:underline"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      navigate("/signin");
                    }}
                    className="text-sm font-medium text-white bg-[#C61F1F] px-4 py-2 rounded-lg hover:bg-red-700 transition"
                  >
                    Sign in
                  </button>
                )}
              </div>

              {/* Navigation Links */}
              <nav className="flex flex-col gap-3 w-full text-center">
                {["Home", "Movies", "Saved", "Search"].map((t) => (
                  <NavLink
                    key={t}
                    to={t === "Home" ? "/" : `/${t.toLowerCase()}`}
                    onClick={() => setMenuOpen(false)}
                    className="text-lg font-medium rounded-md py-2 text-black dark:text-white hover:text-[#C61F1F] hover:bg-slate-200 dark:hover:bg-gray-900 transition"
                  >
                    {t}
                  </NavLink>
                ))}
              </nav>

              {/* Settings Section */}
              <div className="flex items-center justify-between gap-6 mt-8 w-full px-4">
                <DarkMode />
                <LanguageSelect value={lang} onChange={setLang} />
              </div>
            </div>
          </div>
        )}
      </div>

    </header>
  );
};

export default Header;
export type { Lang };
