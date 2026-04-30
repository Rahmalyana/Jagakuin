import { useState, useRef, useEffect } from "react";
import { ArrowLeft, Send } from "lucide-react";
import { useLocation } from "react-router-dom";

import { db } from "../firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";

export default function ChatPage() {
  const location = useLocation();
  const serviceFromPage = location.state?.service;

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

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const chatEndRef = useRef(null);

  // REALTIME FIRESTORE
  useEffect(() => {
    const q = query(
      collection(db, "messages"),
      orderBy("createdAt", "asc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setMessages(msgs);
    });

    return () => unsubscribe();
  }, []);

  // AUTO SCROLL
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // INITIAL MESSAGE FROM SERVICE
  useEffect(() => {
    if (!serviceFromPage) return;

    const sendInitial = async () => {
      await addDoc(collection(db, "messages"), {
        text: "Halo kak, masih available?",
        from: "other",
        createdAt: serverTimestamp(),
        service: serviceFromPage,
        dealStatus: "pending",
      });
    };

    sendInitial();
  }, []);

  // SELECT CHAT
  const handleSelectChat = (chat) => {
    setActiveChat(chat);
    setChats((prev) =>
      prev.map((c) =>
        c.id === chat.id ? { ...c, unread: 0 } : c
      )
    );
    setIsMobileChatOpen(true);
  };

  // SEND MESSAGE
  const handleSend = async () => {
    if (!input.trim()) return;

    await addDoc(collection(db, "messages"), {
      text: input,
      from: "me",
      createdAt: serverTimestamp(),
    });

    setInput("");
  };

  // DEAL ACTION
  const handleAccept = (id) => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === id ? { ...msg, dealStatus: "accepted" } : msg
      )
    );
  };

  return (
    <div className="h-[100dvh] flex bg-background font-sans p-2 md:p-4 gap-2 md:gap-4">

      {/* LEFT CHAT LIST */}
      <div
        className={`w-full md:w-[320px] ${
          isMobileChatOpen ? "hidden md:block" : "block"
        } bg-white border border-primary/10 rounded-2xl overflow-hidden`}
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

      {/* RIGHT CHAT BOX */}
      <div className="flex-1 flex flex-col h-[100dvh] bg-white border border-primary/10 rounded-2xl overflow-hidden">

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
            {serviceFromPage && (
              <div className="p-3 border-b bg-accent/10">
                <div className="bg-white p-3 rounded-xl shadow-sm">
                  <p className="text-sm font-semibold text-primary">
                    {serviceFromPage.title}
                  </p>
                  <p className="text-xs text-primary/60">
                    {serviceFromPage.price} • {serviceFromPage.date}
                  </p>
                </div>
              </div>
            )}

            {/* MESSAGES (SCROLL AREA) */}
            <div className="flex-1 p-4 space-y-4 overflow-y-auto">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex ${
                    m.from === "me"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div className="max-w-[75%]">

                    {m.service && (
                      <div className="bg-gradient-to-br from-white to-accent/10 border rounded-2xl p-3 mb-2">
                        <p className="text-sm font-semibold text-primary">
                          {m.service.title}
                        </p>

                        <p className="text-sm font-bold text-primary">
                          {m.service.price}
                        </p>

                        {m.dealStatus === "pending" && (
                          <button
                            onClick={() => handleAccept(m.id)}
                            className="mt-3 w-full bg-primary text-white text-xs py-2 rounded-xl"
                          >
                            Deal Sekarang
                          </button>
                        )}
                      </div>
                    )}

                    <div
                      className={`px-4 py-2 text-sm rounded-2xl shadow ${
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

            {/* INPUT (FIXED INSIDE BOX) */}
            <div className="bg-white border-t p-3">
              <div className="flex gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" && handleSend()
                  }
                  placeholder="Tulis pesan..."
                  className="flex-1 border rounded-xl px-4 py-3"
                />

                <button
                  onClick={handleSend}
                  className="bg-accent text-white p-3 rounded-xl"
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