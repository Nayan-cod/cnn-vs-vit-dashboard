"use client";

import React, { useState } from 'react';
import { BarChart, Key } from 'lucide-react';

// --- Data based on the video ---
const labels = ["Airplane", "Automobile", "Bird", "Cat", "Deer", "Dog", "Frog", "Horse", "Ship", "Truck"];

const cnnMatrixData = [
  [790, 25, 30, 13, 17, 5, 2, 13, 75, 30],
  [15, 861, 4, 5, 0, 4, 6, 5, 12, 88],
  [0, 0, 646, 43, 97, 54, 62, 24, 6, 4],
  [10, 5, 52, 517, 76, 205, 70, 41, 11, 13],
  [17, 1, 42, 30, 704, 23, 32, 60, 6, 5],
  [8, 0, 36, 81, 33, 747, 30, 58, 4, 3],
  [7, 6, 24, 31, 25, 36, 858, 7, 3, 3],
  [16, 2, 14, 21, 40, 44, 5, 844, 1, 13],
  [61, 31, 11, 7, 6, 2, 3, 3, 846, 28],
  [25, 63, 5, 8, 0, 3, 3, 19, 23, 851]
];

const vitMatrixData = [
    [979, 1, 3, 1, 0, 0, 3, 0, 10, 3],
    [1, 986, 0, 0, 0, 0, 0, 0, 1, 12],
    [2, 0, 969, 9, 8, 6, 4, 1, 1, 0],
    [1, 1, 1, 928, 6, 47, 6, 5, 1, 0],
    [0, 0, 9, 4, 971, 3, 4, 8, 1, 0],
    [0, 0, 0, 35, 1, 949, 3, 3, 0, 0],
    [2, 0, 5, 8, 2, 4, 979, 0, 0, 0],
    [3, 0, 3, 4, 6, 11, 1, 973, 0, 0],
    [6, 4, 1, 0, 0, 0, 0, 0, 985, 4],
    [3, 20, 0, 0, 0, 0, 0, 0, 4, 973]
];

const cnnClassPerformance = {
Airplane: { precision: "78.0%", recall: "79.0%", f1: "78.5%" },
Automobile: { precision: "86.6%", recall: "86.1%", f1: "86.4%" },
Bird: { precision: "74.8%", recall: "64.6%", f1: "69.3%" },
Cat: { precision: "68.4%", recall: "51.7%", f1: "58.9%" },
Deer: { precision: "72.9%", recall: "78.4%", f1: "75.5%" },
Dog: { precision: "66.5%", recall: "74.7%", f1: "70.4%" },
Frog: { precision: "80.1%", recall: "85.8%", f1: "82.9%" },
Horse: { precision: "78.4%", recall: "84.4%", f1: "81.3%" },
Ship: { precision: "85.6%", recall: "84.6%", f1: "85.1%" },
Truck: { precision: "81.9%", recall: "85.1%", f1: "83.5%" }
};

const vitClassPerformance = {
Airplane: { precision: "98.0%", recall: "98.0%", f1: "98.0%" },
Automobile: { precision: "97.0%", recall: "99.0%", f1: "98.0%" },
Bird: { precision: "97.0%", recall: "97.0%", f1: "97.0%" },
Cat: { precision: "93.0%", recall: "93.0%", f1: "93.0%" },
Deer: { precision: "97.0%", recall: "97.0%", f1: "97.0%" },
Dog: { precision: "93.0%", recall: "95.0%", f1: "94.0%" },
Frog: { precision: "98.0%", recall: "98.0%", f1: "98.0%" },
Horse: { precision: "98.0%", recall: "97.0%", f1: "98.0%" },
Ship: { precision: "98.0%", recall: "98.0%", f1: "98.0%" },
Truck: { precision: "98.0%", recall: "97.0%", f1: "98.0%" }
};

// Function to find max values for each metric
const findMaxValues = (performance: Record<string, { precision: string; recall: string; f1: string }>) => {
  const metrics = ['precision', 'recall', 'f1'] as const;
  const maxValues: Record<string, { value: number; class: string }> = {};
  
  metrics.forEach(metric => {
    let max = 0;
    let maxClass = '';
    
    Object.entries(performance).forEach(([className, classMetrics]) => {
      const value = parseFloat(classMetrics[metric].replace('%', ''));
      if (value > max) {
        max = value;
        maxClass = className;
      }
    });
    
    maxValues[metric] = { value: max, class: maxClass };
  });
  
  return maxValues;
};

