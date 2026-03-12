import { useState, useEffect } from "react";
import {
  getAllSeries,
  getSeriesBySlug,
  getSeriesPart,
} from "../services/series";
import type { Series, SeriesPart } from "../services/series";

export function useAllSeries() {
  const [series, setSeries] = useState<Series[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getAllSeries()
      .then(setSeries)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return { series, loading, error };
}

export function useSeries(slug: string) {
  const [series, setSeries] = useState<Series | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    getSeriesBySlug(slug)
      .then(setSeries)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [slug]);

  return { series, loading, error };
}

export function useSeriesPart(seriesSlug: string, partSlug: string) {
  const [part, setPart] = useState<SeriesPart | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!seriesSlug || !partSlug) return;
    getSeriesPart(seriesSlug, partSlug)
      .then(setPart)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [seriesSlug, partSlug]);

  return { part, loading, error };
}
