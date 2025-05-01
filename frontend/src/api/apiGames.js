import { createClient } from "@supabase/supabase-js";

// Supabase configuration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create a Supabase client
export const supabaseClient = (token) =>
  createClient(supabaseUrl, supabaseAnonKey, {
    global: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });

/**
 * Fetch users from Supabase Users table.
 * Filters:
 *  - id: exact match
 *  - username: exact or partial (searchQuery)
 */
export async function getUser({ token, id, username, searchQuery } = {}) {
  const supabase = supabaseClient(token);

  let query = supabase.from("Users").select("*");

  if (id) {
    query = query.eq("id", id);
  } else if (username) {
    query = query.eq("username", username);
  } else if (searchQuery) {
    query = query.ilike("username", `%${searchQuery}%`);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching user details:", error.message);
    return null;
  }

  return data;
}
