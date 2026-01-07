import { DatasetId, DATASET_CONFIGS } from './dataConfig';

export interface EpochMetrics {
  epoch: number;
  trainLoss: number;
  valLoss: number;
  trainAccuracy: number;
  valAccuracy: number;
  trainTime: number;
  testAccuracy: number;
  totalTrainingTime: number;
  inferenceTime: number;
  modelSize: number;
  parameterCount: number;
}

export interface ClassMetrics {
  className: string;
  precision: number;
  recall: number;
  f1Score: number;
}

export interface ModelMetrics {
  resnet18: {
    epochs: EpochMetrics[];
    classes: ClassMetrics[];
    finalMetrics: {
      testAccuracy: number;
      finalLoss: number;
      precision: number;
      recall: number;
      f1Score: number;
      parameters: string;
      trainingTime: string;
      inferenceTime: string;
      modelSize: string;
    };
  };
  deit: {
    epochs: EpochMetrics[];
    classes: ClassMetrics[];
    finalMetrics: {
      testAccuracy: number;
      finalLoss: number;
      precision: number;
      recall: number;
      f1Score: number;
      parameters: string;
      trainingTime: string;
      inferenceTime: string;
      modelSize: string;
    };
  };
}

// Parse CSV text into array of objects
function parseCSV(csvText: string): Record<string, string>[] {
  const lines = csvText.trim().split('\n');
  if (lines.length < 2) return [];
  
  const headers = lines[0].split(',').map(h => h.trim());
  const rows: Record<string, string>[] = [];
  
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',').map(v => v.trim());
    if (values.length === headers.length) {
      const row: Record<string, string> = {};
      headers.forEach((header, index) => {
        row[header] = values[index];
      });
      rows.push(row);
    }
  }
  
  return rows;
}

// Load and parse epoch metrics
async function loadEpochMetrics(path: string): Promise<EpochMetrics[]> {
  try {
    const response = await fetch(path);
    const csvText = await response.text();
    const rows = parseCSV(csvText);
    
    return rows.map(row => ({
      epoch: parseInt(row.Epoch || '0'),
      trainLoss: parseFloat(row.Train_Loss || '0'),
      valLoss: parseFloat(row.Val_Loss || '0'),
      trainAccuracy: parseFloat(row.Train_Accuracy || '0') * 100, // Convert to percentage
      valAccuracy: parseFloat(row.Val_Accuracy || '0') * 100, // Convert to percentage
      trainTime: parseFloat(row.Epoch_Train_Time_sec || '0'),
      testAccuracy: parseFloat(row.Final_Test_Accuracy || '0') * 100,
      totalTrainingTime: parseFloat(row.Total_Training_Time_sec || '0'),
      inferenceTime: parseFloat(row.Inference_Time_ms || '0'),
      modelSize: parseFloat(row.Model_Size_MB || '0'),
      parameterCount: parseInt(row.Parameter_Count || '0'),
    }));
  } catch (error) {
    console.error(`Error loading epoch metrics from ${path}:`, error);
    return [];
  }
}

// Load and parse class metrics
async function loadClassMetrics(path: string): Promise<ClassMetrics[]> {
  try {
    const response = await fetch(path);
    const csvText = await response.text();
    const rows = parseCSV(csvText);
    
    return rows.map(row => ({
      className: row.Class || '',
      precision: parseFloat(row.Precision || '0') * 100, // Convert to percentage
      recall: parseFloat(row.Recall || '0') * 100, // Convert to percentage
      f1Score: parseFloat(row.F1_Score || '0') * 100, // Convert to percentage
    }));
  } catch (error) {
    console.error(`Error loading class metrics from ${path}:`, error);
    return [];
  }
}

// Calculate average from class metrics
function calculateAverageMetric(classes: ClassMetrics[], metric: 'precision' | 'recall' | 'f1Score'): number {
  if (classes.length === 0) return 0;
  const sum = classes.reduce((acc, cls) => acc + cls[metric], 0);
  return sum / classes.length;
}

// Format number to millions
function formatToMillions(num: number): string {
  return (num / 1_000_000).toFixed(1) + 'M';
}

// Format seconds to minutes or hours
function formatTime(seconds: number): string {
  if (seconds < 60) {
    return seconds.toFixed(1) + ' sec';
  } else if (seconds < 3600) {
    return (seconds / 60).toFixed(1) + ' min';
  } else {
    return (seconds / 3600).toFixed(1) + ' hr';
  }
}

// Load all metrics for a dataset
export async function loadDatasetMetrics(datasetId: DatasetId): Promise<ModelMetrics> {
  const config = DATASET_CONFIGS[datasetId];
  
  // Load all data in parallel
  const [resnet18Epochs, deitEpochs, resnet18Classes, deitClasses] = await Promise.all([
    loadEpochMetrics(config.paths.resnet18Epochs),
    loadEpochMetrics(config.paths.deitEpochs),
    loadClassMetrics(config.paths.resnet18Classes),
    loadClassMetrics(config.paths.deitClasses),
  ]);
  
  // Get final epoch data
  const resnet18Final = resnet18Epochs[resnet18Epochs.length - 1] || {} as EpochMetrics;
  const deitFinal = deitEpochs[deitEpochs.length - 1] || {} as EpochMetrics;
  
  return {
    resnet18: {
      epochs: resnet18Epochs,
      classes: resnet18Classes,
      finalMetrics: {
        testAccuracy: resnet18Final.testAccuracy || 0,
        finalLoss: resnet18Final.valLoss || 0,
        precision: calculateAverageMetric(resnet18Classes, 'precision'),
        recall: calculateAverageMetric(resnet18Classes, 'recall'),
        f1Score: calculateAverageMetric(resnet18Classes, 'f1Score'),
        parameters: formatToMillions(resnet18Final.parameterCount || 0),
        trainingTime: formatTime(resnet18Final.totalTrainingTime || 0),
        inferenceTime: (resnet18Final.inferenceTime || 0).toFixed(2) + ' ms',
        modelSize: (resnet18Final.modelSize || 0).toFixed(1) + ' MB',
      },
    },
    deit: {
      epochs: deitEpochs,
      classes: deitClasses,
      finalMetrics: {
        testAccuracy: deitFinal.testAccuracy || 0,
        finalLoss: deitFinal.valLoss || 0,
        precision: calculateAverageMetric(deitClasses, 'precision'),
        recall: calculateAverageMetric(deitClasses, 'recall'),
        f1Score: calculateAverageMetric(deitClasses, 'f1Score'),
        parameters: formatToMillions(deitFinal.parameterCount || 0),
        trainingTime: formatTime(deitFinal.totalTrainingTime || 0),
        inferenceTime: (deitFinal.inferenceTime || 0).toFixed(2) + ' ms',
        modelSize: (deitFinal.modelSize || 0).toFixed(1) + ' MB',
      },
    },
  };
}

// Format training data for charts - using validation metrics
export function formatTrainingData(resnet18Epochs: EpochMetrics[], deitEpochs: EpochMetrics[]) {
  const maxLength = Math.max(resnet18Epochs.length, deitEpochs.length);
  const chartData = [];
  
  for (let i = 0; i < maxLength; i++) {
    const resnetData = resnet18Epochs[i];
    const deitData = deitEpochs[i];
    
    chartData.push({
      epoch: i + 1,
      CNN_Accuracy: resnetData?.valAccuracy || null,
      ViT_Accuracy: deitData?.valAccuracy || null,
      CNN_Loss: resnetData?.valLoss || null,
      ViT_Loss: deitData?.valLoss || null,
    });
  }
  
  return chartData;
}
