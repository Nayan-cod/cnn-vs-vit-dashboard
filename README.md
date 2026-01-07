# CNN vs Vision Transformer - Multi-Dataset Dashboard

A comprehensive Next.js dashboard for comparing ResNet-18 (CNN) and DeiT-tiny (Vision Transformer) performance across multiple datasets. Features dynamic dataset switching, validation metrics visualization, and detailed technical reporting.

## 🌟 Features

- **Multi-Dataset Support**: Switch between CIFAR-10 and Caltech 256 datasets dynamically
- **Interactive Visualizations**: Training curves, confusion matrices, performance charts
- **Dataset-Aware Insights**: Tailored explanations for each dataset's characteristics
- **Technical Report**: Detailed analysis of activation functions (ReLU vs GELU), parameters, and results
- **Responsive Design**: Beautiful glassmorphic UI with smooth animations

## 📋 Prerequisites

Before running this application, ensure you have:

- **Node.js** (version 18.0 or higher)
- **npm** (comes with Node.js)
- **Git** (optional, for cloning)

To check if Node.js is installed:
```bash
node --version
npm --version
```

## 🚀 How to Run the App (Step-by-Step)

### Step 1: Navigate to the Project Directory

Open your terminal/command prompt and navigate to the dashboard folder:

```bash
cd "c:\resnet18 vs deit-tinny\cnn-vs-vit-dashboard-main\cnn-vs-vit-dashboard-main"
```

### Step 2: Install Dependencies

Install all required npm packages (only needed the first time):

```bash
npm install
```

This will install:
- Next.js 15.5.4
- React 19.1.0
- Recharts (for charts)
- Lucide React (for icons)
- TailwindCSS 4 (for styling)

Wait for the installation to complete (may take 1-2 minutes).

### Step 3: Start the Development Server

Run the development server:

```bash
npm run dev
```

You should see output like:
```
✓ Ready in 15.9s
- Local:        http://localhost:3000
```

### Step 4: Open the Dashboard

Open your web browser and go to:
```
http://localhost:3000
```

The dashboard should load with the default CIFAR-10 dataset.

### Step 5: Explore the Dashboard

**Navigation Tabs** (at the top):
1. **Overview**: Key metrics, model summaries, performance highlights
2. **Training Metrics**: Validation accuracy and loss curves with insights
3. **Confusion Matrix**: Classification performance by class
4. **Architecture**: Model parameter distribution and layer details
5. **Performance**: Comprehensive performance analysis and comparisons
6. **Report**: Detailed technical report on activation functions and results

**Dataset Selector** (top-right corner):
- Click the dropdown to switch between CIFAR-10 and Caltech 256
- Data automatically reloads and charts update

## 🔧 Troubleshooting

### Port 3000 is already in use
If you see this error, either:
1. Stop the existing process using port 3000, OR
2. Use a different port:
   ```bash
   npm run dev -- -p 3001
   ```
   Then open `http://localhost:3001`

### Module not found errors
Run:
```bash
npm install
```

### Changes not reflecting
The page should auto-reload. If not:
1. Refresh your browser (Ctrl+R or Cmd+R)
2. Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)

## 🛑 Stopping the Server

To stop the development server:
- Press `Ctrl+C` in the terminal where the server is running
- Confirm with `Y` if prompted

## 📁 Project Structure

```
cnn-vs-vit-dashboard-main/
├── app/
│   ├── components/          # React components
│   │   ├── overview.tsx
│   │   ├── training-metrics.tsx
│   │   ├── performance.tsx
│   │   ├── report.tsx       # Technical report
│   │   └── ...
│   ├── context/            # React Context for state
│   │   └── DatasetContext.tsx
│   ├── lib/                # Data utilities
│   │   ├── dataConfig.ts   # Dataset configurations
│   │   └── dataLoader.ts   # CSV parsing & loading
│   └── page.tsx            # Main page
├── public/
│   └── data/               # CSV data files
│       ├── cifar10/
│       └── caltech256/
└── package.json
```

## 📊 Available Datasets

### CIFAR-10
- 10 classes (airplane, automobile, bird, cat, deer, dog, frog, horse, ship, truck)
- 32×32 pixel images
- Both models achieve ~94-95% validation accuracy
- Training time: ~23 minutes for 10 epochs

### Caltech 256
- 257 complex classes
- Higher resolution images
- ViT outperforms CNN: 85.25% vs 76.14%
- Training time: ~17.5 minutes for 10 epochs

## 🎨 Key Technologies

- **Framework**: Next.js 15 with App Router
- **UI Library**: React 19
- **Styling**: TailwindCSS 4 (Glassmorphic design)
- **Charts**: Recharts
- **Language**: TypeScript
- **Icons**: Lucide React

## 📝 Building for Production

To create a production build:

```bash
npm run build
```

To run the production build:

```bash
npm start
```

## 🤝 Dataset Information

The dashboard loads data from CSV files located in `public/data/`:
- Epoch-by-epoch training metrics
- Per-class performance metrics
- Model architecture details

To update the data, replace the CSV files in the respective dataset folders.

## 📖 Additional Commands

```bash
# Type checking
npm run type-check

# Linting
npm run lint

# Lint and auto-fix
npm run lint:fix
```

## 📄 License

This project is built with Next.js. See [Next.js documentation](https://nextjs.org/docs) for more information.

---

**Need Help?** Check the Terminal output for error messages or refer to the [Next.js Documentation](https://nextjs.org/docs).
