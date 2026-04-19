import { supabase } from "../lib/supabase";

export interface Series {
  id: number;
  slug: string;
  title: string;
  subtitle: string | null;
  description: string | null;
  cover_image: string | null;
  subject: string;
  created_at: string;
  is_published: boolean;
  parts?: SeriesPart[];
}

export interface SeriesPart {
  id: number;
  series_id: number;
  slug: string;
  title: string;
  subtitle: string | null;
  content: string | null;
  part_number: number;
  decades: string[] | null;
  countries: string[] | null;
  created_at: string;
  series?: Series;
}

export async function getAllSeries(): Promise<Series[]> {
  const { data, error } = await (supabase
    .from("series" as any)
    .select(
      `
      *,
      parts:series_parts(id, slug, title, subtitle, part_number, decades, countries)
    `,
    )
    .eq("is_published", true)
    .order("id") as any);

  if (error) throw error;
  return (data || []).map((s: any) => ({
    ...s,
    parts: (s.parts || []).sort(
      (a: SeriesPart, b: SeriesPart) => a.part_number - b.part_number,
    ),
  }));
}

export async function getSeriesBySlug(slug: string): Promise<Series | null> {
  const { data, error } = await (supabase
    .from("series" as any)
    .select(
      `
      *,
      parts:series_parts(*)
    `,
    )
    .eq("slug", slug)
    .eq("is_published", true)
    .single() as any);

  if (error) return null;
  return {
    ...data,
    parts: (data.parts || []).sort(
      (a: SeriesPart, b: SeriesPart) => a.part_number - b.part_number,
    ),
  };
}

export async function getSeriesPart(
  seriesSlug: string,
  partSlug: string,
): Promise<SeriesPart | null> {
  const { data: seriesData } = await (supabase
    .from("series" as any)
    .select("id, slug, title, subject, is_published")
    .eq("slug", seriesSlug)
    .eq("is_published", true)
    .single() as any);

  if (!seriesData) return null;

  const { data, error } = await (supabase
    .from("series_parts" as any)
    .select("*")
    .eq("series_id", seriesData.id)
    .eq("slug", partSlug)
    .single() as any);

  if (error) return null;
  return { ...data, series: seriesData };
}
