import { basePath } from '../utils/constants';

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

export default swaggerOptions;
