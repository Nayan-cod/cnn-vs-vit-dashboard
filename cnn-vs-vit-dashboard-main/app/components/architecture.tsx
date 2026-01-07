"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const Architecture = () => {
  const resnetParams = [
    { name: 'Convolutional Layers', value: 9.2, color: '#06b6d4' },
    { name: 'Residual Blocks', value: 1.8, color: '#3b82f6' },
    { name: 'Batch Norm', value: 0.12, color: '#8b5cf6' },
    { name: 'Fully Connected', value: 0.005, color: '#ec4899' },
    { name: 'Other', value: 0.075, color: '#10b981' }
  ];

  const deitParams = [
    { name: 'Attention Layers', value: 3.1, color: '#8b5cf6' },
    { name: 'Feed Forward', value: 1.6, color: '#06b6d4' },
    { name: 'Patch Embeddings', value: 0.59, color: '#10b981' },
    { name: 'Layer Norm', value: 0.024, color: '#f59e0b' },
    { name: 'Classification Head', value: 0.196, color: '#ef4444' },
    { name: 'Other', value: 0.02, color: '#ec4899' }
  ];

  const resnetSpecs = {
    layers: [
      { type: 'Input', shape: '32×32×3', params: '0' },
      { type: 'Conv2D (7×7)', shape: '16×16×64', params: '9,408' },
      { type: 'MaxPool2D', shape: '8×8×64', params: '0' },
      { type: 'ResBlock 1.1', shape: '8×8×64', params: '73,984' },
      { type: 'ResBlock 1.2', shape: '8×8×64', params: '147,968' },
      { type: 'ResBlock 2.1', shape: '4×4×128', params: '230,144' },
      { type: 'ResBlock 2.2', shape: '4×4×128', params: '295,424' },
      { type: 'ResBlock 3.1', shape: '2×2×256', params: '919,040' },
      { type: 'ResBlock 3.2', shape: '2×2×256', params: '1,180,160' },
      { type: 'ResBlock 4.1', shape: '1×1×512', params: '3,670,016' },
      { type: 'ResBlock 4.2', shape: '1×1×512', params: '4,720,640' },
      { type: 'AdaptiveAvgPool', shape: '512', params: '0' },
      { type: 'Linear', shape: '10', params: '5,130' }
    ],
    totalParams: '11.2M',
    trainableParams: '11.2M'
  };

  const deitSpecs = {
    config: {
      'Model': 'DeiT-tiny-patch16-224',
      'Image Size': '224×224',
      'Patch Size': '16×16',
      'Num Patches': '196',
      'Embedding Dim': '192',
      'Num Heads': '3',
      'Num Layers': '12',
      'MLP Ratio': '4',
      'Dropout': '0.0',
      'Attention Dropout': '0.0',
      'Drop Path': '0.1'
    },
    totalParams: '5.7M',
    trainableParams: '5.7M'
  };

  const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ name: string; value: number; color: string }> }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-800/95 backdrop-blur-sm border border-slate-600 rounded-xl p-4 shadow-xl z-50">
          <p className="font-semibold text-slate-200">{payload[0].name}</p>
          <p className="text-lg font-bold" style={{ color: payload[0].color }}>
            {payload[0].value}M parameters
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
          Model Architecture Comparison
        </h2>
        <p className="text-slate-400 text-lg">ResNet18 vs DeiT-tiny: Detailed breakdown of model structures and parameter distribution</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* ResNet18 Architecture */}
        <div className="bg-slate-800/70 p-6 rounded-lg border border-slate-700">
          <h3 className="text-2xl font-bold text-slate-300 mb-6 flex items-center">
            <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center mr-4">
              <span className="text-white text-xl">R</span>
            </div>
            ResNet18 Architecture
          </h3>

          <div className="mb-8">
            <h4 className="font-bold text-lg text-slate-300 mb-4 flex items-center">
              <span className="mr-2 text-cyan-400">📊</span>
              Parameter Distribution
            </h4>
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie
                  data={resnetParams}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={100}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {resnetParams.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="#ffffff" strokeWidth={2} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  wrapperStyle={{ paddingTop: '20px' }}
                  iconType="circle"
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-slate-900/60 backdrop-blur-sm rounded-xl p-4 mb-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-cyan-400">{resnetSpecs.totalParams}</div>
                <div className="text-sm text-slate-400">Total Parameters</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">{resnetSpecs.trainableParams}</div>
                <div className="text-sm text-slate-400">Trainable Parameters</div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-lg text-slate-300 mb-4 flex items-center">
              <span className="mr-2 text-blue-400">🔧</span>
              Layer Structure
            </h4>
            <div className="space-y-2">
              {resnetSpecs.layers.map((layer, idx) => (
                <div key={idx} className="flex justify-between items-center bg-slate-900/80 backdrop-blur-sm rounded-lg p-3 text-sm border border-slate-600">
                  <span className="font-semibold text-slate-300">{layer.type}</span>
                  <span className="text-slate-400 font-medium">{layer.shape}</span>
                  <span className="text-cyan-400 font-bold">{layer.params}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* DeiT-tiny Architecture */}
        <div className="bg-slate-800/70 p-6 rounded-lg border border-slate-700">
          <h3 className="text-2xl font-bold text-slate-300 mb-6 flex items-center">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mr-4">
              <span className="text-white text-xl">V</span>
            </div>
            DeiT-tiny Architecture
          </h3>

          <div className="mb-8">
            <h4 className="font-bold text-lg text-slate-300 mb-4 flex items-center">
              <span className="mr-2 text-purple-400">📊</span>
              Parameter Distribution
            </h4>
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie
                  data={deitParams}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={100}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {deitParams.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="#ffffff" strokeWidth={2} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  wrapperStyle={{ paddingTop: '20px' }}
                  iconType="circle"
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-slate-900/60 backdrop-blur-sm rounded-xl p-4 mb-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">{deitSpecs.totalParams}</div>
                <div className="text-sm text-slate-400">Total Parameters</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-pink-400">{deitSpecs.trainableParams}</div>
                <div className="text-sm text-slate-400">Trainable Parameters</div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-lg text-slate-300 mb-4 flex items-center">
              <span className="mr-2 text-purple-400">⚙️</span>
              Configuration
            </h4>
            <div className="space-y-2">
              {Object.entries(deitSpecs.config).map(([key, value], idx) => (
                <div key={idx} className="flex justify-between items-center bg-slate-900/80 backdrop-blur-sm rounded-lg p-3 text-sm border border-slate-600">
                  <span className="font-semibold text-slate-300">{key}:</span>
                  <span className="text-purple-400 font-bold">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Architecture Comparison */}
      <div className="bg-slate-800/70 p-6 rounded-lg border border-slate-700">
        <h3 className="text-2xl font-bold mb-6 flex items-center text-slate-300">
          <span className="mr-3 text-yellow-400">⚖️</span>
          Architecture Comparison
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl p-6 border border-slate-600">
            <h4 className="font-bold text-xl mb-4 flex items-center text-cyan-400">
              <span className="mr-2">🏗️</span>
              ResNet18 Strengths
            </h4>
            <ul className="space-y-2 text-slate-300">
              <li>• Efficient convolutional operations</li>
              <li>• Residual connections prevent vanishing gradients</li>
              <li>• Well-suited for spatial feature extraction</li>
              <li>• Lower computational complexity</li>
              <li>• Faster training and inference</li>
            </ul>
          </div>
          <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl p-6 border border-slate-600">
            <h4 className="font-bold text-xl mb-4 flex items-center text-purple-400">
              <span className="mr-2">🎯</span>
              DeiT-tiny Strengths
            </h4>
            <ul className="space-y-2 text-slate-300">
              <li>• Global attention mechanism</li>
              <li>• Better long-range dependencies</li>
              <li>• Superior performance on complex patterns</li>
              <li>• Self-attention captures relationships</li>
              <li>• State-of-the-art accuracy</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Architecture;