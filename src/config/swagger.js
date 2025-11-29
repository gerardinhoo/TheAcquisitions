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
        url: 'http://localhost:3000',
        description: 'Local',
      },
      {
        url: 'https://theacquisitions-api-alb-399263603.us-east-2.elb.amazonaws.com',
        description: 'Production (ALB)',
      },
    ],
  },
  // Tell swagger-jsdoc where to find route files
  apis: ["./src/**/*.js"],
};

export const swaggerSpec = swaggerJsdoc(options);
export const swaggerUiInstance = swaggerUi;
