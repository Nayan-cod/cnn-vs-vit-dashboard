"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useDataset } from '@/context/DatasetContext';
import { formatTrainingData } from '@/lib/dataLoader';


const TrainingMetrics = () => {
  const { metrics, datasetConfig } = useDataset();

  if (!metrics) {
    return null;
  }

  const { resnet18, deit } = metrics;
  const trainingData = formatTrainingData(resnet18.epochs, deit.epochs);
  return (
    <div className="space-y-8">
      <div className="text-center fade-in-up">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-fuchsia-400 via-sky-400 to-emerald-400 text-transparent bg-clip-text">Validation Progress</h2>
        <p className="text-slate-300">Validation accuracy and loss curves throughout the training process</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Validation Accuracy Chart */}
        <div className="glass p-6 rounded-lg border border-slate-700 lift fade-in-up">
          <h3 className="text-lg font-semibold mb-4 bg-gradient-to-r from-emerald-400 to-sky-400 text-transparent bg-clip-text">Validation Accuracy</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trainingData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis 
                dataKey="epoch" 
                stroke="#9ca3af" 
                tick={{ fill: '#9ca3af' }} 
                label={{ value: "Epoch", position: "insideBottom", offset: -5, fill: "#9ca3af" }}
              />
              <YAxis 
                stroke="#9ca3af" 
                domain={[30, 100]} 
                tick={{ fill: '#9ca3af' }} 
                tickCount={8}   // controls how many ticks you see
                allowDecimals={false} 
                label={{ value: "Accuracy (%)", angle: -90, position: "insideLeft", fill: "#9ca3af" }}
              />
              <Tooltip formatter={(value) => `${Number(value).toFixed(2)} %`} />
              <Legend />
              <Line type="monotone" dataKey="CNN_Accuracy" name="CNN" stroke="#38bdf8" strokeWidth={2} dot={{ r: 3 }} />
              <Line type="monotone" dataKey="ViT_Accuracy" name="ViT" stroke="#a78bfa" strokeWidth={2} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Validation Loss Chart */}
        <div className="glass p-6 rounded-lg border border-slate-700 lift fade-in-up" style={{animationDelay:'120ms'}}>
          <h3 className="text-lg font-semibold mb-4 bg-gradient-to-r from-amber-400 to-pink-400 text-transparent bg-clip-text">Validation Loss</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trainingData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="epoch" stroke="#9ca3af" tick={{ fill: '#9ca3af' }}/>
              <YAxis stroke="#9ca3af" domain={[0.3, 1.9]} tick={{ fill: '#9ca3af' }}/>
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="CNN_Loss" name="CNN" stroke="#fb7185" strokeWidth={2} />
              <Line type="monotone" dataKey="ViT_Loss" name="ViT" stroke="#f59e0b" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
        {/* Validation Insights */}
        <div className="glass p-6 rounded-lg border border-slate-700 fade-in-up" style={{animationDelay:'180ms'}}>
             <h3 className="text-xl font-bold mb-4 text-center">Validation Insights</h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="bg-slate-900/50 p-4 rounded lift">
                    <h4 className="font-semibold text-blue-400 mb-2">CNN (ResNet-18)</h4>
                    <ul className="list-disc list-inside text-slate-300 space-y-1 text-sm">
                        {datasetConfig.id === 'cifar10' ? (
                          <>
                            <li>Uses <strong>ReLU activation</strong> with <strong>11.2M parameters</strong></li>
                            <li>Achieves <strong>94.29% validation accuracy</strong> in 10 epochs</li>
                            <li>Fast training: <strong>~23 minutes</strong> (8 min shown is per epoch avg)</li>
                            <li>Excellent performance on small images (32×32)</li>
                            <li><strong>Final validation accuracy: 94.92%</strong></li>
                          </>
                        ) : (
                          <>
                            <li>Uses <strong>ReLU activation</strong> with <strong>11.3M parameters</strong></li>
                            <li>Reaches <strong>76.14% validation accuracy</strong> in 10 epochs</li>
                            <li>Training time: <strong>~17.5 minutes</strong> (similar to ViT)</li>
                            <li>Validation loss decreases steadily from ~4.1 to ~1.15</li>
                            <li><strong>Final validation accuracy: 76.14%</strong></li>
                            <li>Moderate performance on 256 complex classes</li>
                          </>
                        )}
                    </ul>
                </div>
                 <div className="bg-slate-900/50 p-4 rounded lift">
                    <h4 className="font-semibold text-purple-400 mb-2">ViT (DeiT-tiny)</h4>
                    <ul className="list-disc list-inside text-slate-300 space-y-1 text-sm">
                        {datasetConfig.id === 'cifar10' ? (
                          <>
                            <li>Uses <strong>GELU activation</strong> with only <strong>5.7M parameters</strong></li>
                            <li>Achieves <strong>95.36% validation accuracy</strong> in 10 epochs</li>
                            <li>Slower training: <strong>~23 minutes</strong> (similar to ResNet)</li>
                            <li>Validation loss already very low (~0.13) from epoch 1</li>
                            <li><strong>Final validation accuracy: 94.92%</strong> (same as CNN!)</li>
                            <li><strong>Why similar accuracy?</strong> CIFAR-10 is simple with only 10 classes. Both architectures easily saturate on this dataset despite using different approaches (CNN's spatial inductive bias vs ViT's global attention).</li>
                          </>
                        ) : (
                          <>
                            <li>Uses <strong>GELU activation</strong> with <strong>5.7M parameters</strong></li>
                            <li>Achieves <strong>85.25% validation accuracy</strong> (+9% over CNN)</li>
                            <li>Training time: <strong>~17.5 minutes</strong> (same as ResNet)</li>
                            <li>Validation loss decreases from ~2.60 to ~0.52</li>
                            <li><strong>Final validation accuracy: 85.25%</strong></li>
                            <li><strong>Why better accuracy?</strong> With 257 complex classes, ViT's self-attention mechanism excels at capturing fine-grained differences and global patterns that CNNs miss.</li>
                            <li><strong>Why same training time?</strong> Both models trained for 10 epochs with similar batch processing, but ViT achieves much better results with fewer parameters due to its superior architecture for complex datasets.</li>
                          </>
                        )}
                    </ul>
                </div>
             </div>
        </div>
    </div>
  );
};

export default TrainingMetrics;