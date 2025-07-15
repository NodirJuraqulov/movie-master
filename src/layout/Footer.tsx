import React from "react";
import Logo from "@/assets/logo.svg";
import GooglePlay from "@/assets/googleplay.png";
import AppStore from "@/assets/appstore.png";
import Kino from "@/assets/kino.svg";
import Teatr from "@/assets/teatr.svg";
import Konsert from "@/assets/konsert.svg";
import Sport from "@/assets/sport.svg";
import About1 from "@/assets/about1.svg";
import About2 from "@/assets/about2.svg";
import About3 from "@/assets/about3.svg";
import About4 from "@/assets/about4.svg";
import Instagram from "@/assets/instagram.svg";
import Facebook from "@/assets/facebook.svg";
import YouTube from "@/assets/youtube.svg";

const Footer = () => {
  return (
    <footer className="w-full mt-[120px] pb-10">
      <div className="container rounded-[12px] dark:bg-[#111111] bg-slate-200 min-h-[240px] p-[30px] flex justify-center">
        <div className="px-[20px] grid lg:grid-cols-4 md:grid-cols-2 md:gap-12 grid-cols-2 gap-6">
          <div className="flex flex-col items-start">
            <img src={Logo} alt="Logo" className="mb-12 w-[55px]" />

            <div className="flex flex-col items-center justify-center gap-2">
              <button className="cursor-pointer">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://play.google.com/"
                >
                  <img src={GooglePlay} alt="Google Play" />
                </a>
              </button>
              <button className="cursor-pointer">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.apple.com/"
                >
                  <img src={AppStore} alt="App Store" />
                </a>
              </button>
            </div>
          </div>

          <div>
            <h4 className="text-black text-[16px] font-medium leading-5 mb-5 dark:text-white">About Us</h4>
            <ul className="space-y-4">
              <li>
                <a
                  href=""
                  className="flex items-center gap-2 dark:text-[#A1A1A1] text-black hover:underline hover:text-[#C61F1F] active:text-[#C61F1F] active:underline transition-colors"
                >
                  <img src={About1} alt="" className="w-4 h-4" />
                  Public Offer
                </a>
              </li>
              <li>
                <a
                  href=""
                  className="flex items-center gap-2 dark:text-[#A1A1A1] text-black hover:underline hover:text-[#C61F1F] active:text-[#C61F1F] active:underline transition-colors"
                >
                  <img src={About2} alt="" className="w-4 h-4" />
                  Advertising
                </a>
              </li>
              <li>
                <a
                  href=""
                  className="flex items-center gap-2 dark:text-[#A1A1A1] text-black hover:underline hover:text-[#C61F1F] active:text-[#C61F1F] active:underline transition-colors"
                >
                  <img src={About3} alt="" className="w-4 h-4" />
                  F.A.Q
                </a>
              </li>
              <li>
                <a
                  href=""
                  className="flex items-center gap-2 dark:text-[#A1A1A1] text-black hover:underline hover:text-[#C61F1F] active:text-[#C61F1F] active:underline transition-colors"
                >
                  <img src={About4} alt="" className="w-4 h-4" />
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-black text-[16px] font-medium leading-5 mb-5 dark:text-white">Category</h4>
            <ul className="space-y-4">
              <li>
                <a
                  href=""
                  className="flex items-center gap-2 dark:text-[#A1A1A1] text-black hover:underline hover:text-[#C61F1F] active:text-[#C61F1F] active:underline transition-colors"
                >
                  <img src={Kino} alt="Kino" className="w-4 h-4" />
                  Cinema
                </a>
              </li>
              <li>
                <a
                  href=""
                  className="flex items-center gap-2 dark:text-[#A1A1A1] text-black hover:underline hover:text-[#C61F1F] active:text-[#C61F1F] active:underline transition-colors"
                >
                  <img src={Teatr} alt="Teatr" className="w-4 h-4" />
                  Theater
                </a>
              </li>
              <li>
                <a
                  href=""
                  className="flex items-center gap-2 dark:text-[#A1A1A1] text-black hover:underline hover:text-[#C61F1F] active:text-[#C61F1F] active:underline transition-colors"
                >
                  <img src={Konsert} alt="Konsert" className="w-4 h-4" />
                  Consert
                </a>
              </li>
              <li>
                <a
                  href=""
                  className="flex items-center gap-2 dark:text-[#A1A1A1] text-black hover:underline hover:text-[#C61F1F] active:text-[#C61F1F] active:underline transition-colors"
                >
                  <img src={Sport} alt="Sport" className="w-4 h-4" />
                  Sport
                </a>
              </li>
            </ul>
          </div>

          <div className="flex flex-col justify-between">
            <div>
              <h4 className="text-black text-[16px] font-medium leading-5 mb-5 dark:text-white">Phone Number</h4>
              <a className="text-[20px] text-[#C61F1F] leading-6 font-medium" href="tel:+998930368469">+998 93 036 84 69</a>
            </div>

            <div>
              <h4 className="text-black text-[16px] font-medium leading-5 mb-5 dark:text-white">Social</h4>

              <div className="flex items-center gap-5">
                <a href="https://www.instagram.com">
                  <img src={Instagram} alt="Instagram" />
                </a>
                <a href="https://www.facebook.com">
                  <img src={Facebook} alt="Facebook" />
                </a>
                <a href="https://www.youtube.com">
                  <img src={YouTube} alt="You Tube" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default React.memo(Footer);
