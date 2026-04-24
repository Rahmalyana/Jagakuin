import { useState } from "react";

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
    {
      id: 3,
      name: "Rizki",
      msg: "Alamatnya dimana ya?",
      avatar: "https://i.pravatar.cc/150?img=3",
      unread: 2,
    },
  ];

  const [chats, setChats] = useState(initialChats);
  const [activeChat, setActiveChat] = useState(null);

  const [messages, setMessages] = useState([
    { from: "other", text: "Halo kak, masih available?" },
    { from: "me", text: "Masih kak 😊" },
  ]);

  const handleSelectChat = (chat) => {
    setActiveChat(chat);

    setChats((prev) =>
      prev.map((c) =>
        c.id === chat.id ? { ...c, unread: 0 } : c
      )
    );
  };

  return (
    <div className="h-screen flex bg-background">

      {/* 🔹 LEFT */}
      <div className="w-[320px] border-r border-primary/10 overflow-y-auto">

        <div className="p-4 font-semibold text-primary text-lg">
          Chat
        </div>

        <div className="space-y-1">
          {chats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => handleSelectChat(chat)}
              className={`px-4 py-3 cursor-pointer transition-all rounded-lg mx-2
              ${
                activeChat?.id === chat.id
                  ? "bg-accent/20"
                  : "hover:bg-accent/10"
              }`}
            >
              <div className="flex items-center justify-between">

                {/* 🔥 LEFT CONTENT */}
                <div className="flex items-center gap-3">

                  {/* AVATAR */}
                  <div className="relative">
                    <img
                      src={chat.avatar}
                      alt={chat.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />

                    {/* ONLINE DOT */}
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                  </div>

                  {/* TEXT */}
                  <div className="flex flex-col">
                    <p
                      className={`text-sm font-semibold ${
                        chat.unread > 0
                          ? "text-primary"
                          : "text-primary/70"
                      }`}
                    >
                      {chat.name}
                    </p>

                    <p
                      className={`text-xs truncate max-w-[150px] ${
                        chat.unread > 0
                          ? "text-primary font-medium"
                          : "text-primary/50"
                      }`}
                    >
                      {chat.msg}
                    </p>
                  </div>
                </div>

                {/* BADGE */}
                {chat.unread > 0 && (
                  <div className="bg-accent text-white text-[10px] px-2 py-1 rounded-full">
                    {chat.unread}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 🔹 RIGHT */}
      <div className="flex-1 flex flex-col">

        {activeChat ? (
          <>
            {/* 🔥 HEADER PROFILE */}
            <div className="p-4 border-b border-primary/10 flex items-center gap-3">
              <img
                src={activeChat.avatar}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="font-semibold text-primary">
                  {activeChat.name}
                </p>
                <p className="text-xs text-primary/50">
                  Online
                </p>
              </div>
            </div>

            {/* 🔥 CHAT */}
            <div className="flex-1 p-4 space-y-3 overflow-y-auto">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex items-end gap-2 ${
                    m.from === "me"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  {/* AVATAR (OTHER ONLY) */}
                  {m.from !== "me" && (
                    <img
                      src={activeChat.avatar}
                      className="w-8 h-8 rounded-full"
                    />
                  )}

                  {/* MESSAGE */}
                  <div
                    className={`px-4 py-2 rounded-2xl text-sm max-w-[70%]
                    ${
                      m.from === "me"
                        ? "bg-accent text-white rounded-br-sm"
                        : "bg-white border border-primary/10 text-primary rounded-bl-sm"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
            </div>

            {/* INPUT */}
            <div className="p-4 border-t border-primary/10">
              <input
                type="text"
                placeholder="Tulis pesan..."
                className="w-full border border-primary/20 rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-accent/40"
              />
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-center text-primary/50">
            <div>
              <p className="text-lg font-medium">Pesan Anda</p>
              <p className="text-sm mt-1">
                Pilih percakapan untuk mulai chat
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}