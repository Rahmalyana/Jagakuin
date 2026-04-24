import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Plus, Search } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // 🔍 Show search only on certain pages
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
      <Link to={path} className="relative text-sm font-medium group">
        <span
          className={`transition ${
            active
              ? "text-accent"
              : "text-primary/70 group-hover:text-primary"
          }`}
        >
          {label}
        </span>

        <span
          className={`absolute left-0 -bottom-1 h-[2px] bg-accent transition-all duration-300 ${
            active ? "w-full" : "w-0 group-hover:w-full"
          }`}
        />
      </Link>
    );
  };

  return (
    <header className="fixed top-0 w-full z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4">
        <div
          className={`flex items-center justify-between 
          backdrop-blur-xl rounded-2xl 
          transition-all duration-300
          ${
            scrolled
              ? "mt-2 px-5 py-2 shadow-md bg-background/90 border border-primary/10 scale-[0.98]"
              : "mt-4 px-6 py-3 shadow-sm bg-background/70 border border-transparent"
          }`}
        >
          {/* 🔹 LOGO */}
          <Link to="/" className="flex items-center gap-2">
            <img
              src="/src/assets/logo_jagakuin.png"
              alt="Jagakuin Logo"
              className={`transition-all duration-300 ${
                scrolled ? "w-8 h-8" : "w-9 h-9"
              }`}
            />
            <span className="text-primary font-semibold">Jagakuin</span>
          </Link>

          {/* 🔹 MENU + SEARCH */}
          <div className="hidden md:flex items-center gap-6">
            {navItem("/home", "Home")}
            {navItem("/services", "Services")}
            {navItem("/chat", "Chat")}
            {navItem("/profile", "Profile")}

            {/* 🔍 SEARCH (IMPROVED SIZE) */}
            {showSearch && (
              <div className="relative ml-2">
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-primary/40"
                />
                <input
                  type="text"
                  placeholder="Cari layanan, chat..."
                  className="w-48 lg:w-64 pl-9 pr-3 py-2 text-sm rounded-xl 
                  border border-primary/20 bg-background 
                  focus:outline-none focus:ring-2 focus:ring-accent/40 
                  transition-all duration-200"
                />
              </div>
            )}
          </div>

          {/* 🔹 RIGHT SIDE */}
          <div className="hidden md:flex items-center gap-4 ml-4">

            {/* ⭐ CTA TAMBAH */}
            <Link
              to="/tambah"
              className="relative flex items-center gap-2 
              bg-accent text-white 
              px-5 py-2.5 rounded-xl 
              shadow-lg shadow-accent/30
              hover:scale-105 hover:shadow-xl 
              transition-all duration-200"
            >
              <Plus size={18} />
              <span className="font-semibold">Tambah</span>

              {/* glow effect */}
              <span className="absolute inset-0 rounded-xl bg-accent/20 blur-md -z-10"></span>
            </Link>

            {/* LOGIN */}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm px-3 py-2 rounded-xl 
              text-primary/70 hover:text-primary 
              transition"
            >
              {isLogin ? "Logout" : "Login"}
            </button>
          </div>

          {/* 🔹 MOBILE BUTTON */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-lg hover:bg-primary/10 transition"
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* 🔹 MOBILE MENU */}
      <div
        className={`md:hidden px-4 mt-2 transition-all duration-300 overflow-hidden ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-background rounded-xl p-4 space-y-4 shadow border border-primary/10">
          {navItem("/home", "Home")}
          {navItem("/services", "Services")}
          {navItem("/chat", "Chat")}
          {navItem("/profile", "Profile")}

          {/* 🔍 SEARCH MOBILE */}
          {showSearch && (
            <input
              type="text"
              placeholder="Cari layanan, chat..."
              className="w-full border border-primary/20 px-3 py-2 rounded-lg"
            />
          )}

          <Link
            to="/tambah"
            className="block text-center bg-accent text-white py-2 rounded-xl font-semibold"
          >
            + Tambah Post
          </Link>

          <button
            onClick={() => setIsLogin(!isLogin)}
            className="w-full border border-primary py-2 rounded-xl"
          >
            {isLogin ? "Logout" : "Login"}
          </button>
        </div>
      </div>
    </header>
  );
}