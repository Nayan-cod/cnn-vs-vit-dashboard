"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { DatasetId, DEFAULT_DATASET, DATASET_CONFIGS } from '@/lib/dataConfig';
import { loadDatasetMetrics, ModelMetrics } from '@/lib/dataLoader';

interface DatasetContextType {
  currentDataset: DatasetId;
  setCurrentDataset: (datasetId: DatasetId) => void;
  metrics: ModelMetrics | null;
  loading: boolean;
  error: string | null;
  datasetConfig: typeof DATASET_CONFIGS[DatasetId];
}

const DatasetContext = createContext<DatasetContextType | undefined>(undefined);

export function DatasetProvider({ children }: { children: ReactNode }) {
  const [currentDataset, setCurrentDataset] = useState<DatasetId>(DEFAULT_DATASET);
  const [metrics, setMetrics] = useState<ModelMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      
      try {
        const data = await loadDatasetMetrics(currentDataset);
        setMetrics(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load dataset');
        console.error('Error loading dataset:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [currentDataset]);

  const value: DatasetContextType = {
    currentDataset,
    setCurrentDataset,
    metrics,
    loading,
    error,
    datasetConfig: DATASET_CONFIGS[currentDataset],
  };

  return (
    <DatasetContext.Provider value={value}>
      {children}
    </DatasetContext.Provider>
  );
}

export function useDataset() {
  const context = useContext(DatasetContext);
  if (context === undefined) {
    throw new Error('useDataset must be used within a DatasetProvider');
  }
  return context;
}
