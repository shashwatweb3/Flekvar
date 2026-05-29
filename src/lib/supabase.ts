import { createClient, type SupabaseClient } from "@supabase/supabase-js";

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
        Update: {
          email?: string;
          created_at?: string;
        };
      };
    };
  };
};

let browserClient: SupabaseClient<Database> | null = null;
export const WAITLIST_TABLE = "waitlist" as const;
export const IS_BROWSER = typeof window !== "undefined";

function getSupabaseEnv() {
  const url = import.meta.env.VITE_SUPABASE_URL;
  const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error(
      "Missing Supabase environment variables. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.",
    );
  }

  return { url, anonKey };
}

export function getSupabaseClient() {
  if (browserClient) {
    return browserClient;
  }

  if (!IS_BROWSER) {
    throw new Error("Supabase client initialization attempted during SSR.");
  }

  const { url, anonKey } = getSupabaseEnv();

  browserClient = createClient<Database>(url, anonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  });

  return browserClient;
}

export async function testSupabaseConnection() {
  try {
    const supabase = getSupabaseClient();
    const { count, error } = await supabase
      .from(WAITLIST_TABLE)
      .select("*", { count: "exact", head: true });

    if (error) {
      throw error;
    }

    return {
      ok: true,
      message: `Connected to "${WAITLIST_TABLE}" successfully.`,
    };
  } catch (error) {
    console.error("[supabase] connection test failed", error);

    return {
      ok: false,
      message: error instanceof Error ? error.message : "Unknown Supabase error.",
    };
  }
}

export type WaitlistInsert = Database["public"]["Tables"]["waitlist"]["Insert"];
