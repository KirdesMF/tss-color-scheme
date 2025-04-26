import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { setColorSchemeFn } from "~/lib/color-scheme";

export function Header() {
  const { mutate } = useMutation({ mutationFn: useServerFn(setColorSchemeFn) });
  const queryClient = useQueryClient();

  function onColorSchemeChange(colorScheme: "dark" | "light" | "system") {
    mutate(
      { data: colorScheme },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["color-scheme"] });
        },
      },
    );
  }

  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-white">
      <p className="text-red-600 dark:text-white">Header</p>

      <div className="flex gap-2">
        <button type="button" onClick={() => onColorSchemeChange("dark")}>
          Dark
        </button>
        <button type="button" onClick={() => onColorSchemeChange("light")}>
          Light
        </button>
        <button type="button" onClick={() => onColorSchemeChange("system")}>
          System
        </button>
      </div>
    </header>
  );
}
