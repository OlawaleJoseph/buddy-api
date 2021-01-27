import express from 'express';
import { config } from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import { errorHandler, notFoundPathErrorHandler } from './middlewares/Errors';
import { basePath } from './utils/constants';
import swaggerOptions from './docs/swaggerConfig';

const app = express();
config();

app.use(bodyParser.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

app.use(`${basePath}/docs`, swaggerUi.serve, swaggerUi.setup(swaggerJsDoc(swaggerOptions)));

app.use('*', notFoundPathErrorHandler);

app.use(errorHandler);

app.listen(process.env.PORT || 3000);
