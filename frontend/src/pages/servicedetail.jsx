import React from "react";

const ServiceDetail = ({ data }) => {
  if (!data) return null;

  // Memecah string description menjadi array untuk rincian tugas
  const tasks = data.tasks ? data.tasks.split(",") : [];

  return (
    <div className="bg-[#1a3e4d] text-white px-8 pb-8 pt-10 rounded-b-[2.5rem] -mt-8 border-x-2 border-b-2 border-[#1a3e4d] shadow-inner relative z-0">
      <div className="border-t border-white/20 mb-4"></div>

      <div className="space-y-4">
        {/* === PERBAIKAN LOGIKA LABEL === */}
        {data.category === "Jaga Anak" && (
          <p className="text-sm font-medium">
            Umur Anak : {data.child_age || "-"}
          </p>
        )}
        {data.category === "Jaga Lansia" && (
          <p className="text-sm font-medium">
            Umur Lansia : {data.elder_age || "-"}
          </p>
        )}
        {data.category === "Jaga Properti" && (
          // Khusus jaga properti, keterangannya numpang di field child_age dari form Tambah
          <p className="text-sm font-medium">
            Keterangan : {data.child_age || "-"}
          </p>
        )}

        <div className="space-y-1">
          <p className="text-sm font-medium">Tugas:</p>
          <ul className="list-disc ml-6 text-sm space-y-1 text-gray-200">
            {tasks.length > 0 && data.tasks ? (
              tasks.map((task, index) => <li key={index}>{task.trim()}</li>)
            ) : (
              <li>Tidak ada rincian tugas</li>
            )}
          </ul>
        </div>

        <div className="pt-2 text-sm space-y-1">
          <p>Tanggal : {data.date || "-"}</p>
          <p>Jam : {data.time || "-"}</p>
          <p className="text-lg font-bold text-orange-400 mt-2">
            {data.payment === "Uang"
              ? `Rp. ${data.price}`
              : `Jasa/Barter: ${data.price}`}
          </p>
        </div>
      </div>

      <div className="flex justify-center mt-6">
        <div className="w-8 h-1 bg-orange-400/50 rounded-full"></div>
      </div>
    </div>
  );
};

export default ServiceDetail;
