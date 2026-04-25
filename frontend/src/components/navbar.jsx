import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Plus, Search } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const showSearch = ["/", "/home", "/chat", "/services"].includes(
    location.pathname
  );

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItem = (path, label) => {
    const active = location.pathname === path;

    return (
      <Link
        to={path}
        onClick={() => setOpen(false)}
        className={`relative block py-3 px-4 text-sm font-medium group transition
        ${
          active
            ? "text-white font-semibold bg-white/20 md:bg-transparent rounded-xl"
            : "text-white/80 hover:text-white hover:bg-white/10 md:hover:bg-transparent rounded-xl"
        }`}
      >
        <span>{label}</span>

        {/* underline desktop only */}
        <span
          className={`hidden md:block absolute left-4 right-4 -bottom-1 h-[2px] bg-white/80 transition-all duration-300
          ${
            active
              ? "opacity-100 scale-x-100"
              : "opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100"
          }`}
          style={{ transformOrigin: "left" }}
        />
      </Link>
    );
  };

  return (
    <header className="fixed top-0 w-full z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div
          className={`flex items-center justify-between gap-2 backdrop-blur-xl rounded-2xl transition-all duration-300
          ${
            scrolled
              ? "mt-2 px-4 py-2 shadow-md bg-accent/95 border border-white/10 scale-[0.98]"
              : "mt-3 md:mt-4 px-4 py-3 shadow-sm bg-accent/90 border border-transparent"
          }`}
        >
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <img
              src="/src/assets/LOGOO.png"
              alt="logo"
              className={`transition-all duration-300 ${
                scrolled ? "w-8 h-8" : "w-9 h-9"
              }`}
            />
            <span
              className={`text-white font-semibold transition-all
              ${
                showSearch
                  ? "hidden md:block" // mobile hidden, desktop tetap ada
                  : "block"           // tampil di semua device
              }`}
            >
              Jagakuin
            </span>
          </Link>

          {showSearch && (
            <div className="flex-1 md:hidden">
              <div className="relative">
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60"
                />

                <input
                  type="text"
                  placeholder="Cari layanan..."
                  className="
                    w-full
                    pl-9 pr-4 py-2.5
                    text-sm
                    rounded-xl
                    bg-white/10 backdrop-blur-md
                    border border-white/20
                    text-white placeholder:text-white/60
                    outline-none
                    focus:ring-2 focus:ring-white/30
                    transition-all
                  "
                />
              </div>
            </div>
          )}

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-4">
            {navItem("/home", "Home")}
            {navItem("/services", "Services")}
            {navItem("/chat", "Chat")}
            {navItem("/profile", "Profile")}

            {showSearch && (
              <div className="relative ml-2">
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-primary/60"
                />
                <input
                  type="text"
                  placeholder="Cari layanan, chat..."
                  className="w-44 lg:w-60 pl-9 pr-3 py-2 text-sm rounded-xl 
                  border border-white/30 bg-white/90 text-primary 
                  focus:outline-none focus:ring-2 focus:ring-white/40"
                />
              </div>
            )}
          </div>

          <div className="hidden md:flex items-center gap-4 ml-2">
            <Link
              to="/tambah"
              className="flex items-center gap-2 
              bg-primary text-white px-4 py-2.5 rounded-xl 
              shadow-lg shadow-primary/30 hover:scale-105 transition"
            >
              <Plus size={18} />
              <span className="font-semibold">Tambah</span>
            </Link>

            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm px-3 py-2 text-white/80 hover:text-white"
            >
              {isLogin ? "Logout" : "Login"}
            </button>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 text-white shrink-0"
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* MOBILE DROPDOWN */}
      <div
        className={`md:hidden px-4 mt-2 mb-2 transition-all duration-300 overflow-hidden ${
          open ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-accent/95 rounded-2xl p-5 space-y-5 shadow-lg border border-white/10">

          {navItem("/home", "Home")}
          {navItem("/services", "Services")}
          {navItem("/chat", "Chat")}
          {navItem("/profile", "Profile")}

          <Link
            to="/tambah"
            onClick={() => setOpen(false)}
            className="block text-center bg-primary text-white py-3 rounded-xl font-semibold"
          >
            + Tambah Post
          </Link>

          <button
            onClick={() => setIsLogin(!isLogin)}
            className="w-full border border-white/30 text-white py-3 rounded-xl"
          >
            {isLogin ? "Logout" : "Login"}
          </button>
        </div>
      </div>
    </header>
  );
}