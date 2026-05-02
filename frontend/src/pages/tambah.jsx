import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function Tambah() {
  const location = useLocation();
  const navigate = useNavigate();

  const type = location.state?.type || "butuh";
  const title = type === "butuh" ? "Membutuhkan Jasa" : "Menyediakan Jasa";

  // ================= STATE =================
  const [form, setForm] = useState({
    name: "",
    type: type === "butuh" ? "membutuhkan" : "menyediakan",
    category: "jaga_anak",
    payment: "",
    duration: "",
    price: "",
    description: "",
    gender: "",
    child_age: "",
    elder_age: "",
    date: "",
    startTime: "",
    endTime: "",
  });

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  // ================= AUTO KALKULASI DURASI =================
  useEffect(() => {
    if (form.startTime && form.endTime) {
      const [startH, startM] = form.startTime.split(":").map(Number);
      const [endH, endM] = form.endTime.split(":").map(Number);

      let startTotalMins = startH * 60 + startM;
      let endTotalMins = endH * 60 + endM;

      // Logika jika waktu selesai melewati tengah malam (misal mulai 22:00, selesai 02:00)
      if (endTotalMins < startTotalMins) {
        endTotalMins += 24 * 60;
      }

      const diffMins = endTotalMins - startTotalMins;
      const hours = Math.floor(diffMins / 60);
      const mins = diffMins % 60;

      let durationStr = "";
      if (hours > 0) durationStr += `${hours} Jam `;
      if (mins > 0) durationStr += `${mins} Menit`;

      handleChange("duration", durationStr.trim() || "0 Menit");
    } else {
      handleChange("duration", "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.startTime, form.endTime]);

  // ================= DYNAMIC LABEL =================
  const getAgeLabel = () => {
    if (form.category === "jaga_anak") return "Umur Anak";
    if (form.category === "jaga_lansia") return "Umur Lansia";
    return "Keterangan";
  };

  const getAgePlaceholder = () => {
    if (form.category === "jaga_anak") return "Masukkan umur anak";
    if (form.category === "jaga_lansia") return "Masukkan umur lansia";
    return "Contoh: rumah 2 lantai / toko";
  };

  // ================= SUBMIT =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      // Gabungkan startTime dan endTime menjadi satu string "time" jika API membutuhkannya
      const payload = {
        ...form,
        time: `${form.startTime} - ${form.endTime}`,
        duration: form.duration || "Flexible",
      };

      const res = await fetch("http://127.0.0.1:8000/api/services", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        console.log(data);
        alert("Gagal submit");
        return;
      }

      alert("Berhasil tambah!");
      navigate("/services");
    } catch (err) {
      console.error(err);
      alert("Error koneksi");
    }
  };

  return (
    <div className="min-h-screen bg-background flex justify-center pb-20">
      <div className="w-full max-w-xl p-6">
        {/* TITLE */}
        <h1 className="text-xl font-bold text-center mb-6">{title}</h1>

        {/* CATEGORY */}
        <div className="flex gap-2 mb-6 justify-center">
          {[
            { label: "Jaga Anak", value: "jaga_anak" },
            { label: "Jaga Lansia", value: "jaga_lansia" },
            { label: "Jaga Properti", value: "jaga_properti" },
          ].map((cat) => (
            <button
              key={cat.value}
              onClick={() => handleChange("category", cat.value)}
              className={`px-4 py-2 rounded-full ${
                form.category === cat.value
                  ? "bg-orange-500 text-white"
                  : "bg-gray-200"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* NAME */}
          <input
            placeholder="Nama"
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
            className="w-full border p-3 rounded"
          />

          {/* AGE */}
          <div>
            <label className="block mb-1 font-medium">{getAgeLabel()}</label>
            <input
              placeholder={getAgePlaceholder()}
              value={
                form.category === "jaga_lansia"
                  ? form.elder_age
                  : form.child_age
              }
              onChange={(e) =>
                form.category === "jaga_lansia"
                  ? handleChange("elder_age", e.target.value)
                  : handleChange("child_age", e.target.value)
              }
              className="w-full border p-3 rounded"
            />
          </div>

          {/* GENDER */}
          {form.category !== "jaga_properti" && (
            <div>
              <label className="block mb-1 font-medium">Jenis Kelamin</label>
              <div className="flex gap-4">
                {["Laki-laki", "Perempuan"].map((g) => (
                  <button
                    type="button"
                    key={g}
                    onClick={() => handleChange("gender", g)}
                    className={`px-4 py-2 rounded ${
                      form.gender === g
                        ? "bg-orange-500 text-white"
                        : "bg-gray-200"
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* TASK */}
          <textarea
            placeholder="Rincian tugas (pisahkan koma)"
            value={form.description}
            onChange={(e) => handleChange("description", e.target.value)}
            className="w-full border p-3 rounded"
          />

          {/* DATE */}
          <div>
            <label className="block mb-1 font-medium">Tanggal Jaga</label>
            <input
              type="date"
              value={form.date}
              onChange={(e) => handleChange("date", e.target.value)}
              className="w-full border p-3 rounded"
            />
          </div>

          {/* TIME: AWAL & AKHIR */}
          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block mb-1 font-medium">Waktu Awal</label>
              <input
                type="time"
                value={form.startTime}
                onChange={(e) => handleChange("startTime", e.target.value)}
                className="w-full border p-3 rounded"
              />
            </div>
            <div className="w-1/2">
              <label className="block mb-1 font-medium">Waktu Akhir</label>
              <input
                type="time"
                value={form.endTime}
                onChange={(e) => handleChange("endTime", e.target.value)}
                className="w-full border p-3 rounded"
              />
            </div>
          </div>

          {/* DURATION (READ ONLY) */}
          <div>
            <label className="block mb-1 font-medium">Durasi Jaga</label>
            <input
              placeholder="Akan terisi otomatis..."
              value={form.duration}
              readOnly
              className="w-full border p-3 rounded bg-gray-100 cursor-not-allowed outline-none"
            />
          </div>

          {/* PAYMENT */}
          <div>
            <label className="block mb-1 font-medium">Metode Pembayaran</label>
            <div className="flex gap-4">
              {["Uang", "Jasa"].map((p) => (
                <button
                  type="button"
                  key={p}
                  onClick={() => handleChange("payment", p)}
                  className={`px-4 py-2 rounded ${
                    form.payment === p
                      ? "bg-orange-500 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* PRICE */}
          <input
            placeholder={
              form.payment === "Uang"
                ? "Masukkan nominal (contoh: 30000)"
                : "Masukkan jasa/barter (contoh: makanan)"
            }
            value={form.price}
            onChange={(e) => handleChange("price", e.target.value)}
            className="w-full border p-3 rounded"
          />

          {/* BUTTON */}
          <div className="flex justify-between pt-4">
            <button type="button" onClick={() => navigate(-1)}>
              <ArrowLeft />
            </button>

            <button
              type="submit"
              className="bg-orange-500 text-white px-6 py-2 rounded"
            >
              Unggah
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
