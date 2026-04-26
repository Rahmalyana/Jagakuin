import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Plus, Search } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const showSearch = ["/", "/home", "/chat", "/services"].includes(
    location.pathname
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLogin(!!token);
  }, []);

  // scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // pilih jenis post
  const handleChoice = (type) => {
    setShowModal(false);
    setOpen(false);
    navigate("/tambah", { state: { type } });
  };

  // login/logout handler
  const handleAuth = () => {
    if (isLogin) {
      localStorage.removeItem("token");
      setIsLogin(false);
      navigate("/"); // balik ke landing
    } else {
      navigate("/auth");
    }
  };

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
    <>
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
            {/* LOGO */}
            <Link to="/" className="flex items-center gap-2 shrink-0">
              <img
                src="/src/assets/LOGOO.png"
                alt="logo"
                className={`transition-all duration-300 ${
                  scrolled ? "w-8 h-8" : "w-9 h-9"
                }`}
              />
              <span
                className={`text-white font-semibold ${
                  showSearch ? "hidden md:block" : "block"
                }`}
              >
                Jagakuin
              </span>
            </Link>

            {/* SEARCH MOBILE */}
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
                    className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/60 outline-none"
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
                    placeholder="Cari layanan..."
                    className="w-44 lg:w-60 pl-9 pr-3 py-2 text-sm rounded-xl border bg-white/90"
                  />
                </div>
              )}
            </div>

            {/* DESKTOP RIGHT */}
            <div className="hidden md:flex items-center gap-4 ml-2">
              <button
                onClick={() => setShowModal(true)}
                className="flex items-center gap-2 bg-primary text-white px-4 py-2.5 rounded-xl shadow hover:scale-105 transition"
              >
                <Plus size={18} />
                Tambah
              </button>

              <button
                onClick={handleAuth}
                className="text-sm px-3 py-2 text-white/80 hover:text-white"
              >
                {isLogin ? "Logout" : "Login"}
              </button>
            </div>

            {/* MOBILE BUTTON */}
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden p-2 text-white"
            >
              {open ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        <div
          className={`md:hidden px-4 mt-2 mb-2 transition-all duration-300 ${
            open ? "max-h-[500px]" : "max-h-0 overflow-hidden"
          }`}
        >
          <div className="bg-accent/95 rounded-2xl p-5 space-y-5 shadow-lg">
            {navItem("/home", "Home")}
            {navItem("/services", "Services")}
            {navItem("/chat", "Chat")}
            {navItem("/profile", "Profile")}

            <button
              onClick={() => setShowModal(true)}
              className="w-full flex items-center justify-center gap-2 bg-primary text-white py-3 rounded-xl"
            >
              <Plus size={18} />
              Tambah
            </button>

            <button
              onClick={handleAuth}
              className="w-full border border-white/30 text-white py-3 rounded-xl"
            >
              {isLogin ? "Logout" : "Login"}
            </button>
          </div>
        </div>
      </header>

      {/* MODAL TAMBAH */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[100] p-4">
          <div className="bg-white rounded-[2rem] p-6 max-w-sm w-full text-center">
            <h2 className="text-lg font-bold mb-4">
              Pilih Jenis Postingan
            </h2>

            <button
              onClick={() => handleChoice("butuh")}
              className="w-full bg-accent text-white py-3 rounded-xl mb-2"
            >
              Membutuhkan Jasa
            </button>

            <button
              onClick={() => handleChoice("sedia")}
              className="w-full border border-accent text-accent py-3 rounded-xl"
            >
              Menyediakan Jasa
            </button>

            <button
              onClick={() => setShowModal(false)}
              className="mt-3 text-sm text-gray-400"
            >
              Batal
            </button>
          </div>
        </div>
      )}
    </>
  );
}