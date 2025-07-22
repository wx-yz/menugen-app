# Deployment Guide for MenuGen

This guide covers different deployment options for the MenuGen application.

## 🚀 Quick Start (Development)

```bash
# Clone and setup
git clone <your-repo>
cd menugen-app-1

# Install dependencies
npm run install:all

# Copy environment files
cp frontend/.env.example frontend/.env
cp backend/.env.example backend/.env

# Edit environment files with your configuration
# Then start development servers
npm run dev
```

The app will be available at:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## 🌐 Production Deployment Options

### Option 1: Vercel (Frontend) + Heroku (Backend)

**Frontend on Vercel:**
```bash
cd frontend
npm run build
vercel --prod
```

**Backend on Heroku:**
```bash
cd backend
# Create Procfile
echo "web: npm start" > Procfile
git add .
git commit -m "Deploy to Heroku"
heroku create your-app-name
git push heroku main
```

**Environment Variables:**
- Set production URLs in Vercel/Heroku dashboards
- Update CORS settings for production domains

### Option 2: Docker Deployment

**Frontend Dockerfile:**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

**Backend Dockerfile:**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 5000
CMD ["npm", "start"]
```

**Docker Compose:**
```yaml
version: '3.8'
services:
  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    environment:
      - VITE_API_URL=http://backend:5000
    depends_on:
      - backend

  backend:
    build: ./backend
    ports:
      - "5000:5000"
    environment:
      - PORT=5000
      - FRONTEND_URL=http://frontend:3000
```

### Option 3: AWS Deployment

**Frontend (S3 + CloudFront):**
1. Build the frontend: `npm run build`
2. Upload `dist/` to S3 bucket
3. Configure CloudFront distribution
4. Set up Route 53 for custom domain

**Backend (EC2 + Load Balancer):**
1. Launch EC2 instance
2. Install Node.js and dependencies
3. Set up PM2 for process management
4. Configure Application Load Balancer
5. Set up auto-scaling groups

### Option 4: Netlify + Railway

**Frontend on Netlify:**
1. Connect GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Configure environment variables

**Backend on Railway:**
1. Connect GitHub repository
2. Set start command: `npm start`
3. Configure environment variables
4. Set up custom domain

## 🔧 Production Configuration

### Environment Variables

**Frontend Production (.env.production):**
```env
VITE_API_URL=https://your-api-domain.com
VITE_ASGARDEO_CLIENT_ID=your_production_client_id
VITE_ASGARDEO_BASE_URL=https://api.asgardeo.io/t/your_org
VITE_ASGARDEO_REDIRECT_URL=https://your-app-domain.com
```

**Backend Production (.env):**
```env
PORT=5000
FRONTEND_URL=https://your-app-domain.com
NODE_ENV=production
```

### Security Checklist

- [ ] Update CORS origins for production domains
- [ ] Configure HTTPS certificates
- [ ] Set up proper CSP headers
- [ ] Enable rate limiting
- [ ] Configure secure session storage
- [ ] Set up monitoring and logging
- [ ] Configure backup strategies

### Performance Optimizations

**Frontend:**
- Enable gzip compression
- Configure CDN caching
- Optimize images and assets
- Implement service worker for caching

**Backend:**
- Set up Redis for caching
- Configure database connection pooling
- Implement API rate limiting
- Set up load balancing

## 🔍 Monitoring & Maintenance

### Health Checks
- Frontend: Check if app loads and authentication works
- Backend: Hit `/health` endpoint regularly
- Database: Monitor connection and query performance

### Logging
```bash
# Backend logs
npm install winston
# Configure structured logging

# Frontend errors
# Set up error boundary and reporting
```

### Backup Strategy
- Code: GitHub/GitLab repository
- Environment configs: Secure storage
- User data: Database backups
- Generated images: Cloud storage with versioning

## 🚨 Troubleshooting

### Common Issues

**CORS Errors:**
- Check FRONTEND_URL in backend environment
- Verify CORS origins include your frontend domain

**Authentication Issues:**
- Verify Asgardeo callback URLs
- Check client ID and base URL configuration
- Ensure HTTPS for production domains

**File Upload Issues:**
- Check file size limits
- Verify supported file types
- Monitor server memory usage

**API Issues:**
- Verify OpenAI API key validity
- Check rate limits and quotas
- Monitor error logs

### Debug Commands

```bash
# Check logs
docker logs container_name
heroku logs --tail
pm2 logs

# Test endpoints
curl https://your-api.com/health
curl -X POST https://your-api.com/api/process-menu

# Monitor resources
top
htop
docker stats
```

## 📊 Scaling Considerations

### Horizontal Scaling
- Load balancers for multiple backend instances
- CDN for frontend static assets
- Database read replicas
- Queue system for AI processing

### Vertical Scaling
- Increase server memory for file processing
- Faster CPUs for AI operations
- SSD storage for better I/O

### Cost Optimization
- Use spot instances for non-critical workloads
- Implement auto-scaling policies
- Optimize AI API usage
- Cache frequently requested images

## 🔄 CI/CD Pipeline

### GitHub Actions Example
```yaml
name: Deploy
on:
  push:
    branches: [main]

jobs:
  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup Node
        uses: actions/setup-node@v2
        with:
          node-version: '18'
      - name: Install and build
        run: |
          cd frontend
          npm ci
          npm run build
      - name: Deploy to Vercel
        uses: vercel/action@v1
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}

  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Heroku
        uses: akhileshns/heroku-deploy@v3.12.12
        with:
          heroku_api_key: ${{ secrets.HEROKU_API_KEY }}
          heroku_app_name: "your-app-name"
          heroku_email: "your-email@example.com"
```

---

Need help with deployment? Check the troubleshooting section or open an issue!
