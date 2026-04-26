import { useState } from "react";
import { Edit, Lock, Star } from "lucide-react";

export default function Profile() {
  // ================= STATE =================
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);

  const [profileImage, setProfileImage] = useState(
    "https://i.pravatar.cc/150?img=2"
  );

  const [bio, setBio] = useState(
    "Saya suka anak kecil dan memiliki pengalaman mengurus orang tua. Teliti, rajin, dan bertanggung jawab."
  );

  const [tags, setTags] = useState(["Jaga Anak", "Jaga Properti"]);

  const rating = 5;

  // ================= COMPONENT RATING =================
  const RenderStars = ({ value }) => (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={14}
          className={
            i < value
              ? "fill-[#F7A954] text-[#F7A954]"
              : "text-gray-300"
          }
        />
      ))}
    </div>
  );

  return (
    <div className="bg-[#FCFCF7] min-h-screen">
      <div className="max-w-3xl mx-auto px-4">

        {/* HEADER */}
        <div className="relative mt-6">
          <div className="bg-[#1B4758] h-28 md:h-32 rounded-2xl" />

          <img
            src={profileImage}
            alt="profile"
            onClick={() => setShowPhotoModal(true)}
            onError={(e) => {
              e.currentTarget.src = "https://i.pravatar.cc/150?img=1";
            }}
            className="w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-white absolute left-1/2 -bottom-10 -translate-x-1/2 object-cover cursor-pointer hover:scale-105 transition shadow-md"
          />
        </div>

        {/* PROFILE INFO */}
        <div className="text-center mt-14">
          <h2 className="text-lg md:text-xl font-semibold text-[#1B4758]">
            Karina
          </h2>

          {/* RATING */}
          <div className="flex justify-center mt-1">
            <RenderStars value={rating} />
            <span className="text-xs text-gray-400 ml-1">(5.0)</span>
          </div>

          <p className="text-sm text-gray-500">
            Caregiver • Child & Property Care
          </p>

          {/* BUTTON */}
          <div className="flex flex-wrap justify-center gap-2 mt-3">
            <button
              onClick={() => setShowEditProfileModal(true)}
              className="flex items-center gap-2 px-4 py-2 border border-[#1B4758] text-[#1B4758] rounded-full text-sm hover:bg-[#1B4758] hover:text-white transition"
            >
              <Edit size={16} />
              Edit Profil
            </button>

            <button
              onClick={() => setShowPasswordModal(true)}
              className="flex items-center gap-2 px-4 py-2 border border-[#1B4758] text-[#1B4758] rounded-full text-sm hover:bg-[#1B4758] hover:text-white transition"
            >
              <Lock size={16} />
              Ubah Sandi
            </button>
          </div>

          {/* BIO */}
          <div className="relative max-w-md mx-auto mt-4">
            <p className="text-sm text-gray-600 leading-relaxed">
              {bio}
            </p>
          </div>

          {/* TAG */}
          <div className="flex justify-center gap-2 mt-3 flex-wrap">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-[#F7A954]/20 text-[#1B4758] text-xs rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* REVIEW */}
        <div className="mt-8">
          <h3 className="text-[#1B4758] font-semibold mb-3">Ulasan</h3>

          <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
            <div className="flex gap-3">
              <img
                src="https://i.pravatar.cc/100?img=5"
                className="w-10 h-10 rounded-full object-cover"
              />

              <div>
                <h4 className="text-sm font-medium">
                  Arsal Rossie
                </h4>

                <div className="mt-1">
                  <RenderStars value={5} />
                </div>

                <p className="text-xs text-gray-500 mt-1">
                  Sangat puas! Kakaknya sabar dan anak jadi nyaman.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="h-24" />
      </div>

      {/* ================= MODAL PASSWORD ================= */}
      {showPasswordModal && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          onClick={(e) => {
            if (e.target === e.currentTarget)
              setShowPasswordModal(false);
          }}
        >
          <div className="bg-white rounded-2xl p-6 w-[90%] max-w-md relative">

            <button
              onClick={() => setShowPasswordModal(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-black"
            >
              ✕
            </button>

            <h2 className="text-lg font-semibold text-[#1B4758] mb-4">
              Ubah Sandi
            </h2>

            <div className="space-y-3">
              <input type="password" placeholder="Sandi Lama" className="w-full border rounded-lg px-3 py-2 text-sm"/>
              <input type="password" placeholder="Sandi Baru" className="w-full border rounded-lg px-3 py-2 text-sm"/>
              <input type="password" placeholder="Konfirmasi Sandi" className="w-full border rounded-lg px-3 py-2 text-sm"/>
            </div>

            <div className="flex justify-end gap-2 mt-5">
              <button
                onClick={() => setShowPasswordModal(false)}
                className="px-4 py-2 text-sm text-gray-500"
              >
                Batal
              </button>

              <button className="px-4 py-2 bg-[#1B4758] text-white rounded-lg text-sm">
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL FOTO ================= */}
      {showPhotoModal && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          onClick={(e) => {
            if (e.target === e.currentTarget)
              setShowPhotoModal(false);
          }}
        >
          <div className="bg-white rounded-2xl p-6 w-[90%] max-w-sm text-center relative">

            <button
              onClick={() => setShowPhotoModal(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-black"
            >
              ✕
            </button>

            <h2 className="text-lg font-semibold text-[#1B4758] mb-4">
              Ubah Foto Profil
            </h2>

            <img src={profileImage} className="w-24 h-24 rounded-full mx-auto mb-4"/>

            <input
              type="file"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) setProfileImage(URL.createObjectURL(file));
              }}
            />

            <div className="flex justify-center gap-2 mt-5">
              <button
                onClick={() => setShowPhotoModal(false)}
                className="px-4 py-2 text-sm text-gray-500"
              >
                Batal
              </button>

              <button
                onClick={() => setShowPhotoModal(false)}
                className="px-4 py-2 bg-[#1B4758] text-white rounded-lg text-sm"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL EDIT ================= */}
      {showEditProfileModal && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          onClick={(e) => {
            if (e.target === e.currentTarget)
              setShowEditProfileModal(false);
          }}
        >
          <div className="bg-white rounded-2xl p-6 w-[90%] max-w-md relative">

            <button
              onClick={() => setShowEditProfileModal(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-black"
            >
              ✕
            </button>

            <h2 className="text-lg font-semibold text-[#1B4758] mb-4">
              Edit Profil
            </h2>

            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full border rounded-lg p-2 text-sm mb-3"
            />

            <input
              value={tags.join(", ")}
              onChange={(e) =>
                setTags(
                  e.target.value
                    .split(",")
                    .map((t) => t.trim())
                    .filter((t) => t !== "")
                )
              }
              className="w-full border rounded-lg p-2 text-sm"
            />

            <div className="flex justify-end gap-2 mt-5">
              <button
                onClick={() => setShowEditProfileModal(false)}
                className="px-4 py-2 text-sm text-gray-500"
              >
                Batal
              </button>

              <button
                onClick={() => setShowEditProfileModal(false)}
                className="px-4 py-2 bg-[#1B4758] text-white rounded-lg text-sm"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}