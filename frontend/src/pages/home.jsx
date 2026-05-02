import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="font-sans">
      {/* HERO */}
      <section className="flex flex-col md:flex-row items-center justify-between px-6 md:px-16 py-12">
        {/* TEXT */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-lg"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-primary leading-tight">
            Solusi Jaga Terpercaya,
            <span className="text-accent"> Tak Harus Selalu dengan Rupiah</span>
          </h2>

          <p className="mt-4 text-primary/70">
            Temukan bantuan untuk menjaga anak, lansia, hingga properti dalam
            hitungan jam hingga 3 hari dengan sistem barter jasa yang inklusif.
          </p>

          <div className="mt-6 flex gap-4">
            <Link
              to="/services"
              className="bg-accent text-white px-6 py-3 rounded-lg hover:bg-accent/70 transition-all duration-300 hover:scale-105"
            >
              Cari Layanan Sekarang
            </Link>
            <Link
              to="/tambah"
              className="border border-accent text-primary px-6 py-3 rounded-lg hover:bg-accent transition-all duration-300 hover:scale-105"
            >
              Tawarkan Jasa Anda
            </Link>
          </div>
        </motion.div>

        {/* IMAGE */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-8 md:mt-0"
        >
          <img
            src="/src/assets/deal.svg"
            alt="illustration"
            className="w-full max-w-md animate-float"
          />
        </motion.div>
      </section>

      {/* CONTOH
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="px-6 md:px-16 py-12 text-center"
      >
        <h3 className="text-2xl font-bold mb-4 text-primary">Nanti dulu yh</h3>
        <p className="text-gray-600 max-w-2xl mx-auto">P</p>
      </motion.section> */}

      {/* LAYANAN */}
      <section className="px-6 md:px-16 py-12">
        <h3 className="text-2xl font-bold text-center mb-10 text-primary">
          Layanan Kami
        </h3>

        <div className="grid md:grid-cols-3 gap-6 mt-6">
          {[
            {
              title: "Jaga Anak",
              desc: "Solusi aman saat Anda ada keperluan mendadak.",
              img: "/src/assets/anak.svg",
            },
            {
              title: "Jaga Lansia",
              desc: "Menemani orang tua dengan penuh kasih di sela kesibukan Anda.",
              img: "/src/assets/lansia.svg",
            },
            {
              title: "Jaga Properti",
              desc: "Menjaga rumah, toko, atau kos agar tetap aman saat ditinggal sebentar.",
              img: "/src/assets/properti.svg",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="p-6 rounded-xl shadow bg-white hover:shadow-lg transition text-center"
            >
              {/* IMAGE */}
              <img
                src={item.img}
                alt={item.title}
                className="w-32 h-32 mx-auto mb-4 object-contain"
              />

              {/* TITLE */}
              <h4 className="font-semibold text-lg mb-2 text-primary">
                {item.title}
              </h4>

              {/* DESC */}
              <p className="text-gray-600">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* MENGAPA */}
      <section className="px-6 md:px-16 py-12">
        <h3 className="text-2xl font-bold text-center mb-10 text-primary">
          Mengapa JAGAKUIN?
        </h3>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: "Kompensasi Tanpa Batas",
              desc: "Bayar dengan uang? Bisa! Namun, kami memfasilitasi barter jasa atau barang sesuai kesepakatan Anda. Keterbatasan finansial bukan lagi penghalang untuk mendapatkan bantuan berkualitas.",
            },
            {
              title: "Fokus Layanan Jangka Pendek",
              desc: "Butuh penjaga hanya untuk beberapa jam atau maksimal 3 hari? JAGAKUIN dirancang untuk mobilitas tinggi masyarakat modern yang butuh solusi cepat tanpa kontrak rumit.",
            },
            {
              title: "Komunitas yang Saling Menjaga",
              desc: "JAGAKUIN bukan sekadar platform transaksi, melainkan ekosistem solidaritas. Kami mempertemukan orang yang butuh bantuan dengan mereka yang memiliki waktu luang untuk berkontribusi.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="p-6 rounded-xl shadow bg-white hover:shadow-lg transition"
            >
              <h4 className="font-semibold text-lg text-center mb-2 text-primary">
                {item.title}
              </h4>
              <p className="text-gray-600 text-center">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* TESTIMONI */}
      <section className="px-6 md:px-16 py-12 bg-background">
        <h3 className="text-2xl font-bold text-center mb-10 text-primary">
          Apa Kata Mereka?
        </h3>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              name: "Rina",
              text: "Sangat membantu saat saya harus pergi mendadak. Prosesnya cepat dan mudah!",
            },
            {
              name: "Andi",
              text: "Saya bisa membantu orang lain sekaligus mendapatkan bantuan juga. Konsepnya keren!",
            },
            {
              name: "Siti",
              text: "Aplikasi ini bikin saya lebih tenang saat meninggalkan rumah.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.03 }}
              className="p-6 rounded-xl shadow bg-white hover:shadow-lg transition"
            >
              <p className="text-gray-600 italic">"{item.text}"</p>
              <h4 className="mt-4 font-semibold text-primary text-right">
                — {item.name}
              </h4>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 md:px-16 py-16 text-center">
        <h3 className="text-3xl md:text-4xl font-bold text-primary">
          Siap Mulai Saling Membantu?
        </h3>

        <p className="mt-4 text-primary/70 max-w-xl mx-auto">
          Bergabunglah dengan komunitas JAGAKUIN dan rasakan kemudahan bertukar
          jasa secara fleksibel, cepat, dan terpercaya.
        </p>

        <div className="mt-8 flex justify-center gap-4 flex-wrap">
          <Link
            to="/register"
            className="bg-accent text-white px-8 py-3 rounded-lg hover:bg-accent/80 transition-all duration-300 hover:scale-105"
          >
            Daftar Sekarang
          </Link>

          <Link
            to="/services"
            className="border border-accent text-primary px-8 py-3 rounded-lg hover:bg-accent transition-all duration-300 hover:scale-105"
          >
            Lihat Layanan
          </Link>
        </div>
      </section>
    </div>
  );
}
