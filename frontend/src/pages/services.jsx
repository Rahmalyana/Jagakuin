import React, { useState } from "react";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  MessageSquare,
  ChevronDown,
  Star,
} from "lucide-react";
import ServiceDetail from "./ServiceDetail";

export default function Services() {
  const [services, setServices] = useState([
    {
      id: 1,
      name: "Rizki",
      type: "Membutuhkan Jasa",
      category: "Jaga Anak",
      payment: "Uang",
      duration: "2 Jam",
      rating: 4,
    },
    {
      id: 2,
      name: "Susi",
      type: "Menyediakan Jasa",
      category: "Jaga Anak",
      payment: "Barter",
      duration: "2 Jam",
      rating: 4,
    },
    {
      id: 3,
      name: "Fatin",
      type: "Membutuhkan Jasa",
      category: "Jaga Anak",
      payment: "Barter",
      duration: "2 Jam",
      rating: 4,
    },
  ]);

  const [activeTab, setActiveTab] = useState("membutuhkan");
  const [expandedId, setExpandedId] = useState(null);

  const filteredServices = services.filter((item) => {
    if (activeTab === "membutuhkan") return item.type === "Membutuhkan Jasa";
    if (activeTab === "menyediakan") return item.type === "Menyediakan Jasa";
    return true;
  });

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    // Menggunakan bg-background
    <div className="min-h-screen bg-background font-sans p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Judul */}
        <div className="flex items-center gap-3 mb-6 max-w-2xl mx-auto px-2">
          <button className="p-2 hover:bg-gray-100 rounded-full transition flex-shrink-0">
            <ChevronLeft size={28} className="text-slate-700" />
          </button>
          {/* Kotak judul menggunakan bg-background */}
          <div className="flex-1 border-2 border-slate-200 rounded-full py-2 px-6 bg-background shadow-sm flex justify-center items-center">
            <h1 className="text-xl md:text-2xl font-extrabold text-accent tracking-tight">
              Jaga Anak
            </h1>
          </div>
          <button className="p-2 hover:bg-gray-100 rounded-full transition flex-shrink-0">
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
                      className={`text-[10px] font-medium mb-1 ${isExpanded ? "text-orange-200" : "text-accent"}`}
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
                  <div className="flex flex-col justify-between items-end h-full py-2 pr-2 self-stretch">
                    <button
                      className={`${isExpanded ? "bg-accent" : "bg-primary"} p-2 rounded-lg text-white mb-6 transition-colors`}
                    >
                      <MessageSquare size={18} />
                    </button>
                    <ChevronDown
                      onClick={() => toggleExpand(item.id)}
                      className={`cursor-pointer transition-transform duration-300 ${isExpanded ? "rotate-180 text-accent" : "text-slate-600"}`}
                      size={28}
                    />
                  </div>
                </div>

                {/* Detail Section */}
                {isExpanded && <ServiceDetail />}
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
