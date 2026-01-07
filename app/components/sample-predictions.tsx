"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Check, X } from 'lucide-react';

const predictionData = {
  cnn: [
    { trueLabel: 'Cat', predLabel: 'Cat', confidence: 94.2, image: '/images/cat1.png' },
    { trueLabel: 'Ship', predLabel: 'Ship', confidence: 96.8, image: '/images/ship1.png' },
    { trueLabel: 'Ship', predLabel: 'Ship', confidence: 89.3, image: '/images/ship2.png' },
    { trueLabel: 'Airplane', predLabel: 'Ship', confidence: 67.4, image: '/images/airplane1.png' }, // Incorrect
    { trueLabel: 'Frog', predLabel: 'Frog', confidence: 92.1, image: '/images/frog1.png' },
    { trueLabel: 'Frog', predLabel: 'Frog', confidence: 88.7, image: '/images/frog2.png' },
    { trueLabel: 'Auto', predLabel: 'Auto', confidence: 95.6, image: '/images/auto1.png' },
    { trueLabel: 'Frog', predLabel: 'Frog', confidence: 91.4, image: '/images/frog3.png' },
    { trueLabel: 'Cat', predLabel: 'Cat', confidence: 87.9, image: '/images/cat2.png' },
    { trueLabel: 'Auto', predLabel: 'Cat', confidence: 72.3, image: '/images/auto2.png' }, // Incorrect
    { trueLabel: 'Airplane', predLabel: 'Airplane', confidence: 93.8, image: '/images/airplane2.png' },
    { trueLabel: 'Truck', predLabel: 'Truck', confidence: 94.5, image: '/images/truck1.png' },
    { trueLabel: 'Dog', predLabel: 'Dog', confidence: 89.9, image: '/images/dog1.png' },
    { trueLabel: 'Horse', predLabel: 'Horse', confidence: 96.2, image: '/images/horse1.png' },
    { trueLabel: 'Truck', predLabel: 'Truck', confidence: 92.7, image: '/images/truck2.png' },
    { trueLabel: 'Ship', predLabel: 'Ship', confidence: 88.9, image: '/images/ship3.png' },
  ],
  vit: [
    { trueLabel: 'Cat', predLabel: 'Cat', confidence: 96.8, image: '/images/cat1.png' },
    { trueLabel: 'Ship', predLabel: 'Ship', confidence: 98.2, image: '/images/ship1.png' },
    { trueLabel: 'Ship', predLabel: 'Ship', confidence: 94.7, image: '/images/ship2.png' },
    { trueLabel: 'Airplane', predLabel: 'Airplane', confidence: 95.3, image: '/images/airplane1.png' },
    { trueLabel: 'Frog', predLabel: 'Frog', confidence: 94.6, image: '/images/frog1.png' },
    { trueLabel: 'Frog', predLabel: 'Frog', confidence: 91.8, image: '/images/frog2.png' },
    { trueLabel: 'Auto', predLabel: 'Auto', confidence: 97.4, image: '/images/auto1.png' },
    { trueLabel: 'Frog', predLabel: 'Frog', confidence: 93.2, image: '/images/frog3.png' },
    { trueLabel: 'Cat', predLabel: 'Cat', confidence: 92.5, image: '/images/cat2.png' },
    { trueLabel: 'Auto', predLabel: 'Auto', confidence: 89.7, image: '/images/auto2.png' },
    { trueLabel: 'Airplane', predLabel: 'Airplane', confidence: 96.1, image: '/images/airplane2.png' },
    { trueLabel: 'Truck', predLabel: 'Truck', confidence: 95.8, image: '/images/truck1.png' },
    { trueLabel: 'Dog', predLabel: 'Dog', confidence: 94.3, image: '/images/dog1.png' },
    { trueLabel: 'Horse', predLabel: 'Horse', confidence: 97.9, image: '/images/horse1.png' },
    { trueLabel: 'Truck', predLabel: 'Truck', confidence: 93.4, image: '/images/truck2.png' },
    { trueLabel: 'Ship', predLabel: 'Ship', confidence: 91.6, image: '/images/ship3.png' },
  ]
};

