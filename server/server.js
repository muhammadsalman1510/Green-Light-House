import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
dotenv.config();

import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

import { connectDB } from './lib/mongodb.js';
import { errorHandler } from './middleware/errorHandler.js';

import authRoutes     from './routes/auth.js';
import categoryRoutes from './routes/categories.js';
import productRoutes  from './routes/products.js';
import reviewRoutes   from './routes/reviews.js';
import orderRoutes    from './routes/orders.js';
import settingsRoutes from './routes/settings.js';
import uploadRoutes   from './routes/upload.js';

const app = express();

app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' },
}));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  message: { message: 'Too many requests, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api/', limiter);

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { message: 'Too many login attempts, please try again later.' },
});
app.use('/api/auth/login', authLimiter);

app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'Green Light House API', time: new Date() });
});

app.use('/api/auth',       authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products',   productRoutes);
app.use('/api/reviews',    reviewRoutes);
app.use('/api/orders',     orderRoutes);
app.use('/api/settings',   settingsRoutes);
app.use('/api/upload',     uploadRoutes);

app.use((req, res) => {
  res.status(404).json({ message: `Route ${req.method} ${req.path} not found.` });
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Green Light House API running at http://localhost:${PORT}`);
      console.log(`   MongoDB connected`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  });

export default app;
