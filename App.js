import React, { useState } from "react";
import { toast, Toaster } from "react-hot-toast";

export default function App() {
  const [coins, setCoins] = useState(100);
  const [showModal, setShowModal] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [blockedUsers, setBlockedUsers] = useState([]);
  const [foundUser, setFoundUser] = useState(null);

  // Sample: User onboarding
  const handleOnboardUser = () => {
    if (/^\d{10}$/.test(inputValue)) {
      toast.success(`User ${inputValue} onboard ho gaya!`);
      setInputValue("");
      setShowModal(null);
    } else {
      toast.error("10 digit phone number daalein.");
    }
  };

  // Example block user
  const handleBlockUser = () => {
    if (inputValue.trim() === "") {
      toast.error("User ID daalein.");
      return;
    }
    if (!blockedUsers.includes(inputValue)) {
      setBlockedUsers((prev) => [...prev, inputValue]);
      toast.success(`User ${inputValue} blocked.`);
    } else {
      toast.error("User already blocked.");
    }
    setInputValue("");
    setShowModal(null);
  };

  // Searching user example
  const handleFindUser = () => {
    if (inputValue.trim() === "") {
      toast.error("User ID daalein.");
      return;
    }
    // Simulate user found
    const userData = { id: inputValue, name: "Rohit Kumar" };
    setFoundUser(userData);
    toast.success(`User ${userData.name} found!`);
  };

  // Send coins example
  const handleSendCoins = (amount) => {
    if (!foundUser) {
      toast.error("Pehle user ko find karo.");
      return;
    }
    if (amount <= 0 || amount > coins) {
      toast.error("Invalid coin amount ya balance insufficient.");
      return;
    }
    setCoins(coins - amount);
    setTransactions((prev) => [
      { user: foundUser.name, amount, time: new Date().toLocaleString() },
      ...prev,
    ]);
    toast.success(`${amount} coins sent to ${foundUser.name}`);
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">React Calling App Dashboard</h1>

      <div className="mb-4">
        <button
          onClick={() => setShowModal("onboard")}
          className="mr-2 px-4 py-2 bg-green-500 text-white rounded"
          type="button"
        >
          Onboard User
        </button>
        <button
          onClick={() => setShowModal("block")}
          className="mr-2 px-4 py-2 bg-red-500 text-white rounded"
          type="button"
        >
          Block User
        </button>
        <button
          onClick={() => setShowModal("find")}
          className="mr-2 px-4 py-2 bg-blue-500 text-white rounded"
          type="button"
        >
          Find User
        </button>
      </div>

      <div>
        {showModal === "onboard" && (
          <div className="mb-4">
            <input
              type="text"
              placeholder="Phone Number (10 digits)"
              maxLength={10}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value.replace(/\D/g, ""))}
              className="p-2 border rounded w-full mb-2"
            />
            <button onClick={handleOnboardUser} className="px-4 py-2 bg-green-600 text-white rounded" type="button">
              Add User
            </button>
          </div>
        )}

        {showModal === "block" && (
          <div className="mb-4">
            <input
              type="text"
              placeholder="User ID"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="p-2 border rounded w-full mb-2"
            />
            <button onClick={handleBlockUser} className="px-4 py-2 bg-red-600 text-white rounded" type="button">
              Block User
            </button>
          </div>
        )}

        {showModal === "find" && (
          <div className="mb-4">
            <input
              type="text"
              placeholder="User ID"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="p-2 border rounded w-full mb-2"
            />
            <button onClick={handleFindUser} className="px-4 py-2 bg-blue-600 text-white rounded" type="button">
              Find User
            </button>
          </div>
        )}
      </div>

      {/* Found user info and send coins */}
      {foundUser && (
        <div className="mt-6 p-4 border rounded bg-gray-100">
          <div>
            <b>User Found:</b> {foundUser.name} (ID: {foundUser.id})
          </div>
          <div className="mt-2">
            <button
              onClick={() => handleSendCoins(10)}
              className="mr-2 px-4 py-2 bg-yellow-500 text-black rounded"
              type="button"
            >
              Send 10 Coins
            </button>
            <button
              onClick={() => handleSendCoins(20)}
              className="mr-2 px-4 py-2 bg-yellow-600 text-white rounded"
              type="button"
            >
              Send 20 Coins
            </button>
          </div>
        </div>
      )}

      {/* Coin balance */}
      <div className="mt-4 font-bold">Coins Balance: {coins}</div>

      {/* Transactions */}
      <div className="mt-6">
        <h3 className="font-semibold mb-2">Transactions:</h3>
        <ul>
          {transactions.length === 0 && <li>No transactions yet.</li>}
          {transactions.map((tx, idx) => (
            <li key={idx}>
              Sent {tx.amount} coins to {tx.user} at {tx.time}
            </li>
          ))}
        </ul>
      </div>

      <Toaster position="top-right" />
    </div>
  );
}
