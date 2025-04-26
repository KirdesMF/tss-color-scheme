// app/routes/__root.tsx
import type { ReactNode } from "react";
import { Outlet, HeadContent, Scripts, createRootRouteWithContext } from "@tanstack/react-router";
import { useSuspenseQuery, type QueryClient } from "@tanstack/react-query";
import { colorSchemeQuery } from "../lib/color-scheme";
import { Header } from "../components/header";
import appCSS from "~/styles/app.css?url";

export type RootRouterContext = {
  queryClient: QueryClient;
};

export const Route = createRootRouteWithContext<RootRouterContext>()({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      { title: "TanStack Start Starter" },
    ],
    links: [{ rel: "stylesheet", href: appCSS }],
  }),
  loader: async ({ context }) => {
    const colorScheme = await context.queryClient.fetchQuery(colorSchemeQuery);
    return { colorScheme };
  },
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  const { data: colorScheme } = useSuspenseQuery(colorSchemeQuery);

  return (
    <html lang="en" data-theme={colorScheme}>
      <head>
        <HeadContent />
      </head>
      <body className="bg-white text-black dark:bg-black dark:text-white">
        <Header />
        {children}
        <Scripts />
      </body>
    </html>
  );
}
