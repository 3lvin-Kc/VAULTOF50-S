import { useState, useEffect } from "react";
import {
  getPublishedContributions,
  getContributionBySlug,
  getMyContributions,
  deleteContribution,
} from "../services/contributions";
import type { Contribution } from "../services/contributions";

export function usePublishedContributions() {
  const [contributions, setContributions] = useState<Contribution[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getPublishedContributions()
      .then(setContributions)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return { contributions, loading, error };
}

export function useContribution(slug: string) {
  const [contribution, setContribution] = useState<Contribution | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    getContributionBySlug(slug)
      .then(setContribution)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [slug]);

  return { contribution, loading, error };
}

export function useMyContributions(userId: string | null) {
  const [contributions, setContributions] = useState<Contribution[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!userId) return;
    setLoading(true);
    getMyContributions(userId)
      .then(setContributions)
      .finally(() => setLoading(false));
  }, [userId]);

  return { contributions, loading };
}

export function useDeleteContribution() {
  const [deleting, setDeleting] = useState<number | null>(null);

  const remove = async (id: number, onSuccess: () => void) => {
    setDeleting(id);
    const { error } = await deleteContribution(id);
    setDeleting(null);
    if (!error) onSuccess();
  };

  return { remove, deleting };
}
