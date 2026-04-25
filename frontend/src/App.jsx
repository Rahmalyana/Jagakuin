import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/navbar";

import ChatResponsive from "./pages/ChatResponsive";
import ChatDetail from "./pages/ChatDetail";

import LandingPage from "./pages/landingpage";
import Home from "./pages/home";
import Services from "./pages/services";
import Profile from "./pages/profile";
import Tambah from "./pages/tambah";
import ChatPage from "./pages/chatpage";

function Layout() {
  const location = useLocation();

  // hide navbar di chat detail (full screen chat)
  const hideNavbar = location.pathname.startsWith("/chat/");

  return (
    <div className="bg-background min-h-screen">

      {!hideNavbar && <Navbar />}

      <main
        className={`
          min-h-screen
          ${!hideNavbar ? "pt-[90px]" : ""}
          px-4 md:px-6
        `}
      >
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/services" element={<Services />} />

          <Route path="/chat" element={<ChatPage />} />

          <Route path="/profile" element={<Profile />} />
          <Route path="/tambah" element={<Tambah />} />
        </Routes>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}