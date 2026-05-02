import React, { useState, useEffect } from "react";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  MessageSquare,
  ChevronDown,
  Star,
} from "lucide-react";
import ServiceDetail from "./servicedetail";

export default function Services() {
  const [services, setServices] = useState([]);
  const [activeTab, setActiveTab] = useState("membutuhkan");
  const [expandedId, setExpandedId] = useState(null);
  const [loading, setLoading] = useState(true);

  // --- LOGIKA FILTER KATEGORI BARU ---
  const categories = ["Jaga Anak", "Jaga Lansia", "Jaga Properti"];
  const [catIndex, setCatIndex] = useState(0); // Dimulai dari index 0 (Jaga Anak)
  const activeCategory = categories[catIndex];

  const handleNext = () => {
    setCatIndex((prev) => (prev + 1) % categories.length); // Muter ke depan
  };

  const handleBack = () => {
    setCatIndex((prev) => (prev - 1 + categories.length) % categories.length); // Muter ke belakang
  };
  // ------------------------------------

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/services")
      .then((res) => res.json())
      .then((data) => {
        const formattedData = data.map((item) => ({
          ...item,
          type:
            item.type === "membutuhkan"
              ? "Membutuhkan Jasa"
              : "Menyediakan Jasa",
          // Pastikan format category dari DB sama dengan array categories di atas
          category: item.category
            .split("_")
            .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
            .join(" "),
        }));
        setServices(formattedData);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // Filter sekarang mengecek Tipe DAN Kategori
  // Ganti logika filteredServices kamu dengan yang ini:
  const filteredServices = services.filter((item) => {
    // 1. Cek Tipe Jasa
    const matchType =
      activeTab === "membutuhkan"
        ? item.type === "Membutuhkan Jasa"
        : item.type === "Menyediakan Jasa";

    // 2. Cek Kategori (Kita buat keduanya jadi huruf kecil agar pasti cocok)
    // Ini akan mencocokkan "Jaga Lansia" dengan "Jaga Lansia" dari DB yang sudah diformat
    const matchCategory = item.category.trim() === activeCategory.trim();

    return matchType && matchCategory;
  });

  // Fungsi untuk membuka/menutup card detail
  const toggleExpand = (id) => {
    setExpandedId((prevId) => (prevId === id ? null : id));
  };

  if (loading) return <div className="text-center pt-20">Memuat jasa...</div>;

  return (
    // Menggunakan bg-background
    <div className="min-h-screen bg-background font-sans p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Judul - Diperbarui */}
        <div className="flex items-center gap-3 mb-6 max-w-2xl mx-auto px-2">
          {/* Tombol Back */}
          <button
            onClick={handleBack}
            className="p-2 hover:bg-gray-100 rounded-full transition flex-shrink-0"
          >
            <ChevronLeft size={28} className="text-slate-700" />
          </button>

          {/* Kotak judul Dinamis */}
          <div className="flex-1 border-2 border-slate-200 rounded-full py-2 px-6 bg-background shadow-sm flex justify-center items-center">
            <h1 className="text-xl md:text-2xl font-bold text-accent tracking-tight">
              {activeCategory}
            </h1>
          </div>

          {/* Tombol Next */}
          <button
            onClick={handleNext}
            className="p-2 hover:bg-gray-100 rounded-full transition flex-shrink-0"
          >
            <ChevronRight size={28} className="text-slate-700" />
          </button>
        </div>

        {/* Tabs Filter - Menggunakan warna primary */}
        <div className="flex gap-2 mb-8 max-w-md mx-auto">
          <button
            onClick={() => setActiveTab("membutuhkan")}
            className={`flex-1 py-2 rounded-full text-sm font-semibold shadow-md transition ${
              activeTab === "membutuhkan"
                ? "bg-primary text-white"
                : "bg-background text-primary border-primary border"
            }`}
          >
            Membutuhkan Jasa
          </button>
          <button
            onClick={() => setActiveTab("menyediakan")}
            className={`flex-1 py-2 rounded-full text-sm font-semibold shadow-md transition ${
              activeTab === "menyediakan"
                ? "bg-primary text-white"
                : "bg-background text-primary border-primary border"
            }`}
          >
            Menyediakan Jasa
          </button>
        </div>

        {/* List Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {filteredServices.map((item) => {
            const isExpanded = expandedId === item.id;
            return (
              <div key={item.id} className="flex flex-col">
                <div
                  className={`border-2 transition-all duration-300 rounded-[2rem] p-4 flex items-center gap-4 relative z-10 ${
                    isExpanded
                      ? "bg-primary border-primary text-white shadow-xl"
                      : "bg-background border-slate-400 text-slate-800"
                  }`}
                >
                  {/* Profile & Rating */}
                  <div className="flex flex-col items-center min-w-[80px]">
                    <div className="w-16 h-16 rounded-full overflow-hidden mb-1 border border-slate-200">
                      <img
                        src={`https://i.pravatar.cc/150?u=${item.id}`}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span
                      className={`text-xs font-bold ${isExpanded ? "text-white" : "text-slate-700"}`}
                    >
                      {item.name}
                    </span>
                    <div className="flex gap-0.5 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={10}
                          // Rating menggunakan accent
                          className={
                            i < item.rating
                              ? "fill-accent text-accent"
                              : "text-slate-300"
                          }
                        />
                      ))}
                    </div>
                  </div>

                  {/* Konten Card */}
                  <div className="flex-1">
                    <p
                      className={`text-sm font-medium mb-1 ${isExpanded ? "text-orange-200" : "text-accent"}`}
                    >
                      {item.type}
                    </p>
                    <h3 className="text-xl font-bold mb-2">{item.category}</h3>
                    <div className="flex gap-8">
                      <span
                        className={`text-xs font-semibold ${isExpanded ? "text-white" : "text-accent"}`}
                      >
                        {item.payment}
                      </span>
                      <span
                        className={`text-xs font-semibold ${isExpanded ? "text-white" : "text-accent"}`}
                      >
                        {item.duration}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  {/* Actions */}
                  <div className="flex flex-col justify-between items-end h-full py-2 pr-2 self-stretch z-20">
                    {/* Wrapper untuk Teks & Tombol Chat */}
                    <div className="flex items-center gap-2 mb-6">
                      <span
                        className={`text-[10px] md:text-xs font-medium italic animate-pulse ${
                          isExpanded ? "text-orange-200" : "text-slate-400"
                        }`}
                      >
                        Tertarik?
                      </span>
                      <button
                        className={`${
                          isExpanded ? "bg-accent" : "bg-primary"
                        } p-2 rounded-lg text-white transition-all hover:scale-105 shadow-sm`}
                        title="Chat dengan penyedia jasa"
                      >
                        <MessageSquare size={18} />
                      </button>
                    </div>

                    <ChevronDown
                      onClick={() => toggleExpand(item.id)}
                      className={`cursor-pointer transition-transform duration-300 ${
                        isExpanded ? "rotate-180 text-accent" : "text-slate-600"
                      }`}
                      size={28}
                    />
                  </div>
                </div>

                {/* Detail Section - Kirim 'item' sebagai props 'data' */}
                {isExpanded && <ServiceDetail data={item} />}
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredServices.length === 0 && (
          <div className="text-center py-20 text-slate-400 italic">
            Belum ada jasa yang tersedia untuk kategori ini.
          </div>
        )}
      </div>
    </div>
  );
}
