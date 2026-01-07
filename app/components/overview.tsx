"use client";

import { LineChart, TrendingUp, Cpu, Clock } from 'lucide-react';
import { useDataset } from '@/context/DatasetContext';

interface MetricCardProps {
  title: string;
  cnnValue: string;
  vitValue: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  unit?: string;
}

const MetricCard = ({ title, cnnValue, vitValue, icon: Icon, unit = "" }: MetricCardProps) => (
  <div className="glass p-4 rounded-lg shadow-md lift fade-in-up">
    <div className="flex items-center text-slate-400 mb-2">
      <Icon className="mr-2" size={20} />
      <h3 className="font-semibold">{title}</h3>
    </div>
    <div className="flex justify-between items-baseline">
      <div>
        <p className="text-xs text-slate-400">CNN</p>
        <p className="text-2xl font-bold text-slate-200">{cnnValue}{unit}</p>
      </div>
      <div className="text-right">
        <p className="text-xs text-green-500">ViT</p>
        <p className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-fuchsia-400 text-transparent bg-clip-text flex items-center">
          {vitValue}{unit}
          <TrendingUp className="ml-1" size={18} />
        </p>
      </div>
    </div>
  </div>
);

interface ModelInfoCardProps {
  title: string;
  params: string;
  training: string;
  inference: string;
  f1: string;
  color: string;
}

const ModelInfoCard = ({ title, params, training, inference, f1, color }: ModelInfoCardProps) => (
  <div className={`p-6 rounded-lg shadow-lg border-t-4 ${color} glass lift fade-in-up`}>
    <h3 className="text-xl font-bold mb-4">{title}</h3>
    <div className="space-y-3 text-sm">
      <p className="flex justify-between"><span>Parameters:</span> <span className="font-mono bg-slate-700/50 px-2 py-1 rounded">{params}</span></p>
      <p className="flex justify-between"><span>Training Time:</span> <span className="font-mono bg-slate-700/50 px-2 py-1 rounded">{training}</span></p>
      <p className="flex justify-between"><span>Inference Time:</span> <span className="font-mono bg-slate-700/50 px-2 py-1 rounded">{inference}</span></p>
      <p className="flex justify-between"><span>F1-Score:</span> <span className="font-mono bg-slate-700/50 px-2 py-1 rounded">{f1}</span></p>
    </div>
  </div>
);

interface HighlightCardProps {
  value: string;
  label: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
}

const HighlightCard = ({ value, label, icon: Icon }: HighlightCardProps) => (
  <div className="p-4 rounded-lg text-center glass lift fade-in-up" style={{animationDelay:'120ms'}}>
    <Icon className="mx-auto text-emerald-400 mb-2" size={28}/>
    <p className="text-2xl font-bold bg-gradient-to-r from-emerald-400 via-sky-400 to-fuchsia-400 text-transparent bg-clip-text">{value}</p>
    <p className="text-sm text-slate-300">{label}</p>
  </div>
);

const Overview = () => {
  const { metrics } = useDataset();

  if (!metrics) {
    return null;
  }

  const { resnet18, deit } = metrics;
  
  // Calculate dynamic highlights
  const accuracyDiff = (deit.finalMetrics.testAccuracy - resnet18.finalMetrics.testAccuracy).toFixed(1);
  const paramRatio = (resnet18.finalMetrics.parameters.replace('M', '') / deit.finalMetrics.parameters.replace('M', '')).toFixed(1);
  const trainingSpeedPercent = ((1 - (parseFloat(resnet18.finalMetrics.trainingTime) / parseFloat(deit.finalMetrics.trainingTime))) * 100).toFixed(0);

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Model Performance Overview</h2>
        <p className="text-slate-400">Key metrics comparison between CNN and Vision Transformer models</p>
      </div>
      
      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard 
          title="Test Accuracy" 
          cnnValue={resnet18.finalMetrics.testAccuracy.toFixed(2)} 
          vitValue={deit.finalMetrics.testAccuracy.toFixed(2)} 
          icon={TrendingUp} 
          unit="%" 
        />
        <MetricCard 
          title="Final Loss" 
          cnnValue={resnet18.finalMetrics.finalLoss.toFixed(4)} 
          vitValue={deit.finalMetrics.finalLoss.toFixed(4)} 
          icon={LineChart} 
        />
        <MetricCard 
          title="Precision" 
          cnnValue={resnet18.finalMetrics.precision.toFixed(2)} 
          vitValue={deit.finalMetrics.precision.toFixed(2)} 
          icon={TrendingUp} 
          unit="%" 
        />
        <MetricCard 
          title="Recall" 
          cnnValue={resnet18.finalMetrics.recall.toFixed(2)} 
          vitValue={deit.finalMetrics.recall.toFixed(2)} 
          icon={TrendingUp} 
          unit="%" 
        />
      </div>

      {/* Model Summaries */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ModelInfoCard
          title="CNN Model(RESNET-18)" 
          params={resnet18.finalMetrics.parameters} 
          training={resnet18.finalMetrics.trainingTime} 
          inference={resnet18.finalMetrics.inferenceTime}
          f1={resnet18.finalMetrics.f1Score.toFixed(2) + '%'}
          color="border-blue-500"
        />
        <ModelInfoCard 
          title="Vision Transformer(deit-tiny-patch16-224)" 
          params={deit.finalMetrics.parameters} 
          training={deit.finalMetrics.trainingTime} 
          inference={deit.finalMetrics.inferenceTime}
          f1={deit.finalMetrics.f1Score.toFixed(2) + '%'}
          color="border-purple-500"
        />
      </div>

      {/* Performance Highlights */}
       <div className="glass p-6 rounded-lg fade-in-up" style={{animationDelay:'180ms'}}>
        <h3 className="text-xl font-bold mb-4 text-center bg-gradient-to-r from-emerald-400 to-sky-400 text-transparent bg-clip-text">Performance Highlights</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <HighlightCard value={`+${accuracyDiff}%`} label="ViT Accuracy Advantage" icon={TrendingUp} />
            <HighlightCard value={`${paramRatio}x`} label="CNN Parameter Efficiency" icon={Cpu} />
            <HighlightCard value={`${trainingSpeedPercent}%`} label="Faster CNN Training" icon={Clock} />
        </div>
      </div>
    </div>
  );
};

export default Overview;