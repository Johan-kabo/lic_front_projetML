import { useEffect, useState } from "react";
import { useData } from "./useData";
import { fetchFraudData } from "@/services/fraudApi";

interface UseFraudDataState {
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

/**
 * Hook pour charger les données de fraude depuis l'API
 * Récupère automatiquement les données au chargement du composant
 */
export const useFraudAPI = (): UseFraudDataState => {
  const { updateData } = useData();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const appData = await fetchFraudData();
      updateData(appData);
    } catch (err) {
      const errorObj = err instanceof Error ? err : new Error(String(err));
      setError(errorObj);
      console.error("Erreur lors du chargement des données:", errorObj);
    } finally {
      setLoading(false);
    }
  };

  // Charger les données au montage du composant
  useEffect(() => {
    loadData();
  }, []);

  return {
    loading,
    error,
    refetch: loadData,
  };
};
