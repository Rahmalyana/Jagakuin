import { useState } from "react";
import { ArrowLeft, Send } from "lucide-react";
import { Link, useParams } from "react-router-dom";

export default function ChatDetail() {
  const { id } = useParams();

  const chats = [
    {
      id: 1,
      name: "Susi",
      avatar: "https://i.pravatar.cc/150?img=1",
      messages: [
        { from: "other", text: "Bisa, dimana alamat pastinya?" },
        { from: "me", text: "Di Sukarame kak" },
        { from: "other", text: "Oh dekat Unila ya?" },
        { from: "me", text: "Iya kak, dekat situ 😊" },
      ],
    },
    {
      id: 2,
      name: "Naufal",
      avatar: "https://i.pravatar.cc/150?img=2",
      messages: [
        { from: "other", text: "Gimana kelanjutannya?" },
        { from: "me", text: "Masih diproses ya" },
        { from: "other", text: "Kira-kira kapan selesai?" },
        { from: "me", text: "Hari ini insyaAllah selesai" },
      ],
    },
    {
      id: 3,
      name: "Rizki",
      avatar: "https://i.pravatar.cc/150?img=3",
      messages: [
        { from: "other", text: "Boleh tau alamat pastinya?" },
        { from: "other", text: "Saya mau survey dulu" },
        { from: "me", text: "Boleh kak, nanti saya kirim shareloc ya" },
      ],
    },
    {
      id: 4,
      name: "Tuti",
      avatar: "https://i.pravatar.cc/150?img=4",
      messages: [
        { from: "other", text: "Masih available?" },
      ],
    },
  ];

  const chat = chats.find((c) => c.id === Number(id));

  const [messages, setMessages] = useState(chat?.messages || []);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages([...messages, { from: "me", text: input }]);
    setInput("");
  };

  if (!chat) return <div className="p-4">Chat tidak ditemukan</div>;

  return (
    <div className="bg-background h-screen flex flex-col">

      {/* HEADER */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-primary/10">

        <Link to="/chat">
          <ArrowLeft className="text-primary" />
        </Link>

        <div className="relative">
          <img
            src={chat.avatar}
            className="w-10 h-10 rounded-full"
          />
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
        </div>

        <div>
          <p className="text-sm font-semibold text-primary">
            {chat.name}
          </p>
          <p className="text-xs text-primary/50">Online</p>
        </div>
      </div>

      {/* CHAT */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex items-end gap-2 ${
              msg.from === "me"
                ? "justify-end"
                : "justify-start"
            }`}
          >

            {/* AVATAR (lawan bicara) */}
            {msg.from !== "me" && (
              <img
                src={chat.avatar}
                className="w-7 h-7 rounded-full"
              />
            )}

            {/* BUBBLE */}
            <div
              className={`max-w-[70%] px-4 py-2 rounded-2xl text-sm
              ${
                msg.from === "me"
                  ? "bg-accent text-white rounded-br-sm"
                  : "bg-white border border-primary/10 text-primary rounded-bl-sm"
              }`}
            >
              {msg.text}
            </div>

          </div>
        ))}
      </div>

      {/* INPUT */}
      <div className="p-3 border-t border-primary/10">
        <div className="flex items-center gap-2">

          <input
            type="text"
            placeholder="Ketik pesan..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 px-4 py-2 rounded-xl border border-primary/20 outline-none focus:ring-2 focus:ring-accent/40"
          />

          <button
            onClick={handleSend}
            className="bg-accent text-white p-2 rounded-xl hover:scale-105 transition"
          >
            <Send size={18} />
          </button>

        </div>
      </div>

    </div>
  );
}