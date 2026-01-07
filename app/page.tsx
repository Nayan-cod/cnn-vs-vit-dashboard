"use client";

import { useState } from 'react';
import { DatasetProvider, useDataset } from '@/context/DatasetContext';
import DatasetSelector from '@/components/DatasetSelector';
import Overview from '@/components/overview';
import TrainingMetrics from '@/components/training-metrics';
import ConfusionMatrix from '@/components/confusion-matrix';
import Architecture from '@/components/architecture';
import Performance from '@/components/performance';
import Report from '@/components/report';
import { LayoutDashboard, BarChart3, Puzzle, Bot, Target, FileText } from 'lucide-react';

type TabName = "Overview" | "Training Metrics" | "Confusion Matrix" | "Architecture" | "Performance" | "Report";

function DashboardContent() {
  const [activeTab, setActiveTab] = useState<TabName>("Overview");
  const { datasetConfig, loading } = useDataset();

  const tabs: { name: TabName; icon: React.ReactNode }[] = [
    { name: "Overview", icon: <LayoutDashboard size={18} /> },
    { name: "Training Metrics", icon: <BarChart3 size={18} /> },
    { name: "Confusion Matrix", icon: <Bot size={18} /> },
    { name: "Architecture", icon: <Puzzle size={18} /> },
    { name: "Performance", icon: <Target size={18} /> },
    { name: "Report", icon: <FileText size={18} /> },
  ];

  const renderContent = () => {
    if (loading) {
      return (
        <div className="glass p-12 rounded-lg text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-400"></div>
          <p className="text-slate-300 mt-4">Loading dataset...</p>
        </div>
      );
    }

    switch (activeTab) {
      case "Overview":
        return <Overview />;
      case "Training Metrics":
        return <TrainingMetrics />;
      case "Confusion Matrix":
        return <ConfusionMatrix />;
      case "Architecture":
        return <Architecture />;
      case "Performance":
        return <Performance />;
      case "Report":
        return <Report />;
      default:
        return <Overview />;
    }
  };

  return (
    <main className="min-h-screen text-slate-200 p-4 sm:p-6 lg:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="text-center mb-8 fade-in-up">
          <div className="flex justify-end mb-4">
            <DatasetSelector />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-fuchsia-400 via-sky-400 to-emerald-400 text-transparent bg-clip-text">
            CNN vs Vision Transformer
          </h1>
          <p className="text-slate-300 mt-2">
            {datasetConfig.description}
          </p>
        </header>

        {/* Navigation Tabs */}
        <nav className="mb-8 glass p-2 rounded-xl flex justify-center flex-wrap gap-2 fade-in-up" style={{animationDelay:'120ms'}}>
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-all duration-300 lift
                ${activeTab === tab.name
                  ? 'bg-gradient-to-r from-emerald-500 via-sky-500 to-fuchsia-500 text-white shadow-lg'
                  : 'text-slate-200/90 hover:bg-slate-800/70'
                }`}
            >
              {tab.icon}
              {tab.name}
            </button>
          ))}
        </nav>

        {/* Main Content Area */}
        <div className="transition-opacity duration-500 fade-in-up" style={{animationDelay:'220ms'}}>
          {renderContent()}
        </div>

      </div>
    </main>
  );
}

export default function Home() {
  return (
    <DatasetProvider>
      <DashboardContent />
    </DatasetProvider>
  );
}