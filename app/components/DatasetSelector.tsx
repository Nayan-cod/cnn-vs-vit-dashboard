"use client";

import { useDataset } from '@/context/DatasetContext';
import { Database, ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { DATASET_CONFIGS, DatasetId } from '@/lib/dataConfig';

export default function DatasetSelector() {
  const { currentDataset, setCurrentDataset } = useDataset();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleDatasetChange = (datasetId: DatasetId) => {
    setCurrentDataset(datasetId);
    setIsOpen(false);
  };

  const currentConfig = DATASET_CONFIGS[currentDataset];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="glass px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-slate-800/70 transition-all duration-300 lift"
      >
        <Database size={18} className="text-emerald-400" />
        <span className="font-medium text-slate-200">{currentConfig.name}</span>
        <ChevronDown 
          size={16} 
          className={`text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 right-0 glass rounded-lg overflow-hidden shadow-xl border border-slate-600/30 min-w-[280px] z-50 fade-in-up">
          {Object.values(DATASET_CONFIGS).map((config) => (
            <button
              key={config.id}
              onClick={() => handleDatasetChange(config.id)}
              className={`w-full px-4 py-3 text-left transition-all duration-200 hover:bg-slate-800/70 border-b border-slate-700/30 last:border-b-0
                ${currentDataset === config.id ? 'bg-slate-800/50' : ''}`}
            >
              <div className="flex items-start gap-3">
                <Database 
                  size={18} 
                  className={`mt-0.5 ${currentDataset === config.id ? 'text-emerald-400' : 'text-slate-400'}`} 
                />
                <div className="flex-1">
                  <div className={`font-semibold ${currentDataset === config.id ? 'text-emerald-400' : 'text-slate-200'}`}>
                    {config.name}
                  </div>
                  <div className="text-xs text-slate-400 mt-1">
                    {config.classCount} classes
                  </div>
                </div>
                {currentDataset === config.id && (
                  <div className="w-2 h-2 rounded-full bg-emerald-400 mt-1.5"></div>
                )}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
