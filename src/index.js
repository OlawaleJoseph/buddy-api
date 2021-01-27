/* eslint-disable no-unused-vars */
import express from 'express';
import { config } from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import bodyParser from 'body-parser';

const app = express();
config();

const basePath = '/api/v1';
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Buddy API',
      version: '1.0.0',
      description:
      'This is a REST API for Buddy Chat Application',
      license: {
        name: 'Licensed Under MIT',
        url: 'https://spdx.org/licenses/MIT.html',
      },
      contact: {
        name: 'Olawale Adedeko',
        url: 'https://www.linkedin.com/in/olawale-adedeko/',
      },
    },
  },
  basePath,
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Development server',
    },
  ],
  apis: ['./routes*.js'],
};

app.use(bodyParser.json());
app.use(cors());
app.use(helmet());
app.use(morgan('combined'));

app.use(`${basePath}/docs`, swaggerUi.serve, swaggerUi.setup(swaggerJsDoc(swaggerOptions)));

app.use('*', (req, res, next) => {
  const error = {
    message: 'Route not found',
    status: 404,
  };
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  let { status } = error;
  if (status === 200) status = 500;
  res.status(status || 500).json({
    success: false,
    error,
  });
});

app.listen(process.env.PORT || 3000);
