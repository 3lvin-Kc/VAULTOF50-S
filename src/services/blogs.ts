import { supabase } from "../lib/supabase";

export interface Blog {
  id: number;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string;
  cover_image: string | null;
  published: boolean;
  created_at: string | null;
  category: string | null;
}

export interface RelatedBlog {
  id: number;
  title: string;
  slug: string;
  cover_image: string | null;
  excerpt: string | null;
}

export interface BlogMovie {
  movie_id: number;
  movies: {
    id: number;
    title: string;
    release_year: number;
    poster_path: string | null;
  };
}

export async function fetchBlogs(): Promise<Blog[]> {
  const { data, error } = await (supabase
    .from("blogs" as any)
    .select("id, slug, title, excerpt, content, cover_image, published, category, created_at")
    .eq("published", true)
    .order("created_at", { ascending: false }) as any);

  if (error) throw new Error(`Failed to fetch blogs: ${error.message}`);
  return (data as Blog[]) ?? [];
}

export async function fetchBlogBySlug(slug: string): Promise<Blog | null> {
  const { data, error } = await (supabase
    .from("blogs" as any)
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single() as any);

  if (error) return null;
  return data as Blog | null;
}

export async function fetchBlogMovies(blogId: number): Promise<BlogMovie[]> {
  const { data, error } = await (supabase
    .from("blog_movies" as any)
    .select(
      `
      movie_id,
      movies (
        id,
        title,
        release_year,
        poster_path
      )
    `,
    )
    .eq("blog_id", blogId) as any);

  if (error) throw new Error(`Failed to fetch blog movies: ${error.message}`);
  return (data as unknown as BlogMovie[]) ?? [];
}

export async function fetchRelatedBlogs(blogId: number): Promise<RelatedBlog[]> {
  const { data, error } = await (supabase
    .from("blog_related" as any)
    .select("related_blog_id, related_blog:blogs!blog_related_related_blog_id_fkey(id, title, slug, cover_image, excerpt)")
    .eq("blog_id", blogId) as any);

  if (error) throw new Error(`Failed to fetch related blogs: ${error.message}`);

  const result = (data as any[])?.map((row) => ({
    id: row.related_blog.id,
    title: row.related_blog.title,
    slug: row.related_blog.slug,
    cover_image: row.related_blog.cover_image,
    excerpt: row.related_blog.excerpt,
  })) ?? [];

  return result;
}
