import { useOnlineStatus } from "@/hooks/useOnlineStatus";
import React from "react";
import "./style.css";

const OnlineStatus = () => {
  const { online, firstEnter } = useOnlineStatus();

  return firstEnter ? (
    online ? (
      <p className="text-center w-full fixed top-0 left-0 bg-green-500 text-white text-sm online-status z-100">
        online
      </p>
    ) : (
      <p className="text-center bg-red-500 w-full fixed top-0 left-0 text-white text-sm z-100">offline</p>
    )
  ) : (
    <></>
  );
};

export default React.memo(OnlineStatus);
