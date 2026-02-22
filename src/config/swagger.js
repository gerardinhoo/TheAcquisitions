import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'TheAcquisitions API',
      version: '1.0.0',
      description: 'API documentation for The Acquisitions DevOps project',
    },
    servers: [
      {
        url: process.env.API_BASE_URL || 'http://localhost:3000',
        description:
          process.env.NODE_ENV === 'production' ? 'Production' : 'Local',
      },
    ],
  },
  // Tell swagger-jsdoc where to find route files
  apis: ['./src/**/*.js'],
};

export const swaggerSpec = swaggerJsdoc(options);
export const swaggerUiInstance = swaggerUi;
