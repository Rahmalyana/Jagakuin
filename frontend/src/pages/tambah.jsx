import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, Plus } from 'lucide-react';

export default function Tambah() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const type = location.state?.type || 'butuh'; // Default ke butuh jika akses langsung
  const title = type === 'butuh' ? 'Membutuhkan Jasa' : 'Menyediakan Jasa';

  return (
    <div className="min-h-screen bg-white md:bg-gray-50 flex justify-center pb-20">
      <div className="w-full max-w-xl bg-white min-h-screen md:min-h-0 md:my-10 md:rounded-[3rem] md:shadow-xl p-6 md:p-10">
        
        {/* Header Judul */}
        <h1 className="text-2xl md:text-3xl font-black text-orange-400 text-center mb-8">
          {title}
        </h1>

        {/* Kategori Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {['Jaga Anak', 'Jaga Lansia', 'Jaga Properti'].map((cat, i) => (
            <button 
              key={cat}
              className={`px-6 py-2.5 rounded-full text-sm font-bold shadow-sm transition
                ${i === 0 ? 'bg-accent text-white' : 'bg-white border border-slate-200 text-slate-500 hover:bg-gray-50'}
              `}
            >
              {cat}
            </button>
          ))}
        </div>

        <form className="space-y-6">
          {/* Input Umur */}
          <div className="space-y-2">
            <label className="text-accent font-black text-lg">Umur Anak</label>
            <input 
              type="text" 
              placeholder="Ketikan umur anak yang akan dijaga" 
              className="w-full border-2 border-slate-200 rounded-2xl py-3 px-4 text-center placeholder:text-orange-200 focus:outline-none focus:border-orange-300 font-medium"
            />
          </div>

          {/* Jenis Kelamin */}
          <div className="space-y-2">
            <label className="text-accent font-black text-lg">Jenis Kelamin</label>
            <div className="flex gap-8">
              {['Laki-laki', 'Perempuan'].map((gender) => (
                <label key={gender} className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative flex items-center justify-center">
                    <input type="checkbox" className="peer appearance-none w-6 h-6 border-2 border-orange-200 rounded-lg checked:bg-orange-400 checked:border-orange-400 transition-all" />
                    <Plus size={14} className="absolute text-white opacity-0 peer-checked:opacity-100 transition-opacity" />
                  </div>
                  <span className="text-slate-600 font-bold group-hover:text-accent transition">{gender}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Rincian Tugas */}
          <div className="space-y-2">
            <label className="text-accent font-black text-lg">Rincian Tugas yang harus dilakukan</label>
            <div className="border-2 border-slate-400 rounded-[2.5rem] p-6 space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-4">
                   <input type="checkbox" className="w-6 h-6 accent-orange-400" />
                   <div className="flex-1 border-b border-dotted border-slate-300 text-slate-300">...</div>
                </div>
              ))}
            </div>
          </div>

          {/* Tanggal & Waktu (Grid on Desktop) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-accent font-black text-lg">Tanggal Jaga</label>
              <div className="flex items-center gap-3">
                <div className="bg-accent p-2 rounded-xl text-white"><Calendar size={24} /></div>
                <input type="text" placeholder="DD/MM/YY" className="flex-1 border-2 border-slate-200 rounded-xl py-3 text-center focus:outline-none" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-accent font-black text-lg">Waktu Jaga</label>
              <div className="flex items-center gap-3">
                <div className="bg-accent p-2 rounded-xl text-white"><Clock size={24} /></div>
                <input type="text" placeholder="--:-- - --:--" className="flex-1 border-2 border-slate-200 rounded-xl py-3 text-center focus:outline-none" />
              </div>
            </div>
          </div>

          {/* Pembayaran & Nominal */}
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-accent font-black text-lg">Metode Pembayaran</label>
              <input type="text" placeholder="Pilih salah satu metode" className="w-full border-2 border-slate-200 rounded-2xl py-3 text-center focus:outline-none" />
            </div>
            <div className="space-y-2">
              <label className="text-accent font-black text-lg">Nominal Rp. /Barang /Jasa</label>
              <input type="text" placeholder="Tulis nominal/barang/jasa" className="w-full border-2 border-slate-200 rounded-2xl py-3 text-center focus:outline-none" />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-10">
            <button type="button" onClick={() => navigate(-1)} className="hover:scale-110 transition">
              <ArrowLeft size={48} className="text-orange-300" />
            </button>
            <button className="bg-orange-400 text-white px-12 py-4 rounded-[2rem] font-black text-lg shadow-xl shadow-orange-200 hover:bg-orange-500 active:scale-95 transition-all">
              Unggah
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}