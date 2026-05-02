import { useState, useEffect } from "react";
import { Edit, Lock, Star, Eye, EyeOff } from "lucide-react";

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
  const [formTags, setFormTags] = useState("");

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    const cached = localStorage.getItem("profile");

    if (cached) {
      const data = JSON.parse(cached);
      setUsername(data.name || "User");
      setEmail(data.email || "-");
      setBio(data.bio || "");
      setTags(data.tags || []);
      setRating(data.rating ?? null);
      setProfileImage(
        data.profile_image_url || getAvatar(data.name)
      );
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

      setProfileImage(
        data.profile_image_url || getAvatar(data.name)
      );

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

  const openEditModal = () => {
    setFormUsername(username);
    setFormBio(bio);
    setFormTags(tags.join(", "));
    setSelectedImage(null);
    setShowEditProfileModal(true);
  };

  const handleSaveProfile = async () => {
    const newTags = formTags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

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
      alert("Password tidak sama!");
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
        alert(data.message || "Gagal ubah password");
        return;
      }

      alert("Password berhasil diubah, silakan login ulang");

      localStorage.removeItem("token");
      localStorage.removeItem("profile");

      window.location.href = "/";
    } catch (err) {
      console.error(err);
      alert("Gagal ubah password");
    } finally {
      setSavingPassword(false);
    }
  };

  return (
    <div className="bg-[#FCFCF7] min-h-screen">
      <div className="max-w-3xl mx-auto px-4">

        <div className="relative mt-6">
          <div className="bg-[#1B4758] h-28 rounded-2xl" />

          <img
            src={
              selectedImage
                ? URL.createObjectURL(selectedImage)
                : profileImage
            }
            className="w-24 h-24 rounded-full border-4 border-white absolute left-1/2 -bottom-10 -translate-x-1/2 object-cover"
          />
        </div>

        <div className="text-center mt-14">
          <h2 className="text-xl font-semibold text-[#1B4758]">
            {username}
          </h2>

          <p className="text-sm text-gray-400">{email}</p>

          <div className="flex justify-center mt-1 items-center gap-1">
            <RenderStars value={rating !== null ? Math.round(rating) : 0} />
            <span className="text-xs text-gray-400">
              {rating !== null
                ? `(${rating.toFixed(1)})`
                : "Belum ada rating"}
            </span>
          </div>

          <p className="mt-3 text-sm text-gray-600 max-w-md mx-auto">
            {bio || "Belum ada bio"}
          </p>

          <div className="flex justify-center gap-2 mt-3 flex-wrap">
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
              <p className="text-sm text-gray-400">Belum ada layanan</p>
            )}
          </div>

          <div className="flex justify-center gap-2 mt-3">
            <button
              onClick={openEditModal}
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
        </div>
      </div>

      {/* EDIT MODAL */}
      {showEditProfileModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-[90%] max-w-md relative">

            <button onClick={() => setShowEditProfileModal(false)} className="absolute top-3 right-3 text-gray-400">✕</button>

            <h2 className="text-lg font-semibold mb-4">Edit Profil</h2>

            <input type="file" onChange={(e) => setSelectedImage(e.target.files[0])} className="mb-3" />

            <input
              value={formUsername}
              onChange={(e) => setFormUsername(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSaveProfile()}
              className="w-full border px-3 py-2 mb-3 rounded"
              placeholder="Username"
            />

            <textarea
              value={formBio}
              onChange={(e) => setFormBio(e.target.value)}
              className="w-full border px-3 py-2 mb-3 rounded"
              placeholder="Bio"
            />

            <input
              value={formTags}
              onChange={(e) => setFormTags(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSaveProfile()}
              className="w-full border px-3 py-2 rounded"
              placeholder="Tag1, Tag2"
            />

            <div className="flex justify-end gap-2 mt-4">
              <button onClick={() => setShowEditProfileModal(false)}>Batal</button>

              <button
                onClick={handleSaveProfile}
                disabled={saving}
                className="bg-[#1B4758] text-white px-4 py-2 rounded"
              >
                {saving ? "Menyimpan..." : "Simpan"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PASSWORD MODAL */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-[90%] max-w-md relative">

            <button
              onClick={() => setShowPasswordModal(false)}
              className="absolute top-3 right-3 text-gray-400"
            >
              ✕
            </button>

            <h2 className="text-lg font-semibold mb-4">Ubah Sandi</h2>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleChangePassword();
              }}
            >
              {/* PASSWORD LAMA */}
              <div className="relative mb-3">
                <input
                  type={showOldPassword ? "text" : "password"}
                  placeholder="Password Lama"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="w-full border px-3 py-2 rounded pr-10"
                />

                <button
                  type="button"
                  onClick={() => setShowOldPassword(!showOldPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#1B4758]"
                >
                  {showOldPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {/* PASSWORD BARU */}
              <div className="relative mb-3">
                <input
                  type={showNewPassword ? "text" : "password"}
                  placeholder="Password Baru"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full border px-3 py-2 rounded pr-10"
                />

                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#1B4758]"
                >
                  {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {/* KONFIRMASI PASSWORD */}
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Konfirmasi Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full border px-3 py-2 rounded pr-10"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#1B4758]"
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {/* ACTION BUTTON */}
              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => setShowPasswordModal(false)}
                >
                  Batal
                </button>

                <button
                  type="submit"
                  disabled={savingPassword}
                  className="bg-[#1B4758] text-white px-4 py-2 rounded"
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