import React, { useState } from "react";
import { IconSearch, IconMenu2 } from "@tabler/icons-react";
import { useGetAllCategoryQuery } from "../../slice/CategoryApiSlice";

const SecondaryNavbar = () => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const { data: categoryData, isLoading } = useGetAllCategoryQuery();

  const toggleDropdown = () => {
    setOpenDropdown((prev) => !prev);
  };

  return (
    <div className="relative bg-black text-white py-3 px-6 flex flex-col md:flex-row items-center justify-between gap-4">
      {/* Categories Dropdown Button */}
      <div className="relative">
        <button
          onClick={toggleDropdown}
          className="bg-yellow-400 text-black font-semibold px-4 py-2 rounded flex items-center gap-2"
        >
          <IconMenu2 size={18} />
          <span>SHOP BY CATEGORIES</span>
        </button>

        {openDropdown && (
          <div className="absolute left-0 top-full mt-2 w-64 bg-white text-black rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
            {isLoading ? (
              <div className="p-4 text-center">Loading...</div>
            ) : (
              <ul className="divide-y divide-gray-200">
                {categoryData?.data?.map((category) => (
                  <li
                    key={category._id}
                    className="px-4 py-3 hover:bg-gray-100 cursor-pointer transition-all"
                  >
                    {category.categoryname}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>

      {/* Search Input */}
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

      {/* WhatsApp + Order */}
      <div className="flex items-center gap-4">
        <div className="text-sm text-left">
          <span className="block font-bold">Whatsapp:</span>
          <span className="text-yellow-400">1-999-564-666</span>
        </div>
        <button className="bg-white text-black px-4 py-2 rounded font-semibold whitespace-nowrap">
          Order $99
        </button>
      </div>
    </div>
  );
};

export default SecondaryNavbar;