const ConfusionMatrix = () => {
  const [activeModel, setActiveModel] = useState<'cnn' | 'vit'>('cnn');

  const data = activeModel === 'cnn' ? {
    matrix: cnnMatrixData,
    performance: cnnClassPerformance,
    
  } : {
    matrix: vitMatrixData,
    performance: vitClassPerformance,
    
  };

  const maxValues = findMaxValues(data.performance);

  return (
    <div className="space-y-8">
      <div className="text-center fade-in-up">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-fuchsia-400 via-sky-400 to-emerald-400 text-transparent bg-clip-text">Confusion Matrix Analysis</h2>
        <p className="text-slate-300">Detailed classification performance for each CIFAR-10 class</p>
      </div>

      {/* Model Toggle */}
      <div className="flex justify-center glass p-1.5 rounded-lg max-w-sm mx-auto fade-in-up" style={{animationDelay:'120ms'}}>
        <button
          onClick={() => setActiveModel('cnn')}
          className={`w-1/2 py-2 text-sm font-semibold rounded-md transition-all duration-300 lift ${activeModel === 'cnn' ? 'bg-gradient-to-r from-blue-500 to-cyan-500 shadow-md' : 'hover:bg-slate-700/50'}`}
        >
          CNN Model
        </button>
        <button
          onClick={() => setActiveModel('vit')}
          className={`w-1/2 py-2 text-sm font-semibold rounded-md transition-all duration-300 lift ${activeModel === 'vit' ? 'bg-gradient-to-r from-purple-500 to-pink-500 shadow-md' : 'hover:bg-slate-700/50'}`}
        >
          ViT Model
        </button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Confusion Matrix */}
        <div className="lg:col-span-2 bg-slate-800/70 p-4 sm:p-6 rounded-lg border border-slate-700">
          <h3 className="text-xl font-semibold mb-4">{activeModel.toUpperCase()} Confusion Matrix</h3>
          <div className="overflow-x-auto">
            <div className="grid grid-cols-11 gap-1 text-xs font-mono">
              {/* Header */}
              <div className="text-center font-sans font-bold text-slate-400 pb-2">True Label</div>
              {labels.map(label => <div key={label} className="text-center font-sans font-semibold text-slate-400 pb-2 truncate">{label}</div>)}

              {/* Matrix Body */}
              {data.matrix.map((row, i) => (
                <React.Fragment key={i}>
                  <div className="text-right font-sans font-semibold text-slate-400 pr-2 truncate self-center">{labels[i]}</div>
                  {row.map((value, j) => (
                    <div key={`${i}-${j}`} className={`flex items-center justify-center p-2 rounded-md aspect-square
                      ${i === j 
                        ? 'bg-blue-800/80 text-white font-bold' 
                        : value > 50 
                        ? 'bg-slate-600/70' 
                        : value > 10
                        ? 'bg-slate-700/70'
                        : 'bg-slate-800/50 text-slate-400'
                      }`}
                      title={`${value}`}
                    >
                      {value}
                    </div>
                  ))}
                </React.Fragment>
              ))}
            </div>
          </div>
          <div className="text-center mt-2">
            <span className="text-xs font-sans font-semibold text-slate-400">Predicted Label</span>
          </div>
          <div className="flex justify-between items-center mt-4 text-sm">
              <p className="font-semibold"></p>
              <div className="flex items-center gap-2 text-slate-400">
                  <span>Low</span>
                  <div className="flex">
                      <div className="w-6 h-4 bg-slate-800/50 rounded-l-sm"></div>
                      <div className="w-6 h-4 bg-slate-700/70"></div>
                      <div className="w-6 h-4 bg-slate-600/70"></div>
                      <div className="w-6 h-4 bg-blue-800/80 rounded-r-sm"></div>
                  </div>
                  <span>High</span>
              </div>
          </div>
        </div>

        {/* Side Panel */}
        <div className="space-y-6">
          <div className="bg-slate-800/70 p-6 rounded-lg border border-slate-700">
            <h3 className="flex items-center text-lg font-semibold mb-4"><BarChart size={20} className="mr-2 text-green-400"/>Class Performance</h3>
            <div className="space-y-4">
              {Object.entries(data.performance).map(([className, metrics]) => (
                <div key={className} className="bg-slate-900/50 p-3 rounded">
                  <p className="font-bold text-slate-300">{className}</p>
                  <div className="flex justify-between text-xs text-slate-400 mt-1">
                    <span>Precision: <span className={`${className === maxValues.precision.class ? 'text-green-400 font-bold' : 'text-slate-200'}`}>{metrics.precision}</span></span>
                    <span>Recall: <span className={`${className === maxValues.recall.class ? 'text-green-400 font-bold' : 'text-slate-200'}`}>{metrics.recall}</span></span>
                    <span>F1-Score: <span className={`${className === maxValues.f1.class ? 'text-green-400 font-bold' : 'text-slate-200'}`}>{metrics.f1}</span></span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-800/70 p-6 rounded-lg border border-slate-700">
            <h3 className="flex items-center text-lg font-semibold mb-4"><Key size={20} className="mr-2 text-yellow-400"/>Key Insights</h3>
            <ul className="space-y-2 text-sm text-slate-300 list-disc list-inside">
              {activeModel === 'cnn' ? (
                <>
                  <li>CNN shows <strong>moderate performance</strong> with 89.6% overall accuracy.</li>
                  <li>Strongest performance on <strong>Automobile</strong> (86.6% precision, 86.1% recall).</li>
                  <li>Struggles most with <strong>Cat classification</strong> (68.4% precision, 51.7% recall).</li>
                  <li>Significant confusion between <strong>Cat and Dog</strong> classes (205 misclassifications).</li>
                  <li>Bird class shows <strong>low recall</strong> (64.6%) due to confusion with Deer and Dog.</li>
                  <li>Frog and Horse classes perform well with <strong>high F1-scores</strong> (82.9% and 81.3%).</li>
                </>
              ) : (
                <>
                  <li>ViT demonstrates <strong>excellent performance</strong> with 97.3% overall accuracy.</li>
                  <li>Outstanding performance across most classes with <strong>F1-scores above 93%</strong>.</li>
                  <li>Best performance on <strong>Automobile</strong> (97% precision, 99% recall).</li>
                  <li>Minimal confusion between classes with <strong>very low off-diagonal values</strong>.</li>
                  <li>Cat and Dog classes show <strong>improved performance</strong> compared to CNN.</li>
                  <li>Consistent high performance across all classes with <strong>minimal overfitting</strong>.</li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfusionMatrix;