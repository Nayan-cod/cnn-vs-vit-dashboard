# CNN vs ViT Dashboard - Vercel Deployment Guide

## 🚀 Quick Deployment to Vercel

### Prerequisites
- Node.js 18+ installed
- Vercel account (free tier available)
- Git repository

### Deployment Steps

1. **Push to Git Repository**
   ```bash
   git add .
   git commit -m "Initial commit: CNN vs ViT Dashboard"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your Git repository
   - Vercel will automatically detect Next.js
   - Click "Deploy"

3. **Automatic Configuration**
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`
   - Framework: Next.js

### Manual Deployment (Alternative)

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Follow prompts**
   - Link to existing project or create new
   - Confirm settings
   - Deploy

### Environment Variables
No environment variables required for this project.

### Build Configuration
- **Framework**: Next.js 15.5.4
- **Node Version**: 18.x (auto-detected)
- **Build Command**: `npm run build`
- **Output Directory**: `.next`

### Performance Optimizations
- ✅ Image optimization enabled
- ✅ Bundle optimization with package imports
- ✅ Static generation for all pages
- ✅ Compression enabled
- ✅ Security headers configured

### File Structure
```
├── app/
│   ├── components/          # React components
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Main page
├── public/
│   └── images/             # CIFAR-10 sample images
├── .gitignore              # Git ignore rules
├── next.config.ts          # Next.js configuration
├── package.json            # Dependencies and scripts
├── tsconfig.json           # TypeScript configuration
└── vercel.json             # Vercel deployment config
```

### Troubleshooting

**Build Fails:**
- Check Node.js version (18+ required)
- Run `npm install` locally first
- Check for TypeScript errors: `npm run type-check`

**Images Not Loading:**
- Ensure images are in `/public/images/` directory
- Check file names match the data structure
- Verify image formats are supported (JPG, PNG, WebP)

**Performance Issues:**
- Images are automatically optimized by Next.js
- Bundle size is optimized with tree shaking
- Static generation ensures fast loading

### Monitoring
- Vercel provides built-in analytics
- Check deployment logs in Vercel dashboard
- Monitor Core Web Vitals in Vercel Analytics

### Custom Domain (Optional)
1. Go to Vercel project settings
2. Add your domain in "Domains" section
3. Configure DNS records as instructed
4. SSL certificate is automatically provisioned

## 🎯 Features
- **Responsive Design**: Works on all devices
- **Dark Theme**: Modern UI with slate color scheme
- **Interactive Charts**: Recharts for data visualization
- **Image Optimization**: Next.js Image component
- **TypeScript**: Full type safety
- **Performance**: Optimized for Core Web Vitals

## 📊 Dashboard Sections
1. **Overview**: Key metrics comparison
2. **Training Metrics**: Accuracy and loss curves
3. **Confusion Matrix**: Classification performance
4. **Architecture**: Model structure comparison
5. **Performance**: Comprehensive analysis
6. **Sample Predictions**: Visual examples

## 🔧 Development
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Type checking
npm run type-check

# Linting
npm run lint
```

## 📝 License
This project is for educational purposes demonstrating CNN vs Vision Transformer comparison on CIFAR-10 dataset.
