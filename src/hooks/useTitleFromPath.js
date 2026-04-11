// src/hooks/useTitleFromPath.js
import { useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useBoards } from "../features/boards/hooks/useBoards"; 

const formatSegment = (segment) =>
  segment.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

const getTitle = (pathname, boards) => {
  const segments = pathname.split("/").filter(Boolean);

  if (segments[0] === "board" && segments[1]) {
    if (boards) {
      const currentBoard = boards.find((b) => b.id === segments[1]);
      return currentBoard?.title || "Project";
    }
    return "Board";
  }

  if (segments.length > 0) {
    return segments.map(formatSegment).join(" • ");
  }

  return "Welcome";
};

export default function useTitleFromPath() {
  const { pathname } = useLocation();
  const userId = useSelector((state) => state.auth.user?.uid);
  const { data: boards } = useBoards(userId);

  const title = useMemo(() => getTitle(pathname, boards), [pathname, boards]);

  useEffect(() => {
    document.title = `${title} | Focus Flow`;
  }, [title]);
}
