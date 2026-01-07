"use client";

import { useDataset } from '@/context/DatasetContext';
import { FileText, Activity, Layers, TrendingUp, AlertCircle } from 'lucide-react';

const Report = () => {
  const { datasetConfig } = useDataset();
  const isCifar10 = datasetConfig.id === 'cifar10';

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-fuchsia-400 via-sky-400 to-emerald-400 text-transparent bg-clip-text">
          Technical Report: {datasetConfig.name}
        </h2>
        <p className="text-slate-300">Comprehensive analysis of model architectures, activation functions, and performance</p>
      </div>

      {/* Activation Functions Section */}
      <div className="glass p-6 rounded-lg border border-slate-700">
        <h3 className="text-xl font-bold mb-4 flex items-center">
          <Activity className="mr-2 text-emerald-400" size={24} />
          Activation Functions Analysis
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-slate-900/50 p-5 rounded-lg border border-blue-500/30">
            <h4 className="font-bold text-blue-400 mb-3 text-lg">ReLU (ResNet-18)</h4>
            <div className="space-y-2 text-sm text-slate-300">
              <p><strong>Formula:</strong> <code className="bg-slate-800 px-2 py-1 rounded">f(x) = max(0, x)</code></p>
              <p><strong>Characteristics:</strong></p>
              <ul className="list-disc list-inside ml-2 space-y-1">
                <li>Simple and computationally efficient</li>
                <li>Induces sparsity (outputs exactly 0 for negative inputs)</li>
                <li>Can suffer from "dying ReLU" problem</li>
                <li>Non-differentiable at x=0</li>
                <li>Range: [0, ∞)</li>
              </ul>
              <p className="mt-3"><strong>Why used in ResNet:</strong></p>
              <ul className="list-disc list-inside ml-2 space-y-1">
                <li>Fast forward and backward propagation</li>
                <li>Works well with convolutional layers</li>
                <li>Proven track record in CNN architectures</li>
                <li>Helps mitigate vanishing gradient problem</li>
              </ul>
            </div>
          </div>

          <div className="bg-slate-900/50 p-5 rounded-lg border border-purple-500/30">
            <h4 className="font-bold text-purple-400 mb-3 text-lg">GELU (DeiT-tiny)</h4>
            <div className="space-y-2 text-sm text-slate-300">
              <p><strong>Formula:</strong> <code className="bg-slate-800 px-2 py-1 rounded text-xs">f(x) = x · Φ(x)</code> where Φ is Gaussian CDF</p>
              <p><strong>Characteristics:</strong></p>
              <ul className="list-disc list-inside ml-2 space-y-1">
                <li>Smooth and differentiable everywhere</li>
                <li>Probabilistic interpretation (stochastic regularizer)</li>
                <li>Non-monotonic (slight negative values allowed)</li>
                <li>Better gradient flow than ReLU</li>
                <li>Range: (-0.17, ∞) approximately</li>
              </ul>
              <p className="mt-3"><strong>Why used in Transformers:</strong></p>
              <ul className="list-disc list-inside ml-2 space-y-1">
                <li>Superior performance in attention mechanisms</li>
                <li>Smoother optimization landscape</li>
                <li>Better captures complex patterns</li>
                <li>Standard in modern transformer architectures</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 p-4 rounded-lg border border-slate-600">
          <h4 className="font-semibold text-yellow-400 mb-2">Key Differences</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-slate-300">
            <div>
              <p className="font-semibold text-emerald-400">Smoothness:</p>
              <p>GELU is smooth everywhere; ReLU has a sharp corner at x=0</p>
            </div>
            <div>
              <p className="font-semibold text-emerald-400">Non-linearity:</p>
              <p>GELU is more expressive with probabilistic behavior</p>
            </div>
            <div>
              <p className="font-semibold text-emerald-400">Computation:</p>
              <p>ReLU is faster; GELU trades speed for better representation</p>
            </div>
          </div>
        </div>
      </div>

      {/* Model Architecture Comparison */}
      <div className="glass p-6 rounded-lg border border-slate-700">
        <h3 className="text-xl font-bold mb-4 flex items-center">
          <Layers className="mr-2 text-sky-400" size={24} />
          Architecture & Parameters
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-slate-900/50 p-5 rounded-lg">
            <h4 className="font-bold text-blue-400 mb-3">ResNet-18 (CNN)</h4>
            <div className="space-y-2 text-sm text-slate-300">
              <p><strong>Total Parameters:</strong> {isCifar10 ? '11.2M' : '11.3M'}</p>
              <p><strong>Architecture Type:</strong> Convolutional Neural Network</p>
              <p><strong>Key Components:</strong></p>
              <ul className="list-disc list-inside ml-2 space-y-1">
                <li>18 weight layers deep</li>
                <li>4 residual blocks with skip connections</li>
                <li>Convolutional layers: ~9.2M params</li>
                <li>Batch normalization layers</li>
                <li>Global average pooling</li>
                <li>Final fully connected layer</li>
              </ul>
              <p className="mt-3"><strong>Design Philosophy:</strong></p>
              <p className="italic">Spatial inductive bias through local receptive fields and hierarchical feature extraction</p>
            </div>
          </div>

          <div className="bg-slate-900/50 p-5 rounded-lg">
            <h4 className="font-bold text-purple-400 mb-3">DeiT-tiny (Vision Transformer)</h4>
            <div className="space-y-2 text-sm text-slate-300">
              <p><strong>Total Parameters:</strong> 5.7M (48% fewer!)</p>
              <p><strong>Architecture Type:</strong> Vision Transformer</p>
              <p><strong>Key Components:</strong></p>
              <ul className="list-disc list-inside ml-2 space-y-1">
                <li>12 transformer encoder layers</li>
                <li>Multi-head self-attention: ~3.1M params</li>
                <li>Feed-forward networks: ~1.6M params</li>
                <li>Patch embeddings: 16×16 patches</li>
                <li>Layer normalization (not batch norm)</li>
                <li>Classification token (CLS)</li>
              </ul>
              <p className="mt-3"><strong>Design Philosophy:</strong></p>
              <p className="italic">Global attention mechanism captures long-range dependencies without spatial assumptions</p>
            </div>
          </div>
        </div>

        <div className="mt-4 bg-gradient-to-r from-orange-900/20 to-red-900/20 p-4 rounded-lg border border-slate-600">
          <h4 className="font-semibold text-orange-400 mb-2">Why Different Parameter Counts?</h4>
          <p className="text-sm text-slate-300">
            Despite having fewer parameters, DeiT can be more expressive because:
          </p>
          <ul className="list-disc list-inside ml-4 text-sm text-slate-300 mt-2 space-y-1">
            <li><strong>Attention is parameter-efficient:</strong> Self-attention learns relationships dynamically rather than through fixed kernel weights</li>
            <li><strong>Global context:</strong> Each patch attends to all other patches, unlike CNN's local receptive fields</li>
            <li><strong>Fewer redundant computations:</strong> No need for multiple conv layers to build up receptive field size</li>
          </ul>
        </div>
      </div>

      {/* Results Analysis */}
      <div className="glass p-6 rounded-lg border border-slate-700">
        <h3 className="text-xl font-bold mb-4 flex items-center">
          <TrendingUp className="mr-2 text-emerald-400" size={24} />
          Performance Analysis: {datasetConfig.name}
        </h3>

        {isCifar10 ? (
          <div className="space-y-4">
            <div className="bg-green-900/20 p-4 rounded-lg border border-green-600/30">
              <h4 className="font-bold text-green-400 mb-2">Why Similar Accuracy? (~94-95%)</h4>
              <div className="space-y-2 text-sm text-slate-300">
                <p><strong>Dataset Saturation:</strong> CIFAR-10 has only 10 classes with relatively simple patterns. Both architectures are powerful enough to learn these patterns fully.</p>
                <p><strong>Model Capacity:</strong> Both 11.2M params (CNN) and 5.7M params (ViT) far exceed what's needed for 10 classes.</p>
                <p><strong>Training Convergence:</strong> Both models converge to similar validation accuracy (~94.92%) indicating they've learned the optimal decision boundaries.</p>
                <p className="mt-3"><strong>Key Insight:</strong> On simple datasets, architecture choice matters less than on complex ones. Both CNNs and ViTs can saturate performance.</p>
              </div>
            </div>

            <div className="bg-blue-900/20 p-4 rounded-lg border border-blue-600/30">
              <h4 className="font-bold text-blue-400 mb-2">Training Time Analysis</h4>
              <div className="space-y-2 text-sm text-slate-300">
                <p><strong>Similar Duration (~23 minutes):</strong></p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>CIFAR-10's small 32×32 images process quickly in both architectures</li>
                  <li>ViT's patch size (16×16) creates only 4 patches, reducing attention complexity</li>
                  <li>ResNet's convolutions are hardware-optimized but process more pixels</li>
                  <li>Modern GPUs parallelize both operations efficiently</li>
                </ul>
              </div>
            </div>

            <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-600/30">
              <h4 className="font-bold text-purple-400 mb-2">Validation Curve Characteristics</h4>
              <div className="space-y-2 text-sm text-slate-300">
                <p><strong>ResNet-18:</strong> Steady improvement from ~93% to ~95%, showing gradual learning through hierarchical features.</p>
                <p><strong>DeiT-tiny:</strong> Starts high (~95%), minor fluctuations, demonstrating that attention quickly captures global patterns in simple data.</p>
                <p className="mt-2 italic">Both curves flatten by epoch 10, confirming dataset saturation.</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-600/30">
              <h4 className="font-bold text-purple-400 mb-2">Why ViT Outperforms? (85.25% vs 76.14%)</h4>
              <div className="space-y-2 text-sm text-slate-300">
                <p><strong>Complex Dataset Challenge:</strong> 257 classes require fine-grained feature discrimination.</p>
                <p><strong>Self-Attention Advantage:</strong></p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Captures subtle differences between visually similar classes (e.g., different dog breeds, objects)</li>
                  <li>Global receptive field from layer 1 enables better context understanding</li>
                  <li>Attention weights adaptively focus on discriminative regions</li>
                </ul>
                <p><strong>CNN Limitations:</strong></p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Local receptive fields may miss contextual cues</li>
                  <li>Hierarchical features rely on many layers to see globally</li>
                  <li>Spatial bias can hurt when texture matters more than location</li>
                </ul>
                <p className="mt-3"><strong>Performance Gap (+9.11%):</strong> Shows ViT's superior representational power for complex, fine-grained classification.</p>
              </div>
            </div>

            <div className="bg-blue-900/20 p-4 rounded-lg border border-blue-600/30">
              <h4 className="font-bold text-blue-400 mb-2">Why Same Training Time? (~17.5 minutes)</h4>
              <div className="space-y-2 text-sm text-slate-300">
                <p><strong>Both trained for 10 epochs with similar batch processing:</strong></p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Caltech 256 has larger images but similar dataset size</li>
                  <li>ViT's attention O(n²) complexity balanced by fewer parameters (5.7M vs 11.3M)</li>
                  <li>ResNet's convolutions are O(n) but applied to more layers</li>
                  <li>Hardware optimizations (CUDA kernels) make both architectures comparable in wall-clock time</li>
                </ul>
                <p className="mt-2"><strong>Efficiency Insight:</strong> Despite same time, ViT achieves 9% better accuracy with half the parameters!</p>
              </div>
            </div>

            <div className="bg-orange-900/20 p-4 rounded-lg border border-orange-600/30">
              <h4 className="font-bold text-orange-400 mb-2">Validation Curve Analysis</h4>
              <div className="space-y-2 text-sm text-slate-300">
                <p><strong>ResNet-18:</strong> Validation accuracy climbs from ~23% to ~76%, with loss decreasing from ~4.1 to ~1.15. Steady but limited by local feature extraction.</p>
                <p><strong>DeiT-tiny:</strong> Validation accuracy surges from ~47% to ~85%, with loss dropping from ~2.6 to ~0.52. Steeper improvement shows attention's power on complex data.</p>
                <p className="mt-2 italic"><strong>Neither fully saturates at epoch 10</strong> – both could improve with more training, but ViT maintains consistent advantage.</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Summary & Recommendations */}
      <div className="glass p-6 rounded-lg border border-slate-700">
        <h3 className="text-xl font-bold mb-4 flex items-center">
          <AlertCircle className="mr-2 text-yellow-400" size={24} />
          Summary & Recommendations
        </h3>
        
        <div className="bg-gradient-to-r from-indigo-900/30 to-purple-900/30 p-5 rounded-lg">
          <h4 className="font-bold text-emerald-400 mb-3">Key Takeaways</h4>
          {isCifar10 ? (
            <ul className="space-y-2 text-sm text-slate-300 list-disc list-inside">
              <li><strong>For simple datasets like CIFAR-10:</strong> Architecture choice has minimal impact on final accuracy</li>
              <li><strong>Both CNNs and ViTs can saturate</strong> when task complexity is below model capacity</li>
              <li><strong>Choose ResNet-18 if:</strong> You prioritize proven reliability, slightly faster inference (6.42ms vs 8.91ms for ViT)</li>
              <li><strong>Choose DeiT-tiny if:</strong> You want fewer parameters (5.7M vs 11.2M), better parameter efficiency, or plan to scale to harder tasks</li>
              <li><strong>Activation functions (ReLU vs GELU)</strong> don't significantly impact results on simple data</li>
            </ul>
          ) : (
            <ul className="space-y-2 text-sm text-slate-300 list-disc list-inside">
              <li><strong>For complex datasets like Caltech 256:</strong> ViTs significantly outperform CNNs (+9% accuracy)</li>
              <li><strong>GELU activation in transformers</strong> helps capture nuanced patterns better than ReLU</li>
              <li><strong>Self-attention scales better</strong> to fine-grained classification (257 classes) than convolution</li>
              <li><strong>Choose DeiT-tiny for:</strong> Maximum accuracy, parameter efficiency, complex multi-class problems</li>
              <li><strong>Choose ResNet-18 for:</strong> Baseline comparisons, simpler deployment, when 76% accuracy is sufficient</li>
              <li><strong>Training efficiency:</strong> ViT achieves 9% better results in the same time with half the parameters</li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Report;
