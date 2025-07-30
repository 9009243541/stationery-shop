import React from "react";
import { IconSearch } from "@tabler/icons-react";

const SecondaryNavbar = () => {
  return (
    <div className="bg-black text-white py-3 px-6 flex flex-col md:flex-row items-center justify-between gap-4">
      {/* Left: Categories Button */}
      <button className="bg-yellow-400 text-black font-semibold px-4 py-2 rounded">
        SHOP BY CATEGORIES
      </button>

      {/* Middle: Search */}
      <div className="flex items-center border border-gray-400 rounded overflow-hidden w-full md:w-1/2">
        <input
          type="text"
          placeholder="Search the store"
          className="w-full px-4 py-2 text-black outline-none"
        />
        <button className="bg-white px-4 py-2 text-black flex items-center gap-2 font-semibold">
          <IconSearch size={18} />
          Search
        </button>
      </div>

      {/* Right: WhatsApp and Order */}
      <div className="flex items-center gap-4">
        <div>
          <span className="block font-bold">Whatsapp:</span>
          <span className="text-yellow-400">1-999-564-666</span>
        </div>
        <button className="bg-white text-black px-4 py-2 rounded font-semibold">
          Order $99
        </button>
      </div>
    </div>
  );
};

export default SecondaryNavbar;
