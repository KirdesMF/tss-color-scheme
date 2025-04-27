import { useTheme } from "~/providers/theme-provider";

export function Header() {
  const { theme, setTheme } = useTheme();

  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-white">
      <p className="text-red-600 dark:text-white">Header</p>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setTheme("dark")}
          className="border border-gray-300 dark:border-white rounded-md px-2 py-1 min-w-24"
        >
          {theme === "dark" ? "Dark 🟢" : "Dark"}
        </button>
        <button
          type="button"
          onClick={() => setTheme("light")}
          className="border border-gray-300 dark:border-white rounded-md px-2 py-1 min-w-24"
        >
          {theme === "light" ? "Light 🟢" : "Light"}
        </button>
        <button
          type="button"
          onClick={() => setTheme("system")}
          className="border border-gray-300 dark:border-white rounded-md px-2 py-1 min-w-24"
        >
          {theme === "system" ? "System 🟢" : "System"}
        </button>
      </div>
    </header>
  );
}
