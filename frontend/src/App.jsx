import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/navbar";
import Footer from "./components/footer";

import ChatResponsive from "./pages/ChatResponsive";
import ChatDetail from "./pages/ChatDetail";
import Auth from "./pages/auth";
import Home from "./pages/home";
import Services from "./pages/services";
import Profile from "./pages/profile";
import Tambah from "./pages/tambah";
import ChatPage from "./pages/chatpage";

import ProtectedRoute from "./components/ProtectedRoute";
import PublicOnlyRoute from "./components/PublicOnlyRoute";

function Layout() {
  const location = useLocation();

  // Hide navbar di chat detail
  const hideNavbar = location.pathname.startsWith("/chat/");

  // Hide footer di semua halaman chat
  const hideFooter = location.pathname.startsWith("/chat");

  return (
    <div className="bg-background min-h-screen flex flex-col">
      {!hideNavbar && <Navbar />}

      <main
        className={`
          flex-grow
          min-h-screen
          ${!hideNavbar ? "pt-[90px]" : ""}
          px-4 md:px-6
        `}
      >
        <Routes>
          {/* PUBLIC */}
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />

          {/* AUTH (guest only) */}
          <Route
            path="/auth"
            element={
              <PublicOnlyRoute>
                <Auth />
              </PublicOnlyRoute>
            }
          />

          {/* PROTECTED */}
          <Route
            path="/chat"
            element={
              <ProtectedRoute>
                <ChatPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/chat/:id"
            element={
              <ProtectedRoute>
                <ChatDetail />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/tambah"
            element={
              <ProtectedRoute>
                <Tambah />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>

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
