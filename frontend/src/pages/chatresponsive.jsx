import { useEffect, useState } from "react";
import ChatPage from "./ChatPage";
import Chat from "./Chat";

export default function ChatResponsive() {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isDesktop ? <ChatPage /> : <Chat />;
}