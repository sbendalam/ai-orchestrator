import React, { useEffect, useState } from "react";

function LoadingDots({ speed }) {
  const [dots, setDots] = useState("");
  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prevDots) => {
        if (prevDots === "...") {
          return "";
        } else {
          return prevDots + ".";
        }
      });
    }, speed);

    return () => clearInterval(interval);
  }, []);
  return <>{dots}</>;
}

export default LoadingDots;
