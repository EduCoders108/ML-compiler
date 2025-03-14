// "use client";

// import ThemeToggle from "../Theme/ThemeToggle";
// import { Menu } from "lucide-react";

// interface NavbarProps {
//   toggleSidebar: () => void;
// }

// export default function Navbar({ toggleSidebar }: NavbarProps) {
//   return (
//     <nav className="fixed left-0 top-0 z-50 flex w-full items-center justify-between bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-6 py-4 shadow-md transition-colors duration-300 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800">
//       {/* Menu Button */}
//       <button onClick={toggleSidebar} className="text-white md:hidden">
//         <Menu size={28} />
//       </button>

//       <h1 className="text-4xl font-extrabold tracking-wide text-white">
//         ML Companion
//       </h1>

//       <div className="flex items-center gap-4">
//         <ThemeToggle />
//       </div>
//     </nav>
//   );
// }

"use client";

import ThemeToggle from "../Theme/ThemeToggle";
import { Menu } from "lucide-react";

export default function Navbar({
  toggleSidebar,
}: {
  toggleSidebar: () => void;
}) {
  return (
    <nav className="fixed left-0 top-0 z-50 flex w-full items-center justify-between bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-6 py-4 shadow-md transition-colors duration-300 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800">
      <button onClick={toggleSidebar} className="text-white md:hidden">
        <Menu width={28} height={28} />
      </button>
      <h1 className="text-4xl font-extrabold tracking-wide text-white">
        ML Companion
      </h1>
      <div className="flex items-center gap-4">
        <ThemeToggle />
      </div>
    </nav>
  );
}
