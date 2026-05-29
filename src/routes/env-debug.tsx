import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { testSupabaseConnection } from "@/lib/supabase";

export const Route = createFileRoute("/env-debug")({
  component: EnvDebugPage,
});

function EnvDebugPage() {
  const url =
    import.meta.env.VITE_SUPABASE_URL ??
    import.meta.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey =
    import.meta.env.VITE_SUPABASE_ANON_KEY ??
    import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const [connection, setConnection] = useState<{
    ok: boolean | null;
    message: string;
  }>({
    ok: null,
    message: "Running connection test…",
  });

  useEffect(() => {
    let active = true;

    void testSupabaseConnection().then((result) => {
      if (!active) {
        return;
      }

      setConnection({
        ok: result.ok,
        message: result.message,
      });
    });

    return () => {
      active = false;
    };
  }, []);

  return (
    <main className="min-h-screen bg-[var(--background)] px-5 py-16 text-[var(--foreground)] sm:px-8 lg:px-12">
      <div className="mx-auto max-w-3xl rounded-[24px] border-[1.5px] border-[var(--ink)] bg-white p-6 shadow-[5px_5px_0px_var(--ink)] sm:p-8">
        <h1 className="text-3xl font-extrabold tracking-[-0.04em] text-[var(--ink)] sm:text-4xl">
          Env Diagnostics
        </h1>
        <div className="mt-8 grid gap-4">
          <div className="rounded-[18px] border border-[var(--ink)] bg-[var(--bg)] px-4 py-4">
            <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--muted)]">
              URL loaded
            </div>
            <div className="mt-2 text-[18px] font-semibold text-[var(--ink)]">
              {url ? "yes" : "no"}
            </div>
            <div className="mt-1 break-all font-mono text-[12px] text-[var(--muted)]">
              {url ?? "missing"}
            </div>
          </div>

          <div className="rounded-[18px] border border-[var(--ink)] bg-[var(--bg)] px-4 py-4">
            <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--muted)]">
              Key loaded
            </div>
            <div className="mt-2 text-[18px] font-semibold text-[var(--ink)]">
              {anonKey ? "yes" : "no"}
            </div>
          </div>

          <div className="rounded-[18px] border border-[var(--ink)] bg-[var(--bg)] px-4 py-4">
            <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--muted)]">
              Supabase connection test
            </div>
            <div className="mt-2 text-[18px] font-semibold text-[var(--ink)]">
              {connection.ok === null ? "running" : connection.ok ? "pass" : "fail"}
            </div>
            <div className="mt-1 text-[13px] text-[var(--muted)]">
              {connection.message}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
