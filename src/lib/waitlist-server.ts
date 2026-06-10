import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

const WAITLIST_TABLE = "waitlist" as const;

type Database = {
  public: {
    Tables: {
      waitlist: {
        Row: {
          id: number;
          email: string;
          created_at: string;
        };
        Insert: {
          email: string;
          created_at?: string;
        };
      };
    };
  };
};

type WaitlistServerError = {
  code?: string;
  details?: string | null;
  hint?: string | null;
  message: string;
  status?: number;
};

function getServerSupabaseEnv() {
  const url =
    process.env.VITE_SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey =
    process.env.VITE_SUPABASE_ANON_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw {
      message:
        "Missing Supabase server environment variables for the waitlist transport.",
    } satisfies WaitlistServerError;
  }

  return { url, anonKey };
}

function getServerSupabaseClient() {
  const { url, anonKey } = getServerSupabaseEnv();

  return createClient<Database>(url, anonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  });
}

function toWaitlistServerError(error: unknown): WaitlistServerError {
  if (!error || typeof error !== "object") {
    return { message: "Unknown waitlist error." };
  }

  const maybeError = error as WaitlistServerError;

  return {
    code: maybeError.code,
    details: maybeError.details ?? null,
    hint: maybeError.hint ?? null,
    message: maybeError.message ?? "Unknown waitlist error.",
    status: maybeError.status,
  };
}

export const getWaitlistCount = createServerFn({ method: "GET" }).handler(async () => {
  const supabase = getServerSupabaseClient();
  const { count, error } = await supabase
    .from(WAITLIST_TABLE)
    .select("*", { count: "exact", head: true });

  if (error) {
    throw toWaitlistServerError(error);
  }

  return count ?? 0;
});

export const joinWaitlist = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      email: z.string().trim().toLowerCase().email(),
    }),
  )
  .handler(async ({ data }) => {
    const supabase = getServerSupabaseClient();
    const { data: insertedRow, error } = await supabase
      .from(WAITLIST_TABLE)
      .insert({ email: data.email })
      .select("id,email,created_at")
      .single();

    if (error) {
      throw toWaitlistServerError(error);
    }

    return insertedRow;
  });

export const testWaitlistConnection = createServerFn({ method: "GET" }).handler(async () => {
  try {
    await getWaitlistCount();

    return {
      ok: true,
      message: `Connected to "${WAITLIST_TABLE}" successfully.`,
    };
  } catch (error) {
    const normalizedError = toWaitlistServerError(error);

    return {
      ok: false,
      message: normalizedError.message,
    };
  }
});
