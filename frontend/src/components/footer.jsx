import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-slate-100 pt-12 pb-8 px-4 mt-auto">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        
        <div className="space-y-4">
          <h2 className="text-2xl font-black text-primary tracking-tight">
            Jaga<span className="text-accent">kuin</span>
          </h2>
          <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
            Solusi terpercaya untuk saling berbagi jasa di sekitarmu.
          </p>
        </div>

        <div>
          <h3 className="font-bold text-primary mb-4">Layanan</h3>
          <ul className="space-y-2 text-sm text-slate-600">
            <li>Butuh Jasa</li>
            <li>Sedia Jasa</li>
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className="font-bold text-primary mb-2">Hubungi Kami</h3>
          <p className="text-sm text-slate-600">Semarang, Indonesia</p>
          <p className="text-sm text-slate-600">halo@jagakuin.com</p>
        </div>

      </div>

      <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-slate-50 text-center">
        <p className="text-xs text-slate-400">
          © {new Date().getFullYear()} Jagakuin. Teamkarinaburketsu
        </p>
      </div>
    </footer>
  );
};

export default Footer;