const SamplePredictions = () => {
  const [activeModel, setActiveModel] = useState<'cnn' | 'vit'>('cnn');
  const data = predictionData[activeModel];

  const correctCount = data.filter(p => p.trueLabel === p.predLabel).length;
  const totalCount = data.length;
  const accuracy = ((correctCount / totalCount) * 100).toFixed(1);

  return (
    <div className="space-y-8">
      <div className="text-center fade-in-up">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-fuchsia-400 via-sky-400 to-emerald-400 text-transparent bg-clip-text">Sample Predictions</h2>
        <p className="text-slate-300">Visual examples of model predictions on CIFAR-10 test images</p>
      </div>

       <div className="flex justify-center glass p-1.5 rounded-lg max-w-sm mx-auto fade-in-up" style={{animationDelay:'120ms'}}>
        <button
          onClick={() => setActiveModel('cnn')}
          className={`w-1/2 py-2 text-sm font-semibold rounded-md transition-all duration-300 lift ${activeModel === 'cnn' ? 'bg-gradient-to-r from-blue-500 to-cyan-500 shadow-md' : 'hover:bg-slate-700/50'}`}
        >
          CNN Predictions
        </button>
        <button
          onClick={() => setActiveModel('vit')}
          className={`w-1/2 py-2 text-sm font-semibold rounded-md transition-all duration-300 lift ${activeModel === 'vit' ? 'bg-gradient-to-r from-purple-500 to-pink-500 shadow-md' : 'hover:bg-slate-700/50'}`}
        >
          ViT Predictions
        </button>
      </div>

      <div className="glass p-4 rounded-lg border border-slate-700 fade-in-up" style={{animationDelay:'180ms'}}>
        <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">{activeModel.toUpperCase()} Sample Predictions</h3>
            <p className="text-sm font-semibold">
                Accuracy on samples: 
                <span className={correctCount === totalCount ? 'text-green-400' : 'text-yellow-400'}>
                    {` ${accuracy}% (${correctCount}/${totalCount})`}
                </span>
            </p>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {data.map((p, i) => {
            const isCorrect = p.trueLabel === p.predLabel;
            return (
              <div key={i} className={`glass rounded-lg p-3 border-2 lift ${isCorrect ? 'border-green-500/80' : 'border-red-500/80'}`}>
                {/* Actual Image */}
                <div className="w-full h-32 bg-slate-700 rounded-md mb-3 overflow-hidden">
                    <Image 
                        src={p.image} 
                        alt={`${p.trueLabel} sample image`}
                        width={128}
                        height={128}
                        className="w-full h-full object-cover"
                        unoptimized
                        priority={i < 4}
                    />
                </div>
                <div className="text-sm text-center">
                    <p>True: <span className="font-semibold text-slate-300">{p.trueLabel}</span></p>
                    <p>Pred: <span className={`font-semibold ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>{p.predLabel}</span></p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="glass p-6 rounded-lg border border-slate-700 lift fade-in-up" style={{animationDelay:'240ms'}}>
              <h3 className="font-semibold mb-4 text-lg bg-gradient-to-r from-emerald-400 to-sky-400 text-transparent bg-clip-text">Prediction Analysis</h3>
              <div className="space-y-3">
                  <div className="flex items-center justify-between bg-slate-900/50 p-3 rounded lift">
                      <span className="flex items-center"><Check size={16} className="mr-2 text-green-500"/>Correct Predictions</span>
                      <span className="font-bold text-2xl text-green-400">{correctCount}</span>
                  </div>
                  <div className="flex items-center justify-between bg-slate-900/50 p-3 rounded lift">
                      <span className="flex items-center"><X size={16} className="mr-2 text-red-500"/>Incorrect Predictions</span>
                      <span className="font-bold text-2xl text-red-400">{totalCount - correctCount}</span>
                  </div>
              </div>
          </div>
           <div className="glass p-6 rounded-lg border border-slate-700 lift fade-in-up" style={{animationDelay:'300ms'}}>
              <h3 className="font-semibold mb-4 text-lg bg-gradient-to-r from-amber-400 to-pink-400 text-transparent bg-clip-text">Key Observations</h3>
              <ul className="space-y-2 text-sm text-slate-300 list-disc list-inside">
                  <li>Green border indicates a correct prediction.</li>
                  <li>Red border shows a misclassified sample.</li>
                  <li>Both models show strong performance on clear, well-defined objects like vehicles.</li>
                
              </ul>
          </div>
      </div>
    </div>
  );
};

export default SamplePredictions;