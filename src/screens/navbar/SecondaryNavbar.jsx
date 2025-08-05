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
    <div className="relative bg-slate-800 text-white py-4 px-6 flex flex-col md:flex-row items-center justify-between gap-4 flex-wrap">
      {/* Categories Dropdown Button */}
      <div className="relative">
        <button
          onClick={toggleDropdown}
          className="bg-yellow-400 text-black font-semibold px-4 py-2 rounded flex items-center gap-2 hover:bg-yellow-300 transition-colors"
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
                    className="px-4 py-3 hover:bg-emerald-50 text-sm cursor-pointer transition-all"
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
      <div className="flex items-center border border-gray-400 rounded overflow-hidden w-full md:w-1/2 bg-white">
        <input
          type="text"
          placeholder="Search the store"
          className="w-full px-4 py-2 text-black outline-none"
        />
        <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 flex items-center gap-2 font-semibold transition-colors">
          <IconSearch size={18} />
          Search
        </button>
      </div>

      {/* WhatsApp + Order */}
      <div className="flex items-center gap-4">
        <div className="text-sm text-left">
          <span className="block font-bold text-white">WhatsApp:</span>
          <span className="text-yellow-400">1-999-564-666</span>
        </div>
        <button className="bg-yellow-400 hover:bg-yellow-300 text-black px-4 py-2 rounded font-semibold whitespace-nowrap transition-colors">
          Order $99
        </button>
      </div>
    </div>
  );
};

export default SecondaryNavbar;
