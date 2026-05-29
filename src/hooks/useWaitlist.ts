import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getSupabaseClient, IS_BROWSER, WAITLIST_TABLE } from "@/lib/supabase";

const WAITLIST_COUNT_QUERY_KEY = ["waitlist", "count"] as const;

export function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizeEmail(email));
}

export function isDuplicateWaitlistError(error: unknown) {
  if (!error || typeof error !== "object") {
    return false;
  }

  return "code" in error && error.code === "23505";
}

function explainWaitlistError(error: unknown) {
  if (!error || typeof error !== "object") {
    return null;
  }

  const maybeError = error as { code?: string; message?: string; details?: string; hint?: string; status?: number };

  if (maybeError.code === "42P01") {
    return `Table "${WAITLIST_TABLE}" does not exist or the name does not match exactly.`;
  }

  if (
    maybeError.code === "42501" ||
    maybeError.status === 401 ||
    maybeError.status === 403
  ) {
    return `RLS or anon access is blocking the request. Confirm public INSERT and SELECT policies exist on "${WAITLIST_TABLE}".`;
  }

  return null;
}

export function useWaitlistCount() {
  return useQuery({
    queryKey: WAITLIST_COUNT_QUERY_KEY,
    enabled: IS_BROWSER,
    queryFn: async () => {
      const supabase = getSupabaseClient();
      const { count, error } = await supabase
        .from(WAITLIST_TABLE)
        .select("*", { count: "exact", head: true });

      if (error) {
        console.error("[waitlist] count error", {
          table: WAITLIST_TABLE,
          error,
          explanation: explainWaitlistError(error),
        });
        throw error;
      }

      return count ?? 0;
    },
    staleTime: 30_000,
    gcTime: 5 * 60_000,
  });
}

export function useWaitlist() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (email: string) => {
      const normalizedEmail = normalizeEmail(email);
      const supabase = getSupabaseClient();
      const insertPayload = { email: normalizedEmail };

      const { data: existingRow, error: existingError } = await supabase
        .from(WAITLIST_TABLE)
        .select("id")
        .eq("email", normalizedEmail)
        .maybeSingle();

      if (existingError) {
        console.error("[waitlist] duplicate precheck error", {
          table: WAITLIST_TABLE,
          email: normalizedEmail,
          error: existingError,
          explanation: explainWaitlistError(existingError),
        });
        throw existingError;
      }

      if (existingRow) {
        throw {
          code: "23505",
          message: "Email is already on the waitlist.",
        };
      }

      const { data, error } = await supabase
        .from(WAITLIST_TABLE)
        .insert(insertPayload)
        .select("id,email,created_at")
        .single();

      if (error) {
        if (isDuplicateWaitlistError(error)) {
          throw error;
        }

        console.error("[waitlist] insert error", {
          table: WAITLIST_TABLE,
          email: normalizedEmail,
          error,
          explanation: explainWaitlistError(error),
        });
        throw error;
      }

      return data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: WAITLIST_COUNT_QUERY_KEY });
    },
  });
}
