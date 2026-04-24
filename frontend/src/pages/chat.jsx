import { Link } from "react-router-dom";

export default function Chat() {
  const chats = [
    {
      id: 1,
      name: "Susi",
      avatar: "https://i.pravatar.cc/150?img=1",
      msg: "Bisa, dimana alamat pastinya?",
      unread: 1,
    },
    {
      id: 2,
      name: "Naufal",
      avatar: "https://i.pravatar.cc/150?img=2",
      msg: "Gimana kelanjutannya?",
      unread: 1,
    },
    {
      id: 3,
      name: "Rizki",
      avatar: "https://i.pravatar.cc/150?img=3",
      msg: "Boleh tau alamat pastinya?",
      unread: 0,
    },
  ];

  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-md mx-auto px-4 py-4">

        {/* TITLE */}
        <h1 className="text-lg font-semibold text-primary mb-4">
          Chat
        </h1>

        {/* LIST */}
        <div className="space-y-3">
          {chats.map((chat) => (
            <Link key={chat.id} to={`/chat/${chat.id}`}>
              
              <div
                className={`flex items-center justify-between 
                rounded-2xl px-4 py-3 
                transition-all duration-200 cursor-pointer border
                ${
                  chat.unread > 0
                    ? "bg-accent text-white border-accent"
                    : "bg-white border-primary/10 hover:bg-accent/10"
                }`}
              >
                <div className="flex items-center gap-3">

                  {/* ✅ AVATAR (FIXED) */}
                  <img
                    src={chat.avatar}
                    className={`w-10 h-10 rounded-full object-cover ${
                      chat.unread > 0 ? "ring-2 ring-white/50" : ""
                    }`}
                  />

                  {/* TEXT */}
                  <div>
                    <p
                      className={`text-sm font-semibold ${
                        chat.unread > 0
                          ? "text-white"
                          : "text-primary"
                      }`}
                    >
                      {chat.name}
                    </p>

                    <p
                      className={`text-xs line-clamp-1 ${
                        chat.unread > 0
                          ? "text-white/90"
                          : "text-primary/70"
                      }`}
                    >
                      {chat.msg}
                    </p>
                  </div>
                </div>

                {/* BADGE */}
                {chat.unread > 0 && (
                  <div
                    className="bg-white text-accent 
                    min-w-[22px] h-5 px-2 flex items-center justify-center 
                    rounded-full text-[10px] font-medium"
                  >
                    {chat.unread}
                  </div>
                )}
              </div>

            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}