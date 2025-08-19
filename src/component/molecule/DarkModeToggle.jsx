// import React, { useEffect, useState } from "react";

// const DarkModeToggle = () => {
//   const [isDark, setIsDark] = useState(false);

//   useEffect(() => {
//     // LocalStorage check
//     if (localStorage.getItem("theme") === "dark") {
//       document.documentElement.classList.add("dark");
//       setIsDark(true);
//     } else {
//       document.documentElement.classList.remove("dark");
//       setIsDark(false);
//     }
//   }, []);

//   const toggleTheme = () => {
//     if (isDark) {
//       document.documentElement.classList.remove("dark");
//       localStorage.setItem("theme", "light");
//       setIsDark(false);
//     } else {
//       document.documentElement.classList.add("dark");
//       localStorage.setItem("theme", "dark");
//       setIsDark(true);
//     }
//   };

//   return (
//     <button
//       onClick={toggleTheme}
//       className="px-4 py-2 rounded-lg transition-colors bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
//     >
//       {isDark ? "🌙 Dark Mode" : "☀️ Light Mode"}
//     </button>
//   );
// };

// export default DarkModeToggle;
import React from "react";

const DarkModeToggle = () => {
  return <div>DarkModeToggle</div>;
};

export default DarkModeToggle;
