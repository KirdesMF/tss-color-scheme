import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { colorSchemeQuery, setColorSchemeFn } from "~/lib/color-scheme";

export function Header() {
  const queryClient = useQueryClient();
  const { data: colorScheme } = useQuery(colorSchemeQuery);

  const { mutate } = useMutation({
    mutationFn: setColorSchemeFn,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["color-scheme"] });
    },
  });

  function onColorSchemeChange(colorScheme: "dark" | "light" | "system") {
    mutate({ data: colorScheme });
  }

  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-white">
      <p className="text-red-600 dark:text-white">Header</p>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => onColorSchemeChange("dark")}
          className="border border-gray-300 dark:border-white rounded-md px-2 py-1 min-w-24"
        >
          {colorScheme === "dark" ? "Dark 🟢" : "Dark"}
        </button>
        <button
          type="button"
          onClick={() => onColorSchemeChange("light")}
          className="border border-gray-300 dark:border-white rounded-md px-2 py-1 min-w-24"
        >
          {colorScheme === "light" ? "Light 🟢" : "Light"}
        </button>
        <button
          type="button"
          onClick={() => onColorSchemeChange("system")}
          className="border border-gray-300 dark:border-white rounded-md px-2 py-1 min-w-24"
        >
          {colorScheme === "system" ? "System 🟢" : "System"}
        </button>
      </div>
    </header>
  );
}
