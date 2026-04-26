import { useState, useRef, useEffect } from "react";
import { ArrowLeft, Send } from "lucide-react";

export default function ChatPage() {
  const initialChats = [
    {
      id: 1,
      name: "Susi",
      msg: "Halo kak, masih available?",
      avatar: "https://i.pravatar.cc/150?img=1",
      unread: 1,
    },
    {
      id: 2,
      name: "Naufal",
      msg: "Gimana kelanjutannya?",
      avatar: "https://i.pravatar.cc/150?img=2",
      unread: 0,
    },
  ];

  const [chats, setChats] = useState(initialChats);
  const [activeChat, setActiveChat] = useState(null);
  const [isMobileChatOpen, setIsMobileChatOpen] = useState(false);

  const [service] = useState({
    title: "Jaga Anak",
    price: "50k / hari",
    date: "25 April 2026",
  });

  const [messages, setMessages] = useState([
    {
      from: "other",
      text: "Halo kak, masih available?",
      service: {
        title: "Jaga Anak",
        price: "50k / hari",
      },
      dealStatus: "pending",
    },
    {
      from: "me",
      text: "Masih kak 😊",
    },
  ]);

  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);

  const handleSelectChat = (chat) => {
    setActiveChat(chat);
    setChats((prev) =>
      prev.map((c) =>
        c.id === chat.id ? { ...c, unread: 0 } : c
      )
    );
    setIsMobileChatOpen(true);
  };

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
        from: "me",
        text: input,
        service: service,
        dealStatus: "pending",
      },
    ]);

    setInput("");
  };

  const handleAccept = (index) => {
    setMessages((prev) =>
      prev.map((msg, i) =>
        i === index ? { ...msg, dealStatus: "accepted" } : msg
      )
    );
  };

  const handleDone = (index) => {
    setMessages((prev) =>
      prev.map((msg, i) =>
        i === index ? { ...msg, dealStatus: "done" } : msg
      )
    );
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="h-[100dvh] flex bg-background p-2 md:p-4 gap-2 md:gap-4">

      {/* LEFT */}
      <div
        className={`w-full md:w-[320px] ${
          isMobileChatOpen ? "hidden md:block" : "block"
        } bg-white border border-primary/10 rounded-2xl overflow-hidden shadow-sm`}
      >
        <div className="p-4 font-semibold text-primary border-b">
          Chat
        </div>

        <div className="p-2 space-y-2">
          {chats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => handleSelectChat(chat)}
              className="px-4 py-3 rounded-xl cursor-pointer hover:bg-accent/10 flex justify-between"
            >
              <div className="flex items-center gap-3">
                <img
                  src={chat.avatar}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="text-sm font-semibold text-primary">
                    {chat.name}
                  </p>
                  <p className="text-xs text-primary/60">
                    {chat.msg}
                  </p>
                </div>
              </div>

              {chat.unread > 0 && (
                <div className="bg-accent text-white text-xs px-2 py-1 rounded-full">
                  {chat.unread}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT */}
      <div
        className={`flex-1 flex flex-col ${
          !isMobileChatOpen ? "hidden md:flex" : "flex"
        } bg-white border border-primary/10 rounded-2xl`}
      >
        {activeChat ? (
          <>
            {/* HEADER */}
            <div className="p-4 border-b flex items-center gap-3">
              <button
                className="md:hidden"
                onClick={() => setIsMobileChatOpen(false)}
              >
                <ArrowLeft />
              </button>

              <img
                src={activeChat.avatar}
                className="w-10 h-10 rounded-full"
              />

              <div>
                <p className="font-semibold text-primary">
                  {activeChat.name}
                </p>
                <p className="text-xs text-primary/50">Online</p>
              </div>
            </div>

            {/* SERVICE PREVIEW */}
            <div className="p-3 border-b bg-accent/10">
              <div className="bg-white p-3 rounded-xl flex justify-between items-center shadow-sm">
                <div>
                  <p className="text-sm font-semibold text-primary">
                    {service.title}
                  </p>
                  <p className="text-xs text-primary/60">
                    {service.price} • {service.date}
                  </p>
                </div>

                <button className="text-xs bg-primary text-white px-3 py-1 rounded-lg">
                  Detail
                </button>
              </div>
            </div>

            {/* CHAT */}
            <div className="flex-1 p-4 pb-28 space-y-4 overflow-y-auto">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${
                    m.from === "me"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div className="max-w-[75%]">

                    {/* 🔥 MODERN SERVICE CARD */}
                    {m.service && (
                      <div className="bg-gradient-to-br from-white to-accent/10 border border-accent/20 rounded-2xl p-3 mb-2 shadow-sm">

                        <div className="flex justify-between items-center">
                          <p className="text-sm font-semibold text-primary">
                            {m.service.title}
                          </p>

                          <span className="text-[10px] bg-accent/20 text-accent px-2 py-1 rounded-full">
                            Jasa
                          </span>
                        </div>

                        <p className="text-sm font-bold text-primary mt-1">
                          {m.service.price}
                        </p>

                        {m.dealStatus === "pending" && (
                          <button
                            onClick={() => handleAccept(i)}
                            className="mt-3 w-full bg-primary text-white text-xs py-2.5 rounded-xl hover:scale-[1.02] active:scale-[0.98] transition"
                          >
                            Deal Sekarang
                          </button>
                        )}

                        {m.dealStatus === "accepted" && (
                          <div className="mt-3 space-y-2">
                            <div className="text-center text-xs font-semibold text-primary bg-primary/10 py-1 rounded-lg">
                              ✔ Sudah Deal
                            </div>

                            <button
                              onClick={() => handleDone(i)}
                              className="w-full bg-accent text-white text-xs py-2.5 rounded-xl"
                            >
                              Tandai Selesai
                            </button>
                          </div>
                        )}

                        {m.dealStatus === "done" && (
                          <div className="mt-3 text-center text-xs font-semibold text-green-600 bg-green-100 py-2 rounded-xl">
                            ✔ Pekerjaan Selesai
                          </div>
                        )}
                      </div>
                    )}

                    {/* MESSAGE */}
                    <div
                      className={`px-4 py-2 text-sm rounded-2xl shadow
                      ${
                        m.from === "me"
                          ? "bg-primary text-white"
                          : "bg-white border"
                      }`}
                    >
                      {m.text}
                    </div>
                  </div>
                </div>
              ))}

              <div ref={chatEndRef} />
            </div>

            {/* INPUT FIXED */}
            <div className="fixed bottom-0 left-0 right-0 md:static z-50 bg-white border-t p-3 pb-[env(safe-area-inset-bottom)]">
              <div className="flex gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" && handleSend()
                  }
                  placeholder="Tulis pesan..."
                  className="flex-1 border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-accent/30"
                />

                <button
                  onClick={handleSend}
                  className="bg-accent text-white p-3 rounded-xl hover:scale-105 active:scale-95 transition"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 hidden md:flex items-center justify-center text-primary/50">
            Pilih chat
          </div>
        )}
      </div>
    </div>
  );
}