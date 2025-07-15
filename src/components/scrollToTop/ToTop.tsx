import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);  // har doim yuqoriga olib chiqadi
  }, [pathname]);

  return null;
};

export default React.memo(ToTop);
