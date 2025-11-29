import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import logger from '#config/logger.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from '#routes/auth.routes.js';
import usersRoutes from '#routes/users.routes.js';
import securityMiddleware from '#middleware/security-middleware.js';
import { register } from "#config/metrics/metrics.js";
import { metricsMiddleware } from "#middleware/metrics.middleware.js";
import { swaggerSpec, swaggerUiInstance } from '#config/swagger.js';


const app = express();

/**
 * @swagger
 * /health:
 *   get:
 *     tags: [Health]
 *     summary: Health check
 *     description: Returns service status and uptime.
 *     responses:
 *       200:
 *         description: Service is healthy
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "OK"
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                 uptime:
 *                   type: number
 *                   example: 123.45
 */


app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/docs',
  swaggerUiInstance.serve,
  swaggerUiInstance.setup(swaggerSpec)
 )
app.use(securityMiddleware);
app.use(metricsMiddleware);


app.use(
  morgan('combined', {
    stream: { write: message => logger.info(message.trim()) },
  })
);

app.get('/', (req, res) => {
  logger.info('Hello from The Acquisitions');
  res.status(200).send('Hello from Devops Project Acquisitions');
});

app.get('/api', (req, res) => {
  res.status(200).json({ message: 'The Acquisitions API is running' });
});

app.get("/metrics", async (_req, res) => {
  res.set("Content-Type", register.contentType);
  const data = await register.metrics();
  res.send(data);
});

app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

export default app;
