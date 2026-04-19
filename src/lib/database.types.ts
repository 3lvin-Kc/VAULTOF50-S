export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      countries: {
        Row: { code: string; name: string };
        Insert: { code: string; name: string };
        Update: { code?: string; name?: string };
        Relationships: [];
      };
      genres: {
        Row: { id: number; name: string; slug: string };
        Insert: { id?: number; name: string; slug: string };
        Update: { id?: number; name?: string; slug?: string };
        Relationships: [];
      };
      ingestion_log: {
        Row: {
          id: number;
          ingested_at: string | null;
          status: string;
          tmdb_id: number;
          year: number;
        };
        Insert: {
          id?: number;
          ingested_at?: string | null;
          status: string;
          tmdb_id: number;
          year: number;
        };
        Update: {
          id?: number;
          ingested_at?: string | null;
          status?: string;
          tmdb_id?: number;
          year?: number;
        };
        Relationships: [];
      };
      movie_cast: {
        Row: {
          cast_order: number | null;
          character: string | null;
          id: number;
          movie_id: number | null;
          person_id: number | null;
        };
        Insert: {
          cast_order?: number | null;
          character?: string | null;
          id?: number;
          movie_id?: number | null;
          person_id?: number | null;
        };
        Update: {
          cast_order?: number | null;
          character?: string | null;
          id?: number;
          movie_id?: number | null;
          person_id?: number | null;
        };
        Relationships: [];
      };
      movie_countries: {
        Row: { country_code: string; movie_id: number };
        Insert: { country_code: string; movie_id: number };
        Update: { country_code?: string; movie_id?: number };
        Relationships: [];
      };
      movie_crew: {
        Row: {
          department: string | null;
          id: number;
          job: string;
          movie_id: number | null;
          person_id: number | null;
        };
        Insert: {
          department?: string | null;
          id?: number;
          job: string;
          movie_id?: number | null;
          person_id?: number | null;
        };
        Update: {
          department?: string | null;
          id?: number;
          job?: string;
          movie_id?: number | null;
          person_id?: number | null;
        };
        Relationships: [];
      };
      movie_genres: {
        Row: { genre_id: number; movie_id: number };
        Insert: { genre_id: number; movie_id: number };
        Update: { genre_id?: number; movie_id?: number };
        Relationships: [];
      };
      movie_tags: {
        Row: { movie_id: number; tag_id: number };
        Insert: { movie_id: number; tag_id: number };
        Update: { movie_id?: number; tag_id?: number };
        Relationships: [];
      };
      movie_facts: {
        Row: {
          id: number;
          movie_id: number;
          fact: string;
          section: string | null;
          source_url: string | null;
        };
        Insert: {
          id?: number;
          movie_id: number;
          fact: string;
          section?: string | null;
          source_url?: string | null;
        };
        Update: {
          id?: number;
          movie_id?: number;
          fact?: string;
          section?: string | null;
          source_url?: string | null;
        };
        Relationships: [];
      };
      movies: {
        Row: {
          archive_url: string | null;
          backdrop_path: string | null;
          budget: number | null;
          created_at: string | null;
          id: number;
          original_language: string | null;
          original_title: string | null;
          overview: string | null;
          poster_path: string | null;
          release_date: string | null;
          release_year: number | null;
          revenue: number | null;
          runtime: number | null;
          search_vector: unknown;
          source: string;
          status: string | null;
          tagline: string | null;
          title: string;
          tmdb_id: number;
          tmdb_rating: number | null;
          tmdb_vote_count: number | null;
          updated_at: string | null;
        };
        Insert: {
          archive_url?: string | null;
          backdrop_path?: string | null;
          budget?: number | null;
          created_at?: string | null;
          id?: number;
          original_language?: string | null;
          original_title?: string | null;
          overview?: string | null;
          poster_path?: string | null;
          release_date?: string | null;
          release_year?: number | null;
          revenue?: number | null;
          runtime?: number | null;
          source?: string;
          status?: string | null;
          tagline?: string | null;
          title: string;
          tmdb_id: number;
          tmdb_rating?: number | null;
          tmdb_vote_count?: number | null;
          updated_at?: string | null;
        };
        Update: {
          archive_url?: string | null;
          backdrop_path?: string | null;
          budget?: number | null;
          created_at?: string | null;
          id?: number;
          original_language?: string | null;
          original_title?: string | null;
          overview?: string | null;
          poster_path?: string | null;
          release_date?: string | null;
          release_year?: number | null;
          revenue?: number | null;
          runtime?: number | null;
          source?: string;
          status?: string | null;
          tagline?: string | null;
          title?: string;
          tmdb_id?: number;
          tmdb_rating?: number | null;
          tmdb_vote_count?: number | null;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      people: {
        Row: {
          id: number;
          name: string;
          profile_path: string | null;
          tmdb_id: number;
        };
        Insert: {
          id?: number;
          name: string;
          profile_path?: string | null;
          tmdb_id: number;
        };
        Update: {
          id?: number;
          name?: string;
          profile_path?: string | null;
          tmdb_id?: number;
        };
        Relationships: [];
      };
      tags: {
        Row: { id: number; name: string; slug: string };
        Insert: { id?: number; name: string; slug: string };
        Update: { id?: number; name?: string; slug?: string };
        Relationships: [];
      };
      blog_posts: {
        Row: {
          id: number;
          title: string;
          slug: string;
          excerpt: string;
          content: string;
          cover_image: string | null;
          published: boolean;
          published_at: string | null;
          movie_id: number | null;
          created_at: string | null;
        };
        Insert: {
          id?: number;
          title: string;
          slug: string;
          excerpt?: string;
          content: string;
          cover_image?: string | null;
          published?: boolean;
          published_at?: string | null;
          movie_id?: number | null;
          created_at?: string | null;
        };
        Update: {
          id?: number;
          title?: string;
          slug?: string;
          excerpt?: string;
          content?: string;
          cover_image?: string | null;
          published?: boolean;
          published_at?: string | null;
          movie_id?: number | null;
          created_at?: string | null;
        };
        Relationships: [];
      };
      blogs: {
        Row: {
          id: number;
          title: string;
          slug: string;
          excerpt: string | null;
          content: string;
          cover_image: string | null;
          published: boolean | null;
          category: string | null;
          created_at: string | null;
        };
        Insert: {
          id?: number;
          title: string;
          slug: string;
          excerpt?: string | null;
          content: string;
          cover_image?: string | null;
          published?: boolean | null;
          category?: string | null;
          created_at?: string | null;
        };
        Update: {
          id?: number;
          title?: string;
          slug?: string;
          excerpt?: string | null;
          content?: string;
          cover_image?: string | null;
          published?: boolean | null;
          category?: string | null;
          created_at?: string | null;
        };
        Relationships: [];
      };
      blog_movies: {
        Row: { blog_id: number; movie_id: number };
        Insert: { blog_id: number; movie_id: number };
        Update: { blog_id?: number; movie_id?: number };
        Relationships: [];
      };
      blog_related: {
        Row: {
          id: number;
          blog_id: number | null;
          related_blog_id: number | null;
        };
        Insert: {
          id?: never;
          blog_id?: number | null;
          related_blog_id?: number | null;
        };
        Update: {
          id?: never;
          blog_id?: number | null;
          related_blog_id?: number | null;
        };
        Relationships: [];
      };
      series: {
        Row: {
          id: number;
          slug: string;
          title: string;
          subtitle: string | null;
          description: string | null;
          cover_image: string | null;
          subject: string;
          created_at: string | null;
        };
        Insert: {
          id?: number;
          slug: string;
          title: string;
          subtitle?: string | null;
          description?: string | null;
          cover_image?: string | null;
          subject: string;
          created_at?: string | null;
        };
        Update: {
          id?: number;
          slug?: string;
          title?: string;
          subtitle?: string | null;
          description?: string | null;
          cover_image?: string | null;
          subject?: string;
          created_at?: string | null;
        };
        Relationships: [];
      };
      series_parts: {
        Row: {
          id: number;
          series_id: number;
          slug: string;
          title: string;
          subtitle: string | null;
          content: string | null;
          part_number: number;
          decades: string[] | null;
          countries: string[] | null;
          created_at: string | null;
        };
        Insert: {
          id?: number;
          series_id: number;
          slug: string;
          title: string;
          subtitle?: string | null;
          content?: string | null;
          part_number: number;
          decades?: string[] | null;
          countries?: string[] | null;
          created_at?: string | null;
        };
        Update: {
          id?: number;
          series_id?: number;
          slug?: string;
          title?: string;
          subtitle?: string | null;
          content?: string | null;
          part_number?: number;
          decades?: string[] | null;
          countries?: string[] | null;
          created_at?: string | null;
        };
        Relationships: [];
      };
      series_part_movies: {
        Row: { series_part_id: number; movie_id: number };
        Insert: { series_part_id: number; movie_id: number };
        Update: { series_part_id?: number; movie_id?: number };
        Relationships: [];
      };
      contributions: {
        Row: {
          id: number;
          user_id: string | null;
          display_name: string;
          title: string;
          slug: string;
          content: string;
          type: "essay" | "review" | "deep-dive";
          status: "pending" | "published" | "rejected";
          created_at: string | null;
        };
        Insert: {
          id?: number;
          user_id?: string | null;
          display_name: string;
          title: string;
          slug: string;
          content: string;
          type: "essay" | "review" | "deep-dive";
          status?: "pending" | "published" | "rejected";
          created_at?: string | null;
        };
        Update: {
          id?: number;
          user_id?: string | null;
          display_name?: string;
          title?: string;
          slug?: string;
          content?: string;
          type?: "essay" | "review" | "deep-dive";
          status?: "pending" | "published" | "rejected";
          created_at?: string | null;
        };
        Relationships: [];
      };
    };
    Views: { [_ in never]: never };
    Functions: { [_ in never]: never };
    Enums: { [_ in never]: never };
    CompositeTypes: { [_ in never]: never };
  };
};

// Convenience type shortcuts — original
export type Movie = Database["public"]["Tables"]["movies"]["Row"];
export type Person = Database["public"]["Tables"]["people"]["Row"];
export type Genre = Database["public"]["Tables"]["genres"]["Row"];
export type Tag = Database["public"]["Tables"]["tags"]["Row"];
export type Country = Database["public"]["Tables"]["countries"]["Row"];
export type MovieCast = Database["public"]["Tables"]["movie_cast"]["Row"];
export type MovieCrew = Database["public"]["Tables"]["movie_crew"]["Row"];

// Convenience type shortcuts — new tables
export type Blog = Database["public"]["Tables"]["blogs"]["Row"];
export type BlogPost = Database["public"]["Tables"]["blog_posts"]["Row"];
export type Series = Database["public"]["Tables"]["series"]["Row"];
export type SeriesPart = Database["public"]["Tables"]["series_parts"]["Row"];
export type Contribution = Database["public"]["Tables"]["contributions"]["Row"];
export type ContributionInsert =
  Database["public"]["Tables"]["contributions"]["Insert"];
export type ContributionStatus = Contribution["status"];
export type ContributionType = Contribution["type"];
