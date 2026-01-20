import { useState, useEffect } from "react";
import useWindowWidth from "./useWindowWidth";

export default function useResponsiveSidebar() {
  const width = useWindowWidth();

  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    if (width >= 1024) {
      setCollapsed(false);
    } else if (width > -768) {
      setCollapsed(true);
    }
  }, [width]);
  return { collapsed, setCollapsed };
}
