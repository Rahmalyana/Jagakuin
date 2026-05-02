import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Plus, Search } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // 🔥 ADD ONLY THIS (search state)
  const [search, setSearch] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  const showSearch = ["/", "/chat", "/services"].includes(location.pathname);

  // ================= LOGIN CHECK (KEEP ORIGINAL) =================
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      setIsLogin(!!token);
    };

    checkAuth();

    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, [location.pathname]);

  // ================= SCROLL (KEEP ORIGINAL) =================
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ================= SEARCH LOGIC (NEW, SAFE) =================
  const handleSearch = (e) => {
    if (e.key === "Enter") {
      if (!search.trim()) return;

      const params = new URLSearchParams(location.search);
      params.set("q", search);

      // tetap di page sekarang (TIDAK pindah page)
      navigate(`${location.pathname}?${params.toString()}`);
    }
  };

  // ================= PILIH POST (KEEP ORIGINAL) =================
  const handleChoice = (type) => {
    setShowModal(false);
    setOpen(false);
    navigate("/tambah", { state: { type } });
  };

  // ================= LOGIN/LOGOUT (KEEP ORIGINAL) =================
  const handleAuth = () => {
    if (isLogin) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setIsLogin(false);
      navigate("/");
    } else {
      navigate("/auth");
    }
  };

  // ================= NAV ITEM (KEEP ORIGINAL) =================
  const navItem = (path, label) => {
    const active = location.pathname === path;

    return (
      <Link
        to={path}
        onClick={() => setOpen(false)}
        className={`relative block py-3 px-4 text-sm font-medium transition
        ${
          active
            ? "text-white font-semibold bg-white/20 md:bg-transparent rounded-xl"
            : "text-white/80 hover:text-white hover:bg-white/10 md:hover:bg-transparent rounded-xl"
        }`}
      >
        {label}
      </Link>
    );
  };

  return (
    <div className="font-sans">
      <header className="fixed top-0 w-full z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div
            className={`flex items-center justify-between gap-2 backdrop-blur-xl rounded-2xl transition-all duration-300
          ${
            scrolled
              ? "mt-2 px-4 py-2 shadow-md bg-accent/95 border border-white/10 scale-[0.98]"
              : "mt-3 md:mt-4 px-4 py-3 shadow-sm bg-accent/90"
          }`}
          >
            {/* LOGO */}
            <Link to="/" className="flex items-center gap-2">
              <img
                src="/src/assets/LOGOO.png"
                className={`transition-all ${scrolled ? "w-8 h-8" : "w-9 h-9"}`}
              />
              <span className="text-white font-semibold">Jagakuin</span>
            </Link>

            {/* DESKTOP MENU */}
            <div className="hidden md:flex items-center gap-4">
              {navItem("/", "Home")}
              {navItem("/services", "Services")}

              {isLogin && (
                <>
                  {navItem("/chat", "Chat")}
                  {navItem("/profile", "Profile")}
                </>
              )}

              {/* SEARCH (ONLY ADD LOGIC HERE) */}
              {showSearch && (
                <div className="relative ml-2">
                  <Search
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60"
                  />
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={handleSearch}
                    placeholder="Cari layanan..."
                    className="w-60 pl-9 pr-3 py-2 text-sm rounded-xl border bg-white/90"
                  />
                </div>
              )}
            </div>

            {/* RIGHT */}
            <div className="hidden md:flex items-center gap-4">
              {isLogin && (
                <button
                  onClick={() => setShowModal(true)}
                  className="flex items-center gap-2 bg-primary text-white px-4 py-2.5 rounded-xl"
                >
                  <Plus size={18} />
                  Tambah
                </button>
              )}

              <button
                onClick={handleAuth}
                className="text-sm text-white/80 hover:text-white"
              >
                {isLogin ? "Logout" : "Login"}
              </button>
            </div>

            {/* MOBILE BUTTON */}
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden text-white"
            >
              {open ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU (UNCHANGED) */}
        <div
          className={`md:hidden px-4 mt-2 transition-all duration-300 ${
            open ? "max-h-[500px]" : "max-h-0 overflow-hidden"
          }`}
        >
          <div className="bg-accent/95 rounded-2xl p-5 space-y-4">
            {navItem("/", "Home")}
            {navItem("/services", "Services")}

            {isLogin && (
              <>
                {navItem("/chat", "Chat")}
                {navItem("/profile", "Profile")}

                <button
                  onClick={() => setShowModal(true)}
                  className="w-full bg-primary text-white py-3 rounded-xl"
                >
                  + Tambah
                </button>
              </>
            )}

            <button
              onClick={handleAuth}
              className="w-full border border-white/30 text-white py-3 rounded-xl"
            >
              {isLogin ? "Logout" : "Login"}
            </button>
          </div>
        </div>
      </header>

      {/* MODAL (UNCHANGED) */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[100] p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm text-center">
            <h2 className="text-lg font-bold mb-4">Pilih Jenis Postingan</h2>
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
    </div>
  );
}
