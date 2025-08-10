# 🚀 Deploy LetCpp on Render

This guide will walk you through deploying your LetCpp project on Render.com.

## 📋 Prerequisites

- A GitHub account with your LetCpp repository
- A Render.com account (free tier available)

## 🔧 Files Added for Deployment

### 1. `render.yaml`
- **Purpose**: Blueprint for Render deployment
- **Configuration**: 
  - Web service type
  - Node.js environment
  - Free plan
  - Build and start commands
  - Environment variables

### 2. Updated `server.js`
- **Changes**: Added proper host binding (`0.0.0.0`) for production
- **Purpose**: Ensures the app listens on all network interfaces

### 3. Updated `package.json`
- **Changes**: Added `dev` script and ensured proper `start` script
- **Purpose**: Render uses `npm start` to run the application

## 🚀 Deployment Steps

### Step 1: Prepare Your Repository

1. **Commit all changes to GitHub**:
   ```bash
   git add .
   git commit -m "Add Render deployment configuration"
   git push origin main
   ```

2. **Ensure these files are in your repository**:
   - ✅ `render.yaml`
   - ✅ `package.json` (with proper scripts)
   - ✅ `server.js` (with host binding)
   - ✅ `public/tailwind.css` (source file)
   - ✅ `public/styles.css` (custom styles)
   - ✅ `public/solution.js` (shared JavaScript)
   - ✅ All EJS templates in `views/`

### Step 2: Deploy on Render

#### Option A: Using render.yaml (Recommended)

1. **Go to [Render Dashboard](https://dashboard.render.com/)**
2. **Click "New +" → "Blueprint"**
3. **Connect your GitHub repository**
4. **Select your LetCpp repository**
5. **Render will automatically detect `render.yaml`**
6. **Click "Apply" to deploy**

#### Option B: Manual Setup

1. **Go to [Render Dashboard](https://dashboard.render.com/)**
2. **Click "New +" → "Web Service"**
3. **Connect your GitHub repository**
4. **Configure the service**:
   - **Name**: `letcpp` (or your preferred name)
   - **Environment**: `Node`
   - **Region**: Choose closest to your users
   - **Branch**: `main` (or your default branch)
   - **Build Command**: `npm install && npm run build:css:prod`
   - **Start Command**: `npm start`
   - **Plan**: `Free`

### Step 3: Environment Variables (Optional)

In Render dashboard, add these environment variables:
- `NODE_ENV`: `production`
- `PORT`: (Render sets this automatically)

### Step 4: Deploy

1. **Click "Create Web Service"**
2. **Wait for the build to complete** (usually 2-5 minutes)
3. **Your app will be available at**: `https://your-app-name.onrender.com`

## 🔍 Troubleshooting

### Common Issues

#### 1. Build Fails
- **Error**: `tailwindcss: command not found`
- **Solution**: Ensure `tailwindcss` is in `devDependencies` in `package.json`

#### 2. App Won't Start
- **Error**: `EADDRNOTAVAIL` or similar
- **Solution**: Ensure `server.js` has proper host binding (`0.0.0.0`)

#### 3. CSS Not Loading
- **Error**: Styles not applied
- **Solution**: Check that `public/styles.min.css` is being generated during build

#### 4. Routes Not Working
- **Error**: 404 errors on solution pages
- **Solution**: Ensure all EJS files are in the `views/` directory

### Debug Steps

1. **Check Render logs** in the dashboard
2. **Verify build command** is generating `styles.min.css`
3. **Test locally** with `npm run build:css:prod && npm start`
4. **Check file paths** are correct for production

## 📊 Monitoring

### Render Dashboard Features
- **Logs**: Real-time application logs
- **Metrics**: CPU, memory usage
- **Deployments**: Automatic deployments on git push
- **Health Checks**: Automatic monitoring

### Custom Domain (Optional)
1. **Go to your service settings**
2. **Click "Custom Domains"**
3. **Add your domain** (e.g., `letcpp.yourdomain.com`)
4. **Update DNS** as instructed

## 🔄 Continuous Deployment

Once deployed, Render will:
- **Automatically deploy** on every push to your main branch
- **Run build commands** to generate CSS
- **Restart the service** with new code
- **Health check** to ensure the app is running

## 💰 Cost

- **Free Tier**: 
  - 750 hours/month
  - Sleeps after 15 minutes of inactivity
  - Perfect for personal projects
- **Paid Plans**: Available for always-on deployment

## 🎯 Post-Deployment Checklist

- [ ] App loads at the provided URL
- [ ] Homepage displays correctly
- [ ] Solution pages (`/1`, `/2`) work
- [ ] Copy-to-clipboard functionality works
- [ ] CSS styles are applied correctly
- [ ] All images and assets load
- [ ] 404 page works for invalid routes

## 📞 Support

If you encounter issues:
1. **Check Render documentation**: [docs.render.com](https://docs.render.com)
2. **Review build logs** in Render dashboard
3. **Test locally** to isolate issues
4. **Contact Render support** if needed

---

**🎉 Congratulations!** Your LetCpp project is now live on Render!
