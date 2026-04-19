// ============================================================
// VaultOf50 — useBlogs Hook
// ============================================================

import { useState, useEffect } from "react";
import {
  fetchBlogs,
  fetchBlogBySlug,
  fetchBlogMovies,
  fetchRelatedBlogs,
} from "../services/blogs";
import type { Blog, BlogMovie, RelatedBlog } from "../services/blogs";

// ── All published blogs ──────────────────────────────────────
export function useBlogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBlogs()
      .then(setBlogs)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { blogs, loading, error };
}

// ── Single blog by slug ──────────────────────────────────────
export function useBlog(slug: string) {
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    fetchBlogBySlug(slug)
      .then(setBlog)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [slug]);

  return { blog, loading, error };
}

// ── Movies linked to a blog ──────────────────────────────────
export function useBlogMovies(blogId: number | null) {
  const [movies, setMovies] = useState<BlogMovie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!blogId) return;
    fetchBlogMovies(blogId)
      .then(setMovies)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [blogId]);

  return { movies, loading };
}

// ── Related blogs ──────────────────────────────────────
export function useRelatedBlogs(blogId: number | null) {
  const [relatedBlogs, setRelatedBlogs] = useState<RelatedBlog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!blogId) return;
    fetchRelatedBlogs(blogId)
      .then(setRelatedBlogs)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [blogId]);

  return { relatedBlogs, loading };
}
