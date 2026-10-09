import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { getRequestHost } from "@tanstack/react-start/server";
import Landing from "@/components/Landing";
import WaitlistStandalone from "@/components/waitlist-standalone";
import DeckPage from "@/components/deck-page";

const getHomeSurface = createServerFn({ method: "GET" }).handler(async () => {
  const host = getRequestHost({ xForwardedHost: true })?.toLowerCase() ?? "";

  let surface: "waitlist" | "deck" | "main" = "main";
  if (host.startsWith("waitlist.")) surface = "waitlist";
  else if (host.startsWith("deck.")) surface = "deck";

  return { surface } as const;
});

export const Route = createFileRoute("/")({
  loader: async () => getHomeSurface(),
  component: HomeRoute,
});

function HomeRoute() {
  const { surface } = Route.useLoaderData();

  if (surface === "waitlist") return <WaitlistStandalone />;
  if (surface === "deck") return <DeckPage />;

  return <Landing />;
}
