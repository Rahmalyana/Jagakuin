import { useState, useEffect } from "react";
import { Edit, Lock, Star, Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";

export default function Profile() {
  const API_URL = "http://localhost:8000/api";
  const token = localStorage.getItem("token");

  const getAvatar = (name) =>
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      name || "User"
    )}&background=1B4758&color=fff`;

  const [saving, setSaving] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);

  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const [username, setUsername] = useState("User");
  const [email, setEmail] = useState("-");
  const [bio, setBio] = useState("");
  const [tags, setTags] = useState([]);
  const [rating, setRating] = useState(null);
  const [profileImage, setProfileImage] = useState(getAvatar("User"));

  const [selectedImage, setSelectedImage] = useState(null);

  const [formUsername, setFormUsername] = useState("");
  const [formBio, setFormBio] = useState("");
  const [formTags, setFormTags] = useState([]);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const TAG_OPTIONS = [
    "Jaga Anak",
    "Jaga Lansia",
    "Jaga Properti",
  ];

  useEffect(() => {
    const cached = localStorage.getItem("profile");

    if (cached) {
      const data = JSON.parse(cached);
      setUsername(data.name || "User");
      setEmail(data.email || "-");
      setBio(data.bio || "");
      setTags(data.tags || []);
      setRating(data.rating ?? null);
      setProfileImage(data.profile_image_url || getAvatar(data.name));
    }

    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await fetch(`${API_URL}/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      setUsername(data.name);
      setEmail(data.email);
      setBio(data.bio || "");
      setTags(data.tags || []);
      setRating(data.rating ?? null);

      setProfileImage(data.profile_image_url || getAvatar(data.name));

      localStorage.setItem("profile", JSON.stringify(data));
    } catch (err) {
      console.error(err);
    }
  };

  const RenderStars = ({ value }) => (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={16}
          className={
            i < value
              ? "fill-[#F7A954] text-[#F7A954]"
              : "text-gray-300"
          }
        />
      ))}
    </div>
  );

  const openEditModal = () => {
    setFormUsername(username);
    setFormBio(bio);
    setFormTags(tags || []);
    setSelectedImage(null);
    setShowEditProfileModal(true);
  };

  const handleSaveProfile = async () => {
    const newTags = formTags;

    setSaving(true);

    try {
      await fetch(`${API_URL}/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: formUsername,
          bio: formBio,
          tags: newTags,
        }),
      });

      if (selectedImage) {
        const formData = new FormData();
        formData.append("photo", selectedImage);

        const res = await fetch(`${API_URL}/profile/photo`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });

        const img = await res.json();
        if (img.url) setProfileImage(img.url);
      }

      setUsername(formUsername);
      setBio(formBio);
      setTags(newTags);

      localStorage.setItem(
        "profile",
        JSON.stringify({
          name: formUsername,
          email,
          bio: formBio,
          tags: newTags,
          rating,
          profile_image_url: profileImage,
        })
      );

      setShowEditProfileModal(false);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      toast.error("Password tidak sama!");
      return;
    }

    setSavingPassword(true);

    try {
      const res = await fetch(`${API_URL}/profile/password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          old_password: oldPassword,
          new_password: newPassword,
          new_password_confirmation: confirmPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Gagal ubah password");
        return;
      }

      toast.success("Password berhasil diubah, silakan login ulang");

      localStorage.removeItem("token");
      localStorage.removeItem("profile");

      window.location.href = "/";
    } catch (err) {
      console.error(err);
      toast.error("Gagal ubah password");
    } finally {
      setSavingPassword(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-[#F8FAFC] to-[#EEF2F7] min-h-screen py-10">
      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
          <div className="h-32 bg-gradient-to-r from-[#1B4758] to-[#256D85]" />

          <div className="flex flex-col items-center -mt-16 px-6 pb-6">
            <img
              src={
                selectedImage
                  ? URL.createObjectURL(selectedImage)
                  : profileImage
              }
              className="w-28 h-28 rounded-full border-4 border-white shadow-md object-cover"
            />

            <h2 className="mt-4 text-2xl font-semibold text-[#1B4758]">
              {username}
            </h2>

            <p className="text-sm text-gray-400">{email}</p>

            <div className="flex items-center gap-2 mt-2">
              <RenderStars
                value={rating !== null ? Math.round(rating) : 0}
              />
              <span className="text-xs text-gray-400">
                {rating !== null
                  ? `(${rating.toFixed(1)})`
                  : "Belum ada rating"}
              </span>
            </div>

            <p className="mt-4 text-sm text-gray-600 text-center max-w-md">
              {bio || "Belum ada bio"}
            </p>

            <div className="flex justify-center gap-2 mt-4 flex-wrap">
              {tags.length > 0 ? (
                tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 text-xs rounded-full bg-[#1B4758]/10 text-[#1B4758] border border-[#1B4758]/20 hover:bg-[#1B4758] hover:text-white transition"
                  >
                    {tag}
                  </span>
                ))
              ) : (
                <p className="text-sm text-gray-400">
                  Belum ada layanan
                </p>
              )}
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={openEditModal}
                className="flex items-center gap-2 px-5 py-2 rounded-full border border-[#1B4758] text-[#1B4758] hover:bg-[#1B4758] hover:text-white transition"
              >
                <Edit size={16} /> Edit Profil
              </button>

              <button
                onClick={() => setShowPasswordModal(true)}
                className="flex items-center gap-2 px-5 py-2 rounded-full border border-[#1B4758] text-[#1B4758] hover:bg-[#1B4758] hover:text-white transition"
              >
                <Lock size={16} /> Ubah Sandi
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* EDIT MODAL */}
      {showEditProfileModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl w-full max-w-md shadow-xl border border-gray-100 relative overflow-hidden">

            {/* HEADER */}
            <div className="px-6 py-4 border-b flex items-center justify-between">
              <h2 className="text-lg font-semibold text-[#1B4758]">
                Edit Profil
              </h2>
              <button
                onClick={() => setShowEditProfileModal(false)}
                className="text-gray-400 hover:text-[#1B4758] transition"
              >
                ✕
              </button>
            </div>

            {/* BODY */}
            <div className="p-6 space-y-4">
              <div>
                <p className="text-sm text-gray-500 mb-2">
                  Foto Profil
                </p>

                <label className="flex items-center justify-between border border-gray-200 rounded-xl px-4 py-2 cursor-pointer hover:border-[#1B4758] transition">
                  <span className="text-sm text-gray-600">
                    {selectedImage ? selectedImage.name : "Pilih gambar..."}
                  </span>

                  <span className="text-xs bg-[#1B4758] text-white px-3 py-1 rounded-lg">
                    Browse
                  </span>

                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setSelectedImage(e.target.files[0])}
                    className="hidden"
                  />
                </label>
              </div>

              <div className="space-y-4">

              <div>
                <label className="block text-sm text-gray-500 mb-1">
                  Username
                </label>
                <input
                  value={formUsername}
                  onChange={(e) => setFormUsername(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSaveProfile()}
                  className="w-full border border-gray-200 focus:border-[#1B4758] focus:ring-2 focus:ring-[#1B4758]/20 px-3 py-2 rounded-xl outline-none transition"
                  placeholder="Masukkan username"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-500 mb-1">
                  Bio
                </label>
                <textarea
                  value={formBio}
                  onChange={(e) => setFormBio(e.target.value)}
                  rows={3}
                  className="w-full border border-gray-200 focus:border-[#1B4758] focus:ring-2 focus:ring-[#1B4758]/20 px-3 py-2 rounded-xl outline-none transition resize-none"
                  placeholder="Ceritakan sedikit tentang dirimu..."
                />
              </div>
            </div>

              <div>
                <p className="text-sm text-gray-500 mb-2">Pilih Layanan</p>

                <div className="flex flex-wrap gap-2">
                  {TAG_OPTIONS.map((tag) => {
                    const selected = formTags.includes(tag);

                    return (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => {
                          if (selected) {
                            setFormTags(formTags.filter((t) => t !== tag));
                          } else {
                            setFormTags([...formTags, tag]);
                          }
                        }}
                        className={`px-3 py-1 text-xs rounded-full border transition
                          ${
                            selected
                              ? "bg-[#1B4758] text-white border-[#1B4758]"
                              : "bg-gray-100 text-gray-600 border-gray-200 hover:bg-gray-200"
                          }`}
                      >
                        {tag}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* FOOTER */}
            <div className="flex justify-end gap-2 px-6 py-4 border-t bg-gray-50">
              <button
                onClick={() => setShowEditProfileModal(false)}
                className="px-4 py-2 rounded-xl text-gray-500 hover:bg-gray-200 transition"
              >
                Batal
              </button>

              <button
                onClick={handleSaveProfile}
                disabled={saving}
                className="px-5 py-2 rounded-xl bg-[#1B4758] text-white hover:bg-[#163845] transition shadow"
              >
                {saving ? "Menyimpan..." : "Simpan"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PASSWORD MODAL */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl w-full max-w-md shadow-xl border border-gray-100 relative overflow-hidden">

            {/* HEADER */}
            <div className="px-6 py-4 border-b flex items-center justify-between">
              <h2 className="text-lg font-semibold text-[#1B4758]">
                Ubah Sandi
              </h2>
              <button
                onClick={() => setShowPasswordModal(false)}
                className="text-gray-400 hover:text-[#1B4758] transition"
              >
                ✕
              </button>
            </div>

            {/* BODY */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleChangePassword();
              }}
              className="p-6 space-y-4"
            >
              {/* PASSWORD LAMA */}
              <div>
                <label className="block text-sm text-gray-500 mb-1">
                  Password Lama
                </label>
                <div className="relative">
                  <input
                    type={showOldPassword ? "text" : "password"}
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    className="w-full border border-gray-200 focus:border-[#1B4758] focus:ring-2 focus:ring-[#1B4758]/20 px-3 py-2 rounded-xl pr-10 outline-none transition"
                    placeholder="Masukkan password lama"
                  />
                  <button
                    type="button"
                    onClick={() => setShowOldPassword(!showOldPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#1B4758]"
                  >
                    {showOldPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* PASSWORD BARU */}
               <div>
                  <label className="block text-sm text-gray-500 mb-1">
                    Password Baru
                  </label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full border border-gray-200 focus:border-[#1B4758] focus:ring-2 focus:ring-[#1B4758]/20 px-3 py-2 rounded-xl pr-10 outline-none transition"
                      placeholder="Masukkan password baru"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#1B4758]"
                    >
                      {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

              {/* KONFIRMASI PASSWORD */}
              <div>
                <label className="block text-sm text-gray-500 mb-1">
                  Konfirmasi Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full border border-gray-200 focus:border-[#1B4758] focus:ring-2 focus:ring-[#1B4758]/20 px-3 py-2 rounded-xl pr-10 outline-none transition"
                    placeholder="Ulangi password baru"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#1B4758]"
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* ACTION */}
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowPasswordModal(false)}
                  className="px-4 py-2 rounded-xl text-gray-500 hover:bg-gray-200 transition"
                >
                  Batal
                </button>

                <button
                  type="submit"
                  disabled={savingPassword}
                  className="px-5 py-2 rounded-xl bg-[#1B4758] text-white hover:bg-[#163845] transition shadow"
                >
                  {savingPassword ? "Menyimpan..." : "Simpan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
