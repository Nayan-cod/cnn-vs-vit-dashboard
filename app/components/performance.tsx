"use client";

import { BarChart, Bar, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useDataset } from '@/context/DatasetContext';


const Performance = () => {
  const { metrics } = useDataset();

  if (!metrics) {
    return null;
  }

  const { resnet18, deit } = metrics;

  // Overall metrics
  const overallMetricsData = [
    { name: 'Accuracy', CNN: resnet18.finalMetrics.testAccuracy, ViT: deit.finalMetrics.testAccuracy },
    { name: 'Precision', CNN: resnet18.finalMetrics.precision, ViT: deit.finalMetrics.precision },
    { name: 'Recall', CNN: resnet18.finalMetrics.recall, ViT: deit.finalMetrics.recall },
    { name: 'F1-Score', CNN: resnet18.finalMetrics.f1Score, ViT: deit.finalMetrics.f1Score },
  ];

  // Radar chart with normalized scores
  const radarChartData = [
    { subject: 'Accuracy', CNN: resnet18.finalMetrics.testAccuracy, ViT: deit.finalMetrics.testAccuracy, fullMark: 100 },
    { subject: 'Precision', CNN: resnet18.finalMetrics.precision, ViT: deit.finalMetrics.precision, fullMark: 100 },
    { subject: 'Recall', CNN: resnet18.finalMetrics.recall, ViT: deit.finalMetrics.recall, fullMark: 100 },
    { subject: 'F1-Score', CNN: resnet18.finalMetrics.f1Score, ViT: deit.finalMetrics.f1Score, fullMark: 100 },
    { subject: 'Training Speed', CNN: 85, ViT: 25, fullMark: 100 },
    { subject: 'Inference Speed', CNN: 70, ViT: 85, fullMark: 100 },
    { subject: 'Parameter Efficiency', CNN: 60, ViT: 90, fullMark: 100 },
    { subject: 'Memory Usage', CNN: 80, ViT: 40, fullMark: 100 },
  ];

  // Per-class accuracy (limit to top 10 for visibility)
  const perClassAccuracyData = resnet18.classes.slice(0, 10).map((cls, idx) => ({
    name: cls.className.replace(/^\d+-/, '').substring(0, 15), // Clean class names
    CNN: cls.recall,
    ViT: deit.classes[idx]?.recall || 0,
  }));
  return (
    <div className="space-y-8">
       <div className="text-center">
        <h2 className="text-2xl font-bold">Performance Analysis</h2>
        <p className="text-slate-400">Comprehensive comparison of model performance across different metrics</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-slate-800/70 p-6 rounded-lg border border-slate-700">
          <h3 className="text-lg font-semibold mb-4">Overall Performance Metrics</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={overallMetricsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#9ca3af" tick={{ fill: '#9ca3af', fontSize: 12 }} />
              <YAxis stroke="#9ca3af" domain={[60, 100]} tick={{ fill: '#9ca3af' }} tickCount={10}/>
              <Tooltip />
              <Legend />
              <Bar dataKey="CNN" fill="#3b82f6" />
              <Bar dataKey="ViT" fill="#8b5cf6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
         <div className="bg-slate-800/70 p-6 rounded-lg border border-slate-700">
          <h3 className="text-lg font-semibold mb-4">Performance Radar Chart</h3>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarChartData}>
              <PolarGrid stroke="#4b5563"/>
              <PolarAngleAxis dataKey="subject" tick={{ fill: '#d1d5db', fontSize: 12 }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
              <Tooltip />
              <Legend />
              <Radar name="CNN" dataKey="CNN" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
              <Radar name="ViT" dataKey="ViT" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.6} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="bg-slate-800/70 p-6 rounded-lg border border-slate-700">
        <h3 className="text-lg font-semibold mb-4">Per-Class Accuracy Comparison</h3>
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={perClassAccuracyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151"/>
                <XAxis dataKey="name" stroke="#9ca3af" tick={{ fill: '#9ca3af', fontSize: 12 }} />
                <YAxis stroke="#9ca3af" domain={[0, 110]} tick={{ fill: '#9ca3af' }} tickCount={10} />
                <Tooltip />
                <Legend />
                <Bar dataKey="CNN" fill="#f97316" />
                <Bar dataKey="ViT" fill="#eab308" />
            </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-slate-800/70 p-6 rounded-lg border border-slate-700">
          <h3 className="text-lg font-semibold mb-4">Computational Efficiency</h3>
          <div className="space-y-3 text-sm">
            {['Training Time (min)', 'Inference Time (ms)', 'Memory Usage (MB)', 'Parameters (M)'].map((metric, i) => (
              <div key={metric} className="bg-slate-900/50 p-3 rounded">
                <p className="font-semibold text-slate-300 mb-2">{metric}</p>
                <div className="flex justify-around">
                  <span>CNN: <span className="font-mono text-blue-400">{[8, 8.91,18, 11.7][i]}</span></span>
                  <span>ViT: <span className="font-mono text-purple-400">{[32.4, 6.42, 22.18, 5.7][i]}</span></span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-slate-800/70 p-6 rounded-lg border border-slate-700">
          <h3 className="text-lg font-semibold mb-4">Model Comparison Summary</h3>
          <div className="space-y-4">
            <div className="bg-blue-900/30 p-4 rounded">
                <h4 className="font-bold text-blue-400">CNN Model</h4>
                <p className="text-xs mt-1">Best for: <span className="font-semibold">Reliability & Speed </span></p>
                <p className="text-sm mt-2">Excels in applications where a proven, fast, and computationally efficient model is required. It serves as a strong, industry-standard baseline for a wide variety of computer vision tasks.</p>
            </div>
             <div className="bg-purple-900/30 p-4 rounded">
                <h4 className="font-bold text-purple-400">ViT Model</h4>
                <p className="text-xs mt-1">Best for: <span className="font-semibold">High Accuracy</span></p>
                <p className="text-sm mt-2">The ideal choice for achieving state-of-the-art Transformer performance without massive datasets. It provides a superior accuracy-to-compute ratio compared to traditional CNNs of similar size.</p>
            </div>
             <div className="bg-green-900/30 p-4 rounded">
                <h4 className="font-bold text-green-400">Recommendation</h4>
                <p className="text-sm mt-2">Choose ResNet-18 for its proven reliability and fast performance in standard applications. Choose DeiT-tiny when the primary goal is to maximize accuracy with a modern, data-efficient architecture.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Performance;