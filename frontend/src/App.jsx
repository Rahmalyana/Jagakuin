import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/navbar";

import ChatResponsive from "./pages/ChatResponsive";
import ChatDetail from "./pages/ChatDetail";

import LandingPage from "./pages/landingpage";
import Home from "./pages/home";
import Services from "./pages/services";
import Profile from "./pages/profile";
import Tambah from "./pages/tambah";

function Layout() {
  const location = useLocation();

  // hide navbar di chat detail
  const hideNavbar = location.pathname.startsWith("/chat/");

  return (
    <>
      {!hideNavbar && <Navbar />}

      <div className={`${!hideNavbar ? "pt-32" : ""} bg-background min-h-screen px-4`}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/services" element={<Services />} />

          <Route path="/chat" element={<ChatResponsive />} />
          <Route path="/chat/:id" element={<ChatDetail />} />

          <Route path="/profile" element={<Profile />} />
          <Route path="/tambah" element={<Tambah />} />
        </Routes>
      </div>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}