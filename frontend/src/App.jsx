import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/navbar";
import Footer from "./components/footer"; // 1. Import Footer kamu di sini

import ChatResponsive from "./pages/ChatResponsive";
import ChatDetail from "./pages/ChatDetail";
import Auth from "./pages/auth";
import Home from "./pages/home";
import Services from "./pages/services";
import Profile from "./pages/profile";
import Tambah from "./pages/tambah";
import ChatPage from "./pages/chatpage";

import ProtectedRoute from "./components/ProtectedRoute";

function Layout() {
  const location = useLocation();

  // Hide navbar di chat detail
  const hideNavbar = location.pathname.startsWith("/chat/");

  // 2. Logika Sembunyikan Footer:
  // Kita sembunyikan di list chat (/chat) DAN detail chat (/chat/123)
  const hideFooter = location.pathname.startsWith("/chat");

  return (
    <div className="bg-background min-h-screen flex flex-col">
      {" "}
      {/* Tambah flex flex-col */}
      {!hideNavbar && <Navbar />}
      <main
        className={`
          flex-grow  /* 3. Biar main ngedorong footer ke paling bawah */
          min-h-screen
          ${!hideNavbar ? "pt-[90px]" : ""}
          px-4 md:px-6
        `}
      >
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="/services" element={<Services />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/tambah" element={<Tambah />} />
        </Routes>
      </main>
      {/* 4. Tampilkan Footer jika bukan di halaman chat */}
      {!hideFooter && <Footer />}
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
