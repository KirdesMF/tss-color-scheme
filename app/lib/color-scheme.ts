import { getCookie, setCookie, useSession } from "@tanstack/react-start/server";
import { createServerFn } from "@tanstack/react-start";
import * as v from "valibot";
import { queryOptions } from "@tanstack/react-query";

const SCHEME = ["dark", "light", "system"] as const;
const ColorSchemeSchema = v.picklist(SCHEME);

export const setColorSchemeFn = createServerFn({ method: "POST" })
  .validator(ColorSchemeSchema)
  .handler(({ data }) => {
    setCookie("color-scheme", data, {
      path: "/",
      sameSite: "lax",
      secure: true,
      httpOnly: true,
    });
  });

export const getColorSchemeFn = createServerFn({ method: "GET" })
  .validator(() => {
    const colorScheme = getCookie("color-scheme");
    const scheme = v.parse(ColorSchemeSchema, colorScheme);
    return scheme ?? "system";
  })
  .handler(({ data }) => data);

export const colorSchemeQuery = queryOptions({
  queryKey: ["color-scheme"],
  queryFn: () => getColorSchemeFn(),
});
