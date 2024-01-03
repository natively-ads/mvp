import { createClient } from "@supabase/supabase-js";
import { Database } from "@repo/types/src/database";
export default function getSupabaseClient() {
  const SUPABASE_API_URL = process.env.SUPABASE_API_URL;
  const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;
  if (!SUPABASE_API_URL) {
    throw new Error("Missing Supabase API URL");
  }
  if (!SUPABASE_ANON_KEY) {
    throw new Error("Missing Supabase ANON Key");
  }
  const supabase = createClient<Database>(SUPABASE_API_URL, SUPABASE_ANON_KEY);
  return supabase;
}
