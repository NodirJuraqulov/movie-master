import NetworkStatus from "@/components/network-status/NetworkStatus";
import ScrollToTop from "@/components/scrollToTop/ScrollToTop";
import Footer from "@/layout/Footer";
import Header from "@/layout/Header";
import React from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <NetworkStatus />
      <Header />
      <main className="pt-20">
        <Outlet />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
};

export default React.memo(Layout);
