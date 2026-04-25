import React from 'react';

const servicedetail = () => {
  return (
    <div className="bg-[#1a3e4d] text-white px-8 pb-8 pt-10 rounded-b-[2.5rem] -mt-8 border-x-2 border-b-2 border-[#1a3e4d] shadow-inner">
      {/* Divider */}
      <div className="border-t border-white/20 mb-4"></div>

      <div className="space-y-4">
        <p className="text-sm font-medium">Umur Anak : 5 Tahun</p>
        
        <div className="space-y-1">
          <p className="text-sm font-medium">Tugas:</p>
          <ul className="list-disc ml-6 text-sm space-y-1 text-gray-200">
            <li>Beri makan, sudah tersedia di kulkas</li>
            <li>Tidurkan di kamar</li>
          </ul>
        </div>

        <div className="pt-2 text-sm space-y-1">
          <p>Tanggal : 21 Desember 2025</p>
          <p>Jam : 13.00 - 15.00 WIB</p>
          <p className="text-lg font-bold text-orange-400 mt-2">Uang Rp. 30.000</p>
        </div>
      </div>

      {/* Button indikator (opsional) */}
      <div className="flex justify-center mt-6">
        <div className="w-8 h-1 bg-orange-400/50 rounded-full"></div>
      </div>
    </div>
  );
};

export default servicedetail;