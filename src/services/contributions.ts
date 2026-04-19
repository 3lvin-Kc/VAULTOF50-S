import { supabase } from "../lib/supabase";

export interface Contribution {
  id: number;
  user_id: string | null;
  display_name: string;
  title: string;
  slug: string;
  content: string;
  type: "essay" | "review" | "deep-dive";
  status: "pending" | "published" | "rejected";
  created_at: string;
}

export type ContributionType = Contribution["type"];

export const TYPE_LABELS: Record<ContributionType, string> = {
  essay: "Essay",
  review: "Review",
  "deep-dive": "Deep Dive",
};

function generateSlug(title: string): string {
  return (
    title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim() +
    "-" +
    Date.now().toString(36)
  );
}

export async function getPublishedContributions(): Promise<Contribution[]> {
  const { data, error } = await (supabase as any)
    .from("contributions")
    .select("*")
    .eq("status", "published")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function getContributionBySlug(
  slug: string,
): Promise<Contribution | null> {
  const { data, error } = await (supabase as any)
    .from("contributions")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (error) return null;
  return data;
}

export async function getMyContributions(
  userId: string,
): Promise<Contribution[]> {
  const { data, error } = await (supabase as any)
    .from("contributions")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function submitContribution(
  userId: string,
  displayName: string,
  title: string,
  content: string,
  type: ContributionType,
): Promise<{ error: string | null }> {
  const slug = generateSlug(title);

  const { error } = await (supabase as any).from("contributions").insert({
    user_id: userId,
    display_name: displayName,
    title,
    slug,
    content,
    type,
    status: "pending",
  });

  if (error) return { error: error.message };
  return { error: null };
}

export async function deleteContribution(id: number): Promise<{ error: string | null }> {
  const { error } = await (supabase as any)
    .from('contributions')
    .delete()
    .eq('id', id)

  if (error) return { error: error.message }
  return { error: null }
}
